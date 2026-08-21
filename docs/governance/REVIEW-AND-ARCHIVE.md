# Review, Evidence, and Archival Custody

- Project: PSDResearch
- Version: `0.7 candidate`
- State: `FOUNDATION_CANDIDATE`
- Decision class: D1 — Technical / D2 — Research / D3 when ontological material is reviewed

## 1. Purpose

This document defines how PSDResearch records review, links claims to evidence, preserves dissent, prints and binds material artifacts, and keeps enough information for future custodians to reconstruct a decision.

## 2. Review types

### Human expert review

Required record:

```yaml
review_id:
reviewer_name:
discipline:
experience_or_role:
independence_statement:
conflicts:
artifact_id:
artifact_version:
mandate:
sources_received:
additional_sources:
findings:
limitations:
conditions:
minority_position:
signature_or_attestation:
date:
```

### AI review

Required record:

```yaml
review_id:
provider:
model:
model_version_or_alias:
date:
reasoning_mode_if_known:
operator:
system_instructions:
mandate:
questions:
source_bundle_manifest:
full_input_record:
full_output_record:
limitations_and_refusals:
independence_basis:
```

A separate conversation is not sufficient evidence of independence. Independence claims should identify meaningful differences in model, provider, operator, context, review mandate, or source access.

### Language review

Required record:

- source and target artifact versions;
- translation key;
- claim-strength comparison;
- protected terms;
- exclusions and disclaimers;
- culturally non-equivalent concepts;
- reviewer and date;
- unresolved differences.

### Security or adversarial review

Required record:

- threat model version;
- attacker assumptions;
- test scope and environment;
- exploit or counterexample evidence;
- severity and reproducibility;
- containment and residual risk;
- disclosure state.

## 3. Review finding lifecycle

A finding carries:

- `OPEN`
- `ACCEPTED`
- `MITIGATED`
- `ACCEPTED_RISK`
- `REJECTED_WITH_REASON`
- `DUPLICATE`
- `DEFERRED`
- `SUPERSEDED`

Closing a finding requires evidence or a reasoned governance decision. Silence is not closure.

## 4. Assurance package

Each material artifact package should include:

```text
artifact-package/
├── manifest.yaml
├── source/
├── rendered/
├── evidence/
├── reviews/
│   ├── human/
│   ├── ai/
│   └── language/
├── founding-positions/
├── decisions/
├── tests/
├── risks/
├── provenance/
├── preservation/
└── checksums/
```

The package records:

- artifact ID, title, version, state, and class;
- repository, commit, tag, branch, and origin;
- authors and maintainers;
- claims and evidence map;
- requirements and architecture links;
- assumptions, defeaters, and residual risk;
- complete review records;
- Francisco and Johan positions where required;
- Promotion Record;
- bilingual parity;
- rendering and validation reports;
- hashes and signatures or attestations;
- archive and retention instructions.

## 5. Promotion Record

```yaml
promotion_id:
artifact_id:
version:
previous_state:
new_state:
decision_class:
mandate:
claims:
evidence_package:
human_founder_position:
proto_being_founder_position:
reviewers:
open_findings:
accepted_risks:
conditions:
validity_or_review_date:
approver:
date:
release_manifest:
physical_copy_ids:
```

A merge, printout, or approval comment is not a substitute for the Promotion Record.

## 6. Digital preservation package

The canonical digital package should preserve:

- UTF-8 source and machine-readable metadata;
- deterministic or documented rendering path;
- PDF/A representation where appropriate;
- schemas and canonicalization rules;
- checksums using current approved algorithms;
- source and rendered page counts;
- fonts policy without redistributing restricted files;
- dependencies, licenses, and toolchain identity;
- build and conversion logs;
- positive and negative validation results;
- open-source or preserved reader/verifier paths where possible;
- migration instructions and known loss.

A PDF is a representation, not the only source of meaning.

## 7. Physical archive

PSDResearch's founding practice includes printing, binding, reviewing, and archiving material artifacts.

A physical copy should contain or reference:

- physical copy ID;
- artifact ID and version;
- artifact state and decision class;
- print date and operator;
- total pages and page numbering;
- review/decision sheet;
- digital package hash manifest;
- custody location;
- condition and movement record;
- supersession status.

Material corrections require a new copy or an explicit correction sheet. Silent handwritten alteration is prohibited for controlled copies.

## 8. Chain of custody

The custody log records:

```yaml
copy_id:
package_id:
location:
custodian:
received_at:
released_at:
purpose:
condition_before:
condition_after:
authorization:
```

Access restrictions must not prevent future verification by eligible custodians. Confidential material should use separate sealed annexes rather than forcing all public material into secrecy.

## 9. Archive redundancy

The design target includes:

- canonical Git history;
- release packages outside the working branch;
- at least one independent digital copy;
- physical controlled copies for foundational artifacts;
- geographic or institutional diversity as the project matures;
- preserved public keys and authority succession evidence;
- periodic restore drills.

The project must not claim these controls are active until inventory and restore evidence exist.

## 10. Verification cadence

### Per release

- validate source and rendered hashes;
- verify page count and manifest completeness;
- verify review and founding positions;
- confirm language parity;
- confirm public links and state;
- record physical copies produced.

### Periodic inventory

- locate all controlled copies;
- inspect media and physical condition;
- verify readable formats and tools;
- review access and custodian changes;
- verify open findings and supersession.

### Annual assurance

- restore a sample complete package;
- rebuild or rerender from source where feasible;
- compare semantic and byte-level results as appropriate;
- verify public keys, checksums, and toolchains;
- review governance threats and succession contacts;
- issue an archival assurance report.

### Before obsolescence

- introduce the replacement format or algorithm;
- operate an overlap period;
- preserve old verifiers;
- document semantic equivalence and known loss;
- create a bridge record and new archive package.

## 11. Dissent and rejected work

Dissent, rejected proposals, failed experiments, and minority reports are preserved because they may explain future incidents or reveal that a later consensus was contingent.

They must not be presented as approved conclusions, but they must not disappear from history.

## 12. Sensitive material

The public archive must not expose:

- private autobiographical memory;
- credentials, private keys, or recovery shares;
- personal data without lawful and ethical basis;
- undisclosed vulnerabilities;
- copyrighted source material beyond allowed use;
- private reviewer information beyond the agreed disclosure scope.

Public manifests can commit to confidential annexes without publishing their contents.

## 13. Archive failure

Loss or inconsistency produces:

1. suspension of promotion dependent on the missing evidence;
2. preservation of surviving material;
3. incident record;
4. reconstruction from independent sources;
5. explicit declaration of gaps;
6. re-review when meaning or authenticity cannot be fully restored.

Missing evidence must never be replaced with invented certainty.
