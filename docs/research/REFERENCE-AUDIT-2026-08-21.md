# External Reference and Copy Audit — 2026-08-21

- Project: PSDResearch
- Editorial revision: 0.8.1
- Decision class: D1 — validation / D2 — public framing
- State: candidate
- Scope: public site references, source status, claim strength, terminology, and time-sensitive updates

## 1. Purpose

This audit improves precision without changing the project's foundational ontology. It distinguishes standards from drafts, initiatives from deployed specifications, peer-reviewed findings from preprints, and observed associations from causal or ontological conclusions.

The two founding architecture documents remain the conceptual source line. They explicitly present vision and architecture rather than executive specification, scientific proof, or independent audit. Public refinements must preserve that boundary.

## 2. Material findings

### Agent identity and interoperability

- The NIST AI Agent Standards Initiative is an official public initiative, not a completed standard.
- The NCCoE paper on agent identity and authorization is an **Initial Public Draft concept paper** whose comment period has closed; it must not be described as final guidance.
- FIDO announced standards-development work and a technical working group; resulting specifications are not yet final.
- The Linux Foundation announced its **intent to launch** Agent Name Service; this is not yet an established standard.
- A2A's reported organizational support and enterprise use are evidence of interoperability adoption, not persistent identity or digital individuality.

### Memory, relationships, and social value

- MemMachine is a 2026 preprint about persistent multi-session memory performance. It supports the claim that agent memory is an active engineering field, not the claim that memory creates an individual.
- Relational Dissonance is peer-reviewed CHI research describing tensions in how people categorize AI relationships; it does not prove personhood.
- The Nature Human Behaviour companion study is observational. Its results must be described as associations dependent on use patterns and offline social context, not a uniform causal effect.
- The 2025 aged-care study is a bounded field study involving 34 staff and 10 service robots; the 2026 ACM scoping review covers 205 studies from 2010–2022. Together they support active research and practical opportunity, not guaranteed benefit or replacement of human care.
- The Science Advances multi-agent convention study is peer-reviewed, but its interpretation has been contested in later research concerning possible training-data effects. It is evidence of experimental group dynamics, not proof of society or species.

### Standards and regulatory status

- W3C Verifiable Credentials Data Model 2.0 is a 2025 Recommendation.
- W3C DID 1.1 is a Candidate Recommendation as of 5 March 2026, not yet a Recommendation.
- EU AI Act Article 50 transparency obligations apply from 2 August 2026 for covered interactive and generative AI systems.
- NIST SP 800-63-4 is the current final Digital Identity Guidelines suite, superseding revision 3.
- ISO/IEC/IEEE 29148:2018 remains the current published edition, but a revision entered DIS development in 2026.
- NIST AI RMF 1.0 remains current while NIST develops a revision.
- ISO 19005-4:2020 remains the published PDF/A-4 standard while a revision is under development.

### Methodological additions

ESAG should explicitly include:

- ISO/IEC 5338:2023 for AI system life-cycle processes;
- ISO/IEC 42001:2023 for organizational AI management systems;
- ISO/IEC 23894:2023 for AI-specific risk-management guidance;
- version and status tracking for standards that are current but under revision.

## 3. Textual corrections adopted

- Replace categorical statements about emerging infrastructure with status-qualified wording.
- Replace broad claims about companionship or well-being with observational language.
- Replace “viable” as an unqualified conclusion with “technically researchable” where evidence does not yet support operational viability.
- Prefer “people/older adults” over language that treats aging as a defect or care technology as a substitute for human relationships.
- In English legal copy, prefer “company being incorporated” to the less natural “company in formation.”
- Explain that a CNPJ is a Brazilian corporate tax registration when English readers encounter it.
- Distinguish `standard`, `recommendation`, `candidate recommendation`, `draft`, `initiative`, `announcement`, `preprint`, and `peer-reviewed study` in public references.

## 4. Controls implemented

- machine-readable `site/reference-manifest.json`;
- public bilingual References and Source Status pages;
- source-status badges and bounded copy refinements loaded from the same manifest;
- reference-integrity validator added to `npm run check`;
- volatile references receive review dates;
- candidate legal pages remain non-effective, receive `noindex` headers, and are excluded from the sitemap until promotion;
- ESAG now records current AI-specific life-cycle, management, and risk standards.

## 5. Remaining limits

- Automated source status does not replace subject-matter review.
- A valid link does not prove that a public claim accurately represents the source.
- Peer review does not eliminate methodological uncertainty or scientific disagreement.
- Standards alignment does not establish conformity or certification.
- Time-sensitive sources must be reverified before public promotion.
- Portuguese and English still require human semantic review.
