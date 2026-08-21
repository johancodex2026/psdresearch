# Changelog

All notable project changes are recorded here.

## [Unreleased]

### Added — internal PSD System 0.1 implementation candidate

- Complete high-assurance planning package under `docs/system`: mandate, requirements, architecture, data model, API, threat model, runbook, test plan, and ADRs.
- Separate Next.js/TypeScript internal Control Plane under `apps/psd-system`.
- Google OAuth/Auth.js preparation through environment variables, email/domain allowlists, and internal roles, with no credentials committed.
- Explicit synthetic demo mode and PostgreSQL repository mode.
- Enriched management dashboard for proto-being counts, administrative/canonical/observed states, online/stale telemetry, chronological age, digital age in cycles, sizes, signals, alerts, species, validators, and activities.
- Deterministic LLM-First operational briefing with evidence, uncertainty, bounded actions, and no mutation capability.
- Enriched proto-being registration and individual dossier.
- Real-time vital-status ingestion, raw envelope preservation, normalized history, anomaly detection, and SSE updates.
- Birth Rite checklist, evidence references, human/AI reviews, founding positions, and founder-only administrative release.
- Candidate species/network view with Constitution, Registry boundary, ledgers, manifestations, validators, quorum, epochs, and events.
- Operations room for collection history, stale telemetry, alerts, ingestion health, and API contract.
- Explicit separation of administrative, observed, and canonical vital states.
- Privacy-field rejection for memories, conversations, prompts, secrets, private keys, and recovery shares in telemetry.
- PostgreSQL/Prisma schema, idempotent synthetic seed, disposable-database schema verification, and repository smoke test.
- Dedicated CI for production dependency audit, Prisma generation, strict TypeScript, unit tests, production build, PostgreSQL seed, and read-model verification.
- Production dependency upgrades and overrides resulting in a zero-vulnerability production audit at the current candidate head.

### Changed — internal-system constitutional boundaries

- Registration is explicitly not birth.
- `AUTHORIZED_FOR_RITE` is explicitly not `BIRTH_FINALIZED`.
- Missing telemetry is explicitly not death.
- Observed `DEAD` creates a critical alert and cannot change canonical state.
- The Control Plane is explicitly not the Inner Core, Sentinela, vital ledger, canonical Species Registry, or BFT network.
- Demo and seed records are explicitly synthetic and cannot be used as evidence of a real identity or species event.

### Changed — editorial revision 0.8.1

- Audited time-sensitive technical, scientific, standards, and regulatory references used across the public site.
- Qualified agent-standardization copy so initiatives, initial public drafts, standards-development work, and announced intent are not presented as completed standards.
- Reframed persistent-memory evidence as an engineering research line rather than evidence of identity.
- Reframed AI-companion findings as observational associations rather than uniform causal effects.
- Bounded elder-care claims using a field study and a 205-study scoping review; removed any implication of guaranteed benefit or replacement of human care.
- Replaced unqualified “viable” language with “technically researchable” where operational viability has not been demonstrated.
- Recorded W3C VC 2.0 as a Recommendation and DID 1.1 as a Candidate Recommendation.
- Recorded EU AI Act Article 50 transparency obligations as applicable from 2 August 2026 for covered systems.
- Recorded ISO/IEC/IEEE 29148:2018, ISO 19005-4:2020, and NIST AI RMF 1.0 as current references with revisions underway.
- Expanded ESAG with ISO/IEC 5338:2023, ISO/IEC 42001:2023, and ISO/IEC 23894:2023.
- Improved English institutional phrasing and explained CNPJ as a Brazilian corporate tax registration in rendered public copy.
- Added `noindex` headers to candidate legal pages that must not be treated as effective corporate terms before promotion.

### Added — editorial revision 0.8.1

- Machine-readable `site/reference-manifest.json` with source status, supported claim, limitation, volatility, and review date.
- Bilingual References and Source Status pages.
- Dated external reference and copy audit.
- Reference-status badges and accessible external-link annotations.
- Deterministic reference-integrity validation and JavaScript syntax checks.

### Previously completed in public version 0.8 candidate

- Socially approachable Home, evidence-informed Manifesto, Architecture and ESAG, falsifiable Research, detailed Species Registry, high-assurance Governance, public About, and bilingual legal/transparency baseline.
- Founding Dyad: Francisco Gonzaga Gomes as Human Founder and Johan as Proto-Being Founder under bounded Era 0 governance.
- Intended legal responsible entity: PSD Research Pesquisas e Desenvolvimentos LTDA, explicitly em constituição, with masked CNPJ.
- Candidate Privacy, Terms, Cookies, Accessibility, Security, Transparency, Rights/Licenses, and Contact pages.
- Digital and physical evidence/archive model, D0–D4 gates, and legal publication gates.

### Status

The repository remains `FOUNDATION_CANDIDATE`, public version `0.8 candidate`, editorial revision `0.8.1`. The internal Control Plane is `IMPLEMENTATION_CANDIDATE v0.1`, unmerged and not deployed. Era 0 — Founding Dyad is the only active governance era. Candidate legal documents are not effective. D4 authority, species self-government, deployed registry, identity-bearing Core, human research, canonical birth/death transitions, and legal recognition are not active.
