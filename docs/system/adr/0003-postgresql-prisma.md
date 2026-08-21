# ADR-0003 — PostgreSQL e Prisma ORM 7

- Status: Accepted for implementation candidate
- Date: 2026-08-21
- Class: D1

## Decisão

PostgreSQL como armazenamento de produção e Prisma ORM 7 com driver `pg`.

## Razões

- transações;
- JSON para envelopes;
- índices temporais;
- integridade referencial;
- migrations versionadas;
- `LISTEN/NOTIFY` futuro.

## Limites

Prisma não define a ontologia. Schema e migrations precisam de revisão. Demo in-memory não é fonte de produção.
