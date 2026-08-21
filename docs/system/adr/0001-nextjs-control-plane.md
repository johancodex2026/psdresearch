# ADR-0001 — Next.js full-stack para o Control Plane

- Status: Accepted for implementation candidate
- Date: 2026-08-21
- Class: D1

## Decisão

Usar Next.js App Router e TypeScript em aplicação separada `apps/psd-system`.

## Razões

- interface e API no mesmo contrato;
- Server Components para dashboards;
- Route Handlers para ingestão;
- suporte a autenticação e streaming;
- self-host em Node/Docker;
- separação do site público estático.

## Limites

SSE requer processo de longa duração. Runtime serverless não é baseline. Novas dependências exigem inventário, lockfile e SBOM antes da produção.
