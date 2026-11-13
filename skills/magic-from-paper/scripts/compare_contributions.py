#!/usr/bin/env python3
"""Compare two MagIC contributions table by table (e.g. a skill-built file vs the authors' upload).

    python compare_contributions.py MINE.txt OTHER.txt [--out comparison_data.md]

Reports:
  * the reference DOI of each (check they are the same paper before reading anything else)
  * row and column counts per table, and columns only one side has
  * site rows matched on (site, component name, tilt correction): numeric differences per column
  * for site rows that disagree, a leave-one-out test against OTHER's specimens: if dropping one
    specimen from OTHER's site mean reproduces MINE exactly, that specimen is almost certainly one
    the paper rejected but OTHER still flags as good
  * location results (poles / means) present on each side

Both files are complete MagIC text files (tables separated by >>>>>>>>>>).
"""
import argparse
import io
import sys

import numpy as np
import pandas as pd


def read_magic(path):
    out = {}
    for block in open(path, encoding="utf-8-sig").read().split(">>>>>>>>>>"):
        block = block.strip("\n")
        if not block.strip():
            continue
        first, rest = block.split("\n", 1)
        out[first.split("\t")[1].strip()] = pd.read_csv(io.StringIO(rest), sep="\t", dtype=str, keep_default_na=False)
    return out


num = lambda s: pd.to_numeric(s, errors="coerce")


def angle(d1, i1, d2, i2):
    a = np.radians
    c = np.sin(a(i1)) * np.sin(a(i2)) + np.cos(a(i1)) * np.cos(a(i2)) * np.cos(a(d1) - a(d2))
    return np.degrees(np.arccos(np.clip(c, -1, 1)))


def fisher(dec, inc):
    d, i = np.radians(dec), np.radians(inc)
    x = np.stack([np.cos(i) * np.cos(d), np.cos(i) * np.sin(d), np.sin(i)], 1)
    s = x.sum(0); r = np.linalg.norm(s); n = len(x)
    m = s / r
    k = (n - 1) / (n - r) if n > r else np.inf
    a95 = np.degrees(np.arccos(1 - (n - r) / r * (20 ** (1 / (n - 1)) - 1))) if n > 1 else np.nan
    return np.degrees(np.arctan2(m[1], m[0])) % 360, np.degrees(np.arcsin(m[2])), a95, n


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("mine"); ap.add_argument("other"); ap.add_argument("--out")
    a = ap.parse_args()
    M, O = read_magic(a.mine), read_magic(a.other)
    L = []
    p = L.append
    ref = lambda d: d.get("contribution", pd.DataFrame()).get("reference", pd.Series([""])).iloc[0]
    p(f"# Data comparison\n\nmine: `{a.mine}` (reference {ref(M)})  \nother: `{a.other}` (reference {ref(O)})\n")
    if ref(M).strip("/ ").lower() != ref(O).strip("/ ").lower():
        p("**WARNING: the references differ — check these are the same paper.**\n")
    p("## Tables\n\n| table | mine | other | columns only in mine | columns only in other |\n|---|---|---|---|---|")
    for t in sorted(set(M) | set(O)):
        m, o = M.get(t), O.get(t)
        sz = lambda d: "—" if d is None else f"{len(d)} × {len(d.columns)}"
        om = sorted(set(m.columns) - set(o.columns)) if m is not None and o is not None else []
        oo = sorted(set(o.columns) - set(m.columns)) if m is not None and o is not None else []
        p(f"| {t} | {sz(m)} | {sz(o)} | {', '.join(om[:8])}{' …' if len(om) > 8 else ''} | {', '.join(oo[:8])}{' …' if len(oo) > 8 else ''} |")

    ms, os_ = M.get("sites"), O.get("sites")
    if ms is not None and os_ is not None and "dir_dec" in ms and "dir_dec" in os_:
        key = ["site", "dir_comp_name", "dir_tilt_correction"]
        for d in (ms, os_):
            d["dir_tilt_correction"] = num(d.get("dir_tilt_correction", "")).round(0)
        j = ms[ms.dir_dec != ""].merge(os_[os_.dir_dec != ""], on=key, suffixes=("_m", "_o"))
        p(f"\n## Site rows\n\nMatched {len(j)} rows on (site, component, tilt correction); mine has "
          f"{(ms.dir_dec != '').sum()}, other has {(os_.dir_dec != '').sum()}.\n")
        p("| column | compared | max abs diff | rows differing |\n|---|---|---|---|")
        tol = {"lat": 1e-3, "lon": 1e-3, "dir_k": 1.5}
        for c in ("lat", "lon", "dir_dec", "dir_inc", "dir_alpha95", "dir_k", "dir_n_specimens", "dir_n_samples",
                  "vgp_lat", "vgp_lon", "vgp_dp", "vgp_dm", "age", "age_low", "age_high"):
            if c + "_m" not in j or c + "_o" not in j:
                continue
            x, y = num(j[c + "_m"]), num(j[c + "_o"])
            if c == "lon":
                x, y = x % 360, y % 360
            both = x.notna() & y.notna()
            d = (x - y).abs()[both]
            p(f"| {c} | {int(both.sum())} | {round(float(d.max()), 4) if len(d) else '—'} | {int((d > tol.get(c, 0.11)).sum())} |")
        j["ang"] = angle(num(j.dir_dec_m), num(j.dir_inc_m), num(j.dir_dec_o), num(j.dir_inc_o))
        diff = j[(j.ang > 0.5) | (num(j.get("dir_n_specimens_m", "")) != num(j.get("dir_n_specimens_o", "")))]
        sp = O.get("specimens")
        if len(diff):
            p(f"\n### {len(diff)} site rows that disagree (direction > 0.5 deg or different n)\n")
            p("| site | comp | tc | mine | other | angle | leave-one-out on other's specimens |\n|---|---|---|---|---|---|---|")
            for _, r in diff.iterrows():
                loo = ""
                if sp is not None and {"specimen", "dir_comp", "dir_dec", "dir_inc", "dir_tilt_correction"} <= set(sp.columns):
                    names = [x for x in str(r.get("specimens_o", r.get("specimens", ""))).split(":") if x]
                    g = sp[sp.specimen.isin(names) & (sp.dir_comp == r.dir_comp_name)
                           & (num(sp.dir_tilt_correction).round(0) == r.dir_tilt_correction)]
                    g = g[num(g.dir_dec).notna()]
                    if len(g) > 2:
                        best = None
                        for idx in g.index:
                            rest = g.drop(idx)
                            dd, ii, a95, n = fisher(num(rest.dir_dec).values, num(rest.dir_inc).values)
                            ang = angle(dd, ii, float(r.dir_dec_m), float(r.dir_inc_m))
                            if best is None or ang < best[0]:
                                best = (ang, g.loc[idx, "specimen"], g.loc[idx, "dir_dec"], g.loc[idx, "dir_inc"],
                                        g.loc[idx].get("result_quality", "?"), n, a95)
                        if best and best[0] < 0.15:
                            loo = (f"dropping **{best[1]}** ({best[2]}/{best[3]}, flagged '{best[4]}') reproduces mine "
                                   f"(n {best[5]}, a95 {best[6]:.1f})")
                p(f"| {r.site} | {r.dir_comp_name} | {int(r.dir_tilt_correction)} | {r.dir_dec_m}/{r.dir_inc_m} "
                  f"n {r.get('dir_n_specimens_m', '')} | {r.dir_dec_o}/{r.dir_inc_o} n {r.get('dir_n_specimens_o', '')} "
                  f"| {r.ang:.2f} | {loo} |")
        only_m = sorted(set(ms.site) - set(os_.site)); only_o = sorted(set(os_.site) - set(ms.site))
        if only_m or only_o:
            p(f"\nSites only in mine: {', '.join(only_m[:20]) or '—'}  \nSites only in other: {', '.join(only_o[:20]) or '—'}")

    for lab, D in (("mine", M), ("other", O)):
        Lc = D.get("locations")
        if Lc is None:
            continue
        res = Lc[[c for c in ("location", "result_name", "pole_lat", "pole_lon", "pole_alpha95", "dir_dec", "dir_inc") if c in Lc]]
        p(f"\n## Location rows in {lab} ({len(Lc)})\n")
        p(res.to_markdown(index=False) if hasattr(res, "to_markdown") else res.to_string(index=False))

    text = "\n".join(L)
    if a.out:
        open(a.out, "w").write(text)
    print(text)


if __name__ == "__main__":
    main()
