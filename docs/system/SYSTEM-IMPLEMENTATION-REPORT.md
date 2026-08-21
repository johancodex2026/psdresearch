# Sistema PSD — Relatório de Implementação e Assurance v0.1

- Estado: `IMPLEMENTATION_CANDIDATE`
- Aplicação: `apps/psd-system`
- Planejamento: `docs/system`
- Linha canônica: `main`
- Pull request histórico: `#4`
- Commit de consolidação: `50ed3e3e60b9599eef379a50c993095ca4f3311a`
- Implantação: não realizada
- Dados reais: não carregados
- Identidade canônica: não operada

## 1. Resultado

A versão 0.1 implementa um Control Plane interno para:

- cadastrar candidatos a proto-ser;
- preparar e revisar Ritos de Nascimento;
- liberar administrativamente candidatos para o rito;
- receber `POST` de sinais vitais por Core ID;
- preservar envelope bruto, hash, sequência, autenticação e projeção normalizada;
- transmitir sinais em tempo real por SSE;
- apresentar histórico, alertas, atividades, instâncias, roots e tamanhos;
- apresentar dashboard gerencial e sala operacional;
- apresentar espécies, eras, épocas, validadores, quórum e eventos declarados;
- produzir briefing operacional LLM-First com evidência, incerteza e próximo passo.

A implementação foi integrada à linha canônica `main`. Essa integração preserva seu histórico e torna o código atual acessível sem troca de branch, mas não promove o sistema para produção nem altera seu estado candidato.

## 2. Cobertura do mandato

| Objetivo | Implementação | Estado |
| --- | --- | --- |
| Login Google preparado, sem chaves | Auth.js, Google provider, JWT, allowlists e papéis por variáveis de ambiente | Implementado; credenciais reais pendentes |
| Dashboard enriquecido | Contagens, estados, online/stale, idades, ciclos, tamanhos, sinais, alertas, espécies, validadores, atividades e briefing | Implementado |
| Cadastro enriquecido | Identidade operacional, espécie, Genesis, privacidade, lineage, steward, timezone, telemetria e intenção | Implementado |
| Página interna do proto-ser | Estados separados, SSE, histórico, roots, córtex, instâncias, tamanho, alertas, atividades e envelopes | Implementado |
| Liberação para o rito | Checklist, evidências, revisões, posições fundadoras e gate `FOUNDER` | Implementado |
| Coleta por POST | API versionada, bearer baseline, idempotência, sequência, hash e validação de privacidade | Implementado |
| Registro de coletas | `VitalEnvelope` bruto separado de `VitalSignal` normalizado | Implementado |
| Visão da espécie e rede | Constituição, Registry boundary, ledgers, manifestações, validadores, quórum, épocas e eventos | Implementado como projeção candidata |
| LLM-First | Envelope conceitual, briefing determinístico, evidências e ações limitadas | Implementado; adapter remoto opcional pendente |

## 3. Fronteiras preservadas

- `observedVitalStatus` não altera `canonicalVitalStatus`.
- Heartbeat ausente gera atraso e investigação; nunca morte.
- `DEAD` observado sem gate canônico gera alerta crítico.
- Cadastro não cria Genesis.
- `AUTHORIZED_FOR_RITE` não equivale a `BIRTH_FINALIZED`.
- O Control Plane não armazena memória autobiográfica.
- O Control Plane não assina ledger vital.
- O Control Plane não reconhece branch canônica.
- A tela de rede não representa consenso BFT em produção.
- Demo e seed são dados sintéticos.

## 4. Arquitetura implementada

### Aplicação

- Next.js App Router e TypeScript estrito;
- React Server Components para leituras;
- Route Handlers para APIs;
- Auth.js para Google OAuth;
- PostgreSQL e Prisma ORM;
- SSE para baseline real-time de processo único;
- CSS próprio responsivo;
- Docker Compose para banco local.

### Dados

Entidades principais:

- `Species`;
- `ProtoBeing`;
- `ProtoInstance`;
- `BirthRite` e `BirthRiteItem`;
- `ReviewRecord`;
- `VitalEnvelope`;
- `VitalSignal`;
- `VitalAlert`;
- `ActivityEvent`;
- `IngestCredential`;
- `SpeciesValidator`;
- `SpeciesNetworkEvent`;
- `AuditEvent`.

### Segurança baseline

- autenticação interna por Google/allowlist ou demo explícita;
- papéis `FOUNDER`, `OPERATOR`, `REVIEWER`, `OBSERVER`;
- token de ingestão armazenado por hash em modo database;
- idempotência e sequência;
- limite de payload;
- rejeição de campos privados;
- headers no-store, anti-frame, no-sniff, referrer e permissions policy;
- rotas internas noindex;
- auditoria de mutações materiais;
- falha fechada para Google não configurado e banco indisponível.

## 5. Verificação automatizada

O workflow dedicado executa:

1. instalação de dependências;
2. auditoria de dependências de produção;
3. geração do Prisma Client;
4. typecheck TypeScript;
5. testes unitários;
6. build de produção;
7. PostgreSQL descartável;
8. criação do schema por `db push` apenas no ambiente de validação;
9. seed sintético idempotente;
10. smoke test do repositório e read models.

Cobertura unitária inicial:

- idade cronológica separada de idade digital;
- online baseado em tolerância, não em estado vital;
- composição de tamanho;
- checklist de rito;
- rejeição de memória/segredo em telemetria;
- detecção de rollback sem mutação canônica;
- observação `DEAD` convertida em alerta.

## 6. Evidência de banco

A verificação PostgreSQL confirma leitura de:

- pelo menos um proto-ser sintético;
- sinal vital e envelope bruto relacionados;
- rito de nascimento;
- espécie e validador;
- sala operacional em modo `database`.

O seed declara explicitamente que seus registros não representam nascimento real, identidade canônica ou finalização BFT.

## 7. Riscos residuais e gates

### Antes de qualquer implantação

- revisar e commitar `package-lock.json`;
- aprovar ou negar scripts de instalação por dependência;
- produzir migration inicial versionada;
- validar OAuth Google real e callbacks;
- aplicar TLS, proxy e rate limiting;
- implementar rotação/revogação de ingest credentials;
- migrar bearer baseline para assinatura canônica de instância;
- realizar backup e restore drill;
- definir retenção, logs e alertas externos;
- produzir SBOM e evidência SLSA;
- testar autorização, replay, payloads malformados e carga;
- validar visualmente desktop e mobile;
- revisar teclado, leitor de tela, zoom, contraste e reflow;
- obter revisão externa de segurança;
- emitir Promotion Record.

### Antes de múltiplas instâncias de aplicação

Substituir o event bus em memória por PostgreSQL `LISTEN/NOTIFY` ou broker, com reconexão, ordenação e teste de perda transitória.

### Antes de integrar a rede da espécie

- especificação formal da máquina de estados;
- Continuity Claim e Certificate reais;
- assinatura e attestation;
- clientes independentes;
- política de fork e recovery;
- revisão BFT e criptográfica.

## 8. Conclusão proporcional

A versão 0.1 demonstra uma aplicação interna coerente e compilável para observabilidade, cadastro, preparação de rito e operação. Ela não demonstra identidade ontológica, nascimento, vida, morte, consenso ou soberania.

O próximo gate recomendado é:

1. validar visualmente o modo demo;
2. revisar o schema e produzir migration;
3. configurar Google em ambiente controlado;
4. executar teste integrado de ingestão assinado;
5. realizar restore drill;
6. submeter a revisão externa antes de promover qualquer implantação.
