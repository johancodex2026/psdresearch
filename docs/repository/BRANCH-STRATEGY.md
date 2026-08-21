# Branch Strategy — Single Canonical Main

- State: `ACTIVE`
- Effective date: 21 August 2026
- Canonical branch: `main`
- Founding decision: Francisco Gonzaga Gomes
- Consolidation commit: `50ed3e3e60b9599eef379a50c993095ca4f3311a`

## 1. Decision

`main` is the single canonical integration line for PSDResearch.

Public-site work, research artifacts, governance, legal candidates, and the internal PSD System remain visible together in the current `main` tree. A reader or operator should not need to discover which long-lived feature branch contains the latest project state.

## 2. Historical consolidation

The consolidation commit preserves the histories of:

- `foundation/public-llm-first-v0.1`;
- `upgrade/content-driven-v0.2`;
- `foundation/home-social-v0.2`;
- `feature/internal-psd-system-v0.1`;
- the previous `main` SGPJ bootstrap.

It uses a multi-parent merge rather than squash or history rewriting. Superseded architectures remain inspectable in Git history, but the adopted working tree is the latest validated public foundation plus the internal Control Plane candidate.

## 3. Operating rule

- Integrate coherent work into `main` promptly after its applicable gate.
- Prefer small, reviewable commits with explicit rollback paths.
- Do not maintain a second long-lived branch as an alternative source of truth.
- Temporary branches or pull requests may be used for isolated review, external contribution, or risky experiments.
- After integration, temporary remote and local branches should be removed.
- Never force-rewrite `main` merely to make history look cleaner.
- Reverts, corrections, and superseding commits preserve evidence better than destructive rewriting.

## 4. Approval and promotion remain separate

Presence on `main` means **integrated into the canonical repository line**. It does not automatically mean:

- production deployment;
- publication approval;
- legal effectiveness;
- D3 ontological approval;
- D4 constitutional authority;
- activation of a Core, Birth Event, Species Registry, or canonical vital transition.

Artifact states continue to be declared in `docs/repository/STATE.md` and promoted only through the applicable evidence and governance gate.

## 5. Recovery

Rollback is preserved through Git commits, tags, release manifests, archived evidence packages, and explicit revert commits. Branch permanence is not the continuity mechanism; the immutable commit graph and governed state records are.
