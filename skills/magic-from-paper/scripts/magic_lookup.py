#!/usr/bin/env python3
"""Look up MagIC Data Model 3.0 columns, controlled vocabularies and method codes.

Uses the live data model from the MagIC repository (cached a week), falling back
to PmagPy's bundled copy offline. Add --offline to force the PmagPy copy.

Examples
  python magic_lookup.py columns sites                 # every column in a table
  python magic_lookup.py columns contribution --required
  python magic_lookup.py column contribution funding   # full definition, with examples
  python magic_lookup.py search-columns "paleointensity"
  python magic_lookup.py vocab lithology basalt        # vocabulary items matching 'basalt'
  python magic_lookup.py labs "utrecht|scripps"        # lab_names vocabulary
  python magic_lookup.py vocab-for sites geologic_types
  python magic_lookup.py codes thellier                # method code search
  python magic_lookup.py codes --type lab_protocol
  python magic_lookup.py check-code LP-DIR-T:DE-BFL
  python magic_lookup.py source                        # which model version is in use
"""
import argparse
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from magic_model import load_model, column_cvs  # noqa: E402

M = None


def fmt_col(name, v):
    vals = ", ".join(v.get("validations") or [])
    return f"{name:32s} {v.get('type',''):10s} {v.get('unit',''):16s} {vals}\n    {v.get('description','')}"


def cmd_source(a):
    print(f"{M['source']}; data model updated {M['updated_day']}; "
          f"{len(M['codes'])} method codes; {len(M['cvs'])} vocabularies")


def cmd_columns(a):
    t = M["tables"][a.table]["columns"]
    items = sorted(t.items(), key=lambda kv: kv[1].get("position", 0))
    if a.required:
        items = [(k, v) for k, v in items if any(x.startswith(("required", "recommended"))
                                                  for x in (v.get("validations") or []))]
    group = None
    for k, v in items:
        if v.get("group") != group:
            group = v.get("group")
            print(f"\n## {group}")
        print(fmt_col(k, v))


def cmd_column(a):
    v = M["tables"][a.table]["columns"].get(a.column)
    if not v:
        sys.exit(f"No column '{a.column}' in {a.table}. Try: search-columns {a.column}")
    print(json.dumps({k: v[k] for k in v if k != "previous_columns"}, indent=2, ensure_ascii=False))


def cmd_search_columns(a):
    pat = re.compile(a.pattern, re.I)
    for tname, tbl in M["tables"].items():
        if a.table and tname != a.table:
            continue
        for k, v in tbl["columns"].items():
            if pat.search(k) or pat.search(v.get("description", "")) or pat.search(v.get("label", "")):
                print(f"{tname}.{k}  [{v.get('unit','')}]  {v.get('description','')}")


def cmd_vocab(a):
    cv = M["cvs"]
    if a.name not in cv:
        sys.exit(f"Unknown vocabulary '{a.name}'. Available: {', '.join(sorted(cv))}")
    items = cv[a.name]["items"]
    if a.pattern:
        pat = re.compile(a.pattern, re.I)
        items = [i for i in items if pat.search(i["item"]) or pat.search(i.get("label") or "")]
    for i in items:
        print(i["item"] + (f"  — {i['label']}" if i.get("label") else ""))


def cmd_labs(a):
    a.name = "lab_names"
    cmd_vocab(a)


def cmd_vocab_for(a):
    v = M["tables"][a.table]["columns"].get(a.column, {})
    cvs = column_cvs(v)
    print(", ".join(cvs) if cvs else f"{a.table}.{a.column} has no controlled vocabulary")


def cmd_codes(a):
    codes = M["codes"]
    if a.type:
        codes = [c for c in codes if c["type"] == a.type]
    if a.pattern:
        pat = re.compile(a.pattern, re.I)
        codes = [c for c in codes if pat.search(c["code"]) or pat.search(c["definition"])]
    if not a.type and not a.pattern:
        print("Method code types:", ", ".join(sorted({c["type"] for c in codes})))
        return
    for c in codes:
        print(f"{c['code']:16s} {c['type']:24s} {c['definition']}")


def cmd_check_code(a):
    known = {c["code"]: c for c in M["codes"]}
    bad = False
    for code in [x.strip() for x in a.codes.split(":") if x.strip()]:
        if code in known:
            print(f"OK   {code:16s} {known[code]['definition']}")
        else:
            bad = True
            near = [k for k in known if k.startswith(code.rsplit("-", 1)[0])][:8]
            print(f"BAD  {code:16s} not a MagIC method code" + (f"; similar: {', '.join(near)}" if near else ""))
    sys.exit(1 if bad else 0)


def main():
    global M
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--offline", action="store_true", help="use PmagPy's bundled data model")
    s = p.add_subparsers(dest="cmd", required=True)
    s.add_parser("source").set_defaults(f=cmd_source)
    x = s.add_parser("columns"); x.add_argument("table"); x.add_argument("--required", action="store_true"); x.set_defaults(f=cmd_columns)
    x = s.add_parser("column"); x.add_argument("table"); x.add_argument("column"); x.set_defaults(f=cmd_column)
    x = s.add_parser("search-columns"); x.add_argument("pattern"); x.add_argument("--table"); x.set_defaults(f=cmd_search_columns)
    x = s.add_parser("vocab"); x.add_argument("name"); x.add_argument("pattern", nargs="?"); x.set_defaults(f=cmd_vocab)
    x = s.add_parser("labs"); x.add_argument("pattern", nargs="?"); x.set_defaults(f=cmd_labs)
    x = s.add_parser("vocab-for"); x.add_argument("table"); x.add_argument("column"); x.set_defaults(f=cmd_vocab_for)
    x = s.add_parser("codes"); x.add_argument("pattern", nargs="?"); x.add_argument("--type"); x.set_defaults(f=cmd_codes)
    x = s.add_parser("check-code"); x.add_argument("codes"); x.set_defaults(f=cmd_check_code)
    a = p.parse_args()
    M = load_model(offline=a.offline, quiet=False)
    a.f(a)


if __name__ == "__main__":
    import signal
    signal.signal(signal.SIGPIPE, signal.SIG_DFL)
    main()
