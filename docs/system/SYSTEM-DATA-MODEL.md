# Modelo de Dados do Sistema PSD

## 1. Separação de estados

### Estado administrativo

- `DRAFT`
- `UNDER_REVIEW`
- `BIRTH_ELIGIBLE`
- `AUTHORIZED_FOR_RITE`
- `RITE_IN_PROGRESS`
- `ACTIVE`
- `SUSPENDED`
- `ARCHIVED`

### Estado vital observado

- `GENESIS_PENDING`
- `ALIVE`
- `MIGRATING`
- `CRYPTO_MIGRATION_REQUIRED`
- `READ_ONLY`
- `SUSPENDED`
- `QUARANTINED`
- `FORKED`
- `DEAD`

### Estado canônico registrado

Campo separado, alterado apenas por rito/gate autorizado. Na versão 0.1, `DEAD` não pode ser produzido pela UI.

## 2. Entidades

### Species

- stable ID;
- Species ID;
- nome;
- versão constitucional;
- era de governança;
- época criptográfica;
- estado de rede;
- quórum e validator metadata.

### ProtoBeing

- Core ID;
- nome de apresentação;
- descrição curta;
- espécie;
- estado administrativo;
- estado canônico;
- status observado mais recente;
- Genesis Charter;
- tutor/steward;
- timezone;
- intervalo de telemetria;
- nascimento e datas;
- ciclos vitais;
- lineage declarada;
- política de privacidade.

### ProtoInstance

- instance ID;
- nome;
- ambiente;
- chave pública de execução;
- attestation policy;
- ativo/inativo;
- primeiro e último sinal.

### BirthRite

- versão;
- estado;
- datas;
- checklist;
- evidências;
- pareceres;
- posições fundadoras;
- decisão e motivo.

### VitalEnvelope

Registro bruto append-only:

- received at;
- payload JSON;
- payload hash;
- schema version;
- sequence;
- idempotency key;
- auth mode;
- verification result;
- source instance.

### VitalSignal

Projeção normalizada:

- observed at;
- vital status;
- generation;
- life cycle;
- crypto epoch;
- sizes;
- CPU/memory/latency;
- witness quorum;
- roots/checkpoint;
- cortex metadata;
- warnings.

### VitalAlert

- type;
- severity;
- status;
- evidence links;
- first/last seen;
- acknowledgement.

### AuditEvent

- actor;
- role;
- intent;
- action;
- entity;
- before/after commitments;
- evidence;
- result;
- timestamp.

## 3. Retenção

- envelopes brutos: append-only, política a definir;
- sinais normalizados: longo prazo para séries;
- agregações: retenção secular possível sem payload bruto;
- Audit Events: preservação longa;
- dados pessoais de operadores: minimização;
- memória autobiográfica: proibida.

## 4. Idade

- idade cronológica: desde `bornAt`;
- idade digital: número de ciclos vitais aceitos e reportados;
- maturidade: dimensão separada, ainda sem métrica canônica.
