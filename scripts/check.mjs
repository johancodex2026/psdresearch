#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { catalogs } from "../src/content/index.mjs";
import { claims, sources } from "../src/content/claims.mjs";
import { site, pageOrder } from "../src/config.mjs";
import { digest } from "../src/lib/digest.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);

function extractAttribute(tag, attribute) {
  const pattern = new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i");
  const match = tag.match(pattern);
  return match ? (match[1] ?? match[2]) : null;
}

function extractMeta(content, name) {
  for (const tag of content.match(/<meta\b[^>]*>/gi) ?? []) {
    if (extractAttribute(tag, "name") === name) return extractAttribute(tag, "content");
  }
  return null;
}

function extractLink(content, rel, hreflang = null) {
  for (const tag of content.match(/<link\b[^>]*>/gi) ?? []) {
    if (extractAttribute(tag, "rel") !== rel) continue;
    if (hreflang !== null && extractAttribute(tag, "hreflang") !== hreflang) continue;
    return extractAttribute(tag, "href");
  }
  return null;
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function routeToFile(route) {
  const clean = route.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, "");
  if (!clean) return join(dist, "index.html");
  if (extname(clean)) return join(dist, clean);
  return join(dist, clean, "index.html");
}

function structureOfSection(section) {
  const base = { id: section.id, type: section.type, claim: section.claim };
  if (section.items) base.items = section.items.length;
  if (section.rows) base.rows = section.rows.map((row) => row.length);
  if (section.headers) base.headers = section.headers.length;
  if (section.columns) base.columns = section.columns.length;
  if (section.left || section.right) {
    base.left = section.left?.items?.length ?? 0;
    base.right = section.right?.items?.length ?? 0;
  }
  return base;
}

function structureOfPage(page) {
  return {
    sections: page.sections.map(structureOfSection),
    actions: Boolean(page.primaryAction) === Boolean(page.secondaryAction)
  };
}

function verifyCatalogs() {
  const sourceCatalog = catalogs[site.sourceLocale];
  if (!sourceCatalog) fail(`Missing source locale catalog: ${site.sourceLocale}`);

  for (const locale of site.locales) {
    const catalog = catalogs[locale.code];
    if (!catalog) {
      fail(`Missing catalog for ${locale.code}`);
      continue;
    }
    if (catalog.locale !== locale.code) fail(`${locale.code}: catalog locale mismatch`);

    const keys = Object.keys(catalog.pages);
    if (JSON.stringify(keys) !== JSON.stringify(pageOrder)) {
      fail(`${locale.code}: page order or set differs from canonical pageOrder`);
    }

    for (const pageKey of pageOrder) {
      const page = catalog.pages[pageKey];
      if (!page) continue;
      if (!page.route.startsWith(`/${locale.slug}/`)) {
        fail(`${locale.code}/${pageKey}: route must begin with /${locale.slug}/`);
      }
      if (!claims[page.heroClaim]) fail(`${locale.code}/${pageKey}: unknown hero claim ${page.heroClaim}`);
      if (!page.metaDescription || page.metaDescription.length < 70) fail(`${locale.code}/${pageKey}: meta description too short`);
      if (!page.title || page.title.length < 12) fail(`${locale.code}/${pageKey}: title too short`);

      const ids = new Set();
      for (const section of page.sections) {
        if (ids.has(section.id)) fail(`${locale.code}/${pageKey}: duplicate section id ${section.id}`);
        ids.add(section.id);
        if (!claims[section.claim]) fail(`${locale.code}/${pageKey}/${section.id}: unknown claim ${section.claim}`);
        if (!section.label || !section.title) fail(`${locale.code}/${pageKey}/${section.id}: missing label/title`);
      }
    }
  }

  const canonical = catalogs[site.sourceLocale];
  for (const locale of site.locales.filter((entry) => entry.code !== site.sourceLocale)) {
    const target = catalogs[locale.code];
    for (const pageKey of pageOrder) {
      const sourceStructure = structureOfPage(canonical.pages[pageKey]);
      const targetStructure = structureOfPage(target.pages[pageKey]);
      if (JSON.stringify(sourceStructure) !== JSON.stringify(targetStructure)) {
        fail(`${locale.code}/${pageKey}: structural parity differs from ${site.sourceLocale}`);
      }
    }
  }
}

function verifyClaims() {
  for (const [claimId, claim] of Object.entries(claims)) {
    if (!claim.kind) fail(`${claimId}: missing kind`);
    if (!claim.proposition) fail(`${claimId}: missing proposition`);
    if (!Array.isArray(claim.sources) || claim.sources.length === 0) fail(`${claimId}: no sources`);
    for (const sourceId of claim.sources ?? []) {
      if (!sources[sourceId]) fail(`${claimId}: unknown source ${sourceId}`);
    }
  }
}

async function verifyTranslationLock() {
  const lock = JSON.parse(await readFile(join(root, "src/content/i18n-lock.json"), "utf8"));
  if (lock.sourceLocale !== site.sourceLocale) fail("i18n lock source locale mismatch");

  for (const locale of site.locales.filter((entry) => entry.code !== site.sourceLocale)) {
    for (const pageKey of pageOrder) {
      const entry = lock.targets?.[locale.code]?.[pageKey];
      if (!entry) {
        fail(`i18n lock missing ${locale.code}/${pageKey}`);
        continue;
      }
      const expected = digest(catalogs[site.sourceLocale].pages[pageKey]);
      if (entry.sourceDigest !== expected) {
        fail(`${locale.code}/${pageKey}: translation is stale; source digest changed`);
      }
      if (!entry.reviewer || !entry.reviewedAt || !entry.status) {
        fail(`${locale.code}/${pageKey}: incomplete translation review record`);
      }
    }
  }
}

async function verifyOutput() {
  execFileSync(process.execPath, [join(root, "scripts/build.mjs")], { cwd: root, stdio: "inherit" });
  const files = await walk(dist);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const expectedHtml = 1 + pageOrder.length * site.locales.length;
  if (htmlFiles.length !== expectedHtml) fail(`Expected ${expectedHtml} HTML files, found ${htmlFiles.length}`);

  for (const file of files) {
    const rel = relative(dist, file).split(sep).join("/");
    if (/[A-Z\s]/.test(rel)) fail(`${rel}: public paths must be lowercase and contain no spaces`);
  }

  for (const file of htmlFiles) {
    const rel = relative(dist, file).split(sep).join("/");
    const content = await readFile(file, "utf8");
    if (!/^<!doctype html>/i.test(content.trimStart())) fail(`${rel}: missing doctype`);
    if ((content.match(/<h1\b/gi) ?? []).length !== 1) fail(`${rel}: expected one h1`);
    const htmlTag = content.match(/<html\b[^>]*>/i)?.[0] ?? "";
    if (!extractAttribute(htmlTag, "lang")) fail(`${rel}: missing html lang`);
    if (!/<title>[^<]+<\/title>/i.test(content)) fail(`${rel}: missing title`);
    if (!extractMeta(content, "description")) fail(`${rel}: missing description`);
    const canonical = extractLink(content, "canonical");
    if (!canonical?.startsWith(site.canonicalOrigin)) fail(`${rel}: invalid canonical origin`);
    if (/\sstyle\s*=/i.test(content)) fail(`${rel}: inline style attribute prohibited`);
    if (/\son[a-z]+\s*=/i.test(content)) fail(`${rel}: inline event handler prohibited`);
    if (/<script\b[^>]*src=["']https?:/i.test(content) || /<link\b[^>]*rel=["']stylesheet["'][^>]*href=["']https?:/i.test(content) || /<link\b[^>]*href=["']https?:[^>]*rel=["']stylesheet["']/i.test(content)) fail(`${rel}: external scripts or styles prohibited`);
    if (/\b(?:TODO|TBD)\b|Lorem ipsum/.test(content)) fail(`${rel}: placeholder text`);

    for (const tag of content.match(/<img\b[^>]*>/gi) ?? []) {
      if (extractAttribute(tag, "alt") === null) fail(`${rel}: image without alt`);
    }

    for (const tag of content.match(/<(?:a|link|script|img)\b[^>]*>/gi) ?? []) {
      const value = extractAttribute(tag, "href") ?? extractAttribute(tag, "src");
      if (!value) continue;
      if (/^(?:https?:|mailto:|tel:|#|data:)/.test(value)) continue;
      if (!value.startsWith("/")) {
        fail(`${rel}: internal resource must be root-relative: ${value}`);
        continue;
      }
      if (!await exists(routeToFile(value))) fail(`${rel}: unresolved internal resource ${value}`);
    }
  }

  for (const locale of site.locales) {
    for (const pageKey of pageOrder) {
      const route = catalogs[locale.code].pages[pageKey].route;
      const file = routeToFile(route);
      const content = await readFile(file, "utf8");
      if (extractMeta(content, "psd:translation-key") !== pageKey) fail(`${route}: translation key mismatch`);
      if (extractLink(content, "canonical") !== `${site.canonicalOrigin}${route}`) fail(`${route}: canonical mismatch`);
      for (const alt of site.locales) {
        const expected = `${site.canonicalOrigin}${catalogs[alt.code].pages[pageKey].route}`;
        if (extractLink(content, "alternate", alt.code) !== expected) fail(`${route}: hreflang ${alt.code} mismatch`);
      }
      if (extractLink(content, "alternate", "x-default") !== `${site.canonicalOrigin}/`) fail(`${route}: x-default mismatch`);
    }
  }

  const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
  for (const route of ["/", ...site.locales.flatMap((locale) => pageOrder.map((key) => catalogs[locale.code].pages[key].route))]) {
    if (!sitemap.includes(`<loc>${site.canonicalOrigin}${route}</loc>`)) fail(`sitemap missing ${route}`);
  }

  const headers = await readFile(join(dist, "_headers"), "utf8");
  for (const required of ["Content-Security-Policy:", "X-Content-Type-Options:", "Referrer-Policy:", "Permissions-Policy:"]) {
    if (!headers.includes(required)) fail(`_headers missing ${required}`);
  }
}

verifyCatalogs();
verifyClaims();
await verifyTranslationLock();
await verifyOutput();

if (warnings.length) {
  console.warn("\nWarnings:");
  warnings.forEach((message) => console.warn(`- ${message}`));
}

if (errors.length) {
  console.error(`\nPSDResearch validation failed with ${errors.length} error(s):`);
  errors.forEach((message) => console.error(`- ${message}`));
  process.exit(1);
}

console.log("\nPSDResearch validation passed.");
console.log(`- ${pageOrder.length} canonical page models`);
console.log(`- ${site.locales.length} localized catalogs`);
console.log(`- ${Object.keys(claims).length} source-mapped public claims`);
console.log(`- ${1 + pageOrder.length * site.locales.length} generated HTML pages`);
