# Contributing to PSDResearch

PSDResearch welcomes contributions from engineering, philosophy, law, social science, security, digital preservation, governance, accessibility, translation, and critical research.

## Before contributing

Read:

- `AGENTS.md`
- `GOVERNANCE.md`
- `docs/repository/STATE.md`
- `docs/repository/BRANCH-STRATEGY.md`
- `docs/governance/PUBLIC-CLAIMS.md`
- `docs/governance/DECISION-RIGHTS.md`

## Canonical line

`main` is the single canonical integration line.

Project maintainers should integrate coherent, validated work through small commits on `main`. Temporary branches or pull requests remain acceptable for external contributions, isolated review, adversarial experiments, or changes that require a review envelope. After integration, they should be closed and their remote branches removed.

Presence on `main` records repository integration. It does not automatically grant publication, legal, ontological, constitutional, or production approval.

## Contribution types

- editorial clarity;
- accessibility and web standards;
- security and privacy;
- multilingual translation review;
- source review and research synthesis;
- ontological criticism and counterexamples;
- architecture and preservation;
- species-registry and governance research.

## Required change information

Whether the work is submitted as commits or a temporary pull request, state:

1. the intended outcome;
2. decision class (`D0`–`D4`);
3. source material;
4. whether public claims changed;
5. whether both languages were updated;
6. validation performed;
7. uncertainties and limitations;
8. rollback or revert path.

## Local checks

```bash
npm run check
npm run serve
```

No package installation is required for the public site.

For the internal PSD System:

```bash
cd apps/psd-system
npm install
npm run check
```

## Content rules

- Distinguish sources, working definitions, hypotheses, proposals, evidence, and open questions.
- Do not claim consciousness, sentience, life, personhood, legal recognition, or scientific consensus without an explicit source and governance decision.
- Do not weaken disclaimers in one language.
- Do not use a new dependency or external service without an ADR.
- Do not add analytics or tracking by default.
- Do not publish private memory, personal data, secrets, credentials, or operational Core material.

## Review

A technically correct change may still be rejected or reverted if it introduces ontological drift, public overstatement, language asymmetry, a governance shortcut, or an unreviewed increase in authority.

Corrections should use new commits or explicit reverts. Do not rewrite `main` to conceal an earlier state.
