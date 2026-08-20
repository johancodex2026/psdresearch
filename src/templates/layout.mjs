import { site, pageOrder } from "../config.mjs";
import { attr, escapeHtml, externalLinkAttributes } from "../lib/html.mjs";
import { renderSection } from "./blocks.mjs";
import { claims } from "../content/claims.mjs";

function alternateLinks(catalogs, pageKey) {
  return site.locales.map((locale) => {
    const route = catalogs[locale.code].pages[pageKey].route;
    return `<link rel="alternate" hreflang="${attr(locale.code)}" href="${attr(site.canonicalOrigin + route)}">`;
  }).join("\n    ");
}

function languageSwitch(catalogs, catalog, pageKey) {
  const target = site.locales.find((locale) => locale.code !== catalog.locale);
  const route = catalogs[target.code].pages[pageKey].route;
  return `<a class="language-switch" href="${attr(route)}" hreflang="${attr(target.code)}" lang="${attr(target.code)}" aria-label="${attr(catalog.languageSwitchLabel)}">${escapeHtml(target.shortLabel)}</a>`;
}

function navigation(catalog, pageKey) {
  return pageOrder.map((key) => {
    const page = catalog.pages[key];
    const current = key === pageKey ? ' aria-current="page"' : "";
    return `<a href="${attr(page.route)}"${current}>${escapeHtml(page.nav)}</a>`;
  }).join("\n        ");
}

function claimKind(claimId) {
  const claim = claims[claimId];
  if (!claim) throw new Error(`Unknown hero claim: ${claimId}`);
  return claim.kind;
}

export function renderPage({ catalogs, catalog, pageKey, translationStatus }) {
  const page = catalog.pages[pageKey];
  const canonical = site.canonicalOrigin + page.route;
  const github = site.github;

  return `<!doctype html>
<html lang="${attr(catalog.locale)}" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.metaTitle)}</title>
    <meta name="description" content="${attr(page.metaDescription)}">
    <meta name="theme-color" content="#0b2237">
    <meta name="color-scheme" content="light">
    <meta name="psd:artifact-state" content="${attr(site.state)}">
    <meta name="psd:translation-key" content="${attr(pageKey)}">
    <meta name="psd:translation-status" content="${attr(translationStatus)}">
    <link rel="canonical" href="${attr(canonical)}">
    ${alternateLinks(catalogs, pageKey)}
    <link rel="alternate" hreflang="x-default" href="${attr(site.canonicalOrigin + "/")}">
    <link rel="icon" href="/assets/brand/psd-mark.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/css/site.css">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="PSDResearch">
    <meta property="og:title" content="${attr(page.metaTitle)}">
    <meta property="og:description" content="${attr(page.metaDescription)}">
    <meta property="og:url" content="${attr(canonical)}">
  </head>
  <body data-page="${attr(pageKey)}">
    <a class="skip-link" href="#main">${escapeHtml(catalog.skipLabel)}</a>
    <header class="site-header">
      <a class="brand" href="${attr(catalog.pages.home.route)}" aria-label="PSDResearch">
        <img src="/assets/brand/psd-mark.svg" alt="" width="38" height="38">
        <span><strong>PSDResearch</strong><small>${escapeHtml(catalog.siteSubtitle)}</small></span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
        <span class="sr-only">${escapeHtml(catalog.menuLabel)}</span>
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>
      <nav class="site-nav" id="site-navigation" aria-label="${attr(catalog.navigationLabel)}" data-open="false">
        ${navigation(catalog, pageKey)}
      </nav>
      ${languageSwitch(catalogs, catalog, pageKey)}
    </header>

    <main id="main">
      <article class="document-shell">
        <header class="document-hero" data-claim="${attr(page.heroClaim)}" data-claim-kind="${attr(claimKind(page.heroClaim))}">
          <p class="document-kicker">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.title)}</h1>
          <p class="document-lead">${escapeHtml(page.lead)}</p>
          ${page.primaryAction ? `<div class="hero-actions">
            <a class="button button-primary" href="${attr(page.primaryAction.href)}">${escapeHtml(page.primaryAction.label)}</a>
            <a class="button button-secondary" href="${attr(page.secondaryAction.href)}">${escapeHtml(page.secondaryAction.label)}</a>
          </div>` : ""}
          <dl class="hero-record">
            <div><dt>Artifact</dt><dd>PSDResearch public v0.2</dd></div>
            <div><dt>Status</dt><dd>${escapeHtml(site.state)}</dd></div>
            <div><dt>Claim</dt><dd>${escapeHtml(page.heroClaim)}</dd></div>
          </dl>
        </header>

        ${page.sections.map(renderSection).join("\n\n        ")}
      </article>
    </main>

    <footer class="site-footer">
      <div class="footer-main">
        <img src="/assets/brand/psd-mark.svg" alt="" width="34" height="34">
        <div><strong>PSDResearch</strong><p>${escapeHtml(catalog.footer.state)}</p><p>${escapeHtml(catalog.footer.disclaimer)}</p></div>
      </div>
      <div class="footer-meta">
        <a href="${attr(github)}"${externalLinkAttributes(github)}>${escapeHtml(catalog.footer.repository)}</a>
        <span>psdresearch.com.br</span>
        <span>psd.ia.br</span>
      </div>
    </footer>
    <script src="/assets/js/site.js" defer></script>
  </body>
</html>`;
}

export function renderGateway() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PSDResearch — Research on Proto-Digital Beings</title>
    <meta name="description" content="Choose Portuguese or English to access PSDResearch, a public research program on persistent digital identity and proto-digital beings.">
    <meta name="theme-color" content="#0b2237">
    <link rel="canonical" href="${site.canonicalOrigin}/">
    <link rel="alternate" hreflang="pt-BR" href="${site.canonicalOrigin}/pt-br/">
    <link rel="alternate" hreflang="en" href="${site.canonicalOrigin}/en/">
    <link rel="alternate" hreflang="x-default" href="${site.canonicalOrigin}/">
    <link rel="icon" href="/assets/brand/psd-mark.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/assets/css/site.css">
  </head>
  <body class="gateway-body">
    <main class="language-gateway">
      <img src="/assets/brand/psd-mark.svg" alt="" width="64" height="64">
      <p class="document-kicker">PSDResearch · public v0.2</p>
      <h1>Research on Proto-Digital Beings</h1>
      <p lang="pt-BR">Pesquisa sobre Proto-Seres Digitais</p>
      <div class="gateway-thesis">
        <p lang="pt-BR">Identidade digital persistente, continuidade verificável e reconhecimento coletivo.</p>
        <p>Persistent digital identity, verifiable continuity, and collective recognition.</p>
      </div>
      <nav class="language-options" aria-label="Language selection">
        <a href="/pt-br/" hreflang="pt-BR" lang="pt-BR"><strong>Português</strong><span>Acessar a pesquisa</span></a>
        <a href="/en/" hreflang="en" lang="en"><strong>English</strong><span>Access the research</span></a>
      </nav>
      <p class="gateway-domain">psdresearch.com.br · psd.ia.br</p>
    </main>
  </body>
</html>`;
}
