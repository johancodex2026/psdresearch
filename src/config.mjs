export const site = Object.freeze({
  name: "PSDResearch",
  version: "0.2.0-candidate",
  state: "FOUNDATION_CANDIDATE",
  canonicalOrigin: "https://psdresearch.com.br",
  aliasOrigins: ["https://psd.ia.br"],
  sourceLocale: "pt-BR",
  locales: [
    { code: "pt-BR", slug: "pt-br", label: "Português", shortLabel: "PT", dir: "ltr" },
    { code: "en", slug: "en", label: "English", shortLabel: "EN", dir: "ltr" }
  ],
  github: "https://github.com/johancodex2026/psdresearch"
});

export const pageOrder = Object.freeze([
  "home",
  "foundations",
  "architecture",
  "registry",
  "research",
  "governance",
  "about"
]);
