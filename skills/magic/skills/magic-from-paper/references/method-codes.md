# Picking MagIC method codes

Method codes describe *how* each row's value was obtained. Every row in sites,
samples, specimens, measurements and ages needs at least one; locations need them
when there is no sites table. Codes in a cell are colon-delimited:
`LP-DIR-T:DE-BFL:SO-SUN`.

Never type a code from memory without checking it — the list is long and similar
codes differ by a letter. Search and verify with:

```bash
python scripts/magic_lookup.py codes thermal          # search code + definition
python scripts/magic_lookup.py codes --type lab_protocol
python scripts/magic_lookup.py check-code LP-DIR-T:DE-BFL:SO-SUN
```

## The families

| Prefix | Type | Describes | Typical table |
|---|---|---|---|
| FS- | field_sampling | how samples were collected | samples |
| SO- | sample_orientation | how they were oriented | samples |
| SP- | sample_preparation | subsampling, chemical prep | samples, specimens |
| LP- | lab_protocol | the experiment (demag, paleointensity, anisotropy, hysteresis…) | specimens, measurements, sites |
| LT- | lab_treatment | the treatment applied at one measurement step | measurements |
| DE- | direction_estimation | PCA lines/planes, Fisher means, etc. | specimens, sites, locations |
| IE- | intensity_estimation | how intensity results were derived | specimens, sites |
| DA- | data_adjustment | corrections applied (anisotropy, cooling rate, tilt, inclination shallowing) | specimens, sites |
| ST- | stability_tests | fold, reversal, baked-contact, conglomerate tests | sites, locations |
| GM- | geochronology_method | how the age was determined | sites, ages, locations |
| SC- | sample_characterization | microscopy, XRD and similar | specimens |
| AE- | anisotropy_estimation | how anisotropy tensors were computed | specimens |

## Common combinations (verify each before use)

**Thermal demagnetization, PCA line fits, sun-compass orientation**
- samples: `FS-FD:SO-SUN` (field drilling; SO-MAG for magnetic compass, SO-SM if both)
- specimens: `LP-DIR-T:DE-BFL` (DE-BFL-A if anchored to origin, DE-BFP for great circles)
- measurements: `LT-NO` for the NRM step, `LT-T-Z` for zero-field thermal steps
- sites: `LP-DIR-T:DE-BFL:DE-FM` (Fisher mean of specimen lines); add `DE-FM-LP`
  if planes were combined with lines (McFadden & McElhinny 1988)

**AF demagnetization** — swap in `LP-DIR-AF` (specimens/sites) and `LT-AF-Z`
(measurement steps).

**Thellier-type paleointensity (IZZI, pTRM checks, tail checks)**
- specimens: `LP-PI-TRM:LP-PI-BT-IZZI:LP-PI-ALT-PTRM:LP-PI-BT-MD` (choose the
  protocol code matching the paper: `LP-PI-TRM-ZI` Coe, `LP-PI-TRM-IZ` Aitken,
  `LP-PI-BT-IZZI` IZZI, `LP-PI-II` original Thellier)
- measurements: `LT-T-Z` (zero field), `LT-T-I` (in field), `LT-PTRM-I`
  (pTRM check), `LT-PTRM-MD` (tail check), `LT-NO` (NRM)
- corrections: `DA-AC-ATRM` / `DA-AC-AARM` (anisotropy), `DA-CR-TRM` (cooling rate)

**Microwave, Shaw, multi-specimen, pseudo-Thellier** — search `codes "^LP-PI-M"`,
`codes Shaw`, `codes "^LP-PI-MULT"`, `codes pseudo`.

**Ages**
- ⁴⁰Ar/³⁹Ar plateau / inverse isochron / normal isochron: `GM-ARAR-AP` / `GM-ARAR-II` / `GM-ARAR-NI`
- K–Ar: `GM-KAR`; U–Pb zircon: search `codes "^GM-UPB"`
- Radiocarbon calibrated: `GM-C14-CAL`; archaeological context: search `codes archae`
- Magnetostratigraphy / biostratigraphy correlation: search `codes strat`

**Stability tests** — search `codes "^ST-"`; e.g., fold test results on the
location row.

## Inferring codes (allowed, but flagged)

The skill runs in "infer where safe, flag it" mode. Inferring a code is safe when
the methods section states the procedure in words that map to exactly one code:
"stepwise thermal demagnetization up to 580 °C" → LP-DIR-T; "principal component
analysis (Kirschvink, 1980)" → DE-BFL; "Fisher statistics" → DE-FM.

It is *not* safe when the text is vague ("standard paleomagnetic methods") or
two codes fit equally well (anchored vs. free PCA fits when unstated). Then use
the broader parent code (DE-BFL rather than DE-BFL-A) and say so in the report,
or leave a coarser code like `LP-DIR` and flag it. Every inferred code goes in
the report's "Inferred values" section with the sentence that justified it.
