# Auditing MagIC files the authors already made

Data repositories (Zenodo, GitHub, the journal's supplement) often hold the
authors' own MagIC contribution, as a combined `magic_contribution_*.txt` or as
unpacked `measurements.txt`, `specimens.txt`, etc. Their measurement and
specimen data are the best source available, so reuse them. But a test against
an expert-built file (Fuentes et al., 2025) showed that structure, flags, ages
and links are often wrong even when the measurements are fine. Audit before
reusing.

## How to reuse

1. Read the tables with `pd.read_csv(path, sep="\t", header=1, dtype=str, keep_default_na=False)`.
2. Keep measurements and specimen interpretations as they are, except for the
   specific fixes below. Rebuild sites and locations from the paper's
   definitions and results.
3. Run `build_upload.py` on the authors' tables as they are first (copy them to a
   scratch folder). It flags most structural problems automatically:
   non-unique `sequence`, blank step numbers, blank required fields, mis-linked
   specimens, all-`t` polarity, duplicate site names with different results, and
   sites outside their location's coordinates.
4. List every fix in the report under "Corrections to source data".

## Checklist

**Links and names**
- Each specimen's `sample` matches the start of its name (WRF.76a → WRF.75a was a mis-link).
- No blank rows — a specimen row with only names and no `method_codes`/`citations`.
- Mixed naming conventions within one section (WP.1 and WP.24a) — check
  whether they're two sub-sections or field seasons and say which.

**Sites**
- Does the site definition match the paper? A whole stratigraphic section
  entered as one "site" contradicts both MagIC (a unit with a common age and
  magnetization) and papers that treat each sample level as a site.
- One site name used for two different groups of samples, with different statistics.
- `dir_polarity` set to `t` on every row — a default, not a result.
- Site coordinates rounded (0.1°) or different from the location's coordinates.
- No VGPs, no `height`, `dir_n_samples` copied from the specimen count.

**Ages**
- Compare every age with the paper's age model. Common errors: a maximum
  depositional age used as both bounds; ages from an earlier draft; `age_sigma`
  values that match nothing in the paper.
- One age applied to every component. A CRM or overprint is younger than the
  DRM it sits beside; give each component its own magnetization age.

**Samples**
- Lithology "Sandstone" (or another single value) on every sample when the
  stratigraphic logs show more. If measured sections are supplied, look up each
  sample's facies at its height.
- Missing `lat`/`lon`; only one orientation code (e.g. SO-CMD-NORTH) when the
  methods name the compass or orientation device.

**Measurements**
- `sequence` must be unique across the table; numbering restarted per
  specimen is the usual error (the builder renumbers it).
- **Stripped trailing zeros.** Files made with old PmagPy `upload_magic`
  (`str.strip(".0")`, PmagPy issue #848) have 10 → 1, 300 → 3 in integer
  columns: hundreds of `sequence`/`treat_step_num` values and none ending in 0
  (the builder warns). Restore each from the +1 progression within its
  specimen (x → x·10ⁿ when that equals the previous value + 1; check the first
  value against the next), fill blanks the same way, list specimens that still
  skip values, and report the count. If the authors' `sequence` is really a
  per-specimen or running step counter, move the restored values to
  `treat_step_num` and renumber `sequence` 1..N (Fuentes et al., 2025: 1,507
  values restored).
- `treat_step_num` blank on NRM steps (the builder fills it).
- `quality` flags: note how many steps are `b`.
- `instrument_codes` holding a name plus a date and time (e.g. `hargrave
  2017-08-30 13:03:03`, from the magnetometer file): move the time to
  `timestamp` as ISO 8601 (`2017-08-30T13:03:03`, no offset unless the lab's
  time zone is known), keep the name, check the times run in step order within
  each specimen, and report it. `timestamp` is the best record of measurement
  order, so fill it whenever the source has times. Anything else odd in
  `instrument_codes` — ask rather than change.

**Results vs the paper**
- Do the site means match the paper's site table? An author file can be
  internally consistent — site means reproduce from their listed specimens —
  yet disagree with the paper. Typically the site includes a specimen the paper
  rejected, still flagged `g`, with n one higher and α95 inflated. Run
  `compare_contributions.py` against a file built from the paper's tables; its
  leave-one-out column names the specimen. (Fairchild et al., 2017: 9 such
  sites, so the published pole statistics couldn't be reproduced from MagIC.)
- Specimens flagged `b` that the paper's means still include. Decide which to
  follow (usually the published selection, because that's the published
  result), and say so in the row's `description`.
- Missing location-level results: means, poles, Kent ellipses, flattening
  correction, field tests.

**Locations and ages**
- `lon_w`/`lon_e` (or `lat_s`/`lat_n`) swapped: read literally, the box wraps
  the globe. The builder flags it.
- No pole or mean rows: the paper's main results are missing.
- Ages: bracket bounds without the dates' uncertainties; site and location ages
  that disagree; ages that appear nowhere in the paper; new radiometric dates
  absent from the ages table.

**Measurements (more)**
- Missing `sequence` column (required).
- `treat_temp` 77 K on LN2 steps (`LT-LT-Z`) is correct, not °C.

**Contribution row**
- Missing `reference` (common when the file was made before publication),
  `funding` and `supplemental_links`.

## Notebooks and scripts

When the repository includes the analysis code, use it to reproduce each
published number from the specimen table: the site coordinates used for VGPs,
which sections or specimens were excluded, and which flattening factor was
applied where. If the code's output and the paper disagree, the code is usually
right about what was done and the paper about what was intended. Report the
difference.

Look for pandas aliasing bugs (`b = a` followed by `b[col] = ...` silently
changes `a`). They produce corrections applied twice and other numbers that
can't be reproduced.
