#!/usr/bin/env node
// Prints the OpenSearch mapping update for columns added to the 3.0 model.
//
//   node .scripts/data_model/mapping.mjs [--base <git-ref>] [path/to/3.0.js]
//
// The live index is created with `dynamic: "strict"` (see
// .scripts/tests/create_index_mapping.js), so a contribution that uses a
// column missing from the index mapping fails to index. After adding columns
// to the model, apply the printed body to the live index BEFORE deploying the
// new model:
//
//   curl -X PUT "$OPENSEARCH/magic/_mapping" -H 'Content-Type: application/json' \
//     --data-binary @mapping.json
//
// The body is computed from the columns present in the model file (default:
// the working tree's 3.0.js) but absent from the model at --base (default:
// HEAD), with the same per-type rules as create_index_mapping.js. Adding
// fields to an existing index is allowed and re-sending a field with an
// identical definition is a no-op, so an older --base is safe. A column whose
// type changed cannot be fixed this way (it needs a new index and a reindex);
// it is reported on stderr and the exit status is 1.

import { execFileSync } from "node:child_process";
import path from "node:path";
import {
  Diagnostics,
  MODEL_PATH,
  REPO_ROOT,
  evaluateModuleExport,
  loadModelFile,
} from "./lib.mjs";

const RANGE = (type) => ({
  type: "object",
  properties: {
    vals: { enabled: false },
    n: { type: "integer" },
    range: { type },
  },
});
const TEXT = { type: "text", fields: { raw: { type: "keyword" } } };
const DATE_FORMAT =
  "year||year_month||date||date_time||date_time_no_millis||yyyy-MM-dd'T'HH:mm:ss.SSZZ";

// One column's mapping, as columnsToMapping in create_index_mapping.js.
function columnMapping(type, isContribution) {
  switch (type) {
    case "Number":
      return RANGE("float_range");
    case "Integer":
      return isContribution ? { type: "integer" } : RANGE("integer_range");
    case "Timestamp":
      return isContribution
        ? { type: "date", format: DATE_FORMAT }
        : {
            type: "object",
            properties: {
              vals: { enabled: false },
              n: { type: "integer" },
              range: { type: "date_range", format: "epoch_millis" },
            },
          };
    case "String":
    case "List":
    case "Matrix":
      return TEXT;
    case "Dictionary":
      return { type: "object", properties: { key: TEXT, value: TEXT } };
    default:
      throw new Error(`Unknown column type ${type}`);
  }
}

// The summary objects a table's columns are mapped under.
function summaryPaths(table) {
  if (table === "contribution") return ["contribution"];
  if (table === "measurements") return ["experiments", "_all"];
  return [table, "_all"];
}

const args = process.argv.slice(2);
let base = "HEAD";
const baseAt = args.indexOf("--base");
if (baseAt !== -1) {
  base = args[baseAt + 1];
  args.splice(baseAt, 2);
}
const modelPath = args[0] ? path.resolve(args[0]) : MODEL_PATH;
const relPath = path.relative(REPO_ROOT, modelPath);

const diagnostics = new Diagnostics();
const current = loadModelFile(modelPath, diagnostics);
const baseSource = execFileSync("git", ["show", `${base}:${relPath}`], {
  cwd: REPO_ROOT,
  encoding: "utf8",
});
// Older committed models may carry structural errors (e.g. a duplicate key)
// that do not affect which columns they have: only an unparseable base fails.
const baseDiagnostics = new Diagnostics();
const previous = evaluateModuleExport(
  baseSource,
  "model",
  baseDiagnostics,
  `${base}:${relPath}`,
);
if (!previous) diagnostics.errors.push(...baseDiagnostics.errors);
if (!current || !previous || diagnostics.errors.length) {
  for (const e of diagnostics.errors)
    console.error(`error: ${e.where}: ${e.message}`);
  process.exit(1);
}

const summary = {};
const added = [];
const retyped = [];
for (const [table, model] of Object.entries(current.tables)) {
  const before = previous.tables[table]?.columns ?? {};
  for (const [column, def] of Object.entries(model.columns)) {
    if (before[column]) {
      if (before[column].type !== def.type)
        retyped.push(
          `${table}.${column}: ${before[column].type} -> ${def.type}`,
        );
      continue;
    }
    added.push(`${table}.${column} (${def.type})`);
    for (const target of summaryPaths(table)) {
      summary[target] ??= { properties: {} };
      summary[target].properties[column] = columnMapping(
        def.type,
        table === "contribution",
      );
    }
  }
}

console.error(
  `columns added since ${base}: ${added.length ? added.join(", ") : "none"}`,
);
for (const r of retyped)
  console.error(`type changed (needs a reindex, not a mapping update): ${r}`);
if (added.length)
  console.log(
    JSON.stringify(
      { properties: { summary: { properties: summary } } },
      null,
      2,
    ),
  );
process.exit(retyped.length ? 1 : 0);
