# ADR-0004 — Dual Domains, Single Deployment

- Status: Accepted for v0.2 candidate
- Decision class: D1
- Date: 2026-08-20

## Decision

One Cloudflare Pages project builds and serves one `dist/` directory.

- Canonical domain: `psdresearch.com.br`
- Official alias: `psd.ia.br`

Canonical metadata and the sitemap use `psdresearch.com.br`. Both domains must resolve to the same deployment commit.
