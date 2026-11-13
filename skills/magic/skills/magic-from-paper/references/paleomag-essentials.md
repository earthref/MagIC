# Paleomagnetism essentials for building and checking MagIC files

Condensed from *Essentials of Paleomagnetism* (L. Tauxe, with R. F. Butler, R. Van der
Voo and S. K. Banerjee; web edition revised by N. Swanson-Hysell, CC-BY-4.0):
https://pmagpy.github.io/Essentials-JupyterBook/ . Chapter links are given per section;
read the chapter when a paper uses a method in a way this summary doesn't cover. Use it to
interpret what a paper did and to recompute its numbers, not as a source of data.

## Contents
1. Terms and hierarchy
2. Orientation and coordinate conventions
3. Demagnetization and component fitting
4. Directional statistics (recompute and verify)
5. VGPs, poles, paleolatitude, dipole moments
6. Field tests → MagIC columns and codes
7. Inclination shallowing
8. Paleointensity protocols and statistics
9. Pole quality criteria
10. Polarity

---

## 1. Terms and hierarchy ([ch. 9](https://pmagpy.github.io/Essentials-JupyterBook/chapter9))
- **Sample:** what is collected in the field. **Specimen:** what is measured; one sample can yield several.
- **Site:** a single horizon or instant in time (one lava flow, one bed level, one dike). All its specimens should record the same field. A thick stratigraphic section spanning time is **not** a site.
- Time-averaging guidance: ≥ 25 sites spanning ≥ ~100 kyr; ~100 sites to characterize field-vector distributions.
- **ChRM:** the characteristic remanence, the final component decaying to the origin.

## 2. Orientation and coordinate conventions ([ch. 9](https://pmagpy.github.io/Essentials-JupyterBook/chapter9))
- **Pomeroy/drill convention:** Z into the outcrop. X is perpendicular to Z in the vertical plane, Y horizontal to the right of X. The field records the azimuth of +X's horizontal projection (clockwise from north) and its hade/plunge. MagIC `samples.azimuth` and `samples.dip` describe the X axis; check the paper's convention (plunge = −dip in many systems).
- **Magnetic compass:** readings need a declination correction (IGRF/DGRF), giving SO-MAG plus SO-CMD-NORTH once corrected. **Sun compass:** azimuth from shadow angle, time and location (SO-SUN). Typical accuracy ±3°, back-sighting ±5°.
- **Coordinate systems:** specimen → geographic (rotate by azimuth and plunge; `dir_tilt_correction` −1 → 0) → tilt corrected (100).
- **Tilt correction:** (1) subtract the dip direction from D, (2) rotate about a horizontal axis by −dip, (3) add the dip direction back.
- **Bedding:** prefer dip direction + dip, which is unambiguous. Strike + dip needs the right-hand rule (dip direction = strike + 90). MagIC `bed_dip_direction`, `bed_dip`.
- **Plunging folds:** restore the fold axis to horizontal before untilting. A single-rotation tilt correction then misstates declinations (vertical-axis-rotation artefacts).

## 3. Demagnetization and component fitting ([ch. 9](https://pmagpy.github.io/Essentials-JupyterBook/chapter9))
- **Method codes:** AF (LP-DIR-AF, LT-AF-Z), thermal (LP-DIR-T, LT-T-Z), low-temperature/LN2 cycling (LP-LT, LT-LT-Z; the step is recorded at 77 K), double/triple AF demagnetization against ARM/GRM (codes under `codes "double|triple"`).
- **PCA** (Kirschvink, 1980): eigen-analysis of the orientation tensor (τ1 ≥ τ2 ≥ τ3).
  - Line = V1 (DE-BFL; anchored to origin DE-BFL-A, origin included but free DE-BFL-O).
  - Plane = pole V3 (DE-BFP).
  - MAD for a line = atan(√((τ2²+τ3²)/τ1)), plane = atan(√(τ3/τ2 + τ3/τ1)). MagIC `dir_mad_free`.
  - DANG = angle between the free line and origin→centre of mass (`dir_dang`).
- **Combining lines and planes:** McFadden & McElhinny (1988), DE-FM-LP. k = (2M+N−2)/(2(M+N−R)); α95 with N′ = M + N/2 (M lines, N planes). Report `dir_n_specimens_lines` / `_planes`.
- **VDS** (vector difference sum) is the right normalizer when components differ in direction (`f_vds`).

## 4. Directional statistics ([ch. 11](https://pmagpy.github.io/Essentials-JupyterBook/chapter11), [ch. 12](https://pmagpy.github.io/Essentials-JupyterBook/chapter12), [app. C](https://pmagpy.github.io/Essentials-JupyterBook/appendix-c))

Use these to recompute a paper's values (`pmag.fisher_mean` implements them).

| Quantity | Formula | MagIC column |
|---|---|---|
| Resultant | R = ‖Σ unit vectors‖ | `dir_r` |
| Precision | k = (N−1)/(N−R) | `dir_k` |
| 95% cone | α95 = acos[1 − (N−R)/R · ((1/0.05)^(1/(N−1)) − 1)]; ≈ 140/√(kN) for k > 25 | `dir_alpha95` |
| Circular s.d. | CSD ≈ 81/√k | — |
| VGP dispersion | S² = Σ Δᵢ² / (N−1); within-site corrected S_f² = S_p² − S_w²/n̄ | `vgp_*` / location |

- **Watson randomness test:** reject randomness if R > R₀ ≈ √(7.815 N/3) (N > 10; table for 5 < N < 20, e.g. N = 10 → 4.34). A site with random directions should be rejected.
- **Fisher Q-Q test:** M_u (uniform declinations) and M_e (exponential co-inclinations); critical values 1.207 and 1.094 (PmagPy `ipmag.fishqq`). Exceeding either rejects a Fisher distribution; report it in the pole description.
- **Watson V_w common-mean test:** V_w = 2(S_w − R_w), with the critical value by simulation (`ipmag.common_mean_watson`). Applied to normal vs flipped reverse it is a reversals test (ST-R-2).
- **McFadden & McElhinny (1990) reversal classes** by critical angle γc: A ≤ 5°, B 5–10°, C 10–20°, indeterminate > 20°. MagIC `reversal_test` uses Ra/Rb/Rc/Ro and R−.
- **Bootstrap** (simple or parametric) for small or non-Fisherian sets; the simple bootstrap underestimates the ellipse below N ≈ 20.
- **Kent ellipse** (app. C.2.4): ζ95 = asin(σ2√g), η95 = asin(σ3√g) with g = −2 ln(0.05)/(N μ²). Axis directions from the eigenvectors. Store as `pole_conf` (major dec:inc:angle, then minor).

## 5. VGPs, poles, paleolatitude, dipole moments ([ch. 2](https://pmagpy.github.io/Essentials-JupyterBook/chapter2), [ch. 11](https://pmagpy.github.io/Essentials-JupyterBook/chapter11), [ch. 14](https://pmagpy.github.io/Essentials-JupyterBook/chapter14))
- **Dipole formula:** tan I = 2 tan λ, so paleolatitude λ = atan(tan I / 2); magnetic colatitude cot θm = ½ tan I.
- **VGP** (site colatitude θs, longitude φs):
  - cos θp = cos θs cos θm + sin θs sin θm cos D; λp = 90 − θp.
  - sin Δφ = sin θm sin D / sin θp.
  - φp = φs + Δφ if cos θm ≥ cos θs cos θp, else φs + 180 − Δφ.
  - (`pmag.dia_vgp`.)
- **Confidence ellipse** (Cox & Doell, 1960): dp = ½ α95 (1 + 3 sin²λ) along the site–pole great circle; dm = α95 cos λ / cos I perpendicular to it. MagIC `vgp_dp`, `vgp_dm` (dm ≥ dp always — a quick check for swapped columns).
- **Paleomagnetic pole:** Fisher mean of site VGPs (DE-VGP) → `pole_lat`, `pole_lon`, `pole_alpha95` (A95), `pole_k` (K), `pole_n_sites`. A pole from the mean direction (DE-DI) is different; say which. Flip reverse VGPs to the antipode by angular distance to the mean, not by the sign of latitude.
- **VDM** = (4π a³/μ0) B (1 + 3 cos²θm)^−½; **VADM** uses the site colatitude instead. With a = 6.371×10⁶ m and μ0 = 4π×10⁻⁷, B in T gives Am². Present field ≈ 80 ZAm² = 8×10²² Am².
- **Secular-variation models** (Model G: S² = (aλ)² + b²; TK03.GAD; THG24) underlie E/I and SVEI corrections and the Deenen et al. (2011) A95 envelope.

## 6. Field tests → MagIC columns and codes ([ch. 9](https://pmagpy.github.io/Essentials-JupyterBook/chapter9), [ch. 11–12](https://pmagpy.github.io/Essentials-JupyterBook/chapter12))

| Test | Positive means | MagIC | Code |
|---|---|---|---|
| Fold, McElhinny (1964): k_after/k_before > F(5%) | Pre-folding | `fold_test` +/−/o | ST-F-1 |
| Fold, Tauxe & Watson (1994) bootstrap: 95% interval of the τ1 peak includes 100% | Pre-folding; interval near 0% = post-folding; intermediate = syn-folding, plunging folds or rotations | `fold_test` | ST-F-5 |
| Conglomerate: clast directions random (R < R₀) | Predates clast deposition | `conglomerate_test` (+, −, G/IG variants) | ST-G, ST-G-IF |
| Baked contact: directions grade from the intrusion's to the host's | Host magnetization predates intrusion | `contact_test` (+, −, C/IC variants) | ST-C, ST-C-I |
| Reversals (V_w, bootstrap, M&M class) | Primary, averaged | `reversal_test` (Ra/Rb/Rc/Ro/R−) | ST-R-… |

Record each test on the row of the component it tested. A DRM can pass a conglomerate test while the CRM in the same rock fails it.

## 7. Inclination shallowing ([ch. 16](https://pmagpy.github.io/Essentials-JupyterBook/chapter16))
- tan I_obs = f · tan I_field (King, 1955); f = 1 means no flattening. Unflatten with I = atan(tan I_obs / f).
- **E/I** (Tauxe & Kent, 2004): find the f at which the elongation/inclination pair matches TK03.GAD (E = 2.895 − 0.01466 I − 0.0004 I²); bootstrap bounds. Code DA-DIR-FLAT-EI.
- **SVEI** (Tauxe et al., 2024): uses the THG24 model and better statistics. Code DA-DIR-FLAT-SVEI.
- Record f and its bounds in `pole_flattening`, `pole_flat_low`, `pole_flat_high`, and the corrected inclination bounds in `dir_inc_flat_low/high`. Keep an uncorrected row too.
- **Common analysis-code error:** a correction applied twice. In pandas, `b = a` followed by `b[col] = ...` silently changes `a`. If a corrected mean reproduces only with f², that's what happened.

## 8. Paleointensity ([ch. 10](https://pmagpy.github.io/Essentials-JupyterBook/chapter10), [app. C.3](https://pmagpy.github.io/Essentials-JupyterBook/appendix-c))
- **Thellier-family protocols:**
  - Coe (ZI): LP-PI-TRM-ZI.
  - Aitken (IZ): LP-PI-TRM-IZ.
  - IZZI, alternating with embedded pTRM and tail checks: LP-PI-BT-IZZI.
  - Original Thellier-Thellier (II): LP-PI-II.
- **Checks:** pTRM check (LP-PI-ALT-PTRM; step LT-PTRM-I), tail check (LP-PI-BT-MD; LT-PTRM-MD), additivity check (LT-PTRM-AC).
- **Other methods:** Shaw and double-Shaw (AF-based, ARM-corrected), microwave (LP-PI-M…), multi-specimen (LP-PI-MULT), perpendicular (Kono), IRM/ARM normalization (order-of-magnitude only).
- **Corrections:** anisotropy when γ > ~5° (DA-AC-ATRM/AARM), cooling rate (DA-CR-TRM), non-linear TRM. Flag them in specimens `int_corr` / method codes.

Arai-plot statistics (SPD; Paterson et al., 2014) and their MagIC specimen columns:

| Stat | Definition | Column |
|---|---|---|
| b | slope of NRM vs pTRM over the chosen segment | `int_b` |
| σb, β | standard error of slope; β = σb/\|b\| | `int_b_sigma`, `int_b_beta` |
| f, f_vds | NRM fraction: Δy_T / y-intercept, or / VDS | `int_f`, `int_fvds` |
| FRAC | Shaar & Tauxe (2013) fraction using VDS | `int_frac` |
| g, gap max | gap factor 1 − Δȳ/Δy_T; largest gap / VDS | `int_g`, `int_gmax` |
| q | Coe quality factor = f g / β | `int_q` |
| MAD, DANG | from the zero-field steps of the segment | `int_mad_free`, `int_dang` |
| γ | angle between the pTRM acquired and the lab field | `int_gamma` |
| DRAT, DRATS, CDRAT | pTRM-check differences normalised by hypotenuse / pTRM | `int_drat`, `int_drats`, `int_cdrat` |
| MD% | tail-check difference normalised by NRM VDS | `int_md` |
| Z, Z* | IZ/ZI zig-zag | `int_z`, `int_z_md` |
| scat, k′ | Shaar & Tauxe scatter box; Arai curvature | `int_scat`, `int_k_prime` |

Check exact column names with `magic_lookup.py search-columns int_`. Selection criteria sets (e.g. CCRIT) go in the `criteria` table or are named in `description`. Relative paleointensity from sediments is DRM normalised by ARM/IRM/χ (`int_rel_*`).

## 9. Pole quality criteria ([ch. 16](https://pmagpy.github.io/Essentials-JupyterBook/chapter16))
- **Van der Voo (1990) Q (0–7):**
  1. Well-determined age.
  2. ≥ 24 samples, k ≥ 10, α95 ≤ 16°.
  3. Demagnetization adequate to isolate components.
  4. Field tests.
  5. Structural control and tectonic coherence.
  6. Both polarities.
  7. No resemblance to younger poles.
- Q > 2 is typically required. MagIC has `pole_vv_q` and `pole_bc_q` (Besse & Courtillot) on location rows; fill them only when the paper states them.
- Meert et al. (2020) R criteria are a newer alternative; record them in `description` if the paper scores them.

## 10. Polarity ([ch. 14](https://pmagpy.github.io/Essentials-JupyterBook/chapter14))
- **Normal:** same as the present field. **Reverse:** opposite. A reversal is a sign change of g₁⁰. For Precambrian rocks the absolute polarity is unknown, so follow the convention of the poles the paper uses (e.g. Keweenawan "normal").
- `dir_polarity` values:
  - n, r: normal, reversed.
  - t: transitional, intermediate between the two.
  - e: excursion.
  - i: intermediate.
- Never use `t` as a default.
