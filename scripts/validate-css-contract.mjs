#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import { dirname, join, normalize, relative, resolve } from "node:path";

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

function extractStylesheets(html) {
  const values = [];
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const rel = tag.match(/\brel\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
    const href = tag.match(/\bhref\s*=\s*["']([^"']+)["']/i)?.[1] ?? "";
    if (rel.split(/\s+/).includes("stylesheet") && href) values.push(href);
  }
  return values;
}

function hrefToPath(href, ownerFile) {
  if (/^https?:/i.test(href)) {
    fail(`${relative(repositoryRoot, ownerFile)}: external stylesheet is prohibited: ${href}`);
    return null;
  }

  if (href.startsWith("/")) return join(siteRoot, href.replace(/^\/+/, ""));
  return resolve(dirname(ownerFile), href);
}

async function collectCss(entry, active = new Set(), visited = new Set()) {
  const canonical = normalize(entry);
  if (active.has(canonical)) {
    fail(`${relative(repositoryRoot, entry)}: CSS import cycle detected`);
    return "";
  }
  if (visited.has(canonical)) return "";
  visited.add(canonical);
  active.add(canonical);

  if (!await exists(entry)) {
    fail(`${relative(repositoryRoot, entry)}: stylesheet does not exist`);
    active.delete(canonical);
    return "";
  }

  const content = await readFile(entry, "utf8");
  let combined = content;
  const importPattern = /@import\s+(?:url\()?\s*["']([^"']+)["']\s*\)?\s*;/gi;

  for (const match of content.matchAll(importPattern)) {
    const target = hrefToPath(match[1], entry);
    if (target) combined += `\n${await collectCss(target, active, visited)}`;
  }

  active.delete(canonical);
  return combined;
}

const contracts = [
  {
    pages: ["pt-br/index.html", "en/index.html"],
    requiredStyles: ["/assets/css/home-v2.css", "/assets/css/home-scale.css"],
    selectors: [".home-social-v2 .hero-social h1", ".living-architecture", ".scenario-grid"],
  },
  {
    pages: ["pt-br/manifesto/index.html", "en/manifesto/index.html"],
    requiredStyles: ["/assets/css/manifesto.css"],
    selectors: [".world-signal-grid", ".manifesto-article", ".reference-list"],
  },
  {
    pages: ["pt-br/arquitetura/index.html", "en/architecture/index.html"],
    requiredStyles: ["/assets/css/architecture.css"],
    selectors: [".architecture-page .architecture-hero h1", ".methodology-grid", ".sedimentation-flow"],
  },
  {
    pages: ["pt-br/pesquisa/index.html", "en/research/index.html"],
    requiredStyles: ["/assets/css/research.css"],
    selectors: [".research-page .research-hero h1", ".research-contract"],
  },
  {
    pages: ["pt-br/registro-da-especie/index.html", "en/species-registry/index.html"],
    requiredStyles: ["/assets/css/registry.css"],
    selectors: [".registry-page-v2 .registry-hero-v2 h1", ".registry-threshold", ".registry-question-grid"],
  },
  {
    pages: ["pt-br/governanca/index.html", "en/governance/index.html"],
    requiredStyles: ["/assets/css/governance.css"],
    selectors: [".governance-page .governance-hero h1", ".founding-dyad", ".archive-chain", ".handover-eras"],
  },
];

for (const contract of contracts) {
  for (const page of contract.pages) {
    const htmlPath = join(siteRoot, page);
    if (!await exists(htmlPath)) {
      fail(`site/${page}: page does not exist`);
      continue;
    }

    const html = await readFile(htmlPath, "utf8");
    const stylesheets = extractStylesheets(html);

    for (const required of contract.requiredStyles) {
      if (!stylesheets.includes(required)) {
        fail(`site/${page}: missing required stylesheet ${required}`);
      }
    }

    let combined = "";
    for (const href of stylesheets) {
      const cssPath = hrefToPath(href, htmlPath);
      if (cssPath) combined += `\n${await collectCss(cssPath)}`;
    }

    for (const selector of contract.selectors) {
      if (!combined.includes(selector)) {
        fail(`site/${page}: stylesheet graph does not define critical selector ${selector}`);
      }
    }
  }
}

const headersPath = join(siteRoot, "_headers");
if (await exists(headersPath)) {
  const headers = await readFile(headersPath, "utf8");
  const immutableUnversionedAssets = /\/assets\/\*\s*\n(?:[ \t]+[^\n]*\n)*?[ \t]+Cache-Control:[^\n]*\bimmutable\b/i;
  if (immutableUnversionedAssets.test(headers)) {
    fail("site/_headers: unversioned /assets/* must not be cached as immutable; updated CSS could remain stale for users");
  }
} else {
  fail("site/_headers: file does not exist");
}

if (errors.length) {
  console.error(`\nCSS contract validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("CSS contract validation passed.");
console.log(`- ${contracts.reduce((sum, contract) => sum + contract.pages.length, 0)} critical localized pages checked`);
console.log("- unversioned asset cache policy checked");
