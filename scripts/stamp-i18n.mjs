#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { catalogs } from "../src/content/index.mjs";
import { site, pageOrder } from "../src/config.mjs";
import { digest } from "../src/lib/digest.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const lockPath = join(root, "src/content/i18n-lock.json");
const args = process.argv.slice(2);

function valueAfter(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : null;
}

const locale = valueAfter("--locale");
const reviewer = valueAfter("--reviewer");
const status = valueAfter("--status") ?? "human-reviewed";
const all = args.includes("--all");
const page = valueAfter("--page");

if (!locale || locale === site.sourceLocale) {
  throw new Error(`--locale must name a target locale, not ${site.sourceLocale}`);
}
if (!catalogs[locale]) throw new Error(`Unknown locale: ${locale}`);
if (!reviewer) throw new Error("--reviewer is required");
if (!all && !page) throw new Error("Use --all or --page <key>");
if (page && !pageOrder.includes(page)) throw new Error(`Unknown page: ${page}`);

let lock;
try {
  lock = JSON.parse(await readFile(lockPath, "utf8"));
} catch {
  lock = { schema: "psdresearch.i18n-lock.v1", sourceLocale: site.sourceLocale, targets: {} };
}

lock.schema = "psdresearch.i18n-lock.v1";
lock.sourceLocale = site.sourceLocale;
lock.targets ??= {};
lock.targets[locale] ??= {};

const keys = all ? pageOrder : [page];
const now = new Date().toISOString();
for (const key of keys) {
  lock.targets[locale][key] = {
    sourceDigest: digest(catalogs[site.sourceLocale].pages[key]),
    status,
    reviewer,
    reviewedAt: now
  };
}

await writeFile(lockPath, `${JSON.stringify(lock, null, 2)}\n`, "utf8");
console.log(`Stamped ${keys.length} page(s) for ${locale} as ${status}`);
