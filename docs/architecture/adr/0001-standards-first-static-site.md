# ADR-0001 — Standards-First Dependency-Free Public Site

- Status: Accepted for foundation candidate
- Date: 2026-08-20
- Decision class: D1
- Scope: Public website architecture

## Context

PSDResearch needs a serious, multilingual public presence that can survive technology and hosting changes, remain easy to audit, and avoid a large supply chain during its foundation.

The site is primarily content, not an application.

## Decision

Use semantic HTML, CSS, and progressive JavaScript with no runtime framework and no package dependency.

Deploy the `site/` directory directly.

## Consequences

Positive:

- minimal supply-chain risk;
- no build lock-in;
- fast static delivery;
- easy archival and migration;
- no-JavaScript content access;
- straightforward Cloudflare Pages deployment;
- source remains readable by humans and future LLMs.

Trade-offs:

- repeated shared HTML across localized pages;
- manual discipline required for navigation parity;
- future content scale may justify a generator.

## Guardrail

A framework, static-site generator, CMS, analytics platform, or external asset service may be introduced only through a new ADR demonstrating that benefits exceed added longevity, security, and governance risk.
