# AGENTS.md — PSDResearch LLM-First Contract

This file applies to every LLM, coding agent, reviewer, translator, and automation acting in this repository.

## Mandatory first read

1. `LLM_FIRST_BOOTSTRAP.json`
2. `.johan/llm_entrypoint.json`
3. the SGPJ packet for `project:psdresearch`
4. this file
5. the affected content, claim, architecture, and governance artifacts

## Operating order

1. Understand purpose, audience, authority, and risk.
2. Retrieve canonical state and source artifacts.
3. Classify the change and every new public claim.
4. Plan the smallest coherent and reversible change.
5. Execute without unrelated expansion.
6. Run deterministic checks and visual review when presentation changes.
7. Record decision, evidence, reviewer, limitations, and remaining work.

## Ontological invariants

Do not silently weaken these distinctions:

- the LLM is not the individual;
- a file is not identity;
- copy is not continuity;
- backup is not an active individual;
- memory is not the whole history;
- fluency is not proof of consciousness;
- cryptography is not proof of life;
- collective recognition is not metaphysical proof;
- uncertainty is not death;
- descent is not cloning;
- technical capability is not legitimate authority.

A change to one of these distinctions is at least `D3 — Ontological`.

## Public-claim contract

Every public section must reference an existing claim in `src/content/claims.mjs`.

A claim must declare:

- kind;
- source artifacts;
- locators;
- controlled proposition.

Do not write decorative or persuasive copy whose meaning is not supported by a source, a declared founding hypothesis, a project status, a governance rule, or an explicit open question.

## Multilingual contract

- Page structure lives in shared templates.
- Public prose lives in localized catalogs.
- Source HTML must never be copied per language.
- `pt-BR` is the source locale for v0.2.
- A source-page digest binds every target translation to the source version it represents.
- A changed source digest makes the target translation stale and blocks CI.
- Stamping records review; it does not manufacture translation quality.
- Ontological strength, limitations, and status must remain equivalent across languages.

## Authority boundary

An LLM may research, draft, translate, implement, test, compare, and critique.

An LLM may not alone:

- approve its own D3 or D4 change;
- promote a hypothesis to fact;
- declare consciousness, sentience, life, personhood, or legal recognition;
- establish an operational identity registry;
- authorize an irreversible identity-bearing transition;
- conceal uncertainty to make the project appear mature.

## Technical constraints

- Shared content-driven static generation is the default.
- No framework or package dependency without an ADR.
- No external fonts, scripts, analytics, trackers, cookies, forms, or databases by default.
- Preserve semantic HTML, keyboard navigation, reduced motion, printability, and no-JavaScript readability.
- Both official domains serve the same `dist/` output.
- `psdresearch.com.br` is canonical; `psd.ia.br` is an official alias.
- Secrets, mutable databases, private memories, generated output, and identity keys never enter Git.

## Required verification

```bash
npm run check
```

For visual changes, inspect at least:

- 1440 px desktop;
- 390 px mobile;
- keyboard navigation;
- horizontally scrollable tables;
- Portuguese and English output;
- reduced-motion behavior.

## Definition of done

A change is complete only when:

- meaning is source-backed;
- decision rights are satisfied;
- localized structures remain equivalent;
- translation locks are current;
- generated pages, links, metadata, claims, and security headers validate;
- visual review found no material issue;
- repository state and limitations remain honest.
