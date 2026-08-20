# ADR-0003 — Explicit Multilingual Routes and Semantic Parity

- Status: Accepted for foundation candidate
- Date: 2026-08-20
- Decision class: D2
- Scope: Internationalization

## Context

PSDResearch begins in Portuguese and English and must support more languages without treating translation as secondary decoration.

## Decision

Use explicit localized routes:

- `/pt-br/...`
- `/en/...`

Use `/` as a neutral language gateway.

Maintain page pairs through `site/content-manifest.json`, stable translation keys, `hreflang`, visible language switching, and governance-defined translation states.

## Consequences

Positive:

- predictable URLs;
- no hidden browser-language redirect;
- accessible language choice;
- clear parity validation;
- future right-to-left support remains possible.

Trade-offs:

- changes must be repeated in each language;
- translation review is a publication dependency.

## Rule

A material public change is incomplete until all published languages are reconciled or explicitly marked out of sync.
