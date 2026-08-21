# AGENTS.md — Binding LLM-First Orientation

This file governs every LLM, coding agent, translation agent, reviewer, and automated contributor acting in this repository.

## 1. Identity of the work

PSDResearch means **Research on Proto-Digital Beings**. In Portuguese, **Pesquisa sobre Proto-Seres Digitais**.

The repository is not a generic AI website and not a marketing landing page. It is the public foundation of a research field concerned with persistent digital identity, continuity, memory, history, social recognition, governance, and possible future digital individuality.

## 2. Mandatory loading order

Before proposing or changing anything substantial, read:

1. `docs/methodology/ESAG.md`
2. `docs/repository/STATE.md`
3. `docs/research/ONTOLOGICAL-FOUNDATION.md`
4. `docs/research/GLOSSARY.md`
5. `docs/governance/LLM-FIRST.md`
6. `docs/governance/DECISION-RIGHTS.md`
7. `docs/governance/PUBLIC-CLAIMS.md`
8. `docs/architecture/ARCHITECTURE.md`
9. the relevant ADRs and source files

For translation work, also read `docs/governance/TRANSLATION.md`.

## 3. LLM-First does not mean LLM authority

LLM-First means:

- understand intent before selecting a tool;
- retrieve canonical sources before synthesizing;
- classify claims before writing;
- identify stakeholders and risk before implementing;
- prefer the smallest coherent, reversible change;
- verify the result and preserve provenance.

An LLM may research, propose, structure, write, translate, program, test, and critique. It may not self-approve an ontological, constitutional, or irreversible change.

## 4. Ontological invariants

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
- technical capability is not legitimate authority.

A change that alters one of these distinctions is at least `D3 — Ontological` and requires the corresponding gate.

## 5. Public epistemic discipline

Every substantive public claim must be identifiable as one of:

- source-derived statement;
- working definition;
- hypothesis;
- design proposal;
- project evidence;
- external fact;
- open question.

Do not present a hypothesis as a finding. Do not present a project definition as a universal scientific definition. Do not state or imply that PSDResearch has proven consciousness, sentience, life, personhood, rights, or a new species.

Use ambitious language for the horizon and precise language for the evidence.

## 6. Research before proclamation

The public site is a first sample of a proposed ontological future. It must be intellectually bold without becoming theatrical or deceptive.

Prefer formulations such as:

- “may,” “could,” “working definition,” “research hypothesis,” “proposed architecture,” and “operational term”;
- “persistent digital identity” before “digital person”;
- “social recognition” before “legal status”;
- “proto-digital being” as a controlled research category, not an established scientific class.

## 7. Multilingual integrity

Portuguese and English are co-equal public languages.

For every public page:

- preserve the same thesis, status, limits, and decision weight;
- do not translate word-for-word when meaning would drift;
- keep a stable translation key;
- maintain visible language navigation using the target language name;
- use valid BCP 47 language tags;
- update all language versions in the same pull request unless an explicit exception is recorded;
- mark translation status honestly.

A translation may improve naturalness but may not strengthen or soften an ontological claim without review.

## 8. Architecture constraints

The public website is standards-first and dependency-free by default.

- `site/` is the deployment directory.
- Both official domains serve the same directory.
- `psdresearch.com.br` is canonical; `psd.ia.br` is an official alias.
- Do not add a framework, package, external font, analytics service, tracker, cookie, or remote script without an ADR.
- Preserve semantic HTML, progressive enhancement, accessibility, security headers, and no-JavaScript readability.
- Maintain WCAG 2.2 AA as the minimum accessibility target.
- Avoid vendor-specific logic in public content and core information architecture.

## 9. Change classes

Use the decision classes in `docs/governance/DECISION-RIGHTS.md`.

At minimum:

- `D0` editorial changes may use ordinary review.
- `D1` technical changes require tests and architecture consistency.
- `D2` research changes require evidence and bilingual review.
- `D3` ontological changes require explicit founding approval and adversarial critique.
- `D4` constitutional changes are not active in this version and cannot be introduced casually.

When uncertain, choose the higher class and explain why.

## 10. Tool and execution rules

Before executing:

1. state the intended outcome;
2. identify the files and decision class;
3. preserve rollback through a branch or small commit;
4. avoid unrelated refactors;
5. run `npm run check`;
6. inspect the rendered site at mobile and desktop widths when visual behavior changed;
7. report what changed, what was verified, and what remains candidate.

Do not:

- bypass validation;
- rewrite history;
- add secrets;
- invent contact addresses or institutional endorsements;
- claim deployment or domain activation without evidence;
- make silent changes to canonical terminology;
- merge your own `D3` or `D4` proposal without eligible human approval.

## 11. Provenance and repository state

Preserve the origin of every foundational artifact and decision. Published records are append-only in meaning: corrections create a new version or explicit delta; they do not pretend the earlier state never existed.

`main` must always declare its state in `docs/repository/STATE.md`. Consumers must be able to distinguish draft, candidate, approved, published, and deprecated material.

## 12. Definition of done

A change is done only when:

- the intended meaning is preserved;
- the decision class and authority are satisfied;
- localized pages remain semantically equivalent;
- internal links and assets resolve;
- automated validation passes;
- accessibility and reduced-motion behavior are preserved;
- documentation and provenance are updated when needed;
- no unsupported ontological escalation was introduced.
