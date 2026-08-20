# Cloudflare Pages Deployment

## Project configuration

```yaml
repository: johancodex2026/psdresearch
production_branch: main
build_command: npm run build
output_directory: dist
canonical_domain: psdresearch.com.br
official_alias: psd.ia.br
```

## Domain configuration

Attach both domains to the same Pages project:

1. `psdresearch.com.br`
2. `psd.ia.br`

Verify that both domains serve the same deployment commit and that HTTPS certificates are valid.

## Pre-deployment gate

```bash
npm run check
```

Confirm:

- Portuguese and English routes;
- canonical and alternate links;
- `sitemap.xml` and `robots.txt`;
- security headers;
- mobile and desktop rendering;
- translation lock status;
- repository state and release approval.

## Rollback

Rollback to the latest verified Pages deployment when:

- a translation is stale or incomplete;
- routes or metadata diverge;
- public claims exceed approved scope;
- CSP or asset delivery fails;
- the published commit is not the approved commit.
