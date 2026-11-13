# Building the measurements table

Only build measurements when the paper or supplement actually contains step-level
data (demagnetization steps, Arai-plot steps, hysteresis loops). Plots alone are
not data — never digitize a Zijderveld diagram or Arai plot into measurements.

## 1. First check for raw lab files

Supplements often contain instrument files in a known lab format. If so, convert
them with PmagPy instead of hand-mapping — the converters already know the step
encodings and units:

```python
from pmagpy import convert_2_magic as c2m
# e.g. JR6, 2G binary/ASCII, CIT, HUJI, LDEO, PMD, Utrecht, SIO/generic, IODP SRM/JR6, TDT, BGC, Livdb, K15, KLY4S, SUFAR4, AGM/VFTB (hysteresis)
c2m.jr6_jr6("supp/AB01.jr6", dir_path="work/pmagpy", location="Site area", lat=..., lon=..., meth_code="LP-DIR-T")
c2m.generic(magfile="supp/data.txt", dir_path="work/pmagpy", experiment="Demag", labfield=0, location="...")
c2m.sio("supp/file.sio", dir_path="work/pmagpy", codelist="T", labfield=40, phi=0, theta=90)  # labfield in µT here
```

Function list: `_2g_bin _2g_asc agm bgc cit generic huji iodp_* irm jr6_jr6 jr6_txt
k15 kly4s ldeo livdb mini mst pmd sio s_magic sufar4 tdt utrecht vftb`. Read the
function's docstring (`help(c2m.<name>)`) for its sample/site naming convention
arguments — getting `samp_con`/`specnum` right is what makes the specimen names
match the paper.

Each converter writes MagIC 3.0 `measurements.txt` (plus stub specimens/samples/
sites/locations). Use its measurements, then reconcile its specimen names with
the specimens table you built from the paper; replace its stub upper tables with
yours (which carry the geology, coordinates and results). Save the reconciled
measurements as `work/tables/measurements.csv` (or copy the .txt — the builder
reads MagIC-format files too).

## 2. Hand-mapping spreadsheet step data

For a supplement spreadsheet of steps, one row per measurement step:

| Column | Content |
|---|---|
| `specimen` | must match specimens.specimen |
| `experiment` | groups the steps of one experiment: `<specimen>-<protocol code>` e.g. `AB01a-LP-DIR-T` |
| `method_codes` | the step treatment (LT-NO, LT-T-Z, LT-AF-Z, LT-T-I, LT-PTRM-I, LT-PTRM-MD) plus the protocol (LP-…) |
| `treat_temp` | K (NRM / room temperature = 273) |
| `treat_ac_field` | T (0 for thermal steps) |
| `treat_dc_field`, `treat_dc_field_phi`, `treat_dc_field_theta` | lab field in T and its direction, for in-field steps |
| `magn_moment` or `magn_volume` or `magn_mass` | use whichever the supplement gives; convert units |
| `dir_dec`, `dir_inc` | **specimen coordinates** — if the supplement only gives geographic coordinates, put them in and set `description` saying so, and flag it (MagIC measurement directions are expected in specimen coordinates) |
| `meas_temp` | measurement temperature in K, usually 293 or 273 if stated |
| `quality` | g, or b for steps the authors excluded as bad |
| `treat_step_num`, `sequence`, `measurement`, `standard` | builder fills these if absent |

For paleointensity, encode each step's type with the LT- code. If the supplement
uses a lab-specific step label (e.g., "450.1" / "450.2" for SIO-style zero-field
and in-field), decode it explicitly and say in the report how you decoded it.

Measurement tables get large; build them with pandas from the supplement file,
not by hand-typing rows.
