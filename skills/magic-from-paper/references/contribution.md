# The contribution table

One row describing the whole contribution. It goes first in the upload file.
Build it as `work/tables/contribution.csv`. Check the current definitions with
`magic_lookup.py columns contribution` — this table has changed recently.

Leave out `id`, `version`, `timestamp`, `contributor`, `is_validated`,
`is_reviewed` and `data_model_version`: MagIC assigns them (the builder drops
them if present).

## Columns

| Column | Required | Format | Where to find it in the paper |
|---|---|---|---|
| `reference` | yes | bare DOI (`10.1029/2019GC008479`) or a URL if there is no DOI | title page / header. The builder strips `https://doi.org/` |
| `lab_names` | yes | colon-delimited list; **each must exactly match the `lab_names` vocabulary** | Methods ("measurements were made at the paleomagnetic laboratory of …"), acknowledgments, author affiliations |
| `funding` | no | `Display name[https://url]` items joined by `:` | Acknowledgments / Funding statement |
| `author` | no | ORCID (`0000-0002-1825-0097`), `@earthref_handle`, or `Name <email>` | corresponding author: ORCID on the title page, or name + email |
| `supplemental_links` | no | `Display name[https://url]` items joined by `:` | Data Availability statement: Zenodo/PANGAEA/ERDA DOIs, the journal's supplement page |
| `description` | recommended | provenance prefix, then one or two plain sentences | `Created by Claude <model> using the magic-from-paper skill.` followed by your summary of what the contribution holds (see below) |

## lab_names

`lab_names` holds **only entries copied verbatim from the MagIC `lab_names`
vocabulary** — never the paper's wording ("the Paleomagnetics Laboratory at
Lamont" → `LDEO Paleomagnetics Lab (Lamont-Doherty Earth Observatory, Columbia
University, USA)`). Find the entry with the lookup and copy it exactly,
punctuation included:

```bash
python $S/magic_lookup.py labs "scripps|sio"
python $S/magic_lookup.py labs "utrecht"
python $S/magic_lookup.py labs "liverpool|geomagnetism"
```

- Infer the lab from the methods section or acknowledgments. If the paper only
  gives author affiliations, a lab is a safe inference only when the
  affiliation has exactly one paleomagnetic lab in the vocabulary and the paper
  says measurements were made at the authors' institution — flag it.
- List every lab that made measurements in the dataset (rock magnetism done
  elsewhere counts).
- In the report, give the paper's wording next to the vocabulary entry you
  chose, so the match can be checked.
- When the paper doesn't say where measurements were made, list in the report
  the vocabulary labs at the authors' institutions as candidates, and include
  only those the paper ties to the measurements (an acknowledged lab, an
  "IRM contribution" number, a methods statement).
- If the lab genuinely isn't in the vocabulary, don't write a name of your own
  and don't substitute a different lab. Leave it out of `lab_names` (if no lab
  matches at all, the column stays empty and the builder reports it as a
  required-field error), and list the lab in the report's Gaps section as
  needing to be added to the MagIC vocabulary, in the vocabulary's style:
  `Lab name (Institution, Country)`.

## funding

From the acknowledgments or funding statement — one item per grant:

| Funder | Display name | URL |
|---|---|---|
| NSF | `NSF EAR-1953839` (or the award title if the paper gives it) | `https://www.nsf.gov/awardsearch/showAward?AWD_ID=1953839` (the seven-digit number) |
| ERC | `ERC grant 101001894` | `https://cordis.europa.eu/project/id/101001894` |
| Any other funder (NASA, NERC, NSERC, ARC, NSFC, DFG, …) | funder + award number | search the web for the award number and use the funder's own public award page; if none turns up, the funder's home page, flagged |

- The URL must be an `https://` link; the builder rejects items without one.
- A display name containing a colon (common in NSF titles: "Collaborative
  Research: …") must be wrapped in double quotes, because `:` separates items:
  `"Collaborative Research: Testing …"[https://…]`.
- Only grants the paper actually names. Fellowships and institutional support
  are fine to include if stated as funding the work. Don't search for grants the
  paper doesn't mention.
- Each URL you constructed from a pattern (rather than copied from the paper)
  is an inference: list it in the report.

## description

Always begin with a provenance line naming the model you are running as and this
skill, so anyone opening the contribution knows it was machine-built from the
paper:

    Created by Claude Opus 5.5 using the magic-from-paper skill. <summary…>

Use your actual model name and version as given in your system prompt (e.g.
"Claude Opus 5.5", "Claude Sonnet 5.5"); don't guess one. Then one or two
sentences summarizing the contents.

## supplemental_links

Data Availability statements often point to Zenodo, PANGAEA, Figshare, ERDA or
a GitHub repository. Use the DOI form of the URL when there is one
(`https://doi.org/10.5281/zenodo.1234567`). Don't link to MagIC itself.

## Example

```csv
reference,author,lab_names,funding,supplemental_links,description
10.1029/2019GC008479,0000-0002-1825-0097,"Paleomagnetic Lab (Scripps Institution of Oceanography, UCSD, USA)","NSF EAR-1953839[https://www.nsf.gov/awardsearch/showAward?AWD_ID=1953839]",Zenodo archive[https://doi.org/10.5281/zenodo.1234567],Created by Claude Opus 5.5 using the magic-from-paper skill. Paleomagnetic directions and Thellier-type paleointensities from 32 Holocene lava flows on Hawaii
```

Build it with pandas so the quoting comes out right; commas inside lab names
need CSV quoting.
