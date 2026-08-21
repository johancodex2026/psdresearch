# Data and Contact Publication Gate

## Purpose

Prevent a candidate legal page from becoming effective while its controller, providers, channels, and data flows remain hypothetical.

## Required inventory

Before production publication, record:

- company incorporation document and CNPJ;
- registered office and responsible people;
- canonical and alias domains;
- registrar, DNS, CDN, hosting, repository, security, and communication providers;
- data categories and sources;
- purpose and legal basis per operation;
- processor/controller role;
- countries and transfer mechanisms;
- log fields and retention;
- access, correction, deletion, backup, and incident procedures;
- monitored privacy, accessibility, legal, general, and security channels;
- responsible person and escalation path per channel.

## Current channels

Active in the candidate phase:

- public GitHub repository and issue templates for non-sensitive matters;
- GitHub Private Vulnerability Reporting for security matters;
- `/.well-known/security.txt`.

Not active and therefore not to be invented:

- corporate general email;
- privacy/data-subject channel;
- accessibility channel;
- legal notices address;
- press channel.

## Gate result

Until all required fields are evidenced:

```yaml
legal_documents_effective: false
public_release_legal_gate: blocked
company_status: em constituição
cnpj: "**.***.***/****-**"
```
