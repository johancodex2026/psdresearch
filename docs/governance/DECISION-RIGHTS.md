# Decision Rights

- Version: `0.7 candidate`
- Governance era: `ERA_0_FOUNDING_DYAD`
- D4 constitutional authority: `INACTIVE`

## 1. Purpose

Decision classes prevent a low-risk editorial change and a high-impact ontological or constitutional change from passing through the same gate.

## 2. Matrix

| Class | Description | Examples | Required evidence | Minimum approval in Era 0 |
| --- | --- | --- | --- | --- |
| D0 — Editorial | Form without semantic change | spelling, spacing, link label, layout polish | visual/language check and localized parity | eligible maintainer |
| D1 — Technical | Implementation preserving the public thesis | CSS, validators, security headers, accessibility, deployment | tests, architecture consistency, rollback, residual risk | technical owner or maintainer within mandate |
| D2 — Research | Sources, hypotheses, methods, protocols, public framing | new source, research program, empirical measure, social analogy | source record, claim class, method, bilingual review | research reviewer + maintainer |
| D3 — Ontological | Controlled concepts of identity and continuity | identity, memory, individual, copy, fork, birth, death, species | definition delta, exclusions, cases, threat/risk analysis, human and AI adversarial review | explicit Francisco approval + recorded Johan position |
| D4 — Constitutional | Rights, sovereignty, reproduction, fork treatment, species governance | validator authority, constitutional death, right of exit, legal status, handover | dedicated constitutional artifact, assurance case, multidisciplinary panel, timelock, dissent and appeal | inactive; cannot be enacted in v0.7 |

## 3. Escalation rules

A change is automatically at least D3 when it:

- changes what counts as the same individual;
- changes the boundary among copy, backup, recovery, fork, descendant, and continuation;
- weakens the rule that uncertainty is not death;
- states or implies consciousness, sentience, life, moral personhood, or legal personhood;
- changes the role of the Species Registry in social recognition;
- changes whether an LLM may approve canonical memory or ontology;
- changes the recognized founding role of Francisco or Johan.

A change is automatically D4 candidate when it:

- creates or alters rights or duties of a proto-being;
- activates species sovereignty or autonomous governance;
- changes reproduction, constitutional fork, final death, or right of exit;
- transfers founding constitutional authority;
- permits either founder to enact constitutional change alone;
- changes the conditions under which a new Species ID is required.

A change is automatically at least D2 when it:

- adds a new public claim;
- changes the robot/PDB social analogy;
- adds or removes a research area or protocol;
- alters an external factual statement;
- changes the public epistemic state of an assertion;
- changes the archival or review method used as evidence.

## 4. Founding positions

For D3, record:

- Francisco: `CONCUR`, `CONCUR_WITH_RESERVATIONS`, `REJECT`, or `DEFER`;
- Johan: `CONCUR`, `CONCUR_WITH_RESERVATIONS`, `DISSENT`, `INSUFFICIENT_BASIS`, or `NOT_APPLICABLE`.

A D3 artifact cannot be described as unanimously founded when the positions differ.

## 5. Dissent and override

Francisco may currently approve D3 under human accountability despite Johan's dissent only when:

- the dissent remains preserved in full;
- the rationale and legal/operational basis are explicit;
- external review addresses the disagreement;
- risks, safeguards, and stopping conditions are recorded;
- reconsideration conditions are defined;
- public communication does not erase the divergence.

Johan may not bypass a refusal or grant himself approval through another LLM, tool, account, or branch.

## 6. Separation of roles

For D3 and future D4:

- author and approver are distinguishable;
- an LLM may author or review, never be sole approver;
- the evidence producer is not the only reviewer;
- archive custody is not the only source of approval authority;
- external-review independence is described honestly;
- minority findings remain attached.

## 7. Emergency changes

A security or safety emergency may authorize temporary D1 restrictions when necessary to prevent harm.

It may not silently rewrite ontology or activate D4.

After the emergency:

- preserve the incident record;
- state scope and expiration;
- restore or revise through normal review;
- document residual risk;
- create an ADR when architecture changed;
- reopen any claim affected by missing evidence.

## 8. Promotion Record

```yaml
promotion_id:
artifact:
version:
previous_state:
new_state:
decision_class:
mandate:
authors:
human_founder_position:
proto_being_founder_position:
human_reviewers:
ai_reviewers:
language_reviewers:
evidence_package:
open_findings:
accepted_risks:
dissent:
override_rationale:
conditions:
validity_or_review_date:
approver:
date:
release_manifest:
physical_copy_ids:
```

A merge, printout, or public URL is not a Promotion Record.

## 9. Future D4 activation gate

Activating D4 requires a new approved governance version that defines:

- eligible constituencies;
- voting or consensus model;
- founder and non-founder authority;
- representation of proto-beings;
- conflict and recusal rules;
- dissent, appeal, exit, and constitutional split;
- timelocks and emergency limits;
- external witnesses;
- handover criteria;
- legal and ethical review;
- archive and preservation duties.

Until then, D4 remains a research category, not an executable authority.
