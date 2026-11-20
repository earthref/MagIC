# Building the 3.0 data model from the spreadsheet

The MagIC 3.0 data model is maintained in a Google Sheet:
https://docs.google.com/spreadsheets/d/1ldYzO6WMyxfVT6gv3imKaZIVqvp97uPmWijT_ElpZnY

`lib/configs/magic/data_models/3.0.js` is generated from it by the scripts in
this directory. Do not edit the `tables` object in that file by hand; edit the
sheet and rebuild. The other top-level keys (`updated_day`, `published_day`,
`data_model_version`, `criteria_map`) live only in the `.js` file and are
preserved across builds.

## Updating the model

1. Edit the sheet.
2. In the sheet: **File > Download > Microsoft Excel (.xlsx)**.
3. From the repository root:

   ```
   npm run data-model:build -- "/path/to/MagIC Data Model 3.0.xlsx"
   ```

   The script prints every `table.column.field` that changed, sets
   `updated_day` to today when anything changed, and refuses to write if the
   result does not validate. Pass `--updated-day YYYY:MM:DD` to override the
   stamp.

4. Review `git diff`, then commit.
5. If columns were added, update the search index mapping (below) before
   deploying.

To check that the committed file matches a workbook without writing:

```
npm run data-model:build -- "/path/to/MagIC Data Model 3.0.xlsx" --check
```

## Updating the search index mapping

The OpenSearch index is created with `dynamic: "strict"`
(`.scripts/tests/create_index_mapping.js`), so a contribution that uses a
column the index mapping does not know fails to index. When columns are added,
add them to the live index mapping **before** deploying the new model:

```
npm run -s data-model:mapping -- --base HEAD > mapping.json   # before committing
npm run -s data-model:mapping -- --base origin/main > mapping.json  # on a branch
curl -X PUT "$OPENSEARCH/magic/_mapping" -H 'Content-Type: application/json' \
  --data-binary @mapping.json
```

The script lists on stderr the columns in the working tree's `3.0.js` that are
not in the model at `--base` and prints their mappings, with the same per-type
rules as `create_index_mapping.js`. Adding fields to an existing index needs
no reindex, and re-sending a field the index already has with the same
definition changes nothing, so an older `--base` is safe. A column whose
`type` changed cannot be fixed this way: it is reported, the exit status is 1,
and it needs a new index and a reindex, so settle a new column's type before
the first deploy.

## Validating without a workbook

```
npm run data-model:validate            # errors fail; warnings are printed
npm run data-model:validate -- --strict  # warnings fail too
npm run data-model:validate -- --legacy  # also show 2.5-upgrade-only findings
```

This is what CI runs on pull requests that touch `lib/configs/magic/data_models/`
(`.github/workflows/data-model.yml`).

## What is read from the sheet

`3.0 Columns`, located by header text so inserting a column in the sheet does
not break the build:

| Header             | Model key          | Notes                                        |
| ------------------ | ------------------ | -------------------------------------------- |
| Table              | table name         | Rows for a table must be contiguous.         |
| Column Name        | column key         | Must be unique within a table.               |
| Group              | `group`            | Required.                                    |
| Display Name       | `label`            | Required.                                    |
| Type               | `type`             | Required.                                    |
| Unit               | `unit`             | Omitted when blank.                          |
| URLs               | `urls`             | List fragment, see below.                    |
| Description        | `description`      | Omitted when blank (but warned about).       |
| Notes              | `notes`            | Omitted when blank.                          |
| Examples           | `examples`         | List fragment.                               |
| Validation Rules   | `validations`      | List fragment.                               |
| Previous Columns   | `previous_columns` | List fragment of `{'table':..,'column':..}`. |

`position` is computed from row order within each table (blank rows separate
tables). Column A in the sheet computes the same thing with a formula and is
used only as a cross-check.

`3.0 Tables`: the row whose `Table` cell matches supplies `position` (the
unlabeled column after `Table`), `description` (`Definition`) and `notes`
(`Purpose`). The table `label` is the capitalized table name.

Not exported, by design: Required Method Codes, Alternate Units, Joining
Notes, the derived label columns (B, C), and the JSON formula columns (S, T,
U). The formula columns are not read by the build and are obsolete once this
script is in use. Deleting them is optional; if kept, consider hiding them or
relabeling the header so nobody copy-pastes from them by mistake.

### List fragments

The Examples, URLs, Validation Rules and Previous Columns cells hold the
*contents* of a JavaScript array literal, for example

```
'Dike','Sill','Lineation'
'cv("feature_type")'
{'table':'er_sites','column':'site_lat'},{'table':'pmag_results','column':'average_lat'}
```

They are parsed as literals (never executed) and any syntax error is reported
with the cell reference. An apostrophe inside a single-quoted fragment string
must be written `\'` as in JavaScript.

### Apostrophes in text cells

Display Name, Description and Notes are plain text. Escaping is automatic.
Some cells still contain `\'` from the old formula workflow; the build
translates these to `'` and warns with the cell reference. Remove the
backslashes in the sheet at your convenience.

## Errors versus warnings

Errors block the build and fail CI. They are structural: unparseable
fragments, duplicate columns or keys, missing required cells, positions that
are not contiguous, key order, unknown validation functions, references to
tables or groups that do not exist, a file that is not Prettier-formatted.

Warnings are content problems needing a human decision and are printed but do
not fail the build unless `--strict` is given: a `cv()`/`sv()` name that is not
in `lib/modules/er/*_vocabularies.js`, a `requiredIf()` naming a column that
is not in the table, leading or trailing whitespace.

Legacy notes concern only the 2.5 to 3.0 upgrade path, which is no longer in
routine use: a `criteria_map` entry pointing at a column that does not exist
(`criteria_map` is the lookup `upgrade_contribution.js` uses to turn the wide
2.5 `pmag_criteria` table into 3.0 `criteria` rows), or a `previous_columns`
entry not found in the 2.5 model. They are hidden and never affect the exit
status; pass `--legacy` to see them.

## Files

- `build.mjs` reads the workbook and writes `3.0.js`.
- `validate.mjs` checks a `3.0.js` file; also used by `build.mjs` before writing.
- `mapping.mjs` prints the index mapping update for added columns.
- `lib.mjs` shared parsing (acorn, literal-only evaluation), key order, and
  Prettier serialization.
- `tests.mjs` self-tests; run with `npm run data-model:test`. Set
  `MAGIC_DATA_MODEL_XLSX` to a workbook path to include the round-trip test.

These run with plain Node and the repo's `node_modules` (`xlsx`, `acorn`,
`prettier`); Meteor is not needed. Note this directory is dot-prefixed so
Meteor's bundler ignores it.
