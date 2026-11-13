"""Load the MagIC Data Model 3.0, controlled vocabularies and method codes.

Preferred source: the live files in the MagIC website repository on GitHub
(github.com/earthref/MagIC, branch main) — the same files the MagIC upload tool
validates against. They are JavaScript modules, parsed with json5 and cached as
JSON for a week in ~/.cache/magic-from-paper/.

Fallback: the copies bundled with PmagPy (older — e.g. they lack the
contribution table's `funding` column and the `lab_names` vocabulary).

    from magic_model import load_model
    m = load_model()            # m["tables"], m["cvs"], m["codes"], m["source"]
"""
import json
import os
import re
import sys
import time

RAW = "https://raw.githubusercontent.com/earthref/MagIC/main/"
FILES = {
    "model": "lib/configs/magic/data_models/3.0.js",
    "cvs": "lib/modules/er/controlled_vocabularies.js",
    "codes": "lib/configs/magic/method_codes.js",
}
CACHE = os.path.join(os.path.expanduser("~"), ".cache", "magic-from-paper")
MAX_AGE = 7 * 24 * 3600


def _js_object(text):
    """Return the parsed object literal from an `export const x = {...}` module."""
    import json5
    body = re.sub(r"^\s*/\*.*?\*/", "", text, flags=re.S)
    return json5.loads(body[body.index("{"):body.rindex("}") + 1])


def _fetch_live():
    try:
        import json5  # noqa: F401
    except ImportError:
        raise RuntimeError("json5 not installed (pip install json5 --break-system-packages)")
    import requests
    out = {}
    for key, path in FILES.items():
        r = requests.get(RAW + path, timeout=30)
        r.raise_for_status()
        out[key] = _js_object(r.text)
    return out


def _from_pmagpy():
    import pmagpy
    d = os.path.join(os.path.dirname(pmagpy.__file__), "data_model")

    def j(name):
        with open(os.path.join(d, name), encoding="utf-8-sig") as f:
            return json.load(f)
    from datetime import datetime

    def key(f):
        m = re.search(r"_(\w+?)_(\d+)_(\d{4})\.json", f)
        try:
            return datetime.strptime(" ".join(m.groups()), "%B %d %Y")
        except Exception:
            return datetime.min
    cvfile = max((f for f in os.listdir(d) if f.startswith("controlled_vocabularies_")), key=key)
    return {"model": j("data_model.json"), "cvs": j(cvfile), "codes": j("method_codes.json")}


def _normalize(raw, source):
    codes = []
    for ctype, block in raw["codes"].items():
        for c in block.get("codes", []):
            codes.append({"code": c["code"], "definition": c.get("definition") or "", "type": ctype})
    return {
        "tables": raw["model"]["tables"],
        "updated_day": raw["model"].get("updated_day", ""),
        "cvs": raw["cvs"],
        "codes": codes,
        "source": source,
    }


def load_model(offline=False, refresh=False, quiet=True):
    cache_file = os.path.join(CACHE, "magic_live.json")
    if not offline:
        fresh = os.path.exists(cache_file) and time.time() - os.path.getmtime(cache_file) < MAX_AGE
        if fresh and not refresh:
            with open(cache_file) as f:
                raw = json.load(f)
            return _normalize(raw, "live MagIC repo (cached)")
        try:
            raw = _fetch_live()
            os.makedirs(CACHE, exist_ok=True)
            with open(cache_file, "w") as f:
                json.dump(raw, f)
            return _normalize(raw, "live MagIC repo")
        except Exception as ex:
            if os.path.exists(cache_file):
                with open(cache_file) as f:
                    raw = json.load(f)
                if not quiet:
                    print(f"-W- live fetch failed ({ex}); using stale cache", file=sys.stderr)
                return _normalize(raw, "live MagIC repo (stale cache)")
            if not quiet:
                print(f"-W- live fetch failed ({ex}); using PmagPy's bundled copy", file=sys.stderr)
    return _normalize(_from_pmagpy(), "PmagPy bundled copy (older)")


def cv_items(model, name):
    return {i["item"] for i in model["cvs"].get(name, {}).get("items", [])}


def column_cvs(colspec):
    return [re.search(r'cv\("(.+?)"\)', x).group(1) for x in (colspec.get("validations") or [])
            if x.startswith("cv(")]
