# Cloudflare Pages Deployment

## Target

One Pages project serves one static directory through two official domains.

```yaml
repository: johancodex2026/psdresearch
production_branch: main
build_command: none
output_directory: site
canonical_domain: psdresearch.com.br
alias_domain: psd.ia.br
```

## Prerequisites

- both apex domains are active Cloudflare zones in the account used for Pages;
- GitHub access to `johancodex2026/psdresearch`;
- an approved commit on `main`;
- `npm run check` passing.

## Create the Pages project

1. Open Cloudflare **Workers & Pages**.
2. Create a Pages application and connect GitHub.
3. Select `johancodex2026/psdresearch`.
4. Set production branch to `main`.
5. Leave build command empty.
6. Set output directory to `site`.
7. Deploy.

## Attach the domains

In the same Pages project:

1. Open **Custom domains**.
2. Add `psdresearch.com.br`.
3. Complete validation.
4. Add `psd.ia.br`.
5. Complete validation.
6. Confirm both resolve to the same deployment commit.

For apex domains already using Cloudflare nameservers, Cloudflare may create the required DNS records during domain setup. The domain must be associated through the Pages custom-domain workflow; a manual CNAME alone is not sufficient.

## Canonical behavior

Static pages declare `psdresearch.com.br` as canonical.

`psd.ia.br` is an official alias. Two supported operational modes exist:

### Same-content mode — initial

Both domains serve the same build. Canonical tags prevent search-engine ambiguity.

### Redirect mode — future option

Cloudflare Bulk Redirects can redirect `psd.ia.br` to `psdresearch.com.br` while preserving path and query. This requires a separate operational decision because the user requested both domains to point to the same publication.

## Verification

Check:

- both domains show the same commit;
- HTTPS certificates are valid;
- `/pt-br/` and `/en/` work on both domains;
- `robots.txt`, `sitemap.xml`, and `.well-known/security.txt` resolve;
- response headers include CSP and privacy controls;
- `pages.dev` exposure and redirect policy are intentional;
- cache behavior does not prevent new publication.

## Rollback

Cloudflare Pages retains deployment history. Roll back to the last verified deployment if:

- language routes break;
- CSP blocks required local assets;
- domains diverge;
- canonical metadata is wrong;
- content is published before its governance gate.

## Not completed by repository changes

The repository can prepare and validate the publication, but cannot prove:

- Cloudflare account ownership;
- DNS activation;
- custom-domain certificate issuance;
- the current live deployment commit.

These require direct Cloudflare verification.
