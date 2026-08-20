# ADR-0003 — Claim Registry Before Public Copy

- Status: Accepted for v0.2 candidate
- Decision class: D2 / D3
- Date: 2026-08-20

## Context

Public language about identity, life, species, consciousness, death, and recognition can become stronger than the supporting documents.

## Decision

Every public section must carry a claim ID registered in `src/content/claims.mjs`.

A registered claim declares:

- epistemic kind;
- source artifacts;
- document locators;
- controlled proposition.

Founding social hypotheses are permitted only when labeled as hypotheses and registered as such.

## Consequences

The site may remain readable without displaying footnotes on every paragraph, while the repository retains a reviewable basis for each substantive statement.
