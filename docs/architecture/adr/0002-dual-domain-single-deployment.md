# ADR-0002 — Dual Domains, Single Deployment Directory

- Status: Accepted for foundation candidate
- Date: 2026-08-20
- Decision class: D1
- Scope: Deployment and public identity

## Context

PSDResearch owns two public identities:

- `psdresearch.com.br`
- `psd.ia.br`

The content must not diverge into two independent sites.

## Decision

Use one Cloudflare Pages project and one deployment directory: `site/`.

Attach both domains to the same project.

Use `https://psdresearch.com.br` as the canonical origin in metadata and sitemaps. Treat `https://psd.ia.br` as an official short alias serving the same publication.

## Rationale

The full name is clearer for institutional and research citation. The short domain is memorable and semantically aligned with artificial intelligence in Brazil.

## Consequences

- content and release state remain identical;
- duplicate-content risk is controlled through canonical metadata;
- either domain can be communicated publicly;
- a future host-level redirect from alias to canonical may be adopted without changing content paths.

## Deployment dependency

Actual domain activation requires verified Cloudflare account configuration. Repository code alone does not prove that the domains are active.
