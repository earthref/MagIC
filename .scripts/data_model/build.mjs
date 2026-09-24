#!/usr/bin/env node
// Builds lib/configs/magic/data_models/3.0.js from an .xlsx export of the
// MagIC Data Model 3.0 Google Sheet.
//
//   node .scripts/data_model/build.mjs <workbook.xlsx> [--check] [--updated-day YYYY:MM:DD] [--legacy]
//
// Reads the "3.0 Columns" and "3.0 Tables" sheets, rebuilds the "tables" object
// from the source columns (the JSON formula columns are ignored), preserves
// updated_day/published_day/data_model_version/criteria_map from the existing
// file, validates the result, and writes it Prettier-formatted.
//
// --check       Do not write. Exit 1 if the file on disk differs from what the
//               workbook produces (ignoring updated_day). For CI.
// --updated-day Override the stamp written when tables change (default: today).
// --legacy      Also print findings that only affect 2.5 -> 3.0 upgrades.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";
import {
  Diagnostics,
  MODEL_PATH,
  deepDiff,
  loadModelFile,
  parseListFragment,
  serializeModel,
  todayStamp,
} from "./lib.mjs";
import { validateSource } from "./validate.mjs";

const COLUMNS_SHEET = "3.0 Columns";
const TABLES_SHEET = "3.0 Tables";

// Header text -> model key for the column sheet. Everything else in the sheet
// (Required Method Codes, Alternate Units, Joining Notes, the JSON formula
// columns, and the derived label columns) is deliberately not exported.
const COLUMN_HEADERS = {
  Group: "group",
  Table: "table",
  "Column Name": "column",
  "Display Name": "label",
  Type: "type",
  Unit: "unit",
  Description: "description",
  Notes: "notes",
  Examples: "examples",
  URLs: "urls",
  "Validation Rules": "validations",
  "Previous Columns": "previous_columns",
};
const LIST_FIELDS = ["urls", "examples", "validations", "previous_columns"];

/**
 * Translates the legacy hand-escaped apostrophe (`\\'`) that the old spreadsheet
 * formulas required in text cells. Escaping is now automatic, so the backslash
 * should be removed in the sheet; until then it is translated here with a
 * warning so the output does not change.
 */
function unescapeLegacyApostrophes(text, where, diagnostics) {
  if (!text.includes("\\'")) return text;
  diagnostics.warn(where, "contains a hand-escaped \\' from the old formula workflow; replace it with a plain ' in the sheet");
  return text.replace(/\\'/g, "'");
}

function cellRef(sheet, rowIndex, colIndex) {
  return `${sheet}!${XLSX.utils.encode_cell({ r: rowIndex, c: colIndex })}`;
}

function isBlank(v) {
  // Matches the spreadsheet formulas' ISBLANK semantics: only truly empty cells
  // are blank. Whitespace-only cells are content (and get flagged downstream).
  return v === null || v === undefined || v === "";
}

/**
 * Reads a sheet into an array of rows (arrays of cell values), with formulas
 * replaced by their cached values.
 */
function readRows(workbook, sheetName, diagnostics) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    diagnostics.error(sheetName, `sheet not found; workbook has: ${workbook.SheetNames.join(", ")}`);
    return undefined;
  }
  return XLSX.utils.sheet_to_json(sheet, { header: 1, defval: null, raw: true });
}

/**
 * Finds the 0-based column index for each required header in a header row.
 */
function mapHeaders(headerRow, wanted, sheetName, diagnostics) {
  const indices = {};
  for (const [header, key] of Object.entries(wanted)) {
    const idx = headerRow.findIndex(
      (h) => typeof h === "string" && h.trim() === header
    );
    if (idx === -1) diagnostics.error(sheetName, `header "${header}" not found in row 1`);
    else indices[key] = idx;
  }
  return indices;
}

/**
 * Reads table-level metadata from the "3.0 Tables" sheet.
 *
 * Returns:
 *   Map of table name -> { position, description, notes }.
 */
function readTablesSheet(workbook, diagnostics) {
  const rows = readRows(workbook, TABLES_SHEET, diagnostics);
  if (!rows) return {};
  // The header row is the one containing "Table" and "Definition".
  const headerIndex = rows.findIndex(
    (r) => r.includes("Table") && r.includes("Definition") && r.includes("Purpose")
  );
  if (headerIndex === -1) {
    diagnostics.error(TABLES_SHEET, 'could not find a header row with "Table", "Definition", and "Purpose"');
    return {};
  }
  const header = rows[headerIndex];
  const nameCol = header.indexOf("Table");
  const positionCol = nameCol + 1; // unlabeled column immediately after "Table"
  const descriptionCol = header.indexOf("Definition");
  const notesCol = header.indexOf("Purpose");

  const tables = {};
  for (let r = headerIndex + 1; r < rows.length; r++) {
    const row = rows[r];
    const name = row[nameCol];
    if (isBlank(name)) continue;
    const where = cellRef(TABLES_SHEET, r, nameCol);
    if (typeof name !== "string" || name !== name.trim()) {
      diagnostics.error(where, `table name ${JSON.stringify(name)} must be a trimmed string`);
      continue;
    }
    if (tables[name]) {
      diagnostics.error(where, `table "${name}" is listed twice`);
      continue;
    }
    const position = row[positionCol];
    if (!Number.isInteger(position))
      diagnostics.error(cellRef(TABLES_SHEET, r, positionCol), `position for "${name}" must be an integer`);
    for (const [col, what] of [[descriptionCol, "Definition"], [notesCol, "Purpose"]])
      if (isBlank(row[col]) || typeof row[col] !== "string")
        diagnostics.error(cellRef(TABLES_SHEET, r, col), `${what} for "${name}" must be non-empty text`);
    tables[name] = {
      position,
      description: row[descriptionCol],
      notes: row[notesCol],
      where,
    };
  }
  return tables;
}

/**
 * Builds the model's "tables" object from the workbook.
 *
 * Args:
 *   workbook: SheetJS workbook.
 *   diagnostics: Diagnostics collecting source problems with cell references.
 *
 * Returns:
 *   The tables object, or undefined if errors prevent building it.
 */
export function buildTables(workbook, diagnostics) {
  const tableMeta = readTablesSheet(workbook, diagnostics);
  const rows = readRows(workbook, COLUMNS_SHEET, diagnostics);
  if (!rows || !rows.length) return undefined;
  const col = mapHeaders(rows[0], COLUMN_HEADERS, COLUMNS_SHEET, diagnostics);
  if (!diagnostics.ok) return undefined;
  // Column A holds the spreadsheet's own position formula. We recompute
  // positions from the Table column and only use A as a cross-check.
  const positionCol = 0;

  const tables = {};
  let currentTable = null;
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const cell = (key) => row[col[key]];
    const ref = (key) => cellRef(COLUMNS_SHEET, r, col[key]);
    const tableName = cell("table");
    const columnName = cell("column");

    if (isBlank(tableName) && isBlank(columnName)) {
      currentTable = null; // spacer row between tables
      const stray = Object.keys(COLUMN_HEADERS)
        .map((h) => COLUMN_HEADERS[h])
        .filter((k) => !isBlank(cell(k)));
      if (stray.length)
        diagnostics.error(cellRef(COLUMNS_SHEET, r, 0), `row has no Table or Column Name but has content in ${stray.join(", ")}`);
      continue;
    }
    if (isBlank(tableName) || isBlank(columnName)) {
      diagnostics.error(cellRef(COLUMNS_SHEET, r, 0), "row must have both Table and Column Name, or neither");
      continue;
    }

    if (!tables[tableName]) {
      if (currentTable !== null && currentTable !== tableName && tables[currentTable] === undefined) {
        // unreachable; kept for clarity
      }
      const meta = tableMeta[tableName];
      if (!meta) {
        diagnostics.error(ref("table"), `table "${tableName}" is not listed in the "${TABLES_SHEET}" sheet`);
        tables[tableName] = { columns: {}, invalid: true, rows: [] };
      } else {
        tables[tableName] = {
          label: tableName.charAt(0).toUpperCase() + tableName.slice(1),
          position: meta.position,
          description: meta.description,
          notes: meta.notes,
          columns: {},
          rows: [],
        };
      }
    } else if (currentTable !== tableName) {
      diagnostics.error(ref("table"), `table "${tableName}" appears in more than one block of rows; each table's rows must be contiguous`);
    }
    currentTable = tableName;
    const table = tables[tableName];

    if (typeof columnName !== "string" || columnName !== columnName.trim()) {
      diagnostics.error(ref("column"), `column name ${JSON.stringify(columnName)} must be a trimmed string`);
      continue;
    }
    if (table.columns[columnName]) {
      diagnostics.error(ref("column"), `column "${tableName}.${columnName}" is defined twice`);
      continue;
    }

    const position = Object.keys(table.columns).length + 1;
    const sheetPosition = row[positionCol];
    if (sheetPosition !== position)
      diagnostics.warn(cellRef(COLUMNS_SHEET, r, positionCol), `sheet position ${JSON.stringify(sheetPosition)} disagrees with computed position ${position} for ${tableName}.${columnName}`);

    const column = {};
    for (const key of ["label", "group", "type"]) {
      const v = cell(key);
      if (isBlank(v)) diagnostics.error(ref(key), `${key} is required for ${tableName}.${columnName}`);
      column[key] = v;
    }
    // Emission order matters; see COLUMN_KEYS in lib.mjs.
    const ordered = {
      label: column.label,
      group: column.group,
      position,
      type: column.type,
    };
    const scalar = (key) => {
      const v = cell(key);
      if (!isBlank(v)) {
        if (typeof v !== "string") diagnostics.error(ref(key), `${key} must be text, got ${typeof v}`);
        ordered[key] = unescapeLegacyApostrophes(typeof v === "string" ? v : String(v), ref(key), diagnostics);
      }
    };
    for (const key of ["label", "group", "type"])
      if (typeof column[key] === "string")
        column[key] = unescapeLegacyApostrophes(column[key], ref(key), diagnostics);
    ordered.label = column.label;
    ordered.group = column.group;
    ordered.type = column.type;
    const list = (key) => {
      const v = cell(key);
      if (isBlank(v)) return;
      if (typeof v !== "string") {
        diagnostics.error(ref(key), `${key} must be text, got ${typeof v}`);
        return;
      }
      const parsed = parseListFragment(v, diagnostics, `${ref(key)} (${tableName}.${columnName})`);
      if (parsed) ordered[key] = parsed;
    };
    scalar("unit");
    list("urls");
    scalar("description");
    scalar("notes");
    list("examples");
    list("validations");
    list("previous_columns");

    table.columns[columnName] = ordered;
    table.rows.push(r);
  }

  // Every table in the Tables sheet should have columns, and vice versa.
  for (const [name, meta] of Object.entries(tableMeta))
    if (!tables[name]) diagnostics.error(meta.where, `table "${name}" has no rows in "${COLUMNS_SHEET}"`);

  if (!diagnostics.ok) return undefined;

  // Order tables by position and strip bookkeeping.
  const result = {};
  for (const [name, table] of Object.entries(tables).sort((a, b) => a[1].position - b[1].position)) {
    const { rows: _rows, ...rest } = table;
    result[name] = rest;
  }
  return result;
}

function parseArgs(argv) {
  const args = { check: false, legacy: false, updatedDay: null, workbook: null, out: MODEL_PATH };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--check") args.check = true;
    else if (a === "--legacy") args.legacy = true;
    else if (a === "--updated-day") args.updatedDay = argv[++i];
    else if (a === "--out") args.out = path.resolve(argv[++i]);
    else if (a.startsWith("--")) throw new Error(`unknown option ${a}`);
    else if (!args.workbook) args.workbook = a;
    else throw new Error(`unexpected argument ${a}`);
  }
  if (!args.workbook)
    throw new Error("usage: build.mjs <workbook.xlsx> [--check] [--updated-day YYYY:MM:DD] [--out path]");
  // Some npm/shell combinations pass a quoted path through with its quotes.
  args.workbook = args.workbook.trim().replace(/^(['"])(.*)\1$/s, "$2");
  if (!fs.existsSync(args.workbook))
    throw new Error(`workbook not found: ${args.workbook}`);
  if (args.updatedDay && !/^\d{4}:\d{2}:\d{2}$/.test(args.updatedDay))
    throw new Error("--updated-day must be YYYY:MM:DD");
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const diagnostics = new Diagnostics();

  const existing = loadModelFile(args.out, diagnostics);
  if (!existing) {
    diagnostics.print();
    process.exit(1);
  }

  const workbook = XLSX.readFile(args.workbook);
  const tables = buildTables(workbook, diagnostics);
  if (!tables) {
    diagnostics.print();
    process.stderr.write("build failed: fix the spreadsheet problems above and re-export\n");
    process.exit(1);
  }

  const changes = deepDiff(existing.tables, tables);
  const model = {
    updated_day: existing.updated_day,
    published_day: existing.published_day,
    data_model_version: existing.data_model_version,
    criteria_map: existing.criteria_map,
    tables,
  };
  if (changes.length && !args.check) model.updated_day = args.updatedDay || todayStamp();

  const source = await serializeModel(model);
  const validation = await validateSource(source, {
    label: path.relative(process.cwd(), args.out),
  });
  diagnostics.merge(validation);
  diagnostics.print(process.stderr, { legacy: args.legacy });
  if (!diagnostics.ok) {
    process.stderr.write("build failed: generated model did not validate; nothing written\n");
    process.exit(1);
  }

  const onDisk = fs.readFileSync(args.out, "utf8");
  for (const c of changes) {
    const fmt = (v) => (v === undefined ? "(absent)" : JSON.stringify(v));
    process.stderr.write(`changed: tables.${c.path}: ${fmt(c.from)} -> ${fmt(c.to)}\n`);
  }

  if (args.check) {
    if (source === onDisk) {
      process.stderr.write("OK: 3.0.js matches the workbook\n");
      process.exit(0);
    }
    process.stderr.write(
      changes.length
        ? `DRIFT: ${changes.length} difference(s) between the workbook and ${args.out}\n`
        : `DRIFT: ${args.out} content matches the workbook but the file text differs (formatting or header); rebuild to normalize\n`
    );
    process.exit(1);
  }

  if (source === onDisk) {
    process.stderr.write("no changes; file left untouched\n");
    return;
  }
  fs.writeFileSync(args.out, source);
  process.stderr.write(
    `wrote ${path.relative(process.cwd(), args.out)} (${changes.length} table change(s)${changes.length ? `, updated_day ${model.updated_day}` : ""})\n`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    process.stderr.write(`${err.stack || err}\n`);
    process.exit(2);
  });
}
