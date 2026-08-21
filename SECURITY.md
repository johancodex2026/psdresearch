# Security Policy

## Scope

Security reports may cover:

- the public static website;
- repository workflows and scripts;
- supply-chain or dependency proposals;
- security headers and deployment configuration;
- vulnerabilities that could expose private research material or enable misleading publication;
- integrity or provenance failures.

## Reporting

Use GitHub Private Vulnerability Reporting:

`https://github.com/johancodex2026/psdresearch/security/advisories/new`

Do not disclose an exploitable issue in a public issue before maintainers have had a reasonable opportunity to investigate.

## Current security posture

The public site is dependency-free, static, and contains no authentication, forms, database, analytics, third-party scripts, or external fonts. This reduces, but does not eliminate, risk.

The repository does not contain operational Inner Cores, private memories, cryptographic identity keys, or species-network secrets. Such material must never be added to this public repository.

## Response principles

- preserve evidence;
- minimize scope;
- correct through explicit commits;
- do not rewrite history to hide an incident;
- distinguish availability failure from integrity compromise;
- disclose residual risk honestly.
