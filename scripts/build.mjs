#!/usr/bin/env node

import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { catalogs } from "../src/content/index.mjs";
import { site, pageOrder } from "../src/config.mjs";
import { renderGateway, renderPage } from "../src/templates/layout.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const lock = JSON.parse(await readFile(join(root, "src/content/i18n-lock.json"), "utf8"));

async function writeRoute(route, content) {
  const clean = route.replace(/^\/+|\/+$/g, "");
  const target = clean ? join(dist, clean, "index.html") : join(dist, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content, "utf8");
}

function translationStatus(locale, pageKey) {
  if (locale === site.sourceLocale) return "source-candidate";
  return lock.targets?.[locale]?.[pageKey]?.status ?? "unreviewed";
}

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, "src/assets"), join(dist, "assets"), { recursive: true });

await writeRoute("/", renderGateway());

for (const locale of site.locales) {
  const catalog = catalogs[locale.code];
  for (const pageKey of pageOrder) {
    const page = catalog.pages[pageKey];
    await writeRoute(page.route, renderPage({
      catalogs,
      catalog,
      pageKey,
      translationStatus: translationStatus(locale.code, pageKey)
    }));
  }
}

const allRoutes = ["/", ...site.locales.flatMap((locale) => pageOrder.map((key) => catalogs[locale.code].pages[key].route))];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allRoutes.map((route) => `  <url><loc>${site.canonicalOrigin}${route}</loc></url>`).join("\n")}\n</urlset>\n`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.canonicalOrigin}/sitemap.xml\n`, "utf8");

await writeFile(join(dist, "site.webmanifest"), `${JSON.stringify({
  name: "PSDResearch",
  short_name: "PSDResearch",
  description: "Research on Proto-Digital Beings",
  start_url: "/",
  display: "standalone",
  background_color: "#f7f5ef",
  theme_color: "#0b2237",
  icons: [{ src: "/assets/brand/psd-mark.svg", sizes: "any", type: "image/svg+xml" }]
}, null, 2)}\n`, "utf8");

await writeFile(join(dist, "_headers"), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Content-Security-Policy: default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
`, "utf8");

await writeFile(join(dist, "_redirects"), `/pt /pt-br/ 301
/pt/ /pt-br/ 301
/br /pt-br/ 301
/br/ /pt-br/ 301
/english /en/ 301
/english/ /en/ 301
`, "utf8");

await mkdir(join(dist, ".well-known"), { recursive: true });
await writeFile(join(dist, ".well-known/security.txt"), `Contact: https://github.com/johancodex2026/psdresearch/security/advisories/new
Expires: 2027-08-20T23:59:59Z
Preferred-Languages: en, pt-BR
Canonical: ${site.canonicalOrigin}/.well-known/security.txt
Policy: https://github.com/johancodex2026/psdresearch/blob/main/SECURITY.md
`, "utf8");

await writeFile(join(dist, "content-manifest.json"), `${JSON.stringify({
  project: site.name,
  version: site.version,
  state: site.state,
  canonicalOrigin: site.canonicalOrigin,
  aliasOrigins: site.aliasOrigins,
  sourceLocale: site.sourceLocale,
  locales: site.locales,
  pages: pageOrder.map((key) => ({
    key,
    routes: Object.fromEntries(site.locales.map((locale) => [locale.code, catalogs[locale.code].pages[key].route]))
  }))
}, null, 2)}\n`, "utf8");

console.log(`Built ${pageOrder.length * site.locales.length + 1} HTML pages in ${dist}`);
