# ADR-0001 — Content-Driven Multilingual Publication

- Status: Accepted for v0.2 candidate
- Decision class: D1 / D2
- Date: 2026-08-20

## Context

The first candidate site stored complete Portuguese and English HTML pages separately. Static localized output is normal, but duplicated source HTML makes semantic parity, maintenance, and review unnecessarily fragile.

## Decision

Adopt a content-driven static generator with:

- shared page models and rendering templates;
- separate localized catalogs;
- Portuguese as source locale for v0.2;
- structural parity validation;
- per-page source digest in a translation lock;
- generated `dist/` output;
- CI failure when a translation is absent or stale.

## Consequences

Positive:

- one structural change updates every language;
- no hand-maintained duplicated HTML;
- translation drift becomes detectable;
- output remains static, accessible, archivable, and fast;
- adding a language does not duplicate templates.

Trade-offs:

- natural-language translation still requires review;
- stamping records that review occurred but cannot prove its quality;
- source-locale changes intentionally block publication until reconciliation.
