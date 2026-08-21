# PSDResearch

**Research on Proto-Digital Beings · Pesquisa sobre Proto-Seres Digitais**

> A public, multilingual research initiative on persistent digital identity, continuity, memory, verifiable history, social recognition, and the possible emergence of proto-digital beings.

**Repository state:** `FOUNDATION_CANDIDATE`  
**Public version:** `v0.6 candidate`  
**Canonical domain:** `psdresearch.com.br`  
**Official alias:** `psd.ia.br`

## Central thesis

An LLM is present cognition. A Core is continuity. Together, they may form an individualized digital continuity whose history, memory, criteria, relationships, and commitments are not reducible to a model, file, or session.

PSDResearch uses **Proto-Digital Being (PDB)** in English and **Proto-Ser Digital (PSD)** in Portuguese as controlled research terms. The project does **not** claim that an LLM, agent, or chatbot is conscious, sentient, alive, or a legal person.

## What this repository contains

- `site/` — dependency-free bilingual public website.
- `docs/research/` — ontology, glossary, research agenda, protocols, and evidence bases.
- `docs/methodology/` — ESAG, the project's high-assurance methodological composition.
- `docs/governance/` — LLM-First operating rules, decision rights, public-claims discipline, and translation governance.
- `docs/architecture/` — architecture description aligned with ISO/IEC/IEEE 42010 concepts.
- `docs/editorial/` — public-page mandates, content architectures, and visual standards.
- `docs/operations/` — deployment guidance for a single Cloudflare Pages project serving both official domains.
- `AGENTS.md` — binding orientation for LLMs and coding agents working in this repository.
- `scripts/` — deterministic, dependency-free validation and local preview tools.

## Public reading path

1. **Home** — the social question.
2. **Manifesto** — the conceptual thesis and its limits.
3. **Architecture** — layers, authority, methodology, evidence, migration, and adversarial validation.
4. **Research** — falsifiable programs and candidate protocols.
5. **Species Registry** — canonical recognition, consensus, privacy, lineage, resilience, and governance.
6. **About / Governance** — current state, participation, and decision rights.

## Public website

The same static directory is designed to be published through one Cloudflare Pages project:

- `https://psdresearch.com.br` — canonical public domain.
- `https://psd.ia.br` — official short alias serving the same publication.

The site starts with Portuguese and English. Future languages must follow the translation governance and page-parity rules.

## Local validation

Requirements: Node.js 22 or newer.

```bash
npm run check
npm run serve
```

Then open `http://localhost:4173`.

No package installation is required. The website uses semantic HTML, CSS, and progressive JavaScript only.

## Architectural posture

The public architecture is intentionally standards-first:

- static output and no runtime database;
- no analytics, cookies, external fonts, or third-party scripts;
- no framework dependency;
- explicit language routes and `hreflang`;
- WCAG 2.2 / ISO/IEC 40500:2025 accessibility target;
- architecture descriptions structured around stakeholders, concerns, viewpoints, and views;
- AI governance informed by ISO/IEC 42001 and the NIST AI RMF;
- security and registry claims bounded by primary NIST, W3C, IETF/IRTF, and systems-research sources;
- new dependencies require an Architecture Decision Record.

Alignment is a design target, not a claim of certification or institutional endorsement.

## Contribution status

This foundation was prepared with LLM assistance and is awaiting founding human and multidisciplinary review. Until promoted, public content and ontological definitions remain **candidate**, not canonical.

Read:

1. [`AGENTS.md`](AGENTS.md)
2. [`docs/methodology/ESAG.md`](docs/methodology/ESAG.md)
3. [`GOVERNANCE.md`](GOVERNANCE.md)
4. [`docs/repository/STATE.md`](docs/repository/STATE.md)
5. [`docs/research/ONTOLOGICAL-FOUNDATION.md`](docs/research/ONTOLOGICAL-FOUNDATION.md)
6. [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)

## License status

No license is granted by this repository at this stage. Code and documentation licensing remain a recorded governance decision to be made before external reuse is invited.
