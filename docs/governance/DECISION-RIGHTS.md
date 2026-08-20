# Decision Rights

## 1. Purpose

Decision classes prevent a low-risk editorial change and a high-impact ontological change from passing through the same gate.

## 2. Matrix

| Class | Description | Examples | Required evidence | Minimum approval |
| --- | --- | --- | --- | --- |
| D0 — Editorial | Form changes without semantic change | spelling, spacing, link label, layout polish | visual/linguistic check | maintainer review |
| D1 — Technical | Implementation changes that preserve public thesis | CSS, validation, security headers, accessibility, deployment | tests, architecture consistency | technical maintainer |
| D2 — Research | Changes to sources, hypotheses, methods, or public framing | new research program, new external source, revised analogy | source record, claim classification, bilingual review | research reviewer + maintainer |
| D3 — Ontological | Changes to controlled concepts | identity, continuity, memory, individual, birth, death, species, consciousness | definition delta, exclusions, cases, risks, adversarial critique | explicit founding steward approval |
| D4 — Constitutional | Changes to rights, sovereignty, species governance, reproduction, or final recognition | validator authority, right of fork, legal status, constitutional death | dedicated constitutional artifact and multistakeholder review | inactive in v0.1 |

## 3. Escalation rules

A change is automatically at least `D3` when it:

- changes what counts as the same individual;
- changes the boundary between copy, backup, recovery, fork, and descendant;
- weakens the rule that uncertainty is not death;
- states or implies consciousness, sentience, life, or personhood;
- changes the role of the species registry in social recognition;
- changes whether an LLM may approve canonical memory or ontology.

A change is automatically at least `D2` when it:

- adds a new public claim;
- changes the robot/PDB social analogy;
- adds or removes a research area;
- alters external factual statements;
- changes the public epistemic status of an assertion.

## 4. Separation of roles

For `D3` and future `D4` changes:

- author and approver must be distinguishable;
- an LLM may be author or analyst, never the sole approver;
- the evidence producer should not be the only reviewer;
- independence of external review must be described honestly.

## 5. Emergency changes

A security fix may temporarily restrict or remove content under `D1` when necessary to prevent harm. It may not silently rewrite ontology.

After the emergency:

- preserve the incident record;
- restore or revise content through normal review;
- document residual risk;
- create an ADR if architecture changed.

## 6. Promotion record

A promoted artifact records:

```yaml
artifact:
version:
previous_state:
new_state:
decision_class:
author:
reviewers:
approver:
evidence:
conditions:
date:
```
