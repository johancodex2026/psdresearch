# ADR-0002 — Google OAuth com allowlist

- Status: Accepted for implementation candidate
- Date: 2026-08-21
- Class: D1 / SEC

## Decisão

Preparar Auth.js com Google, JWT session, allowlist de e-mails/domínios e papéis internos.

## Razões

- não armazenar senha local;
- reduzir superfície da versão inicial;
- permitir revogação pela conta Google e pela allowlist.

## Limites

- nenhuma chave no repositório;
- modo demo explicitamente habilitado;
- modo Google sem credenciais falha fechado;
- MFA depende da política da conta Google;
- produção exige revisão do consent screen, callback e sessões.
