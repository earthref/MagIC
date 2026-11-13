#!/usr/bin/env python3
"""Assemble and validate a MagIC 3.0 upload file from per-table CSVs.

Input: a folder holding any of
    contribution.csv  locations.csv  sites.csv  samples.csv  specimens.csv
    measurements.csv  ages.csv
(plain comma- or tab-separated, first row = MagIC column names; .tsv/.txt also
accepted, and files already in MagIC format with a "tab\t<table>" first line are
read too).

What it does, in order:
  1. Normalizes values (trims whitespace, drops all-empty columns, longitudes and
     declinations into 0-360, fills measurement bookkeeping columns).
  2. Checks every column name against Data Model 3.0 — the live model from the
     MagIC repository when reachable, else PmagPy's copy — with typo suggestions,
     and checks the contribution table (reference, lab_names vocabulary,
     funding / supplemental_links "Name[URL]" format, author).
  3. Checks method codes, controlled vocabularies, parent/child name links and
     unit plausibility (MagIC is SI: T, K, Am^2 — papers usually give uT, C, mT).
  4. Runs PmagPy's own Data Model 3.0 validation on each table.
  5. Writes the combined upload file (contribution table first, then the others,
     separated by >>>>>>>>>>) with ipmag.upload_magic, and optionally validates
     it on the MagIC public endpoint.
  6. Writes validation_report.md next to the upload file.

Usage
  python build_upload.py WORKDIR --out OUTDIR [--name NAME.txt] [--online] [--offline-model]

Exit code 0 when no errors were found (warnings allowed), 1 otherwise.
"""
import argparse
import contextlib
import difflib
import io
import json
import os
import re
import shutil
import sys

import pandas as pd

TABLE_ORDER = ["locations", "sites", "samples", "specimens", "measurements", "ages"]
PARENT = {"sites": ("location", "locations"), "samples": ("site", "sites"),
          "specimens": ("sample", "samples"), "measurements": ("specimen", "specimens")}


# ---------------------------------------------------------------- data model
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from magic_model import load_model, column_cvs  # noqa: E402

DOWNLOAD_ONLY = {"id", "version", "timestamp", "contributor", "is_validated", "is_reviewed",
                 "data_model_version", "contribution_id", "row_id"}


# ---------------------------------------------------------------- reading
def read_table(path):
    with open(path, encoding="utf-8-sig") as f:
        first = f.readline()
    sep = "\t" if ("\t" in first or path.endswith((".tsv", ".txt"))) else ","
    header = 1 if first.lower().startswith("tab") else 0
    df = pd.read_csv(path, sep=sep, header=header, dtype=str, keep_default_na=False)
    df.columns = [c.strip() for c in df.columns]
    df = df.apply(lambda s: s.str.strip())
    df = df.loc[:, [c for c in df.columns if (df[c] != "").any() and not c.startswith("Unnamed")]]
    df = df[(df != "").any(axis=1)].reset_index(drop=True)
    return df


def find_tables(workdir):
    found = {}
    for t in ["contribution"] + TABLE_ORDER:
        for ext in (".csv", ".tsv", ".txt"):
            p = os.path.join(workdir, t + ext)
            if os.path.exists(p):
                found[t] = p
                break
    return found


# ---------------------------------------------------------------- checks
class Report:
    def __init__(self):
        self.errors, self.warnings, self.fixes, self.notes = [], [], [], []

    def e(self, m): self.errors.append(m)
    def w(self, m): self.warnings.append(m)
    def f(self, m): self.fixes.append(m)
    def n(self, m): self.notes.append(m)


def num(s):
    return pd.to_numeric(s.replace("", None), errors="coerce")


def rows(mask, df, key):
    ids = df.loc[mask, key].tolist() if key in df else list(df.index[mask])
    shown = ", ".join(map(str, ids[:6]))
    return f"{shown}{' …' if len(ids) > 6 else ''} ({len(ids)} rows)"


def normalize(t, df, rep):
    # longitudes / declinations / azimuths into 0..360
    for col in [c for c in df.columns if c in ("lon", "lon_w", "lon_e", "vgp_lon", "pole_lon", "dir_dec",
                                              "azimuth", "bed_dip_direction", "aniso_s_dec")]:
        v = num(df[col])
        neg = v < 0
        if neg.any():
            df.loc[neg, col] = (v[neg] % 360).round(6).map(lambda x: f"{x:g}")
            rep.f(f"{t}.{col}: converted {int(neg.sum())} negative values to 0–360")
    if t == "measurements":
        key = "specimen"
        # Old PmagPy upload_magic used str.strip(".0") (PmagPy issue #848): 10 -> 1, 100 -> 1, 30 -> 3.
        # Symptom: an integer counter column with hundreds of values and none ending in 0.
        for col in ("sequence", "treat_step_num"):
            if col in df:
                v = pd.to_numeric(df[col], errors="coerce").dropna()
                if len(v) >= 50 and (v >= 10).sum() >= 20 and not (v % 10 == 0).any():
                    rep.w(f"measurements.{col}: {len(v)} values and none ends in 0 — trailing zeros were probably "
                          f"stripped by the old PmagPy upload_magic bug (issue #848). Restore them from the +1 "
                          f"progression within each specimen before renumbering, and report it.")
        if key in df and ("treat_step_num" not in df or (df["treat_step_num"] == "").any()):
            nblank = len(df) if "treat_step_num" not in df else int((df["treat_step_num"] == "").sum())
            df["treat_step_num"] = (df.groupby(key).cumcount() + 1).astype(str)
            rep.f(f"measurements.treat_step_num: numbered steps within each specimen in file order ({nblank} were blank/missing)")
        if "sequence" not in df or (df["sequence"] == "").any() or df["sequence"].duplicated().any():
            why = "missing" if "sequence" not in df else \
                f"{int(df['sequence'].duplicated().sum())} duplicates, {int((df['sequence'] == '').sum())} blanks"
            df["sequence"] = [str(i + 1) for i in range(len(df))]
            rep.f(f"measurements.sequence: renumbered 1..N in file order (was {why}; MagIC requires unique values)")
        if "measurement" not in df and key in df:
            df["measurement"] = df[key] + "-" + df["treat_step_num"].astype(str)
            rep.f("measurements.measurement: built as <specimen>-<treat_step_num>")
        for col, default in (("quality", "g"), ("standard", "u")):
            if col not in df:
                df[col] = default
                rep.f(f"measurements.{col}: defaulted to '{default}' for all rows")
            else:
                df.loc[df[col] == "", col] = default
    return df


def fix_integers(t, df, dm, rep):
    """MagIC's validator accepts only plain integers in Integer columns ('1.0' fails)."""
    for col in df.columns:
        if dm[t]["columns"].get(col, {}).get("type") != "Integer":
            continue
        v = df[col].astype(str)
        nonblank = v != ""
        if not nonblank.any():
            continue
        f = pd.to_numeric(v[nonblank], errors="coerce")
        whole = f.notna() & (f == f.round())
        fixable = whole & ~v[nonblank].str.fullmatch(r"[+-]?\d+")
        if fixable.any():
            df.loc[fixable[fixable].index, col] = f[fixable].astype("int64").astype(str)
            rep.f(f"{t}.{col}: {int(fixable.sum())} values like '1.0' written as integers")
        if (~whole).any():
            rep.e(f"{t}.{col}: Integer column has non-integer values, e.g. '{v[nonblank][~whole].iloc[0]}'")


STALE_MODEL = False  # set when only PmagPy's older copy of the model is available


def check_columns(t, df, dm, rep):
    valid = set(dm[t]["columns"])
    for c in df.columns:
        if c not in valid:
            sug = difflib.get_close_matches(c, valid, n=3)
            msg = f"{t}: '{c}' is not a MagIC 3.0 column" + (f" — did you mean {', '.join(sug)}?" if sug else "")
            if STALE_MODEL and not sug:
                rep.w(msg + " in PmagPy's older model copy; it may exist in the current model — rerun online to confirm")
            else:
                rep.e(msg)


def check_codes(t, df, codes, rep):
    for col in ("method_codes",):
        if col not in df:
            continue
        bad = {}
        for i, cell in df[col].items():
            for code in [x.strip() for x in cell.split(":") if x.strip()]:
                if code not in codes:
                    bad.setdefault(code, 0)
                    bad[code] += 1
        for code, n in bad.items():
            rep.e(f"{t}.method_codes: '{code}' is not a MagIC method code ({n} rows)")


def check_vocab(t, df, dm, vocab, rep):
    for col in df.columns:
        v = dm[t]["columns"].get(col, {})
        cvs = column_cvs(v)
        if not cvs or cvs[0] not in vocab:
            continue
        allowed = vocab[cvs[0]]
        lower = {a.lower(): a for a in allowed}
        is_list = v.get("type") == "List"
        for val in sorted(set(df[col]) - {""}):
            items = [x.strip() for x in val.split(":")] if is_list else [val]
            for it in items:
                if it in allowed:
                    continue
                if it.lower() in lower:
                    df[col] = df[col].str.replace(it, lower[it.lower()], regex=False)
                    rep.f(f"{t}.{col}: '{it}' → '{lower[it.lower()]}' (case)")
                else:
                    sug = difflib.get_close_matches(it, allowed, n=3)
                    rep.w(f"{t}.{col}: '{it}' is not in the '{cvs[0]}' vocabulary (PmagPy copy may lag MagIC)"
                          + (f" — closest: {', '.join(sug)}" if sug else ""))


def check_links(tables, rep):
    for child, (col, parent) in PARENT.items():
        if child not in tables or col not in tables[child]:
            continue
        if parent not in tables:
            rep.w(f"{child}.{col} points to {parent}, but there is no {parent} table")
            continue
        pkey = parent[:-1]
        have = set(tables[parent].get(pkey, pd.Series(dtype=str)))
        missing = sorted(set(tables[child][col]) - have - {""})
        if missing:
            rep.e(f"{child}.{col}: {len(missing)} names not found in {parent}.{pkey}: {', '.join(missing[:8])}"
                  + (" …" if len(missing) > 8 else ""))
    # colon-delimited name lists must point at names that exist (a ':' inside a name splits it in two)
    for t, col, other, ocol in (("specimens", "experiments", "measurements", "experiment"),
                                ("sites", "samples", "samples", "sample"), ("sites", "specimens", "specimens", "specimen"),
                                ("locations", "sites", "sites", "site")):
        df, od = tables.get(t), tables.get(other)
        if df is None or od is None or col not in df or ocol not in od:
            continue
        have = set(od[ocol])
        items = {x.strip() for v in df[col] if v for x in str(v).split(":") if x.strip()}
        missing = sorted(items - have)
        if missing:
            colon_names = [n for n in have if ":" in str(n)]
            rep.e(f"{t}.{col}: {len(missing)} list items not found in {other}.{ocol}, e.g. {', '.join(missing[:4])}"
                  + (f" — {other}.{ocol} names contain ':' (the list delimiter), e.g. '{colon_names[0]}'; rename them" if colon_names else ""))
    # a child whose name doesn't start with its parent's name, when nearly all others do, is often mis-linked
    for child, col in (("specimens", "sample"), ("samples", "site")):
        df = tables.get(child)
        if df is None or col not in df or child[:-1] not in df:
            continue
        rows = df.drop_duplicates(child[:-1])
        prefixed = rows.apply(lambda r: str(r[child[:-1]]).startswith(str(r[col])), axis=1)
        if prefixed.mean() > 0.9 and (~prefixed).any():
            odd = rows[~prefixed]
            rep.w(f"{child}: {len(odd)} rows whose name doesn't start with their {col} name (possible mis-link): "
                  + ", ".join(f"{a} -> {b}" for a, b in zip(odd[child[:-1]].head(6), odd[col].head(6))))
    for t in ("sites", "locations"):
        df = tables.get(t)
        if df is None or "dir_polarity" not in df:
            continue
        pol = df["dir_polarity"][df["dir_polarity"] != ""]
        if len(pol) > 3 and (pol == "t").mean() > 0.5:
            rep.w(f"{t}.dir_polarity: {int((pol == 't').sum())} of {len(pol)} rows are 't' (transitional) — usually a "
                  "default, not a result; check it")
    s, L = tables.get("sites"), tables.get("locations")
    if s is not None and L is not None and {"location", "lat", "lon"} <= set(s.columns) \
            and {"lat_s", "lat_n", "lon_w", "lon_e"} <= set(L.columns):
        LL = L.copy()
        for c in ("lat_s", "lat_n", "lon_w", "lon_e"):
            LL[c] = pd.to_numeric(LL[c], errors="coerce")
        LL["lo1"] = LL[["lon_w", "lon_e"]].min(axis=1); LL["lo2"] = LL[["lon_w", "lon_e"]].max(axis=1)
        LL["la1"] = LL[["lat_s", "lat_n"]].min(axis=1); LL["la2"] = LL[["lat_s", "lat_n"]].max(axis=1)
        box = LL.groupby("location").agg(lat_s=("la1", "min"), lat_n=("la2", "max"), lon_w=("lo1", "min"), lon_e=("lo2", "max"))
        tol = 0.05
        out = []
        inv = L[(pd.to_numeric(L.lon_w, errors="coerce") % 360 > pd.to_numeric(L.lon_e, errors="coerce") % 360)
                & ((pd.to_numeric(L.lon_w, errors="coerce") % 360) - (pd.to_numeric(L.lon_e, errors="coerce") % 360) < 180)]
        inv = inv[inv.lon_w.astype(str) != ""]
        if len(inv):
            rep.e("locations: lon_w is east of lon_e (box reversed) for " + ", ".join(
                f"{r.location} ({r.lon_w} > {r.lon_e})" for r in inv.drop_duplicates("location").itertuples()))
        inv_lat = L[pd.to_numeric(L.lat_s, errors="coerce") > pd.to_numeric(L.lat_n, errors="coerce")]
        if len(inv_lat):
            rep.e("locations: lat_s is north of lat_n for " + ", ".join(sorted(set(inv_lat.location))))
        for loc, g in s.groupby("location"):
            if loc not in box.index:
                continue
            b = box.loc[loc]
            la, lo = pd.to_numeric(g.lat, errors="coerce"), pd.to_numeric(g.lon, errors="coerce") % 360
            bad = (la < b.lat_s - tol) | (la > b.lat_n + tol) | (lo < b.lon_w % 360 - tol) | (lo > b.lon_e % 360 + tol)
            if bad.any():
                r = g[bad].iloc[0]
                out.append(f"{loc}: site {r.site} at {r.lat}/{r.lon} vs location box {b.lat_s}-{b.lat_n} / {b.lon_w}-{b.lon_e}")
        if out:
            rep.w("sites lie outside their location's lat/lon box (by > 0.05 deg): " + "; ".join(out[:6]))
    if s is not None and {"site", "dir_dec"} <= set(s.columns):
        keys = [c for c in ("site", "dir_comp_name", "dir_tilt_correction", "result_type") if c in s.columns]
        d = s[s.dir_dec != ""].duplicated(keys, keep=False)
        if d.any():
            rep.w(f"sites: {int(d.sum())} rows share site name, component and coordinate system but differ in results "
                  f"(e.g. {s[s.dir_dec != ''][d].site.iloc[0]}) — usually two distinct sites under one name")
    for t, df in tables.items():
        key = t[:-1] if t != "ages" else None
        if key and key in df and t != "measurements":
            if {"dir_comp", "dir_comp_name", "result_type", "dir_tilt_correction"} & set(df.columns):
                continue  # several result rows per name are legal (components, coordinate systems, averages)
            d = df[key][df[key].duplicated()]
            if len(d):
                rep.w(f"{t}: duplicate {key} names {', '.join(sorted(set(d))[:6])} — fine only if rows are distinct results")


def check_units(t, df, rep):
    def flag(col, cond, msg):
        if col in df:
            v = num(df[col])
            m = cond(v)
            if m.any():
                rep.e(f"{t}.{col}: {msg} — {rows(m, df, t[:-1] if t != 'ages' else 'site')}")
    for col in [c for c in df.columns if re.fullmatch(r"int_abs(_sigma)?", c)]:
        flag(col, lambda v: v > 0.01, "values > 0.01 T; MagIC wants tesla (40 uT = 4e-05)")
    flag("treat_ac_field", lambda v: v > 2, "values > 2 T; AF peak fields must be tesla (50 mT = 0.05)")
    flag("treat_dc_field", lambda v: v.abs() > 0.01, "values > 0.01 T; lab fields must be tesla (30 uT = 3e-05)")
    flag("magn_moment", lambda v: v.abs() > 1e-1, "moments > 0.1 Am^2; emu needs ×1e-3 to become Am^2")
    for col in ("vadm", "vdm", "vadm_sigma", "vdm_sigma", "pdm", "padm"):
        flag(col, lambda v: (v > 0) & (v < 1e15), "values look like ×10^22 or ZAm^2; MagIC wants Am^2 (8e22)")
    if "treat_temp" in df:
        v = num(df["treat_temp"])
        # low-temperature treatments (LN2 at 77 K, LT-LT-* codes) are legitimately below 273 K
        lowT = df["method_codes"].str.contains("LT-LT", na=False) if "method_codes" in df else pd.Series(False, index=df.index)
        m = (v > 0) & (v < 273) & ~lowT
        if m.any():
            rep.e(f"{t}.treat_temp: values below 273 K — temperatures look like °C; add 273 "
                  f"({rows(m, df, 'specimen')})")
        if (v == 0).any():
            rep.w(f"{t}.treat_temp: zero kelvin present; NRM/untreated steps are usually 273 K")
    for col in ("lat", "lat_n", "lat_s", "vgp_lat", "pole_lat", "dir_inc"):
        flag(col, lambda v: v.abs() > 90, "absolute values > 90°")
    for col in ("age_low", "age_high"):
        pass
    if {"age_low", "age_high"} <= set(df.columns):
        lo, hi = num(df["age_low"]), num(df["age_high"])
        m = lo > hi
        if m.any():
            rep.e(f"{t}: age_low > age_high in {rows(m, df, t[:-1])}")


def check_required_live(t, df, dm, rep):
    """Columns the current model marks plain required() (PmagPy's older copy may not know them)."""
    for col, spec in dm[t]["columns"].items():
        if "required()" not in (spec.get("validations") or []):
            continue
        if col not in df:
            rep.e(f"{t}: required column '{col}' is missing")
        elif (df[col] == "").any():
            rep.e(f"{t}.{col}: required but empty in {int((df[col] == '').sum())} rows")


DICT_ITEM = re.compile(r"^\s*([^\[\]]+?)\s*\[(https?://[^\]\s]+)\]\s*$")


def check_contribution(df, dm, vocab, rep):
    t = "contribution"
    drop = [c for c in df.columns if c in DOWNLOAD_ONLY]
    if drop:
        df = df.drop(columns=drop)
        rep.f(f"contribution: dropped {', '.join(drop)} — MagIC assigns these itself")
    if len(df) != 1:
        rep.e(f"contribution: must have exactly one row (has {len(df)})")
    if "reference" in df:
        ref = df.at[0, "reference"]
        m = re.match(r"^(?:https?://(?:dx\.)?doi\.org/|doi:\s*)(10\..+)$", ref, re.I)
        if m:
            df.at[0, "reference"] = m.group(1)
            rep.f(f"contribution.reference: '{ref}' → bare DOI '{m.group(1)}'")
        elif not re.match(r"^(10\.\d{4,9}/\S+|https?://\S+)$", ref):
            rep.e(f"contribution.reference: '{ref}' is neither a DOI nor a URL")
    if "lab_names" in df:
        labs = vocab.get("lab_names")
        for lab in [x.strip() for x in df.at[0, "lab_names"].split(":") if x.strip()]:
            if labs and lab not in labs:
                sug = difflib.get_close_matches(lab, labs, n=3, cutoff=0.4)
                rep.e(f"contribution.lab_names: '{lab}' is not in the MagIC lab_names vocabulary"
                      + (f" — closest: {' | '.join(sug)}" if sug else "")
                      + ". If the lab is genuinely missing, it has to be added to the vocabulary first.")
    for col in ("funding", "supplemental_links"):
        if col in df and df.at[0, col]:
            # items are "Name[url]" joined by ':'; split only after a closing bracket
            for item in [x for x in re.split(r"(?<=\]):", df.at[0, col]) if x.strip()]:
                m = DICT_ITEM.match(item)
                if not m:
                    rep.e(f"contribution.{col}: '{item}' should be 'Display name[https://url]'")
                elif ":" in m.group(1) and not m.group(1).startswith('"'):
                    rep.e(f"contribution.{col}: name '{m.group(1)}' contains ':' (MagIC's list delimiter) — "
                          'wrap the name in double quotes: "Collaborative Research: …"[https://…]')
    if "author" in df and df.at[0, "author"]:
        a = df.at[0, "author"]
        if not re.match(r"^(@\S+|\d{4}-\d{4}-\d{4}-\d{3}[\dX]|.+<[^@\s]+@[^>\s]+>)$", a):
            rep.w(f"contribution.author: '{a}' should be an @EarthRef handle, an ORCID (0000-0002-…), "
                  "or 'Name <email>'")
    if "description" not in df or not df.at[0, "description"]:
        rep.w("contribution.description: recommended — start with 'Created by Claude <model> using the "
              "magic-from-paper skill.' then one or two sentences on what the contribution holds")
    elif not re.match(r"^Created by Claude \S.* using the magic-from-paper skill\.", df.at[0, "description"]):
        rep.w("contribution.description: should begin 'Created by Claude <model and version> using the "
              "magic-from-paper skill.'")
    return df


def contribution_block(df, dm):
    cols = sorted(df.columns, key=lambda c: dm["contribution"]["columns"].get(c, {}).get("position", 99))
    vals = [str(df.at[0, c]).replace("\t", " ").replace("\n", " ") for c in cols]
    return "tab delimited\tcontribution\n" + "\t".join(cols) + "\n" + "\t".join(vals) + "\n>>>>>>>>>>\n"


def check_site_means(tables, rep):
    """Recompute site means from the specimens they list; mismatches usually mean a specimen the
    paper rejected is still flagged good, or the site table and specimen table come from different
    interpretations."""
    S, P, SA = tables.get("sites"), tables.get("specimens"), tables.get("samples")
    need_s = {"site", "dir_dec", "dir_inc", "dir_comp_name", "dir_tilt_correction"}
    need_p = {"specimen", "dir_dec", "dir_inc", "dir_comp", "dir_tilt_correction"}
    if S is None or P is None or not need_s <= set(S.columns) or not need_p <= set(P.columns):
        return
    from pmagpy import pmag
    P = P.copy()
    for c in ("dir_dec", "dir_inc", "dir_tilt_correction"):
        P[c] = pd.to_numeric(P[c], errors="coerce")
    if "result_quality" in P:
        P = P[P.result_quality != "b"]
    spec_site = {}
    if SA is not None and {"sample", "site"} <= set(SA.columns) and "sample" in P:
        s2 = dict(zip(SA["sample"], SA["site"]))
        spec_site = {sp: s2.get(sa) for sp, sa in zip(P.specimen, P["sample"])}
    bad, checked = [], 0
    for _, r in S[S.dir_dec != ""].iterrows():
        tc = pd.to_numeric(r.dir_tilt_correction, errors="coerce")
        names = [x for x in str(r.get("specimens", "")).split(":") if x] or \
                [sp for sp, si in spec_site.items() if si == r.site]
        g = P[P.specimen.isin(names) & (P.dir_comp == r.dir_comp_name) & (P.dir_tilt_correction == tc)].dropna(subset=["dir_dec"])
        if g.empty:
            continue
        checked += 1
        f = pmag.fisher_mean(g[["dir_dec", "dir_inc"]].values.tolist()) if len(g) > 1 else \
            {"dec": g.dir_dec.iloc[0], "inc": g.dir_inc.iloc[0], "n": 1}
        ang = pmag.angle([f["dec"], f["inc"]], [float(r.dir_dec), float(r.dir_inc)])[0]
        n_site = pd.to_numeric(r.get("dir_n_specimens", ""), errors="coerce")
        if ang > 1.0 or (pd.notna(n_site) and int(n_site) != f["n"]):
            far = g.assign(a=[pmag.angle([d, i], [f["dec"], f["inc"]])[0] for d, i in zip(g.dir_dec, g.dir_inc)])
            far = far.sort_values("a").iloc[-1]
            bad.append(f"{r.site}/{r.dir_comp_name}/tc{int(tc)}: specimens give {f['dec']:.1f}/{f['inc']:.1f} n {f['n']}, "
                       f"site row {r.dir_dec}/{r.dir_inc} n {r.get('dir_n_specimens', '?')} (off {ang:.1f} deg; most "
                       f"distant specimen {far.specimen} {far.dir_dec:.1f}/{far.dir_inc:.1f})")
    if bad:
        rep.w(f"sites: {len(bad)} of {checked} site rows don't match the mean of their good specimens — a rejected "
              f"specimen left flagged 'g', or a different interpretation. First: " + "; ".join(bad[:3]))
        rep.n("Site-mean mismatches:\n    " + "\n    ".join(bad))
    elif checked:
        rep.n(f"sites: all {checked} site means reproduce from their specimens")


def check_vgps(t, df, rep):
    """Recompute VGPs from site directions; a mismatch usually means a transcription slip."""
    need = {"dir_dec", "dir_inc", "lat", "lon", "vgp_lat", "vgp_lon"}
    if t != "sites" or not need <= set(df.columns):
        return
    from pmagpy import pmag
    import numpy as np
    bad = []
    for _, r in df.iterrows():
        try:
            d, i, la, lo, vla, vlo = (float(r[c]) for c in ("dir_dec", "dir_inc", "lat", "lon", "vgp_lat", "vgp_lon"))
        except ValueError:
            continue
        plon, plat, _, _ = pmag.dia_vgp(d, i, 0, la, lo)
        # angular distance between reported and recomputed pole; also accept the antipode
        a = np.radians([vla, vlo, plat, plon])
        cosang = np.sin(a[0]) * np.sin(a[2]) + np.cos(a[0]) * np.cos(a[2]) * np.cos(a[1] - a[3])
        ang = np.degrees(np.arccos(np.clip(cosang, -1, 1)))
        ang = min(ang, 180 - ang)
        if ang > 2:
            bad.append(f"{r.get('site','?')} (tc={r.get('dir_tilt_correction','?')}): reported {vla:g}/{vlo:g}, "
                       f"recomputed {plat:.1f}/{plon:.1f}, off by {ang:.1f}°")
    if bad:
        rep.w("sites: VGPs that don't match their direction and site location (check dec/inc/lat/lon, "
              "sign of longitude, or which tilt correction the VGP was computed from):\n    " + "\n    ".join(bad[:15]))
    else:
        rep.n("sites: every reported VGP agrees with its direction and location to within 2°")


# ---------------------------------------------------------------- PmagPy
def write_magic_tables(tables, tabdir):
    from pmagpy import pmag
    os.makedirs(tabdir, exist_ok=True)
    with contextlib.redirect_stdout(io.StringIO()):
        for t, df in tables.items():
            pmag.magic_write(os.path.join(tabdir, t + ".txt"), df, t, dataframe=True)


def pmagpy_validate(tabdir, rep, live_vocab=None):
    from pmagpy import contribution_builder as cb
    from pmagpy import validate_upload3 as val
    # PmagPy's Integer type check crashes on blank cells read back as NaN
    # (math.trunc(nan)); a blank optional cell is valid, so treat NaN as empty.
    import math
    if not getattr(val.test_type, "_nan_safe", False):
        _orig = val.test_type

        def _safe(value, value_type):
            if isinstance(value, float) and math.isnan(value):
                return None
            return _orig(value, value_type)
        _safe._nan_safe = True
        val.test_type = _safe
    log = io.StringIO()
    with contextlib.redirect_stdout(log), contextlib.redirect_stderr(log):
        con = cb.Contribution(tabdir, read_tables=[t for t in TABLE_ORDER
                                                   if os.path.exists(os.path.join(tabdir, t + ".txt"))])
        results = {}
        for t in list(con.tables):
            try:
                results[t] = val.validate_table(con, t, verbose=False, output_dir=tabdir)
            except Exception as ex:  # PmagPy can choke on unusual input; report, don't crash
                results[t] = ("crash", str(ex))
    for t, res in results.items():
        if not res:
            rep.n(f"PmagPy: {t} passed Data Model 3.0 validation")
            continue
        if res[0] == "crash":
            rep.w(f"PmagPy validation of {t} raised an error: {res[1]}")
            continue
        _, bad_rows, bad_cols, missing_cols, missing_groups, failing = res
        bad_cols, missing_cols, missing_groups = (list(x) if x is not None else [] for x in
                                                  (bad_cols, missing_cols, missing_groups))
        if missing_cols:
            rep.e(f"PmagPy: {t} is missing required columns: {', '.join(missing_cols)}")
        if missing_groups:
            rep.e(f"PmagPy: {t} needs at least one column from: {', '.join(missing_groups)}")
        errfile = os.path.join(tabdir, f"{t}_errors.txt")
        lines = []
        if os.path.exists(errfile) and os.path.getsize(errfile):
            with open(errfile) as fh:
                lines = [l.rstrip() for l in fh if l.strip()][1:]
        # PmagPy's vocabularies date from 2019; a value the live MagIC vocabulary
        # accepts is not an error (the MagIC server validates against the live list)
        real, stale = [], set()
        for l in lines:
            m = re.search(r'"(.+)" is not in controlled vocabulary for (\w+)', l)
            if m and live_vocab and m.group(2) in live_vocab and m.group(1) in live_vocab[m.group(2)]:
                stale.add(f"{m.group(1)} ({m.group(2)})")
            else:
                real.append(l)
        if stale:
            rep.n(f"PmagPy flagged {t} values missing from its 2019 vocabulary but present in the live MagIC "
                  f"vocabulary (accepted): {', '.join(sorted(stale))}")
        if real or (bad_cols and not lines):
            cols = sorted({l.split("\t")[3] for l in real if len(l.split("\t")) > 3} or set(bad_cols))
            rep.e(f"PmagPy: {t} has invalid values in: {', '.join(cols)}")
            rep.n(f"PmagPy row-level errors for {t} (first lines of {t}_errors.txt):\n    "
                  + "\n    ".join(real[:15]))
    return log.getvalue()


def assemble(tabdir, outdir, name, online, rep):
    from pmagpy import ipmag
    log = io.StringIO()
    with contextlib.redirect_stdout(log), contextlib.redirect_stderr(log):
        res = ipmag.upload_magic(dir_path=outdir, input_dir_path=tabdir, validate=online, verbose=True)
    m = re.search(r"Finished preparing upload file:\s*(\S+)", log.getvalue())
    path = m.group(1) if m else (res[0] if isinstance(res, tuple) else res)
    if not path or not os.path.exists(str(path)):
        rep.e("ipmag.upload_magic did not produce an upload file:\n" + log.getvalue()[-1500:])
        return None, log.getvalue()
    final = os.path.join(outdir, name) if name else path
    if name:
        shutil.move(path, final)
    if online:
        txt = log.getvalue()
        if "Couldn't connect" in txt:
            rep.w("MagIC public validation endpoint unreachable from here — validate by uploading to a private workspace")
        elif isinstance(res, tuple) and res and res[0] is False and len(res) > 2 and res[2]:
            rep.e(f"MagIC public endpoint reported problems: {str(res[2])[:2000]}")
        else:
            rep.n("MagIC public endpoint validation: no errors returned")
    return final, log.getvalue()


def online_check(path, rep):
    from pmagpy import ipmag
    log = io.StringIO()
    try:
        with contextlib.redirect_stdout(log), contextlib.redirect_stderr(log):
            res = ipmag.validate_with_public_endpoint(path, verbose=True)
    except Exception as ex:
        rep.w(f"MagIC public validation endpoint unreachable from here ({type(ex).__name__}) — "
              "validate by uploading to a private workspace")
        return
    if res.get("status"):
        rep.n("MagIC public endpoint validation: no errors returned")
    else:
        rep.e(f"MagIC public endpoint reported problems: {str(res.get('validation'))[:2000]}")


# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("workdir")
    ap.add_argument("--out", required=True)
    ap.add_argument("--name", help="file name for the upload file, e.g. Smith2024_MagIC.txt")
    ap.add_argument("--online", action="store_true", help="also validate on the MagIC public API")
    ap.add_argument("--offline-model", action="store_true",
                    help="use PmagPy's bundled data model instead of fetching the live one")
    a = ap.parse_args()

    try:
        import pmagpy  # noqa: F401
    except ImportError:
        sys.exit("PmagPy is required: pip install pmagpy --break-system-packages")
    os.environ.setdefault("MPLBACKEND", "Agg")
    from pmag_env import set_env
    if not a.online:
        set_env.OFFLINE = True  # use the data model bundled with PmagPy; no network wait

    model = load_model(offline=a.offline_model, quiet=False)
    dm = model["tables"]
    vocab = {k: {i["item"] for i in v["items"]} for k, v in model["cvs"].items()}
    codes = {c["code"] for c in model["codes"]}
    rep = Report()
    rep.n(f"Data model: {model['source']}, updated {model['updated_day']}")
    global STALE_MODEL
    STALE_MODEL = model["source"].startswith("PmagPy")
    if STALE_MODEL:
        rep.w("checked against PmagPy's older data model copy; the live model (github.com/earthref/MagIC) "
              "was unreachable, so lab_names and newer columns could not be fully checked")
    paths = find_tables(a.workdir)
    if not paths:
        sys.exit(f"No table files (locations.csv, sites.csv, …) found in {a.workdir}")
    tables = {}
    contribution = None
    if "contribution" in paths:
        contribution = read_table(paths.pop("contribution"))
        check_columns("contribution", contribution, dm, rep)
        contribution = check_contribution(contribution, dm, vocab, rep)
        check_required_live("contribution", contribution, dm, rep)
    else:
        rep.w("no contribution table — add contribution.csv with reference (DOI) and lab_names")
    for t, p in paths.items():
        df = normalize(t, read_table(p), rep)
        check_columns(t, df, dm, rep)
        check_codes(t, df, codes, rep)
        check_vocab(t, df, dm, vocab, rep)
        check_units(t, df, rep)
        check_vgps(t, df, rep)
        check_required_live(t, df, dm, rep)
        fix_integers(t, df, dm, rep)
        tables[t] = df
        rep.n(f"{t}: {len(df)} rows, {len(df.columns)} columns")
    check_links(tables, rep)
    check_site_means(tables, rep)

    os.makedirs(a.out, exist_ok=True)
    if a.name and os.path.exists(os.path.join(a.out, a.name)):
        os.remove(os.path.join(a.out, a.name))
    tabdir = os.path.join(a.out, "_magic_tables")
    if os.path.exists(tabdir):
        shutil.rmtree(tabdir)
    write_magic_tables(tables, tabdir)
    pm_log = pmagpy_validate(tabdir, rep, vocab)
    final, up_log = assemble(tabdir, a.out, a.name, a.online and contribution is None, rep)
    if final and contribution is not None:
        with open(final) as fh:
            body = fh.read()
        with open(final, "w") as fh:
            fh.write(contribution_block(contribution, dm) + body)
        if a.online:
            online_check(final, rep)

    lines = ["# MagIC upload validation report", ""]
    if final:
        lines += [f"Upload file: `{os.path.basename(final)}`", ""]
    lines += [f"**{len(rep.errors)} errors, {len(rep.warnings)} warnings, {len(rep.fixes)} automatic fixes**", ""]
    for title, items in (("Errors (must fix before upload)", rep.errors), ("Warnings (review)", rep.warnings),
                         ("Automatic fixes applied", rep.fixes), ("Notes", rep.notes)):
        if items:
            lines += [f"## {title}", ""] + [f"- {x}" for x in items] + [""]
    report = "\n".join(lines)
    with open(os.path.join(a.out, "validation_report.md"), "w") as fh:
        fh.write(report)
    with open(os.path.join(tabdir, "pmagpy_log.txt"), "w") as fh:
        fh.write(pm_log + "\n\n" + up_log)
    print(report)
    sys.exit(1 if rep.errors else 0)


if __name__ == "__main__":
    main()
