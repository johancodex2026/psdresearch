#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const site = join(root, "site");
const errors = [];
const fail = (message) => errors.push(message);
const company = "PSD Research Pesquisas e Desenvolvimentos LTDA";
const maskedCnpj = "**.***.***/****-**";

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

const legal = JSON.parse(await readFile(join(site, "legal-manifest.json"), "utf8"));
if (legal.version !== "0.8.0-candidate") fail("site/legal-manifest.json: unexpected version");
if (legal.effective !== false || legal.state !== "CANDIDATE_NOT_EFFECTIVE") fail("site/legal-manifest.json: legal documents must remain candidate and not effective");
if (legal.intendedLegalResponsible?.name !== company) fail("site/legal-manifest.json: intended legal entity mismatch");
if (legal.intendedLegalResponsible?.status !== "em constituição") fail("site/legal-manifest.json: company status must remain em constituição");
if (legal.intendedLegalResponsible?.cnpj !== maskedCnpj) fail("site/legal-manifest.json: CNPJ must remain masked");

const manifest = JSON.parse(await readFile(join(site, "content-manifest.json"), "utf8"));
const required = {
  privacy:["/pt-br/privacidade/","/en/privacy/"],
  terms:["/pt-br/termos-de-uso/","/en/terms-of-use/"],
  cookies:["/pt-br/cookies-e-rastreamento/","/en/cookies-and-tracking/"],
  accessibility:["/pt-br/acessibilidade/","/en/accessibility/"],
  security:["/pt-br/seguranca/","/en/security/"],
  transparency:["/pt-br/transparencia/","/en/transparency/"],
  "rights-licenses":["/pt-br/direitos-e-licencas/","/en/rights-and-licenses/"],
  contact:["/pt-br/contato/","/en/contact/"],
};

for (const [key, routes] of Object.entries(required)) {
  const entry = manifest.pages.find((page) => page.key === key);
  if (!entry) { fail(`content-manifest.json: missing ${key}`); continue; }
  if (entry["pt-BR"] !== routes[0] || entry.en !== routes[1]) fail(`content-manifest.json: route mismatch for ${key}`);
  for (const route of routes) {
    const file = join(site, route.replace(/^\//, ""), "index.html");
    if (!await exists(file)) { fail(`${route}: page missing`); continue; }
    const html = await readFile(file, "utf8");
    if (!html.includes('name="psd:legal-status" content="candidate-not-effective"')) fail(`${route}: missing candidate legal status`);
    if (!html.includes(company)) fail(`${route}: missing intended legal entity`);
    if (!html.includes(maskedCnpj)) fail(`${route}: missing masked CNPJ`);
    if (/@psdresearch\.com\.br/i.test(html) || /mailto:/i.test(html)) fail(`${route}: inactive corporate email must not be invented`);
  }
}

for (const route of ["/pt-br/sobre/","/en/about/"]) {
  const html = await readFile(join(site, route.replace(/^\//, ""), "index.html"), "utf8");
  if (!html.includes(company) || !html.includes(maskedCnpj)) fail(`${route}: About page must disclose intended legal entity and masked CNPJ`);
}

const script = await readFile(join(site, "assets/js/site.js"), "utf8");
for (const fragment of [
  "/privacidade/", "/privacy/", "/termos-de-uso/", "/terms-of-use/",
  "/cookies-e-rastreamento/", "/cookies-and-tracking/", "/acessibilidade/", "/accessibility/",
  "/seguranca/", "/security/", "/transparencia/", "/transparency/",
  "/direitos-e-licencas/", "/rights-and-licenses/", "/contato/", "/contact/"
]) if (!script.includes(fragment)) fail(`site.js: standard footer missing ${fragment}`);

const securityTxt = await readFile(join(site, ".well-known/security.txt"), "utf8");
if (!securityTxt.includes("https://psdresearch.com.br/pt-br/seguranca/")) fail("security.txt: Portuguese policy route missing");
if (!securityTxt.includes("https://psdresearch.com.br/en/security/")) fail("security.txt: English policy route missing");

if (errors.length) {
  console.error(`\nLegal and footer validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log("Legal and footer validation passed.");
console.log("- intended company remains explicitly in formation");
console.log("- masked CNPJ and non-effective legal state verified");
console.log("- 16 localized legal/transparency pages verified");
console.log("- institutional footer routes verified");
