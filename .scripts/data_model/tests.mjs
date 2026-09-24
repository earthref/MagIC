// Self-tests for the data model build and validation scripts.
//
//   node --test .scripts/data_model/tests.mjs
//
// Each historical failure mode of the copy-paste workflow is reintroduced into
// a scratch copy and must be caught. Set MAGIC_DATA_MODEL_XLSX to a workbook
// path to also check that building from it reproduces the committed file.

import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import XLSX from "xlsx";
import { Diagnostics, MODEL_PATH, loadModelFile, parseListFragment, serializeModel } from "./lib.mjs";
import { validateSource } from "./validate.mjs";
import { buildTables } from "./build.mjs";

const source = fs.readFileSync(MODEL_PATH, "utf8");

function messages(diagnostics) {
  return diagnostics.errors.map((e) => `${e.where}: ${e.message}`);
}

test("committed 3.0.js validates with no errors", async () => {
  const d = await validateSource(source);
  assert.deepEqual(messages(d), []);
});

test("serialize(load(3.0.js)) round-trips byte for byte", async () => {
  const model = loadModelFile(MODEL_PATH);
  const out = await serializeModel(model);
  if (out !== source) {
    const a = out.split("\n"), b = source.split("\n");
    const i = a.findIndex((line, idx) => line !== b[idx]);
    assert.fail(`first difference at line ${i + 1}:\n  generated: ${a[i]}\n  on disk:   ${b[i]}`);
  }
});

test("duplicate key at the AST level is an error (failure mode 3)", async () => {
  // Duplicate a validations line inside the first column that has one.
  const bad = source.replace(
    /(\n(\s*)validations: \[[^\n]*\],)/,
    (m, line, indent) => `${line}\n${indent}validations: ["required()"],`
  );
  assert.notEqual(bad, source);
  const d = await validateSource(bad, { checkFormatting: false });
  assert.ok(messages(d).some((m) => /duplicate key "validations"/.test(m)), messages(d).join("\n"));
});

test("unparseable file (dropped quote) is an error (failure modes 1 and 2)", async () => {
  const bad = source.replace('validations: ["downloadOnly()"]', 'validations: ["downloadOnly()]');
  assert.notEqual(bad, source);
  const d = await validateSource(bad, { checkFormatting: false });
  assert.ok(messages(d).some((m) => /does not parse/.test(m)), messages(d).join("\n"));
});

test("hand-edited, unformatted file is an error (failure mode 4)", async () => {
  const bad = source.replace("      label: \"Contribution\",", "      label:   \"Contribution\",");
  assert.notEqual(bad, source);
  const d = await validateSource(bad);
  assert.ok(messages(d).some((m) => /Prettier/.test(m)), messages(d).join("\n"));
});

test("non-contiguous positions and reordered keys are errors", async () => {
  const model = loadModelFile(MODEL_PATH);
  model.tables.contribution.columns.id.position = 7;
  const d = new Diagnostics();
  const { validateModelObject } = await import("./validate.mjs");
  validateModelObject(model, d);
  assert.ok(messages(d).some((m) => /positions are not unique and contiguous/.test(m)), messages(d).join("\n"));

  const reordered = loadModelFile(MODEL_PATH);
  const col = reordered.tables.contribution.columns.id;
  reordered.tables.contribution.columns.id = { group: col.group, label: col.label, ...col };
  const d2 = new Diagnostics();
  validateModelObject(reordered, d2);
  assert.ok(messages(d2).some((m) => /keys out of order/.test(m)), messages(d2).join("\n"));
});

test("list fragments: valid forms parse, invalid forms are reported with the cell", () => {
  const d = new Diagnostics();
  assert.deepEqual(parseListFragment(`'Dike','Sill'`, d, "P1"), ["Dike", "Sill"]);
  assert.deepEqual(parseListFragment(`'cv("feature_type")'`, d, "P2"), ['cv("feature_type")']);
  assert.deepEqual(parseListFragment(`{'table':'er_sites','column':'site_lat'}`, d, "Q3"), [
    { table: "er_sites", column: "site_lat" },
  ]);
  assert.deepEqual(parseListFragment(`'it\\'s'`, d, "L4"), ["it's"]);
  assert.ok(d.ok, messages(d).join("\n"));

  for (const [fragment, re] of [
    [`'Dike','Sill`, /does not parse/],
    [`'cv("feature_type")'"`, /does not parse|trailing/],
    [`foo()`, /only literals/],
    [`{'table':'a','table':'b'}`, /duplicate key/],
  ]) {
    const dd = new Diagnostics();
    parseListFragment(fragment, dd, "X9");
    assert.ok(!dd.ok, `expected an error for ${fragment}`);
    assert.ok(messages(dd).some((m) => re.test(m) && m.startsWith("X9")), messages(dd).join("\n"));
  }
});

/**
 * Builds a minimal two-table workbook in memory, with optional row overrides,
 * so spreadsheet-side checks can be exercised without a real export.
 */
function makeWorkbook(mutate = (rows) => rows) {
  const header = [
    "", "", "", "Group", "Table", "Column Name", "Display Name", "Type", "Unit",
    "Description", "Notes", "Examples", "URLs", "Required Method Codes",
    "Alternate Units", "Validation Rules", "Previous Columns", "Joining Notes", "JSON", null, null,
  ];
  const row = (pos, table, column, extra = {}) => {
    const r = [pos, "", "", "G", table, column, `Label ${column}`, "String", null,
      `Description of ${column}`, null, null, null, null, null, null, null, null, null, null, null];
    for (const [k, v] of Object.entries(extra)) r[header.indexOf(k)] = v;
    return r;
  };
  let rows = [
    header,
    row(1, "alpha", "a1", { "Validation Rules": `'required()'`, Examples: `'x','y'` }),
    row(2, "alpha", "a2", { "Previous Columns": `{'table':'er_sites','column':'site_lat'}` }),
    Array(header.length).fill(null),
    row(1, "beta", "b1"),
  ];
  rows = mutate(rows);
  const tables = [
    [null, null, "3.0 Model"],
    ["Table", null, "Definition", "Purpose"],
    ["alpha", 1, "Alpha things", "For alpha"],
    ["beta", 2, "Beta things", "For beta"],
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(tables), "3.0 Tables");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), "3.0 Columns");
  return wb;
}

test("buildTables: minimal workbook builds with the canonical key order", () => {
  const d = new Diagnostics();
  const tables = buildTables(makeWorkbook(), d);
  assert.deepEqual(messages(d), []);
  assert.deepEqual(Object.keys(tables), ["alpha", "beta"]);
  assert.deepEqual(Object.keys(tables.alpha), ["label", "position", "description", "notes", "columns"]);
  assert.equal(tables.alpha.label, "Alpha");
  assert.deepEqual(Object.keys(tables.alpha.columns.a1), [
    "label", "group", "position", "type", "description", "examples", "validations",
  ]);
  assert.deepEqual(tables.alpha.columns.a2.previous_columns, [{ table: "er_sites", column: "site_lat" }]);
  assert.equal(tables.beta.columns.b1.position, 1);
});

test("buildTables: unparseable fragment is reported with its cell reference", () => {
  const d = new Diagnostics();
  const tables = buildTables(
    makeWorkbook((rows) => {
      rows[1][15] = `'cv("feature_type")'"`; // the feature_type paste error
      return rows;
    }),
    d
  );
  assert.equal(tables, undefined);
  assert.ok(messages(d).some((m) => m.startsWith("3.0 Columns!P2") && /alpha\.a1/.test(m)), messages(d).join("\n"));
});

test("buildTables: duplicate column, split table, and missing table metadata are errors", () => {
  let d = new Diagnostics();
  buildTables(makeWorkbook((rows) => { rows[2][5] = "a1"; return rows; }), d);
  assert.ok(messages(d).some((m) => /defined twice/.test(m)), messages(d).join("\n"));

  d = new Diagnostics();
  buildTables(makeWorkbook((rows) => { rows[4][4] = "alpha"; return rows; }), d);
  assert.ok(messages(d).some((m) => /more than one block/.test(m)), messages(d).join("\n"));

  d = new Diagnostics();
  buildTables(makeWorkbook((rows) => { rows[4][4] = "gamma"; return rows; }), d);
  assert.ok(messages(d).some((m) => /not listed in the "3.0 Tables"/.test(m)), messages(d).join("\n"));
});

test("buildTables: text apostrophes are escaped automatically; legacy \\' is translated with a warning", async () => {
  const d = new Diagnostics();
  const tables = buildTables(
    makeWorkbook((rows) => {
      rows[1][9] = "Fisher's kappa";
      rows[2][9] = "Fisher\\'s kappa";
      return rows;
    }),
    d
  );
  assert.deepEqual(messages(d), []);
  assert.equal(tables.alpha.columns.a1.description, "Fisher's kappa");
  assert.equal(tables.alpha.columns.a2.description, "Fisher's kappa");
  assert.ok(d.warnings.some((w) => /hand-escaped/.test(w.message) && w.where === "3.0 Columns!J3"));
  const src = await serializeModel({
    updated_day: "2026:01:01", published_day: "2017:09:29", data_model_version: "3.0", criteria_map: {}, tables,
  });
  assert.ok(src.includes(`"Fisher's kappa"`));
});

const workbookPath = process.env.MAGIC_DATA_MODEL_XLSX;
test("building from the real workbook reproduces the committed tables", { skip: !workbookPath && "set MAGIC_DATA_MODEL_XLSX" }, () => {
  const d = new Diagnostics();
  const tables = buildTables(XLSX.readFile(workbookPath), d);
  assert.deepEqual(messages(d), []);
  assert.deepEqual(tables, loadModelFile(MODEL_PATH).tables);
});
