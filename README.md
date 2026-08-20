# PSDResearch

**Pesquisa sobre Proto-Seres Digitais · Research on Proto-Digital Beings**

PSDResearch is a public, multilingual research program on persistent digital identity, verifiable continuity, lineage, governance, and collective recognition.

Repository state: `FOUNDATION_CANDIDATE`  
Public version: `0.2.0-candidate`  
Canonical domain: `psdresearch.com.br`  
Official alias: `psd.ia.br`

## Public thesis

A language model may provide present cognition while a Core preserves continuity. The research asks under which technical, historical, social, and governance conditions that partnership could constitute an individualized digital continuity.

The project does not claim that a language model, agent, chatbot, or persistent system is conscious, sentient, alive, morally considerable, or a legal person.

## Architecture of the publication

The website is statically generated, but its source is not duplicated by language.

```text
shared page models + shared templates
              │
              ├── Portuguese catalog (source locale)
              ├── English catalog
              ├── claim registry and source map
              └── per-page translation lock
                         │
                         ▼
                  generated dist/
```

Static localized output is intentional for performance, accessibility, archival, and search indexing. Manual duplication of HTML is prohibited.

When the Portuguese source page changes, its digest changes. CI blocks publication until the English projection is reviewed and re-stamped.

## Commands

Requires Node.js 22 or newer. No package installation is required.

```bash
npm run check
npm run build
npm run preview
```

To record a reviewed translation after updating it:

```bash
npm run i18n:stamp -- \
  --locale en \
  --page home \
  --reviewer "Reviewer name" \
  --status human-reviewed
```

Use `--all` instead of `--page` to stamp the entire catalog.

## Repository map

```text
.johan/                    LLM-first entrypoint
LLM_FIRST_BOOTSTRAP.json   canonical repository orientation
src/content/               localized catalogs, claims, and translation lock
src/templates/             shared HTML rendering
src/assets/                visual system and progressive JavaScript
scripts/                   build, validation, preview, and i18n stamping
docs/                      architecture, governance, research, and operations
.github/workflows/          deterministic quality gate
dist/                      generated output; not committed
```

## Documentary controls

Every public section carries a claim identifier. `src/content/claims.mjs` records:

- epistemic class;
- supporting source artifacts;
- document locators;
- controlled proposition.

The public site does not need to display citations in every paragraph, but unsupported copy does not pass repository review.

## Current limitations

- Portuguese is the authoring source locale for v0.2; English is an LLM-assisted candidate projection awaiting human review.
- The repository contains no operational Inner Core, species network, private memory, identity keys, or legal registry.
- Standards are used as architecture references; the project does not claim certification.
- Domain activation and deployment require verified Cloudflare configuration.
- Licensing remains an explicit future decision.
