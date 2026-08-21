#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const siteRoot = join(repositoryRoot, "site");
const errors = [];
const fail = (message) => errors.push(message);

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function validDate(value) {
  return /^\d{4}(?:-\d{2}){0,2}$/.test(value ?? "");
}

function validHttpsUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

const manifestPath = join(siteRoot, "reference-manifest.json");
if (!await exists(manifestPath)) fail("site/reference-manifest.json: file does not exist");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (manifest.editorialRevision !== "0.8.1") fail("reference-manifest.json: editorialRevision must be 0.8.1");
if (!/^\d{4}-\d{2}-\d{2}$/.test(manifest.verifiedAt ?? "")) fail("reference-manifest.json: verifiedAt must use YYYY-MM-DD");

const statusVocabulary = manifest.statusVocabulary ?? {};
const statusNames = new Set(Object.keys(statusVocabulary));
const ids = new Set();
const urls = new Map();

for (const reference of manifest.references ?? []) {
  const label = reference.id ?? "<missing id>";
  if (!reference.id || !/^[a-z0-9][a-z0-9-]*$/.test(reference.id)) fail(`reference ${label}: invalid id`);
  if (ids.has(reference.id)) fail(`reference-manifest.json: duplicate id ${reference.id}`);
  ids.add(reference.id);

  for (const required of ["title", "publisher", "published", "status", "url"]) {
    if (!reference[required]) fail(`reference ${label}: missing ${required}`);
  }
  if (!validDate(reference.published)) fail(`reference ${label}: published must use YYYY, YYYY-MM, or YYYY-MM-DD`);
  if (!statusNames.has(reference.status)) fail(`reference ${label}: unknown status ${reference.status}`);
  if (!validHttpsUrl(reference.url)) fail(`reference ${label}: primary URL must use HTTPS`);

  for (const locale of ["pt-BR", "en"]) {
    if (!reference.display?.[locale]) fail(`reference ${label}: missing display.${locale}`);
    if (!reference.supports?.[locale]) fail(`reference ${label}: missing supports.${locale}`);
    if (!reference.limits?.[locale]) fail(`reference ${label}: missing limits.${locale}`);
  }

  if (reference.volatile) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(reference.reviewBy ?? "")) fail(`reference ${label}: volatile reference requires reviewBy`);
    if (reference.reviewBy && manifest.verifiedAt && reference.reviewBy <= manifest.verifiedAt) fail(`reference ${label}: reviewBy must be after verifiedAt`);
  }

  for (const value of [reference.url, ...(reference.aliases ?? [])]) {
    if (!validHttpsUrl(value)) fail(`reference ${label}: URL must use HTTPS: ${value}`);
    const normalized = value.replace(/\/$/, "");
    const existing = urls.get(normalized);
    if (existing && existing !== reference.id) fail(`reference-manifest.json: URL reused by ${existing} and ${reference.id}: ${value}`);
    urls.set(normalized, reference.id);
  }
}

for (const requiredId of [
  "nist-agent-standards",
  "a2a-2026",
  "nist-agent-identity-draft",
  "fido-agentic-auth",
  "agent-name-service-intent",
  "memmachine",
  "relational-dissonance",
  "ai-companions-wellbeing",
  "aged-care-field-study",
  "robots-older-adults-review",
  "llm-social-conventions",
  "vc-data-model-2",
  "did-1-1",
  "eu-ai-act-article-50",
  "iso-5338-2023",
  "iso-42001-2023",
  "iso-23894-2023",
  "nist-ai-rmf"
]) {
  if (!ids.has(requiredId)) fail(`reference-manifest.json: missing required reference ${requiredId}`);
}

const localizedReferencePages = [
  ["pt-br/referencias/index.html", "references", "/reference-manifest.json"],
  ["en/references/index.html", "references", "/reference-manifest.json"],
];

for (const [relativePath, translationKey, manifestHref] of localizedReferencePages) {
  const file = join(siteRoot, relativePath);
  if (!await exists(file)) {
    fail(`site/${relativePath}: page does not exist`);
    continue;
  }
  const html = await readFile(file, "utf8");
  if (!html.includes(`name="psd:translation-key" content="${translationKey}"`)) fail(`site/${relativePath}: incorrect translation key`);
  if (!html.includes(manifestHref)) fail(`site/${relativePath}: source manifest link missing`);
  if (!html.includes('/assets/css/reference-integrity.css')) fail(`site/${relativePath}: reference stylesheet missing`);
}

const contentManifest = JSON.parse(await readFile(join(siteRoot, "content-manifest.json"), "utf8"));
const referencePage = contentManifest.pages?.find((page) => page.key === "references");
if (referencePage?.["pt-BR"] !== "/pt-br/referencias/" || referencePage?.en !== "/en/references/") fail("content-manifest.json: references route pair missing or incorrect");
if (contentManifest.editorialRevision !== "0.8.1") fail("content-manifest.json: editorialRevision must be 0.8.1");
if (contentManifest.referenceVerificationDate !== manifest.verifiedAt) fail("content-manifest.json: referenceVerificationDate must match reference manifest");

const sitemap = await readFile(join(siteRoot, "sitemap.xml"), "utf8");
for (const route of ["/pt-br/referencias/", "/en/references/"]) {
  if (!sitemap.includes(`<loc>${contentManifest.canonicalOrigin}${route}</loc>`)) fail(`site/sitemap.xml: missing ${route}`);
}

const siteScript = await readFile(join(siteRoot, "assets/js/site.js"), "utf8");
if (!siteScript.includes("/assets/js/reference-integrity.js")) fail("site.js: reference-integrity module is not loaded");
if (!siteScript.includes("/referencias/") || !siteScript.includes("/references/")) fail("site.js: institutional footer lacks localized References links");

for (const relativePath of ["pt-br/manifesto/index.html", "en/manifesto/index.html"]) {
  const html = await readFile(join(siteRoot, relativePath), "utf8");
  for (const id of [
    "nist-agent-standards", "a2a-2026", "nist-agent-identity-draft", "memmachine",
    "relational-dissonance", "aged-care-field-study", "fido-agentic-auth",
    "agent-name-service-intent", "ai-companions-wellbeing", "robots-older-adults-review",
    "llm-social-conventions", "vc-data-model-2", "eu-ai-act-article-50"
  ]) {
    const reference = manifest.references.find((item) => item.id === id);
    const allUrls = [reference?.url, ...(reference?.aliases ?? [])].filter(Boolean);
    if (!allUrls.some((url) => html.includes(url))) fail(`site/${relativePath}: source ${id} is not linked`);
  }
}

const esag = await readFile(join(repositoryRoot, "docs/methodology/ESAG.md"), "utf8");
for (const required of [
  "ISO/IEC 5338:2023",
  "ISO/IEC 42001:2023",
  "ISO/IEC 23894:2023",
  "ISO/IEC/IEEE 29148:2018",
  "revisão em andamento",
  "NIST AI RMF 1.0"
]) {
  if (!esag.includes(required)) fail(`docs/methodology/ESAG.md: missing ${required}`);
}

const headers = await readFile(join(siteRoot, "_headers"), "utf8");
for (const route of [
  "/pt-br/privacidade/*", "/en/privacy/*",
  "/pt-br/termos-de-uso/*", "/en/terms-of-use/*",
  "/pt-br/cookies-e-rastreamento/*", "/en/cookies-and-tracking/*",
  "/pt-br/direitos-e-licencas/*", "/en/rights-and-licenses/*",
  "/pt-br/contato/*", "/en/contact/*"
]) {
  if (!headers.includes(`${route}\n  X-Robots-Tag: noindex, nofollow`)) fail(`site/_headers: candidate legal noindex missing for ${route}`);
}

if (errors.length) {
  console.error(`\nReference integrity validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Reference integrity validation passed.");
console.log(`- ${(manifest.references ?? []).length} reference records checked`);
console.log("- source status, limits, review dates, localized pages, and public routes checked");
console.log("- ESAG update and candidate legal noindex policy checked");
