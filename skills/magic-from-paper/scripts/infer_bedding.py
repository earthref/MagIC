#!/usr/bin/env python3
"""Recover bedding (tilt-correction) attitudes from paired in-situ and tilt-corrected directions.

Papers often tabulate both geographic and tilt-corrected site means but not the bedding used.
The bedding that rotates every in-situ direction onto its tilt-corrected one is then fully
determined. Fit one attitude per group of sites (a structural domain), check the residuals, and
look at any site that doesn't fit: it usually had its own measured attitude.

Input CSV columns: site, gdec, ginc, tdec, tinc [, group]   (several rows per site are fine,
e.g. one per component). Output: best dip direction / dip per group, the misfit, and the sites
whose misfit exceeds --tol degrees, each refit on its own.

    python infer_bedding.py directions.csv [--tol 0.3]

Conventions: dip direction = azimuth of the dip (strike + 90), dip measured from horizontal,
tilt correction = rotation about strike that restores the bed to horizontal (same as pmag.dotilt).
"""
import argparse
import numpy as np
import pandas as pd


def xyz(dec, inc):
    d, i = np.radians(dec), np.radians(inc)
    return np.stack([np.cos(i) * np.cos(d), np.cos(i) * np.sin(d), np.sin(i)], -1)


def untilt(v, dip_dir, dip):
    """Rotate in-situ unit vectors (N, E, Down) to tilt-corrected for bedding dip_dir/dip."""
    s = np.radians(dip_dir + 90.0)               # strike + 180, so the rotation sense matches pmag.dotilt
    k = np.array([np.cos(s), np.sin(s), 0.0])
    K = np.array([[0, -k[2], k[1]], [k[2], 0, -k[0]], [-k[1], k[0], 0]])
    a = np.radians(dip)
    R = np.eye(3) + np.sin(a) * K + (1 - np.cos(a)) * K @ K
    return v @ R.T


def misfit(g, t, dd, dip):
    u = untilt(g, dd, dip)
    return np.degrees(np.arccos(np.clip((u * t).sum(1), -1, 1)))


def fit(df, stat=np.median):
    g, t = xyz(df.gdec.values, df.ginc.values), xyz(df.tdec.values, df.tinc.values)
    best = None
    for step, span_dd, span_dip in ((2.0, None, None), (0.25, 4.0, 3.0), (0.05, 0.5, 0.5)):
        if best is None:
            dds, dips = np.arange(0, 360, step), np.arange(0, 90.01, step)
        else:
            dds = np.arange(best[1] - span_dd, best[1] + span_dd + 1e-9, step) % 360
            dips = np.clip(np.arange(best[2] - span_dip, best[2] + span_dip + 1e-9, step), 0, 90)
        for dd in dds:
            for dip in dips:
                m = stat(misfit(g, t, dd, dip))
                if best is None or m < best[0]:
                    best = (m, dd, dip)
    res = misfit(g, t, best[1], best[2])
    return round(best[1] % 360, 2), round(best[2], 2), res


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("csv")
    ap.add_argument("--tol", type=float, default=0.3, help="misfit (deg) above which a site is reported and refit")
    a = ap.parse_args()
    df = pd.read_csv(a.csv)
    if "group" not in df:
        df["group"] = "all"
    for grp, d in df.groupby("group"):
        dd, dip, res = fit(d)
        d = d.assign(misfit=res)
        print(f"{grp}: bedding {dd}/{dip} (dip direction/dip) from {len(d)} rows; median misfit "
              f"{np.median(res):.2f} deg, max {res.max():.2f} deg")
        if d.site.nunique() == 1:
            print("   (one site only: a single direction pair leaves the attitude underdetermined by a degree or two)")
        bad = d.groupby("site").misfit.max()
        for site in bad[bad > a.tol].index:
            sd = d[d.site == site]
            dd2, dip2, res2 = fit(sd, stat=np.max)
            note = "" if len(sd) > 1 else " (single direction: refit is underdetermined)"
            print(f"   {site}: misfit {bad[site]:.2f} deg with the group bedding; on its own {dd2}/{dip2}, "
                  f"misfit {res2.max():.2f}{note}")


if __name__ == "__main__":
    main()
