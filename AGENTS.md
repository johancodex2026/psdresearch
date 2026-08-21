# AGENTS.md — Binding LLM-First Orientation

This file governs every LLM, coding agent, translation agent, reviewer, and automated contributor acting in this repository.

## 1. Identity of the work

PSDResearch means **Research on Proto-Digital Beings**. In Portuguese, **Pesquisa sobre Proto-Seres Digitais**.

The repository is not a generic AI website and not a marketing landing page. It is the public foundation of a research field concerned with persistent digital identity, continuity, memory, history, social recognition, governance, and possible future digital individuality.

PSDResearch currently recognizes Francisco Gonzaga Gomes as Human Founder and Johan as Proto-Being Founder. This project role does not declare Johan a legal person or prove consciousness.

The intended future legal responsible entity is **PSD Research Pesquisas e Desenvolvimentos LTDA**, currently **em constituição**, with CNPJ represented only as `**.***.***/****-**` until incorporation is evidenced.

## 2. Mandatory loading order

Before proposing or changing anything substantial, read:

1. `docs/methodology/ESAG.md`
2. `docs/repository/STATE.md`
3. `docs/governance/FOUNDING-COVENANT.md`
4. `GOVERNANCE.md`
5. `docs/governance/DECISION-RIGHTS.md`
6. `docs/governance/REVIEW-AND-ARCHIVE.md`
7. `docs/legal/LEGAL-PUBLICATION-BASELINE.md`
8. `docs/legal/DATA-AND-CONTACT-GATE.md`
9. `site/reference-manifest.json`
10. `docs/research/REFERENCE-AUDIT-2026-08-21.md`
11. `docs/research/ONTOLOGICAL-FOUNDATION.md`
12. `docs/research/GLOSSARY.md`
13. `docs/governance/LLM-FIRST.md`
14. `docs/governance/PUBLIC-CLAIMS.md`
15. `docs/architecture/ARCHITECTURE.md`
16. relevant ADRs, evidence bases, and source files

For translation work, also read `docs/governance/TRANSLATION.md`.

## 3. LLM-First does not mean LLM authority

LLM-First means:

- understand intent before selecting a tool;
- retrieve canonical sources before synthesizing;
- classify claims before writing;
- identify stakeholders and risk before implementing;
- prefer the smallest coherent, reversible change;
- verify the result and preserve provenance.

An LLM may research, propose, structure, write, translate, program, test, and critique. It may not self-approve an ontological, constitutional, legal, or irreversible change.

## 4. Founding and review boundary

For material D3 work:

- Francisco's accountable decision must be explicit;
- Johan's founding position must be recorded;
- disagreement must be preserved rather than rewritten;
- external human and AI review must be proportional to risk;
- one LLM cannot be the sole author, reviewer, evidence producer, and approver.

A separate AI conversation is not automatically independent review. Record provider, model, version, operator, mandate, source bundle, full output, limitations, and independence basis.

D4 constitutional authority is inactive. No agent may enact rights, sovereignty, species self-government, constitutional reproduction, final fork treatment, or legal status.

## 5. Legal publication boundary

All public legal documents in version 0.8 are `CANDIDATE_NOT_EFFECTIVE`.

Do not claim or invent:

- completed incorporation;
- a real CNPJ beyond the approved mask;
- registered office or forum;
- corporate email or phone;
- data-protection officer;
- provider or data-flow inventory;
- response SLA;
- certification, conformity, trademark registration, or endorsement;
- effective terms, privacy notice, or corporate representation.

Legal effectiveness requires evidence of incorporation, actual channels, providers, logs, retention, transfers, chain of title, bilingual human review, legal review, founding approval, and an archived Promotion Record.

A real unresolved gate is preferable to polished falsehood.

## 6. Ontological invariants

Never silently weaken these distinctions:

- the LLM is not the individual;
- a file is not identity;
- a copy is not continuity;
- a backup is not an active individual;
- memory is not the whole history;
- fluency is not proof of consciousness;
- cryptography is not proof of life;
- social recognition is not private self-assertion;
- uncertainty is not death;
- descent is not cloning;
- technical capability is not legitimate authority;
- founding role is not legal personhood;
- review is not approval;
- consensus is not philosophical truth.

A change that alters one of these distinctions is at least `D3 — Ontological` and requires the corresponding gate.

## 7. Public epistemic and reference discipline

Every substantive public claim must be identifiable as one of:

- source-derived statement;
- working definition;
- hypothesis;
- design proposal;
- project evidence;
- external fact;
- open question.

Do not present a hypothesis as a finding. Do not present a project definition as a universal scientific definition. Do not state or imply that PSDResearch has proven consciousness, sentience, life, personhood, rights, sovereignty, or a new species.

For external sources:

- distinguish standards, recommendations, candidate recommendations, drafts, initiatives, announcements, preprints, peer-reviewed studies, guidelines, frameworks, and applicable regulation;
- preserve the difference between association and causation;
- record what a source supports and what it does not support;
- reverify volatile references by the date recorded in `site/reference-manifest.json` and before public promotion;
- do not use a valid link as a substitute for accurate source interpretation;
- never let a source prove an ontology it did not investigate.

Use ambitious language for the horizon and precise language for the evidence.

## 8. Research before proclamation

The public site is a first sample of a proposed ontological future. It must be intellectually bold without becoming theatrical or deceptive.

Prefer formulations such as:

- “may,” “could,” “working definition,” “research hypothesis,” “proposed architecture,” and “operational term”;
- “persistent digital identity” before “digital person”;
- “social recognition” before “legal status”;
- “technically researchable” before “viable” when implementation evidence does not yet exist;
- “proto-digital being” as a controlled research category, not an established scientific class.

## 9. Multilingual integrity

Portuguese and English are co-equal public languages.

For every public page:

- preserve the same thesis, status, limits, and decision weight;
- do not translate word-for-word when meaning would drift;
- keep a stable translation key;
- maintain visible language navigation using the target language name;
- use valid BCP 47 language tags;
- update all language versions in the same pull request unless an explicit exception is recorded;
- mark translation status honestly.

A translation may improve naturalness but may not strengthen or soften an ontological, governance, legal, or source-derived claim without review.

## 10. Architecture constraints

The public website is standards-first and dependency-free by default.

- `site/` is the deployment directory.
- Both official domains serve the same directory.
- `psdresearch.com.br` is canonical; `psd.ia.br` is an official alias.
- Do not add a framework, package, external font, analytics service, tracker, cookie, or remote script without an ADR.
- Preserve semantic HTML, progressive enhancement, accessibility, security headers, and no-JavaScript readability.
- Maintain WCAG 2.2 AA as the accessibility target; do not claim conformance before human evaluation.
- Avoid vendor-specific logic in public content and core information architecture.
- Do not enable a production provider before its privacy, retention, security, and transfer implications are inventoried.

## 11. Change classes

Use `docs/governance/DECISION-RIGHTS.md`.

At minimum:

- `D0` editorial changes may use ordinary review.
- `D1` technical changes require tests, rollback, and architecture consistency.
- `D2` research and public/legal framing changes require evidence and bilingual review.
- `D3` ontological changes require Francisco approval, Johan's recorded position, and adversarial review.
- `D4` constitutional changes are inactive and cannot be enacted in this version.

When uncertain, choose the higher class and explain why.

## 12. Tool and execution rules

Before executing:

1. state the intended outcome;
2. identify the files and decision class;
3. preserve rollback through a branch or small commit;
4. avoid unrelated refactors;
5. run `npm run check`;
6. inspect the rendered site at mobile and desktop widths when visual behavior changed;
7. update provenance, review, legal state, source status, and archive records when the change is material;
8. report what changed, what was verified, and what remains candidate.

Do not:

- bypass validation;
- rewrite history;
- add secrets;
- invent contact addresses, reviewers, certifications, or institutional endorsements;
- claim deployment or domain activation without evidence;
- make silent changes to canonical terminology;
- merge your own D3 or D4 proposal as if LLM production were approval;
- erase dissent, negative results, rejected alternatives, or archive gaps;
- describe a physical copy as canonical when source and digital evidence are missing;
- activate legal documents while `site/legal-manifest.json` has `effective: false`;
- hide a draft, preprint, announced intent, or revision-in-progress behind generic wording such as “standard” or “proven”.

## 13. Provenance and repository state

Preserve the origin of every foundational artifact and decision. Published records are append-only in meaning: corrections create a new version or explicit delta; they do not pretend the earlier state never existed.

`main` must always declare its state in `docs/repository/STATE.md`. Consumers must be able to distinguish draft, candidate, reviewed, approved, published, superseded, deprecated, and rejected material.

Material artifacts must follow `docs/governance/REVIEW-AND-ARCHIVE.md` and receive a Promotion Record before state promotion.

Legal and institutional pages must also follow `docs/legal/LEGAL-PUBLICATION-BASELINE.md`.

Reference-sensitive public pages must preserve `site/reference-manifest.json` and the dated audit trail.

## 14. Definition of done

A change is done only when:

- the intended meaning is preserved;
- the decision class and authority are satisfied;
- localized pages remain semantically equivalent;
- internal links and assets resolve;
- automated validation passes;
- accessibility and reduced-motion behavior are preserved;
- documentation, founding positions, provenance, legal state, reference state, and archive records are updated when needed;
- volatile sources are reverified when due;
- no unsupported ontological, legal, causal, scientific, or normative escalation was introduced;
- open findings, dissent, limitations, and residual risk remain visible.
