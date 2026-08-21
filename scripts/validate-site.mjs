#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const siteRoot = join(repositoryRoot, "site");
const manifestPath = join(siteRoot, "content-manifest.json");

const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }

  return files;
}

function routeToFile(route) {
  const withoutQuery = route.split(/[?#]/, 1)[0];
  if (withoutQuery === "/") return join(siteRoot, "index.html");

  const local = withoutQuery.replace(/^\/+/, "");
  if (!local) return join(siteRoot, "index.html");

  if (extname(local)) return join(siteRoot, local);
  return join(siteRoot, local, "index.html");
}

function extractAttribute(tag, attribute) {
  const pattern = new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i");
  const match = tag.match(pattern);
  return match ? (match[1] ?? match[2]) : null;
}

function extractMeta(content, name) {
  const tags = content.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (extractAttribute(tag, "name") === name) return extractAttribute(tag, "content");
  }
  return null;
}

function extractLink(content, rel, hreflang = null) {
  const tags = content.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (extractAttribute(tag, "rel") !== rel) continue;
    if (hreflang !== null && extractAttribute(tag, "hreflang") !== hreflang) continue;
    return extractAttribute(tag, "href");
  }
  return null;
}

function extractAllResourceLinks(content) {
  const links = [];
  for (const tag of content.match(/<(?:a|link|script|img)\b[^>]*>/gi) ?? []) {
    const href = extractAttribute(tag, "href");
    const src = extractAttribute(tag, "src");
    if (href) links.push({ value: href, tag });
    if (src) links.push({ value: src, tag });
  }
  return links;
}

function countMatches(content, pattern) {
  return (content.match(pattern) ?? []).length;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const files = await walk(siteRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const relativeFiles = files.map((file) => relative(repositoryRoot, file).split(sep).join("/"));

for (const file of relativeFiles) {
  if (/[A-Z\s]/.test(file)) fail(`${file}: paths must be lowercase and contain no spaces`);
}

for (const file of htmlFiles) {
  const rel = relative(repositoryRoot, file).split(sep).join("/");
  const content = await readFile(file, "utf8");

  if (!/^<!doctype html>/i.test(content.trimStart())) fail(`${rel}: missing HTML doctype`);

  const htmlTag = content.match(/<html\b[^>]*>/i)?.[0] ?? "";
  const lang = extractAttribute(htmlTag, "lang");
  if (!lang) fail(`${rel}: missing lang attribute on <html>`);

  const h1Count = countMatches(content, /<h1\b/gi);
  if (h1Count !== 1) fail(`${rel}: expected exactly one h1, found ${h1Count}`);

  if (!/<title>[^<]+<\/title>/i.test(content)) fail(`${rel}: missing non-empty title`);

  const description = extractMeta(content, "description");
  if (!description || description.length < 50) fail(`${rel}: missing or too-short meta description`);

  const canonical = extractLink(content, "canonical");
  if (!canonical?.startsWith(manifest.canonicalOrigin)) fail(`${rel}: canonical URL must use ${manifest.canonicalOrigin}`);

  if (/<(?:script|style)\b[^>]*\bsrc\s*=\s*["']https?:/i.test(content)) fail(`${rel}: external script or style resource is prohibited`);
  if (/\son[a-z]+\s*=/i.test(content)) fail(`${rel}: inline event handlers are prohibited`);
  if (/\sstyle\s*=/i.test(content)) fail(`${rel}: inline style attributes are prohibited`);
  if (/javascript:/i.test(content)) fail(`${rel}: javascript: URLs are prohibited`);
  if (/\b(?:TODO|TBD)\b|Lorem ipsum/.test(content)) fail(`${rel}: contains placeholder text`);

  for (const img of content.match(/<img\b[^>]*>/gi) ?? []) {
    if (extractAttribute(img, "alt") === null) fail(`${rel}: image without alt attribute`);
  }

  for (const { value } of extractAllResourceLinks(content)) {
    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:") ||
      value.startsWith("#") ||
      value.startsWith("data:")
    ) continue;

    if (!value.startsWith("/")) {
      fail(`${rel}: internal link must be root-relative: ${value}`);
      continue;
    }

    const target = routeToFile(value);
    if (!await exists(target)) fail(`${rel}: unresolved internal resource ${value}`);
  }
}

for (const page of manifest.pages) {
  for (const locale of manifest.locales) {
    const route = page[locale.code];
    if (!route) {
      fail(`content-manifest.json: ${page.key} has no ${locale.code} route`);
      continue;
    }

    const file = routeToFile(route);
    if (!await exists(file)) {
      fail(`content-manifest.json: route ${route} does not exist`);
      continue;
    }

    const content = await readFile(file, "utf8");
    const translationKey = extractMeta(content, "psd:translation-key");
    if (translationKey !== page.key) fail(`${route}: translation key ${translationKey} does not match ${page.key}`);

    const expectedCanonical = `${manifest.canonicalOrigin}${route}`;
    if (extractLink(content, "canonical") !== expectedCanonical) fail(`${route}: canonical URL mismatch`);

    for (const alternateLocale of manifest.locales) {
      const expected = `${manifest.canonicalOrigin}${page[alternateLocale.code]}`;
      if (extractLink(content, "alternate", alternateLocale.code) !== expected) fail(`${route}: missing or incorrect hreflang ${alternateLocale.code}`);
    }

    if (extractLink(content, "alternate", "x-default") !== `${manifest.canonicalOrigin}/`) fail(`${route}: missing or incorrect x-default alternate`);
  }
}

const rootContent = await readFile(join(siteRoot, "index.html"), "utf8");
if (extractLink(rootContent, "canonical") !== `${manifest.canonicalOrigin}/`) fail("site/index.html: root canonical mismatch");

const sitemap = await readFile(join(siteRoot, "sitemap.xml"), "utf8");
const indexablePages = manifest.pages.filter((page) => page.indexable !== false);
const expectedRoutes = ["/", ...indexablePages.flatMap((page) => manifest.locales.map((locale) => page[locale.code]))];
for (const route of expectedRoutes) {
  const url = `${manifest.canonicalOrigin}${route}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`site/sitemap.xml: missing ${url}`);
}

for (const page of manifest.pages.filter((item) => item.indexable === false)) {
  for (const locale of manifest.locales) {
    const url = `${manifest.canonicalOrigin}${page[locale.code]}`;
    if (sitemap.includes(`<loc>${url}</loc>`)) fail(`site/sitemap.xml: non-indexable candidate must not be listed: ${url}`);
  }
}

const headers = await readFile(join(siteRoot, "_headers"), "utf8");
for (const required of [
  "Content-Security-Policy:",
  "X-Content-Type-Options:",
  "Referrer-Policy:",
  "Permissions-Policy:"
]) {
  if (!headers.includes(required)) fail(`site/_headers: missing ${required}`);
}

const agentGuidance = await readFile(join(repositoryRoot, "AGENTS.md"), "utf8");
for (const required of [
  "LLM-First",
  "Ontological invariants",
  "Multilingual integrity",
  "Definition of done"
]) {
  if (!agentGuidance.includes(required)) fail(`AGENTS.md: missing ${required}`);
}

if (warnings.length) {
  console.warn("\nWarnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (errors.length) {
  console.error(`\nPSDResearch validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("PSDResearch validation passed.");
console.log(`- ${htmlFiles.length} HTML pages`);
console.log(`- ${manifest.locales.length} public languages`);
console.log(`- ${manifest.pages.length} localized page pairs`);
console.log(`- ${expectedRoutes.length} indexable routes in sitemap`);
console.log(`- ${files.length} public site files`);
