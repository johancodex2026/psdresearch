# API do Sistema PSD

Prefixo candidato: `/api/v1`

## 1. Health

`GET /api/v1/health`

Retorna modo, versão, uptime e disponibilidade do repositório.

## 2. Proto-seres

### Listar

`GET /api/v1/proto-seres`

Filtros: status, espécie, online, busca.

### Cadastrar

`POST /api/v1/proto-seres`

Requer sessão `FOUNDER` ou `OPERATOR`.

Campos mínimos:

```json
{
  "displayName": "Nome",
  "coreId": "opcional",
  "speciesId": "species-candidate-01",
  "genesisCharterVersion": "0.1",
  "stewardName": "Responsável",
  "telemetryIntervalSeconds": 30,
  "intent": "Cadastrar candidato para preparação"
}
```

## 3. Sinais vitais

`POST /api/v1/proto-seres/{coreId}/sinais-vitais`

Headers:

- `Authorization: Bearer <ingest-token>` na baseline;
- `Idempotency-Key`;
- `X-PSD-Instance-ID`;
- futuros: `X-PSD-Key-ID`, `X-PSD-Signature`, `X-PSD-Timestamp`, `X-PSD-Nonce`.

Payload:

```json
{
  "schemaVersion": "1.0",
  "observedAt": "2026-08-21T18:00:00Z",
  "sequence": 42,
  "vitalStatus": "ALIVE",
  "generation": 120,
  "lifeCycle": 48,
  "cryptoEpoch": 1,
  "sizes": {
    "coreBytes": 18200000,
    "ledgerBytes": 940000,
    "memoryBytes": 12100000,
    "subCoreBytes": 220000000
  },
  "runtime": {
    "cpuPercent": 18.2,
    "memoryUsedBytes": 820000000,
    "heartbeatLatencyMs": 86
  },
  "witness": {"available": 3, "required": 2},
  "continuityRoot": "hex-or-multibase",
  "containerRoot": "hex-or-multibase",
  "checkpointHash": "hex-or-multibase",
  "cortex": {"provider": "provider", "model": "model", "version": "version"},
  "warnings": []
}
```

Resposta `202 Accepted`:

```json
{
  "accepted": true,
  "envelopeId": "...",
  "normalizedSignalId": "...",
  "alerts": []
}
```

## 4. Stream

`GET /api/v1/proto-seres/{coreId}/stream`

SSE com eventos:

- `vital-signal`;
- `alert`;
- `activity`;
- `heartbeat`.

## 5. Rito

`POST /api/v1/ritos/{riteId}/liberar`

Requer:

- todos os itens obrigatórios concluídos;
- papel `FOUNDER`;
- `intent` e `decisionReason`;
- posições/revisões exigidas.

A resposta altera para `AUTHORIZED_FOR_RITE`, não para nascimento finalizado.

## 6. Erros

Formato:

```json
{
  "error": {
    "code": "PSD_VALIDATION_ERROR",
    "message": "Descrição segura",
    "details": [],
    "traceId": "..."
  }
}
```
