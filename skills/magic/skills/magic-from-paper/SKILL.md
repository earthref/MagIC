---
name: magic-from-paper
description: Turn a published paleomagnetic or rock-magnetic paper and its supplementary files into a MagIC (earthref.org/MagIC) Data Model 3.0 upload file, validated with PmagPy, plus a report of every inferred value and gap. Use whenever someone wants to get a paper's data into MagIC — "make a MagIC contribution from this paper", "convert these supplement tables to MagIC format", "build an upload file for this DOI", "put Smith et al. 2023 into MagIC" — even if they only attach a PDF and spreadsheet without naming MagIC tables, and also for archiving legacy or compiled paleomag/paleointensity/geochronology results in MagIC.
---

# Paper + supplement → MagIC upload file

The goal is a single tab-delimited MagIC 3.0 text file (tables separated by
`>>>>>>>>>>` lines) that drops straight into the MagIC upload tool, built only
from what the paper and supplement say, with every inference made visible.

Two outputs, always:
1. `<FirstAuthorYear>_MagIC.txt` — the upload file.
2. `<FirstAuthorYear>_MagIC_report.md` — sources, inferred values, gaps, and the
   validation result. This is what lets a data manager trust the file, so it
   matters as much as the file itself.

## Ground rules

- **Data come from the paper, not from you.** Numbers are transcribed or
  converted, never estimated. Don't digitize figures, don't back-calculate a
  missing statistic unless the paper gives everything needed and you say so.
- **Infer where safe, and flag it.** Fill a value the text pins down
  unambiguously (a method code from a clearly described procedure, a lithology
  from "basaltic lava flows", a location bounding box from site coordinates).
  Record each inference in the report with the sentence or table that justifies
  it. When two readings are plausible, use the coarser one and flag it, or leave
  it blank and list it as a gap.
- **Keep rejected data.** Sites/specimens the authors excluded go in with
  `result_quality` = `b` and a reason, not dropped.
- **SI units.** MagIC stores tesla, kelvin, Am². Papers use µT, mT, °C, emu.
  Convert deliberately; the builder catches the obvious misses.
- **Ages are magnetization ages.** The age on site and location rows is the
  authors' best estimate of when the magnetization was acquired, not the rock's
  age, whenever the two differ (secondary/remagnetized results, overprints).
  Rock ages go in the ages table. See "Ages" in `references/tables-and-columns.md`.

## Workflow

### 1. Set up

```bash
pip install pmagpy json5 --break-system-packages -q
mkdir -p work/tables work/out
```

The scripts live in this skill's `scripts/` folder; call them by full path.
They check against the live MagIC data model, vocabularies and method codes
from github.com/earthref/MagIC (cached for a week), and fall back to PmagPy's
older bundled copy when GitHub is unreachable — the report says which was used.

### 2. Read everything first

Read the whole paper (use the PDF-reading skill for PDFs), then every
supplement file. Before building anything, write down for yourself:

- citation: authors, year, title, journal, **DOI**
- for the contribution table: the lab(s) where measurements were made,
  grants in the acknowledgments/funding statement, the corresponding author's
  ORCID or email, and data repositories in the Data Availability statement
- the locations and how sites/samples/specimens are named
- the methods: sampling, orientation, demagnetization, fitting, paleointensity
  protocol and selection criteria, dating methods, corrections applied
- which tables/files hold which results, and at what level (location, site,
  sample, specimen, measurement)
- coordinate systems reported (geographic, tilt-corrected, both)
- units used in each table, and any stated multipliers in column headers (×10²², ×10⁻⁶)

Supplements in instrument formats (JR6, 2G, CIT, SIO, HUJI, LDEO, PMD, …)
should be converted with PmagPy, not hand-mapped — see `references/measurements.md`.

**When the supplement already contains MagIC files** (a data repository often
holds the authors' own `magic_contribution_*.txt` or unpacked tables), use them
as the source for samples, specimens and measurements — but audit them, don't
copy them. Authors' files routinely carry structural errors that the paper
doesn't. Read `references/auditing-author-files.md` before using them.
**Analysis notebooks or scripts** in the supplement are the best way to learn
exactly how each published number was computed (selection, coordinates,
corrections); read them.

### 3. Map sources to MagIC tables

Read `references/tables-and-columns.md` now. It has the hierarchy, the unit
conversions, the column names that paper headers usually correspond to, and how
to handle tilt-correction pairs, multiple components, means and poles.

**Sites follow the paper's own definition of a site.** In stratigraphic
studies that treat each sample level as a site (Sapienza et al., 2023 style),
MagIC sites are the sample levels (site name = sample name, with `height`), and
section or locality means are location rows — not one "site" per section.

Go only as deep as the data go: if the paper has site means and a pole, the
upload is locations + sites (+ ages). Build samples/specimens/measurements only
from real sample-, specimen- or step-level data.

For column names, vocabularies and method codes, use the lookup script instead
of memory — names and codes that look right often aren't:

```bash
S=<skill-dir>/scripts
python $S/magic_lookup.py columns sites --required
python $S/magic_lookup.py search-columns "alpha95"
python $S/magic_lookup.py vocab type "lava"          # geologic_types vocabulary
python $S/magic_lookup.py vocab lithology "basalt"
python $S/magic_lookup.py codes "thermal"            # method code search
python $S/magic_lookup.py check-code LP-DIR-T:DE-BFL
```

Method-code guidance and common combinations: `references/method-codes.md`.
For what a method, statistic or field test means (and the formula to check it),
see `references/paleomag-essentials.md`.

### 4. Build the tables as CSVs

Start with `contribution.csv` (one row: reference DOI, lab_names, funding,
author, supplemental_links, description — the description starts with
"Created by Claude <your model name and version> using the magic-from-paper skill."). Read `references/contribution.md`
for the formats — `lab_names` must match the MagIC vocabulary exactly, and
`funding`/`supplemental_links` use `Name[https://url]` items.

Then write one CSV per data table into `work/tables/` — `locations.csv`, `sites.csv`,
`samples.csv`, `specimens.csv`, `measurements.csv`, `ages.csv` — with MagIC
column names as headers. Do this with pandas reading the supplement files
directly (not by retyping numbers), so transcription errors can't creep in and
the conversions are explicit in code:

```python
import pandas as pd
raw = pd.read_excel("supp/TableS1.xlsx", header=2)
sites = pd.DataFrame({
    "site": raw["Site"], "location": "Laki", "lat": raw["Lat (°N)"], "lon": raw["Long (°E)"],
    "dir_dec": raw["D"], "dir_inc": raw["I"], "dir_k": raw["k"], "dir_alpha95": raw["α95"],
    "dir_n_samples": raw["N"], "dir_tilt_correction": 100,
    "int_abs": raw["B (µT)"] * 1e-6, "int_abs_sigma": raw["σB (µT)"] * 1e-6,
    "result_type": "i", "result_quality": "g", "citations": "This study",
    "method_codes": "LP-DIR-T:DE-BFL:DE-FM", ...
})
sites.to_csv("work/tables/sites.csv", index=False)
```

**Bedding not tabulated?** If the paper gives both in-situ and tilt-corrected
site directions, the bedding is determined by them. Recover it with
`python $S/infer_bedding.py directions.csv` (columns site, gdec, ginc, tdec,
tinc, optional group = structural domain). One attitude per domain should
reproduce every pair to < 0.2°; a site that doesn't fit had its own attitude
(the script refits it). Record the result as inferred. In a test this recovered
the authors' measured bedding to within 0.15°.

When results are only in PDF tables, extract them (pdfplumber or the
PDF-reading skill), save the extracted table to `work/extracted/` as CSV, and
build from that file; spot-check several rows against the PDF by eye, because
PDF extraction misaligns columns and drops minus signs.

As you go, keep a running list of inferred values and gaps for the report.

### 5. Build and validate

```bash
python $S/build_upload.py work/tables --out work/out --name Smith2023_MagIC.txt
```

It normalizes longitudes/declinations to 0–360, fills measurement bookkeeping
columns, checks the contribution row, column names, method codes, vocabularies,
parent links, unit plausibility and VGP consistency, runs PmagPy's Data Model 3.0 validation, and
writes the upload file plus `validation_report.md`. Add `--online` to also
validate on the MagIC public API when the network allows it (it is often
blocked in sandboxes; the script says so and carries on).

Fix every **error** and rerun until there are none. Read every **warning** and
either fix it or explain it in the report. A VGP mismatch warning is worth
chasing: it usually means a sign error, a lat/lon swap, or a VGP computed from
the other coordinate system. Vocabulary warnings may be false alarms because the
PmagPy copy of the vocabularies lags MagIC; say which ones in the report.

### 6. Cross-check against the paper

Recompute every location-level result you can (means, VGP poles, k, α95, n)
from your own site rows and put the comparison in the report. When a number
doesn't reproduce, find out why before choosing a value: the usual causes are
a selection difference (e.g. specimens flagged `b` that the paper still used),
different site coordinates, or an error in the paper (a correction applied
twice, a sign or label slip). Store the value you can defend, and put the
paper's value and the cause in that row's `description` and in the report's
"Errors in the paper" section.

Before handing over, compare the built tables with the paper:
- row counts per table match the number of sites/specimens the paper reports
  (accepted + rejected)
- a few values per table, chosen from the start, middle and end, match exactly
  after unit conversion
- location means/poles match the paper's text and abstract — recompute the
  pole from the site VGPs (see "Paleopoles" in `references/tables-and-columns.md`);
  an exact match confirms the site table
- every site has coordinates and an age

### 7. Write the report and deliver

Write `<FirstAuthorYear>_MagIC_report.md` with this structure:

```markdown
# MagIC upload: <short citation>
DOI: <doi>

## Contribution metadata
<reference, labs, funding, author, supplemental links — and for each, whether it was
stated in the paper or inferred (e.g. lab inferred from affiliation, award URL built
from the award number)>

## Contents
<table: MagIC table | rows | built from (paper table / supplement file)>

## Inferred values
<each inferred value or column: where it went, what it is, the quote or table that justifies it>

## Gaps
<information MagIC wants that the paper doesn't give, e.g. sample orientation method, site elevations>

## Corrections to source data   (only when reusing the authors' MagIC files)
<each fix: what was wrong, how it was fixed, whether any result changes>

## Errors in the paper   (only when found)
<value as printed | recomputed value | evidence>

## Unit conversions
<each conversion applied: column, from → to>

## Validation
<errors: 0; warnings and how each was handled; whether the online check ran>

## Next steps
<e.g. upload to a private workspace, set the reference DOI, ask authors for raw measurement files>
```

Deliver the upload file and the report (send both files). Summarize in a
couple of sentences: what's in the file, how many inferences and gaps to
review, and whether validation was clean.

### Comparing against an existing MagIC contribution

When asked to compare with a published or author-uploaded contribution, build
yours first without looking at it. Then run
`python $S/compare_contributions.py yours.txt theirs.txt --out data_comparison.md`.
It checks the two references match, compares table sizes and columns, matches
site rows on (site, component, tilt correction), and for each disagreeing site
runs a leave-one-out test on the other file's specimens. "Dropping specimen X
reproduces the paper exactly" means X was rejected in the paper but is still
flagged good in that file. Then **check that its `reference` DOI and
locations belong to the same paper** before comparing anything; a wrong file
is common. If it's the wrong one, say so and look for the right one (the paper's
Data Availability statement gives the contribution ID; data repositories often
include a copy). Don't treat the other file as ground truth. Report what it got
wrong (with evidence), what yours adds, and choices that differ, and run the
builder on the other file's tables to surface its structural errors.

## Reference files

- `references/contribution.md` — contribution row: reference, lab_names vocabulary,
  funding and supplemental-link formats, author. Read in step 4.
- `references/tables-and-columns.md` — hierarchy, units, paper-header → column map,
  tilt correction, components, means, poles, ages, citations. Read in step 3.
- `references/method-codes.md` — code families, common combinations, when an
  inferred code is safe. Read when assigning method codes.
- `references/measurements.md` — PmagPy lab-format converters and hand-mapping
  step data. Read only when the supplement has step-level data.
- `references/paleomag-essentials.md` — paleomagnetism reference condensed from
  Tauxe's *Essentials of Paleomagnetism* (web edition): orientation and tilt
  conventions, PCA, Fisher/Kent statistics, VGP/dp/dm/VADM formulas, field tests
  mapped to MagIC columns and codes, inclination shallowing, paleointensity
  statistics, pole quality. Read when interpreting a paper's methods or
  recomputing its numbers.
- `references/auditing-author-files.md` — checklist for MagIC files the authors
  already made (in a supplement or repository). Read before reusing them.
- `scripts/magic_lookup.py` — search columns, vocabularies (`labs` for lab names),
  method codes; `source` shows which model version is in use.
- `scripts/magic_model.py` — loader for the live model (used by both scripts).
- `scripts/infer_bedding.py` — recover bedding attitudes from paired in-situ and
  tilt-corrected directions.
- `scripts/compare_contributions.py` — table-by-table comparison of two MagIC
  files, with a leave-one-out test that finds specimens rejected in one but not the other.
- `scripts/build_upload.py` — checks, PmagPy validation, upload-file assembly.
