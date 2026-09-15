#!/usr/bin/env node
// Validates lib/configs/magic/data_models/3.0.js without Meteor.
//
//   node .scripts/data_model/validate.mjs [path/to/3.0.js] [--strict] [--legacy]
//
// Exit status is 1 if any error is found, or if --strict is given and any
// warning is found. Errors are structural problems the build pipeline should
// make impossible (duplicate keys, key order, positions, unparseable content).
// Warnings are content problems that need a human decision (a validation rule
// referencing a column that does not exist, trailing whitespace in a
// description). Findings that only affect the 2.5 -> 3.0 upgrade path
// (criteria_map entries, previous_columns against the 2.5 model) are hidden
// unless --legacy is given and never affect the exit status.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  COLUMN_KEYS,
  COLUMN_REQUIRED_KEYS,
  CVS_PATH,
  Diagnostics,
  MODEL_KEYS,
  MODEL_PATH,
  PREVIOUS_COLUMN_KEYS,
  PREVIOUS_MODEL_PATH,
  REPO_ROOT,
  SVS_PATH,
  TABLE_KEYS,
  evaluateModuleExport,
} from "./lib.mjs";

const DAY_RE = /^\d{4}:\d{2}:\d{2}$/;
const COLUMN_TYPES = new Set([
  "Integer",
  "Number",
  "String",
  "Text",
  "List",
  "Timestamp",
  "Matrix",
  "Dictionary",
]);
// Validation functions understood by lib/modules/magic/validate_contribution.js
// plus the informational ones that appear in the model and are consumed by
// the client (downloadOnly, recommended, ...). Update this list when adding a
// validation function to the validator.
const VALIDATION_FUNCTIONS = new Set([
  "cv",
  "downloadOnly",
  "in",
  "key",
  "matrix",
  "max",
  "min",
  "recommended",
  "required",
  "requiredIf",
  "requiredIfGroup",
  "requiredOneInGroup",
  "requiredUnless",
  "requiredUnlessNatural",
  "requiredUnlessSynthetic",
  "requiredUnlessTable",
  "sv",
  "type",
  "unique",
]);
const TYPE_VALIDATION_ARGS = new Set([
  "references",
  "users",
  "method_codes",
  "url",
  "pole_conf",
  "igsn",
  "aniso_v",
  "date_time",
]);
const CRITERION_OPERATIONS = new Set(["=", "<", "<=", ">", ">=", "!=", "contains"]);

/**
 * Loads a vocabulary module (cvs or svs) as a plain object, or undefined.
 */
function loadVocabulary(filePath, exportName, diagnostics) {
  if (!fs.existsSync(filePath)) {
    diagnostics.warn(path.relative(REPO_ROOT, filePath), "not found; skipping vocabulary checks");
    return undefined;
  }
  const local = new Diagnostics();
  const value = evaluateModuleExport(
    fs.readFileSync(filePath, "utf8"),
    exportName,
    local,
    path.relative(REPO_ROOT, filePath)
  );
  if (!local.ok) {
    diagnostics.warn(path.relative(REPO_ROOT, filePath), "could not be evaluated; skipping vocabulary checks");
    return undefined;
  }
  return value;
}

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function checkKeyOrder(obj, canonical, where, diagnostics) {
  const keys = Object.keys(obj);
  const unknown = keys.filter((k) => !canonical.includes(k));
  for (const k of unknown) diagnostics.error(where, `unknown key "${k}"`);
  const known = keys.filter((k) => canonical.includes(k));
  const expected = canonical.filter((k) => known.includes(k));
  if (known.join(",") !== expected.join(","))
    diagnostics.error(
      where,
      `keys out of order: [${known.join(", ")}]; expected [${expected.join(", ")}]`
    );
}

function checkPositions(items, where, diagnostics) {
  const positions = items.map(([, v]) => v.position);
  const sorted = [...positions].sort((a, b) => a - b);
  const contiguous = sorted.every((p, i) => p === i + 1);
  if (!contiguous)
    diagnostics.error(
      where,
      `positions are not unique and contiguous from 1: [${positions.join(", ")}]`
    );
  const inOrder = positions.every((p, i) => i === 0 || p > positions[i - 1]);
  if (contiguous && !inOrder)
    diagnostics.error(where, "entries are not in position order");
}

function checkStringArray(arr, where, diagnostics, what) {
  if (!Array.isArray(arr)) {
    diagnostics.error(where, `${what} must be an array`);
    return false;
  }
  arr.forEach((v, i) => {
    if (typeof v !== "string" || v === "")
      diagnostics.error(where, `${what}[${i}] must be a non-empty string`);
  });
  return true;
}

function splitQuotedArgs(args) {
  // Arguments in the model are always either bare (min(0)), a single quoted
  // string (cv("x")), or several quoted strings (requiredUnless("a","b")).
  const m = args.match(/^"(.*)"$/s);
  if (!m) return null;
  return m[1].split('","');
}

/**
 * Checks one validation rule string against the rest of the model.
 */
function checkValidation(rule, table, column, model, vocab, where, diagnostics) {
  const m = rule.match(/^([A-Za-z]+)\((.*)\)$/s);
  if (!m) {
    diagnostics.error(where, `validation "${rule}" is not of the form name(args)`);
    return;
  }
  const [, fn, args] = m;
  if (!VALIDATION_FUNCTIONS.has(fn)) {
    diagnostics.error(where, `unknown validation function "${fn}" in "${rule}"`);
    return;
  }
  const columns = model.tables[table].columns;
  const quoted = splitQuotedArgs(args);
  switch (fn) {
    case "min":
    case "max":
      // Either a number, or a quoted column name in the same table (a bound
      // supplied by another column, e.g. lat_s has max("lat_n")). The runtime
      // validator only enforces the numeric form.
      if (quoted) {
        if (quoted.length !== 1 || !columns[quoted[0]])
          diagnostics.warn(where, `${fn}(${args}) references a column that is not in the ${table} table`);
      } else if (!/^-?\d+(\.\d+)?([eE][-+]?\d+)?$/.test(args)) {
        diagnostics.error(where, `${fn}() argument "${args}" is neither a number nor a quoted column name`);
      }
      break;
    case "matrix":
      if (!/^\d+,\d+$/.test(args))
        diagnostics.error(where, `matrix() argument "${args}" should be rows,cols`);
      break;
    case "cv":
    case "sv": {
      if (!quoted || quoted.length !== 1) {
        diagnostics.error(where, `${fn}() takes one quoted argument, got "${args}"`);
        break;
      }
      const dict = fn === "cv" ? vocab.cvs : vocab.svs;
      if (dict && !dict[quoted[0]])
        diagnostics.warn(
          where,
          `${fn}("${quoted[0]}") does not match any ${fn === "cv" ? "controlled" : "suggested"} vocabulary`
        );
      break;
    }
    case "in": {
      const ref = quoted && quoted.length === 1 && quoted[0].split(".");
      if (!ref || ref.length !== 2) {
        diagnostics.error(where, `in() argument must be "table.column", got "${args}"`);
        break;
      }
      if (!model.tables[ref[0]] || !model.tables[ref[0]].columns[ref[1]])
        diagnostics.error(where, `in("${quoted[0]}") does not resolve to a column`);
      break;
    }
    case "requiredIf":
    case "requiredUnless":
      if (!quoted) {
        diagnostics.error(where, `${fn}() takes quoted column names, got "${args}"`);
        break;
      }
      for (const c of quoted)
        if (!columns[c])
          diagnostics.warn(where, `${fn}("${c}") references a column that is not in the ${table} table`);
      break;
    case "requiredIfGroup":
    case "requiredOneInGroup":
      if (!quoted || quoted.length !== 1) {
        diagnostics.error(where, `${fn}() takes one quoted group name, got "${args}"`);
        break;
      }
      if (!Object.values(columns).some((c) => c.group === quoted[0]))
        diagnostics.error(where, `${fn}("${quoted[0]}") references a group that is not in the ${table} table`);
      break;
    case "requiredUnlessTable":
      if (!quoted || quoted.length !== 1 || !model.tables[quoted[0]])
        diagnostics.error(where, `${fn}(${args}) does not reference a table`);
      break;
    case "type":
      if (!quoted || quoted.length !== 1) {
        diagnostics.error(where, `type() takes one quoted argument, got "${args}"`);
        break;
      }
      if (!TYPE_VALIDATION_ARGS.has(quoted[0]))
        diagnostics.warn(where, `type("${quoted[0]}") is not a known type check`);
      break;
    default:
      if (args !== "")
        diagnostics.error(where, `${fn}() takes no arguments, got "${args}"`);
  }
}

/**
 * Validates a model object (already parsed). Structural checks are errors;
 * content checks that require a human decision are warnings.
 *
 * Args:
 *   model: The evaluated model object.
 *   diagnostics: Diagnostics to append to.
 *   options.previousModel: The 2.5 model object for previous_columns checks.
 *   options.cvs, options.svs: Vocabulary objects, or undefined to skip.
 *   options.label: Location prefix for messages.
 */
export function validateModelObject(model, diagnostics, options = {}) {
  const label = options.label || "model";
  const vocab = { cvs: options.cvs, svs: options.svs };
  if (!isPlainObject(model)) {
    diagnostics.error(label, "model is not an object");
    return;
  }
  checkKeyOrder(model, MODEL_KEYS, label, diagnostics);
  for (const k of MODEL_KEYS) if (!(k in model)) diagnostics.error(label, `missing key "${k}"`);

  for (const k of ["updated_day", "published_day"])
    if (typeof model[k] !== "string" || !DAY_RE.test(model[k]))
      diagnostics.error(`${label}.${k}`, `must be a "YYYY:MM:DD" string`);
  if (model.data_model_version !== "3.0")
    diagnostics.error(`${label}.data_model_version`, `must be "3.0"`);

  if (!isPlainObject(model.tables)) {
    diagnostics.error(`${label}.tables`, "must be an object");
    return;
  }

  const tables = Object.entries(model.tables);
  checkPositions(tables, `${label}.tables`, diagnostics);
  for (const [tname, table] of tables) {
    const twhere = `${label}.tables.${tname}`;
    if (!isPlainObject(table)) {
      diagnostics.error(twhere, "must be an object");
      continue;
    }
    checkKeyOrder(table, TABLE_KEYS, twhere, diagnostics);
    for (const k of TABLE_KEYS) if (!(k in table)) diagnostics.error(twhere, `missing key "${k}"`);
    const expectedLabel = tname.charAt(0).toUpperCase() + tname.slice(1);
    if (table.label !== expectedLabel)
      diagnostics.error(twhere, `label "${table.label}" should be "${expectedLabel}"`);
    if (!Number.isInteger(table.position)) diagnostics.error(twhere, "position must be an integer");
    for (const k of ["description", "notes"])
      if (typeof table[k] !== "string" || table[k] === "")
        diagnostics.error(twhere, `${k} must be a non-empty string`);
    if (!isPlainObject(table.columns)) {
      diagnostics.error(twhere, "columns must be an object");
      continue;
    }

    const columns = Object.entries(table.columns);
    checkPositions(columns, `${twhere}.columns`, diagnostics);
    for (const [cname, col] of columns) {
      const cwhere = `${twhere}.${cname}`;
      if (!isPlainObject(col)) {
        diagnostics.error(cwhere, "must be an object");
        continue;
      }
      if (!/^[a-z][A-Za-z0-9_]*$/.test(cname))
        diagnostics.error(cwhere, "column name must start with a lowercase letter and contain only letters, digits, and underscores");
      checkKeyOrder(col, COLUMN_KEYS, cwhere, diagnostics);
      for (const k of COLUMN_REQUIRED_KEYS)
        if (!(k in col)) diagnostics.error(cwhere, `missing key "${k}"`);
      for (const k of ["label", "group", "type", "unit", "description", "notes"]) {
        if (!(k in col)) continue;
        if (typeof col[k] !== "string" || col[k] === "") {
          diagnostics.error(cwhere, `${k} must be a non-empty string`);
        } else if (col[k] !== col[k].trim()) {
          diagnostics.warn(cwhere, `${k} has leading or trailing whitespace`);
        }
      }
      if (!("description" in col)) diagnostics.warn(cwhere, "has no description");
      if (!Number.isInteger(col.position)) diagnostics.error(cwhere, "position must be an integer");
      if (typeof col.type === "string" && !COLUMN_TYPES.has(col.type))
        diagnostics.error(cwhere, `unknown type "${col.type}"`);
      for (const k of ["urls", "examples", "validations"])
        if (k in col) checkStringArray(col[k], cwhere, diagnostics, k);
      if (Array.isArray(col.validations)) {
        const seen = new Set();
        for (const rule of col.validations) {
          if (typeof rule !== "string") continue;
          if (seen.has(rule)) diagnostics.error(cwhere, `duplicate validation "${rule}"`);
          seen.add(rule);
          checkValidation(rule, tname, cname, model, vocab, cwhere, diagnostics);
        }
      }
      if ("previous_columns" in col) {
        if (!Array.isArray(col.previous_columns)) {
          diagnostics.error(cwhere, "previous_columns must be an array");
        } else {
          col.previous_columns.forEach((p, i) => {
            const pwhere = `${cwhere}.previous_columns[${i}]`;
            if (!isPlainObject(p)) {
              diagnostics.error(pwhere, "must be an object");
              return;
            }
            checkKeyOrder(p, PREVIOUS_COLUMN_KEYS, pwhere, diagnostics);
            for (const k of PREVIOUS_COLUMN_KEYS)
              if (typeof p[k] !== "string" || p[k] === "")
                diagnostics.error(pwhere, `${k} must be a non-empty string`);
            const prev = options.previousModel;
            if (prev && typeof p.table === "string") {
              if (!prev.tables[p.table])
                diagnostics.error(pwhere, `table "${p.table}" is not in the 2.5 model`);
              else if (!prev.tables[p.table].columns[p.column])
                diagnostics.legacyNote(pwhere, `column "${p.table}.${p.column}" is not in the 2.5 model`);
            }
          });
        }
      }
    }
  }

  if (!isPlainObject(model.criteria_map)) {
    diagnostics.error(`${label}.criteria_map`, "must be an object");
    return;
  }
  for (const [name, entry] of Object.entries(model.criteria_map)) {
    const where = `${label}.criteria_map.${name}`;
    if (!isPlainObject(entry)) {
      diagnostics.error(where, "must be an object");
      continue;
    }
    checkKeyOrder(entry, ["table_column", "criterion_operation"], where, diagnostics);
    if (!CRITERION_OPERATIONS.has(entry.criterion_operation))
      diagnostics.error(where, `unknown criterion_operation "${entry.criterion_operation}"`);
    const ref = typeof entry.table_column === "string" ? entry.table_column.split(".") : [];
    if (ref.length !== 2) diagnostics.error(where, `table_column must be "table.column"`);
    else if (!model.tables[ref[0]] || !model.tables[ref[0]].columns[ref[1]])
      diagnostics.legacyNote(where, `table_column "${entry.table_column}" does not resolve to a column in the 3.0 model (only matters when upgrading 2.5 contributions)`);
  }
}

/**
 * Validates 3.0.js source text: parse, duplicate keys, model checks, and
 * Prettier formatting.
 *
 * Args:
 *   source: File contents.
 *   options.label: Path used in messages.
 *   options.checkFormatting: Whether to run Prettier's formatting check.
 *
 * Returns:
 *   A Diagnostics instance.
 */
export async function validateSource(source, options = {}) {
  const label = options.label || path.relative(REPO_ROOT, MODEL_PATH);
  const diagnostics = new Diagnostics();
  const model = evaluateModuleExport(source, "model", diagnostics, label);
  if (model === undefined) return diagnostics;

  const previousModel = fs.existsSync(PREVIOUS_MODEL_PATH)
    ? evaluateModuleExport(
        fs.readFileSync(PREVIOUS_MODEL_PATH, "utf8"),
        "model",
        new Diagnostics(),
        "2.5.js"
      )
    : undefined;
  const cvs = loadVocabulary(CVS_PATH, "cvs", diagnostics);
  const svs = loadVocabulary(SVS_PATH, "svs", diagnostics);

  validateModelObject(model, diagnostics, { label, previousModel, cvs, svs });

  if (options.checkFormatting !== false) {
    const prettier = await import("prettier");
    const formatted = await prettier.check(source, { parser: "babel", filepath: MODEL_PATH });
    if (!formatted)
      diagnostics.error(label, "is not Prettier-formatted (run npm run data-model:build, or npx prettier --write on the file)");
  }
  return diagnostics;
}

async function main(argv) {
  const args = argv.slice(2);
  const strict = args.includes("--strict");
  const legacy = args.includes("--legacy");
  const positional = args.filter((a) => !a.startsWith("--"));
  const filePath = path.resolve(positional[0] || MODEL_PATH);
  const source = fs.readFileSync(filePath, "utf8");
  const diagnostics = await validateSource(source, {
    label: path.relative(process.cwd(), filePath) || filePath,
  });
  diagnostics.print(process.stderr, { legacy });
  const failed = !diagnostics.ok || (strict && diagnostics.warnings.length > 0);
  const legacyNote = diagnostics.legacy.length
    ? `, ${diagnostics.legacy.length} legacy note(s)${legacy ? "" : " (show with --legacy)"}`
    : "";
  process.stderr.write(
    `${diagnostics.errors.length} error(s), ${diagnostics.warnings.length} warning(s)${legacyNote}${failed ? "" : "; OK"}\n`
  );
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv).catch((err) => {
    process.stderr.write(`${err.stack || err}\n`);
    process.exit(2);
  });
}
