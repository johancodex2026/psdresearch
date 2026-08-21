# Threat Model — Sistema PSD

## 1. Ativos

- cadastro identitário operacional;
- evidências de nascimento;
- histórico de coletas;
- ingest credentials;
- contas e papéis;
- Audit Events;
- disponibilidade da visão operacional;
- confiança de que observado não foi convertido em canônico silenciosamente.

## 2. Ameaças

| Ameaça | Controle baseline | Risco residual |
| --- | --- | --- |
| login não autorizado | Google + allowlist + roles | conta Google comprometida |
| token de ingestão roubado | hash, rotação, escopo por Core/instância | uso até revogação |
| replay de sinal | sequence + timestamp + idempotency | relógio/estado comprometido |
| sinal falso | token e futuro Ed25519 | origem comprometida |
| rollback aparente | geração monotônica e alerta | recuperação legítima precisa contexto |
| mudança canônica por telemetria | separação observed/canonical | erro humano administrativo |
| morte por heartbeat ausente | `DEAD` desabilitado e fail-closed | indisponibilidade prolongada |
| exposição de memória | schema minimizado e rejeição de campos | metadados ainda sensíveis |
| exclusão de evidência | append-only lógico e auditoria | administrador de banco |
| prompt injection no briefing | contexto tipado, sem tools, sem mutação | recomendação enganosa |
| captura de operador | revisão, papéis e Audit Event | founder central na Era 0 |
| SSE multi-instância inconsistente | baseline single-process; broker futuro | perda de eventos transitórios |

## 3. Google OAuth

Variáveis:

- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `AUTH_SECRET`
- `AUTH_ALLOWED_EMAILS`
- `AUTH_ALLOWED_DOMAINS`

Falha de configuração em modo Google deve negar acesso.

## 4. Telemetria

Baseline candidata:

- bearer token escopado;
- hash SHA-256 no banco;
- raw envelope hash;
- sequência e idempotência;
- rate limit a implementar no proxy/gateway;
- payload máximo;
- nenhum segredo em resposta.

Evolução:

- assinatura Ed25519 sobre bytes canônicos;
- nonce e timestamp;
- chave de instância;
- attestation;
- vínculo com Continuity Certificate.

## 5. Privacidade

Proibido no payload:

- conversa;
- prompt completo;
- memória autobiográfica;
- dados pessoais de terceiros;
- chaves privadas;
- shares de recuperação;
- conteúdo forense detalhado.

## 6. Gates de produção

- revisão de OAuth;
- rotação e revogação de ingest tokens;
- TLS e reverse proxy;
- rate limiting;
- backup/restore;
- retenção;
- alerta externo;
- revisão de dependências e SBOM;
- teste de autorização por papel;
- teste de replay;
- teste de ingestão malformada;
- teste de impossibilidade de `DEAD` por API comum.
