// Shared helpers for building and validating lib/configs/magic/data_models/3.0.js.
//
// Everything here is plain Node (no Meteor) so it can run in CI. Model files are
// never executed: they are parsed with acorn and evaluated as pure literals, which
// is what lets us detect duplicate keys that a runtime object cannot express.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as acorn from "acorn";

export const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  ".."
);
export const MODEL_PATH = path.join(
  REPO_ROOT,
  "lib/configs/magic/data_models/3.0.js"
);
export const PREVIOUS_MODEL_PATH = path.join(
  REPO_ROOT,
  "lib/configs/magic/data_models/2.5.js"
);
export const CVS_PATH = path.join(
  REPO_ROOT,
  "lib/modules/er/controlled_vocabularies.js"
);
export const SVS_PATH = path.join(
  REPO_ROOT,
  "lib/modules/er/suggested_vocabularies.js"
);

export const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1ldYzO6WMyxfVT6gv3imKaZIVqvp97uPmWijT_ElpZnY";

// Key emission order. Changing these reorders the whole generated file, which
// makes diffs unreviewable, so treat them as part of the file format.
export const MODEL_KEYS = [
  "updated_day",
  "published_day",
  "data_model_version",
  "criteria_map",
  "tables",
];
export const TABLE_KEYS = ["label", "position", "description", "notes", "columns"];
export const COLUMN_KEYS = [
  "label",
  "group",
  "position",
  "type",
  "unit",
  "urls",
  "description",
  "notes",
  "examples",
  "validations",
  "previous_columns",
];
export const COLUMN_REQUIRED_KEYS = ["label", "group", "position", "type"];
export const PREVIOUS_COLUMN_KEYS = ["table", "column"];

// Header written to the top of the generated 3.0.js.
export const FILE_HEADER = `/* GENERATED FILE. Do not edit the "tables" object by hand.

   The MagIC 3.0 data model is maintained in the Google Sheet
   ${SHEET_URL}

   To update this file after editing the sheet:

     1) In the sheet: File > Download > Microsoft Excel (.xlsx)
     2) npm run data-model:build -- "/path/to/MagIC Data Model 3.0.xlsx"
     3) Review the diff, then commit.

   The script reads the "3.0 Columns" and "3.0 Tables" sheets, rebuilds "tables",
   and validates the result. "updated_day", "published_day", "data_model_version",
   and "criteria_map" are maintained in this file and preserved across builds.
   Run "npm run data-model:validate" to check the file without a workbook.
   See .scripts/data_model/README.md for details.
*/
`;

// ---------------------------------------------------------------------------
// Diagnostics

export class Diagnostics {
  constructor() {
    this.errors = [];
    this.warnings = [];
    // "legacy" findings concern only the 2.5 -> 3.0 upgrade path (criteria_map,
    // previous_columns). They are hidden unless printed with { legacy: true }.
    this.legacy = [];
  }
  error(where, message) {
    this.errors.push({ where, message });
  }
  warn(where, message) {
    this.warnings.push({ where, message });
  }
  legacyNote(where, message) {
    this.legacy.push({ where, message });
  }
  merge(other) {
    this.errors.push(...other.errors);
    this.warnings.push(...other.warnings);
    this.legacy.push(...other.legacy);
  }
  get ok() {
    return this.errors.length === 0;
  }
  print(stream = process.stderr, { legacy = false } = {}) {
    if (legacy)
      for (const l of this.legacy) stream.write(`legacy: ${l.where}: ${l.message}\n`);
    for (const w of this.warnings)
      stream.write(`warning: ${w.where}: ${w.message}\n`);
    for (const e of this.errors) stream.write(`error: ${e.where}: ${e.message}\n`);
  }
}

// ---------------------------------------------------------------------------
// Literal evaluation

/**
 * Evaluates an acorn AST node that must consist only of literals.
 *
 * Args:
 *   node: acorn node (ObjectExpression, ArrayExpression, Literal, ...).
 *   diagnostics: Diagnostics to report duplicate keys and non-literal nodes.
 *   where: Function mapping a node to a human-readable location string.
 *   keyPath: Path of keys from the root, for messages.
 *
 * Returns:
 *   The evaluated JavaScript value. Duplicate object keys are reported and the
 *   last occurrence wins, mirroring what a JS engine would do.
 */
export function evaluateLiteral(node, diagnostics, where, keyPath = []) {
  const loc = () => `${where(node)}${keyPath.length ? " at " + keyPath.join(".") : ""}`;
  switch (node.type) {
    case "Literal":
      return node.value;
    case "TemplateLiteral":
      if (node.expressions.length) {
        diagnostics.error(loc(), "template literal with expressions is not allowed");
        return undefined;
      }
      return node.quasis.map((q) => q.value.cooked).join("");
    case "UnaryExpression":
      if (
        (node.operator === "-" || node.operator === "+") &&
        node.argument.type === "Literal" &&
        typeof node.argument.value === "number"
      ) {
        return node.operator === "-" ? -node.argument.value : node.argument.value;
      }
      diagnostics.error(loc(), `unary ${node.operator} is not allowed here`);
      return undefined;
    case "ArrayExpression":
      return node.elements.map((el, i) => {
        if (el === null || el.type === "SpreadElement") {
          diagnostics.error(loc(), `array element ${i} is a hole or spread`);
          return undefined;
        }
        return evaluateLiteral(el, diagnostics, where, [...keyPath, String(i)]);
      });
    case "ObjectExpression": {
      const result = {};
      const seen = new Set();
      for (const prop of node.properties) {
        if (prop.type !== "Property" || prop.computed || prop.kind !== "init") {
          diagnostics.error(loc(), "only plain key: value properties are allowed");
          continue;
        }
        const key =
          prop.key.type === "Identifier" ? prop.key.name : String(prop.key.value);
        if (seen.has(key)) {
          diagnostics.error(
            `${where(prop)}`,
            `duplicate key "${key}" in ${keyPath.join(".") || "root object"}`
          );
        }
        seen.add(key);
        result[key] = evaluateLiteral(prop.value, diagnostics, where, [
          ...keyPath,
          key,
        ]);
      }
      return result;
    }
    default:
      diagnostics.error(loc(), `unexpected ${node.type}; only literals are allowed`);
      return undefined;
  }
}

/**
 * Parses an ES module source and returns the literal value of `export const <name>`.
 *
 * Args:
 *   source: Module source text.
 *   exportName: Name of the exported constant to evaluate.
 *   diagnostics: Diagnostics for parse and structural problems.
 *   label: Location label used in messages (usually the file path).
 *
 * Returns:
 *   The evaluated value, or undefined if parsing failed. Duplicate keys are
 *   reported to diagnostics but the value is still returned.
 */
export function evaluateModuleExport(source, exportName, diagnostics, label) {
  let ast;
  try {
    ast = acorn.parse(source, {
      ecmaVersion: 2022,
      sourceType: "module",
      locations: true,
    });
  } catch (err) {
    diagnostics.error(label, `does not parse as an ES module: ${err.message}`);
    return undefined;
  }
  const where = (node) => `${label}:${node.loc.start.line}:${node.loc.start.column + 1}`;
  const exports = ast.body.filter((n) => n.type === "ExportNamedDeclaration");
  const decls = exports.flatMap((n) =>
    n.declaration && n.declaration.type === "VariableDeclaration"
      ? n.declaration.declarations
      : []
  );
  const decl = decls.find(
    (d) => d.id.type === "Identifier" && d.id.name === exportName
  );
  if (!decl) {
    diagnostics.error(label, `no "export const ${exportName}" found`);
    return undefined;
  }
  if (ast.body.length !== exports.length || decls.length !== 1) {
    diagnostics.warn(
      label,
      `module contains statements other than "export const ${exportName}"`
    );
  }
  return evaluateLiteral(decl.init, diagnostics, where);
}

/**
 * Loads a model file (e.g. 3.0.js) as a plain object without executing it.
 */
export function loadModelFile(filePath, diagnostics = new Diagnostics()) {
  const source = fs.readFileSync(filePath, "utf8");
  return evaluateModuleExport(source, "model", diagnostics, path.relative(REPO_ROOT, filePath));
}

/**
 * Parses a spreadsheet "raw-injected" fragment such as `'Dike','Sill'` or
 * `{'table':'er_sites','column':'site_lat'}` as the contents of a JS array.
 *
 * Args:
 *   fragment: Cell contents.
 *   diagnostics: Diagnostics for syntax or non-literal content.
 *   where: Location label for messages (e.g. "3.0 Columns!P123").
 *
 * Returns:
 *   The parsed array, or undefined on failure.
 */
export function parseListFragment(fragment, diagnostics, where) {
  let ast;
  try {
    ast = acorn.parseExpressionAt(`[${fragment}]`, 0, { ecmaVersion: 2022 });
  } catch (err) {
    diagnostics.error(where, `list fragment does not parse: ${err.message}`);
    return undefined;
  }
  if (ast.end !== fragment.length + 2) {
    diagnostics.error(where, "list fragment has trailing content after the list");
    return undefined;
  }
  const local = new Diagnostics();
  const value = evaluateLiteral(ast, local, () => where);
  diagnostics.merge(local);
  return local.ok ? value : undefined;
}

// ---------------------------------------------------------------------------
// Serialization

/**
 * Returns a copy of `value` with object keys ordered per the model's canonical
 * key order at each depth. Unknown keys are kept, after the known ones, in
 * their original order.
 */
export function orderModel(model) {
  const pick = (obj, keys) => {
    const out = {};
    for (const k of keys) if (k in obj) out[k] = obj[k];
    for (const k of Object.keys(obj)) if (!(k in out)) out[k] = obj[k];
    return out;
  };
  const ordered = pick(model, MODEL_KEYS);
  if (ordered.tables) {
    const tables = {};
    for (const [name, table] of Object.entries(ordered.tables)) {
      const t = pick(table, TABLE_KEYS);
      if (t.columns) {
        const columns = {};
        for (const [cname, col] of Object.entries(t.columns)) {
          const c = pick(col, COLUMN_KEYS);
          if (Array.isArray(c.previous_columns))
            c.previous_columns = c.previous_columns.map((p) =>
              p && typeof p === "object" ? pick(p, PREVIOUS_COLUMN_KEYS) : p
            );
          columns[cname] = c;
        }
        t.columns = columns;
      }
      tables[name] = t;
    }
    ordered.tables = tables;
  }
  return ordered;
}

/**
 * Serializes a model object to the 3.0.js source text, Prettier-formatted.
 */
export async function serializeModel(model) {
  const prettier = await import("prettier");
  const raw =
    FILE_HEADER + "\nexport const model = " + stringifyForPrettier(orderModel(model)) + ";\n";
  return prettier.format(raw, { parser: "babel", filepath: MODEL_PATH });
}

/**
 * Serializes a value as a JS literal shaped for Prettier.
 *
 * Prettier keeps an object literal multi-line if there is a newline between
 * its opening brace and first key, and otherwise collapses it when it fits.
 * The committed 3.0.js has every object expanded except the small
 * {table, column} objects inside previous_columns arrays, so objects that are
 * direct array elements are emitted compact and all others expanded.
 */
export function stringifyForPrettier(value, inArray = false, key = null) {
  if (Array.isArray(value))
    return "[" + value.map((v) => stringifyForPrettier(v, true)).join(",") + "]";
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value).map(
      ([k, v]) => JSON.stringify(k) + ":" + stringifyForPrettier(v, false, k)
    );
    if (!entries.length) return "{}";
    if (inArray) return "{" + entries.join(",") + "}";
    // Prettier preserves a single blank line between properties; the committed
    // file separates the nine tables that way.
    const sep = key === "tables" ? ",\n\n" : ",\n";
    return "{\n" + entries.join(sep) + "\n}";
  }
  return JSON.stringify(value);
}

/**
 * Reports paths at which two plain values differ. Used to summarize drift.
 */
export function deepDiff(a, b, keyPath = "", out = []) {
  const isObj = (v) => v !== null && typeof v === "object";
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length || a.some((v, i) => JSON.stringify(v) !== JSON.stringify(b[i])))
      out.push({ path: keyPath, from: a, to: b });
  } else if (isObj(a) && isObj(b) && !Array.isArray(a) && !Array.isArray(b)) {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const p = keyPath ? `${keyPath}.${k}` : k;
      if (!(k in a)) out.push({ path: p, from: undefined, to: b[k] });
      else if (!(k in b)) out.push({ path: p, from: a[k], to: undefined });
      else deepDiff(a[k], b[k], p, out);
    }
  } else if (a !== b) {
    out.push({ path: keyPath, from: a, to: b });
  }
  return out;
}

export function todayStamp(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}:${m}:${d}`;
}
