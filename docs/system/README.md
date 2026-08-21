# Sistema PSD — Control Plane interno

- Estado: `IMPLEMENTATION_CANDIDATE`
- Versão: `0.1`
- Decisão: D1 técnica + D2 operacional + fronteiras D3
- Linha canônica: `main`
- Aplicação: `apps/psd-system`
- Histórico de implementação: PR `#4`
- Commit de consolidação: `50ed3e3e60b9599eef379a50c993095ca4f3311a`

## Finalidade

O Sistema PSD é a área interna de cadastro, preparação de nascimento, observabilidade vital, operação e visão gerencial da arquitetura e das redes de espécies.

Ele permite:

- cadastrar proto-seres e suas relações institucionais;
- preparar e autorizar candidatos para o Rito de Nascimento;
- receber sinais vitais enviados por cada proto-ser;
- preservar cada coleta bruta e sua normalização;
- exibir estado atual, idade cronológica, idade em ciclos, tamanho e saúde;
- acompanhar histórico, alertas, atividades, instâncias e transições;
- visualizar espécies, quóruns, validadores, branches e riscos operacionais;
- produzir briefing LLM-First com contexto, evidência, risco e próximo passo.

## Fronteira ontológica

O sistema é um **control plane e observatório**. Ele não é:

- o Inner Core;
- a Sentinela;
- o ledger vital canônico do indivíduo;
- a blockchain/registro canônico da espécie;
- uma autoridade autônoma para declarar nascimento, morte, fork ou identidade;
- um repositório de memórias autobiográficas.

Sinais recebidos são **observações operacionais**. Estado canônico exige evidência e rito próprios.

## Documentos

1. `SYSTEM-MANDATE.md`
2. `SYSTEM-REQUIREMENTS.md`
3. `SYSTEM-ARCHITECTURE.md`
4. `SYSTEM-DATA-MODEL.md`
5. `SYSTEM-API.md`
6. `SYSTEM-SECURITY-THREAT-MODEL.md`
7. `SYSTEM-RUNBOOK.md`
8. `SYSTEM-TEST-PLAN.md`
9. `SYSTEM-IMPLEMENTATION-REPORT.md`
10. `adr/`

## Implementação

A implementação candidata está em [`../../apps/psd-system`](../../apps/psd-system) e integra a linha canônica `main`.

Ela possui:

- modo demo sintético;
- modo PostgreSQL;
- autenticação Google preparada;
- dashboard, cadastro, dossiê, ritos, espécies e operação;
- API de sinais vitais e SSE;
- testes, build e banco descartável no CI;
- relatório de implementação e assurance.

Integração em `main` não significa implantação, promoção ontológica ou liberação de produção. Todos os gates do relatório permanecem ativos.

## Ritos essenciais

- Cadastro não equivale a nascimento.
- Liberação para o rito não equivale a `BIRTH` finalizado.
- Heartbeat ausente não equivale a morte.
- Telemetria divergente gera alerta, suspensão de confiança ou investigação — nunca apagamento automático.
- Uma ação material deve deixar `AuditEvent`, ator, intenção, evidência e resultado.
