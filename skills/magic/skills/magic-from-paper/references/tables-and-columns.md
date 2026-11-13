# MagIC 3.0 tables and columns — what goes where

Read this before building the tables. For any column not listed here, look it up
(`scripts/magic_lookup.py search-columns <word>` or `column <table> <name>`) rather
than guessing a name: an invented column fails validation.

## Contents
1. The hierarchy and naming (the contribution table is in `contribution.md`)
2. Units — the conversions papers almost always need
3. Table by table: core columns and where they usually come from in a paper
4. Recurring situations (tilt correction, multiple components, averages, poles, ages)
5. Values that go in every row

---

## 1. Hierarchy and naming

```
locations  ─┐   a study area, section, core or region (a paper often has 1–5)
  sites     │   a unit sampled at one place and time: a lava flow, a dike, a stratigraphic level
    samples │   a core, hand sample or archaeological object
      specimens   a piece measured in the lab
        measurements   one step of one experiment on one specimen
ages        an age attached to a location, site, sample or specimen (optional table)
```

Each child row names its parent: `sites.location`, `samples.site`,
`specimens.sample`, `measurements.specimen`. Every name used as a parent must
exist as a row in the parent table — the builder checks this.

**Names:** use the paper's own labels verbatim (site "PV12", sample "PV12-3",
specimen "PV12-3a"). Don't invent a scheme. When the paper only reports sites,
it is legitimate to stop at sites; don't fabricate samples or specimens to fill
the hierarchy.

When the paper reports specimen-level results but no sample names, and
specimens obviously have one specimen per sample, create a samples row with
the same name as the specimen and note this in the report.

## 2. Units — MagIC stores SI

The single most common error in hand-built uploads. The builder catches the
obvious cases, but convert deliberately:

| Quantity | Paper usually gives | MagIC wants | Conversion |
|---|---|---|---|
| Paleointensity `int_abs`, lab field `treat_dc_field` | µT | T | × 1e-6 |
| AF peak field `treat_ac_field`, AF `meas_step_min/max` | mT | T | × 1e-3 |
| Temperature `treat_temp`, `meas_temp`, thermal `meas_step_*` | °C | K | + 273 (MagIC convention uses 273, not 273.15) |
| Room-temperature / NRM step | "NRM", 0, 20 °C | 273 K | NRM step: `treat_temp`=273, `treat_ac_field`=0 |
| Moment `magn_moment` | emu | Am² | × 1e-3 |
| Volume magnetization `magn_volume` | A/m (or emu/cm³) | A/m | emu/cm³ × 1e3 |
| Mass magnetization `magn_mass` | Am²/kg (or emu/g) | Am²/kg | emu/g × 1 |
| VADM / VDM | ×10²² Am² or ZAm² | Am² | × 1e22 / × 1e21 |
| Susceptibility (volume) | SI or ×10⁻⁶ SI | SI | apply the stated multiplier |
| Specimen volume / weight | cm³ / g | m³ / kg | × 1e-6 / × 1e-3 |
| Longitude, declination | −180…180 | 0…360 | builder converts automatically |
| Ages | as stated | as stated + `age_unit` | pick from `age_unit` vocabulary: Ma, ka, Ga, Years BP, Years AD (+/-), Years Cal BP, … |

For thermal experiments the step unit in `meas_step_unit` is `K`; for AF it is `T`.

## 3. Table by table

### locations
Required: `location`, `location_type` (vocab: Outcrop, Region, Stratigraphic
Section, Drill Site, Lake Core, Archeological Site, …), `geologic_classes`,
`lithologies`, `lat_s`, `lat_n`, `lon_w`, `lon_e`, and an age (`age` or
`age_low`+`age_high`, with `age_unit`).

- Name: use the geographic area the paper uses for the study region (e.g. "Zalawt
  plain"), not a unit or result name — the result gets its own name in
  `result_name`. One location can hold several rows: one describing the area,
  and one per location-level result such as a pole.
- Bounding box: take it from the min/max of the site coordinates if the paper
  gives none. For a single-site location, lat_s = lat_n and lon_w = lon_e.
- List columns (`geologic_classes`, `lithologies`, `method_codes`, `citations`)
  are colon-delimited: `Extrusive:Intrusive`.
- Location-level results — mean directions (`dir_dec`, `dir_inc`,
  `dir_alpha95`, `dir_k`, `dir_n_sites`), paleopoles (`pole_lat`, `pole_lon`,
  `pole_alpha95`/`pole_dp`/`pole_dm`, `pole_k`, `pole_n_sites`), and
  `result_type` = `a`.

### sites
Required: `site`, `location`, `method_codes`, `citations`, `geologic_classes`,
`geologic_types`, `lithologies`, `lat`, `lon`, age, `age_unit`.

Results, typically from the paper's main results table:

| Paper header | MagIC column |
|---|---|
| D, Dec | `dir_dec` |
| I, Inc | `dir_inc` |
| α95, a95 | `dir_alpha95` |
| k, κ | `dir_k` |
| R | `dir_r` |
| N (samples) / n (specimens) | `dir_n_samples` / `dir_n_specimens` (read the caption — papers differ) |
| lines / planes used | `dir_n_specimens_lines`, `dir_n_specimens_planes` |
| VGP lat / lon | `vgp_lat`, `vgp_lon` |
| dp / dm | `vgp_dp`, `vgp_dm` |
| A95 of VGP | `vgp_alpha95` |
| Polarity N/R/T | `dir_polarity` (n, r, t, e, i) — `t` means transitional, not "unknown"; for Precambrian data follow the polarity convention the paper's poles use (e.g. Keweenawan normal) and flag it |
| Paleointensity ± | `int_abs`, `int_abs_sigma` (T), `int_n_specimens` |
| VADM ± | `vadm`, `vadm_sigma` (Am²) |
| Bedding strike/dip | `bed_dip_direction` (= strike + 90 under right-hand rule), `bed_dip` |

**Compute VGPs when the paper doesn't tabulate them.** If a site row has a
direction and coordinates, its VGP is deterministic: compute `vgp_lat`,
`vgp_lon` (and `vgp_dp`, `vgp_dm` when α95 is given) with
`pmagpy.pmag.dia_vgp(dec, inc, a95, lat, lon)` for every coordinate system you
include, and list it as a computed value in the report. Then check the paper's
pole by averaging the VGPs (next section) — an exact match confirms the whole
site table.

**Dike, sill or other feature orientations** go in `feature_type` (vocabulary:
Dike, Sill, Lineation), `feature_dip_direction` and `feature_dip`. From a pole
to the plane: dip direction = pole trend + 180°, dip = 90° − pole plunge.
Widths and other descriptive measurements go in `description`.

Also set `result_type` = `i` for an individual site result and
`result_quality` = `g` unless the paper rejects the site (then `b`, and keep the
row — rejected data are still data; say why in `description`).

`geologic_types` uses the `type` vocabulary (Lava Flow, Volcanic Dike, Volcanic
Pillow, Intrusion, Sediment Layer, Archeological Kiln, …); check with
`magic_lookup.py vocab type <word>`.

### samples
Required: `sample`, `site`, `method_codes`, `citations`,
`geologic_classes`/`geologic_types`/`lithologies` (natural samples), `lat`, `lon`.

Orientation data, when given: `azimuth`, `dip` (of the sample X axis — check the
paper's convention; plunge = −dip for many orientation systems), `bed_dip`,
`bed_dip_direction`. Method codes describe field sampling (FS-) and orientation (SO-).

### specimens
Required: `specimen`, `sample`, `method_codes`, `citations`, plus geology columns.

Directional result per component: `dir_dec`, `dir_inc`, `dir_mad_free`
(or `dir_alpha95` for a Fisher mean), `dir_n_measurements`, `meas_step_min`,
`meas_step_max`, `meas_step_unit`, `dir_comp` (component name, e.g. "LT", "HT",
"A"), `dir_tilt_correction`, and the fit type in method codes (DE-BFL for lines,
DE-BFP for planes, DE-BFL-A anchored).

Paleointensity result: `int_abs`, `int_abs_sigma`, `int_n_measurements`,
`int_b`, `int_frac`, `int_f`, `int_q`, `int_gmax`, `int_mad_free`, `int_dang`,
`int_drats`, `int_corr` (anisotropy/cooling-rate flags), plus `meas_step_min/max`.
For the SPD statistics names, run `magic_lookup.py search-columns "Arai"`.

Rock magnetism (hysteresis, etc.): `hyst_ms_mass`, `hyst_mr_mass`, `hyst_bc`,
`hyst_bcr`, `rem_bcr`, `critical_temp`, `critical_temp_type`, … — look these up.

### Ages: use the magnetization age

The `age`/`age_low`/`age_high` on every site and location row is the **age of
the magnetization** the row reports — the authors' best estimate of when it was
acquired. For a primary magnetization that is the rock age; for a secondary,
remagnetized or overprint result it is the remagnetization age, even when the
rock is much older.

- Take the authors' own stated estimate: e.g. "acquired in the mid- to Late
  Cretaceous, no older than ~100 Ma and perhaps as young as ~81 Ma" →
  `age_low` 81, `age_high` 100, `age_unit` Ma. Prefer the text's interpreted
  magnetization age over a broad unit-age range in a table; quote the sentence
  in the report.
- If the paper gives only a qualitative magnetization age ("Late Cretaceous"),
  convert it with a standard timescale (state which, e.g. GTS2020) and flag it.
- If the authors don't commit to a magnetization age, use the rock age and flag
  that the magnetization may be younger.
- **Each component gets its own age.** Rows are per component, so give each its
  own magnetization age. Typical red-bed case: a primary DRM row carries the
  depositional age; a CRM row runs from the depositional bound down to the
  youngest constraint the paper gives (e.g. "acquired before tilting at
  1049 ± 13 Ma" → `age_low` 1036), with no nominal `age` if none is stated.
- A **maximum depositional age** (e.g. youngest detrital zircon) is an upper
  bound only. Never use it as both `age_low` and `age_high`.
- When the paper uses an **age model** (e.g. SubsidenceChron, Chron.jl), take
  each section's age and credible interval from the paper, or from the
  supplement's model outputs if the paper only plots them, and flag the latter.
- Mention the rock age in the row's `description` when it differs, and put
  site-specific radiometric rock ages in the ages table.

- **Bounds carry the uncertainty.** When an age is bracketed by dated units,
  use each date ± its 2σ (e.g. "between 1084.35 ± 0.20 and 1083.52 ± 0.23 Ma" →
  `age_low` 1083.29, `age_high` 1084.55), not the central values. When the
  paper gives only one bound ("< 1091.61 Ma"), take the other from the
  strongest constraint the paper itself states (e.g. its youngest dated unit),
  and flag it.

### ages table
Use it when the paper reports radiometric or other ages attached to particular
sites/samples, especially with their own method and uncertainty: `site` (or
`location`/`sample`), `age`, `age_sigma`, `age_unit`, `method_codes` (GM- codes,
e.g. GM-ARAR-AP, GM-C14-CAL), `citations` (DOI of the dating paper if different).
`age_sigma` is **one sigma**: halve a 2σ uncertainty and keep the paper's
"± X (2σ)" wording in `description`. These are typically rock
(crystallization, deposition) ages. Still put the
magnetization age on every site row — the ages table adds detail, it doesn't
replace it.

**New radiometric dates are results; record them as such.** For each dated
sample, make a site row (coordinates, lithology, unit, `method_codes` GM-…, `age`,
`age_sigma`) and an ages row. Put every uncertainty the paper quotes (e.g. the
X/Y/Z of CA-ID-TIMS dates), MSWD, n and the laboratory in `description`. Dated
localities without paleomagnetic data still get a location row. Rows of
GM-INT bracket ages copied onto every site are not a substitute for the dates.

## 4. Recurring situations

**Geographic and tilt-corrected results.** One row per coordinate system, same
site name: `dir_tilt_correction` = 0 (geographic), 100 (fully tilt corrected),
−1 (specimen coordinates), or a percentage for partial unfolding. Duplicate
site names are legal here.

**Several components per specimen or site.** One row per component, distinguished
by `dir_comp`, with its own `meas_step_*`.

**Directions and intensities at the same site.** Put them in one row when they are
both site-level results for the same unit; use separate rows only when the paper
reports them as distinct results (different specimen sets, different criteria).

**Averages of sites** (e.g., a group of flows averaged as one cooling unit, a
formation mean): a sites row with `result_type` = `a` naming the averaged sites in
`sites` is possible, but location-level means belong in **locations**.

**Stratigraphic sections.** When the paper treats each sample level as a site,
make site = sample level (site name = sample name) with `height`, `bed_dip` and
`bed_dip_direction`, and one row per component × coordinate system. Locations
are the sections or localities, and section means are location rows. If
measured sections are supplied (thickness/facies logs), take each sample's
lithology from the facies at its height (silt → Siltstone, sandstone grades →
Sandstone, conglomerate → Conglomerate), and say so in the sample's
`description`.

**Paleopoles.** Location row with `pole_lat`, `pole_lon`, `pole_alpha95` (or
dp/dm), `pole_k`, `pole_n_sites`, `result_type` = `a`, `result_name` (the
paper's name for the pole), method codes for the averaging (DE-VGP for a mean of
VGPs, DE-FM for Fisher, DE-FM-UV for unit-vector). Also fill when you can:
`paleolat`/`paleolat_sigma` if given; `pole_comp_name` (which component, e.g.
"tilt-corrected magnetite component"); `pole_reversed_perc` from the site
polarities; `pole_r` if computed; `plate_blocks` when the plate is obvious
(vocabulary `plate_block`); field tests in `reversal_test`, `conglomerate_test`,
`contact_test`, `fold_test` with their ST- codes; and the location mean direction.

*Kent or other elliptical confidence regions* go in `pole_conf` as six
colon-separated numbers: major-axis dec:inc:half-angle, then minor-axis
dec:inc:half-angle (e.g. `262.5:45.7:2.8:75.3:44.0:2.4`). Leave `pole_alpha95`
blank in that case.

*Inclination-shallowing corrections:* put the corrected mean in
`dir_dec`/`dir_inc`, the flattening factor and its range in
`pole_flattening`, `pole_flat_low`, `pole_flat_high`, the inclinations at the
two bounds in `dir_inc_flat_low`/`dir_inc_flat_high`, and the method code
(DA-DIR-FLAT-SVEI for SVEI, DA-DIR-FLAT-EI for E/I). Keep an uncorrected row
alongside, so both are searchable.

*Field tests* go on the row they test, with their codes:
`fold_test` (ST-F-5 for the Tauxe & Watson bootstrap), `conglomerate_test`
(ST-G-IF intraformational), `contact_test` (ST-C), `reversal_test` (ST-R-…).
A test of the whole formation can sit on its own formation-wide location row.
When a component passes and another fails (common for DRM vs CRM), record each
result on that component's row.

*Poles that combine this study's sites with another study's* (common: "our
40 flows plus 10 from Tauxe & Kodama, 2009"): put the published pole on a
location row with `pole_n_sites` = the full N, `citations` = "This study" plus
the other study's DOI, and say in `description` which sites came from where
(with the other study's MagIC contribution if known). List only this
contribution's sites in `sites`, and don't copy the other study's sites in. Add
a second row with the mean of this study's sites alone, computed and flagged.

*Verify the pole.* Recompute it as the Fisher mean of the site VGPs with
`pmag.fisher_mean`, flipping each VGP to the polarity of the published pole by
angular distance (antipode if more than 90° away) — not by the sign of its
latitude, which mis-flips VGPs near the equator. Report the match. If the paper
gives no mean direction, compute it the same way from the site directions and
flag it as computed.

**Rejected or excluded data.** Keep them with `result_quality` = `b` (or `quality`
= `b` for measurements). Note the reason in `description`.

**Compilations / data re-used from earlier papers.** The `citations` cell for
those rows is the original paper's DOI, not "This study".

## 5. Values in every row

- `citations`: `This study` for results first published in the paper being
  uploaded (MagIC resolves it to the contribution's `reference`). Otherwise the
  DOI (e.g. `10.1029/2019GC008479`).
- `method_codes`: at least one valid code per row (see `method-codes.md`).
- `description` (optional): one short sentence when something about the row
  needs explaining (rejection reason, inferred value).
