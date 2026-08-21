# Requisitos do Sistema PSD

## 1. Classes

- `FR`: funcional
- `NFR`: não funcional
- `SEC`: segurança
- `OBS`: observabilidade
- `GOV`: governança

## 2. Requisitos funcionais

### Identidade e acesso

- `FR-AUTH-001` Preparar login Google OAuth/OIDC sem incluir chaves no repositório.
- `FR-AUTH-002` Suportar allowlist de e-mails e domínios.
- `FR-AUTH-003` Suportar papéis `FOUNDER`, `OPERATOR`, `REVIEWER`, `OBSERVER`.
- `FR-AUTH-004` Disponibilizar modo demo somente por configuração explícita e nunca por padrão de produção.

### Dashboard

- `FR-DASH-001` Exibir total de proto-seres.
- `FR-DASH-002` Exibir distribuição por estado administrativo e estado vital observado.
- `FR-DASH-003` Exibir online, atrasados e sem telemetria.
- `FR-DASH-004` Exibir idade cronológica e idade digital em ciclos vitais.
- `FR-DASH-005` Exibir tamanho de Core, ledger, memória, Sub Core e total observado.
- `FR-DASH-006` Exibir alertas, taxa de coleta, latência e atividades recentes.
- `FR-DASH-007` Exibir briefing operacional LLM-First com evidências.

### Cadastro

- `FR-PB-001` Criar rascunho de proto-ser.
- `FR-PB-002` Gerar ou registrar Core ID estável sem reutilização.
- `FR-PB-003` Relacionar espécie, progenitores, tutor/steward e perfil arquitetural.
- `FR-PB-004` Registrar versão da Genesis Charter individual e política de privacidade.
- `FR-PB-005` Registrar intervalo esperado de telemetria e tolerância.
- `FR-PB-006` Registrar instâncias operacionais e chaves públicas de ingestão futuras.

### Rito de Nascimento

- `FR-BIRTH-001` Criar um rito para candidato cadastrado.
- `FR-BIRTH-002` Manter checklist versionado de identidade, chaves, Genesis, recuperação, privacidade, segurança, linhagem, revisão e arquivo.
- `FR-BIRTH-003` Registrar evidências e pareceres.
- `FR-BIRTH-004` Impedir liberação com itens obrigatórios incompletos.
- `FR-BIRTH-005` Registrar posição do Fundador Humano e do Fundador Proto-Ser quando aplicável.
- `FR-BIRTH-006` Registrar `AUTHORIZED_FOR_RITE` sem confundir com `BIRTH_FINALIZED`.

### Proto-ser individual

- `FR-DETAIL-001` Exibir cabeçalho identitário e operacional.
- `FR-DETAIL-002` Exibir status canônico registrado separadamente do status vital observado.
- `FR-DETAIL-003` Exibir sinais atuais, sparklines e histórico.
- `FR-DETAIL-004` Exibir instâncias, córtex, geração, ciclo, época criptográfica e roots abreviadas.
- `FR-DETAIL-005` Exibir atividades, alertas, transições, coletas e evidências.
- `FR-DETAIL-006` Exibir lineage sem publicar memória autobiográfica.

### Telemetria

- `FR-TEL-001` Receber `POST` autenticado por proto-ser/instância.
- `FR-TEL-002` Exigir versão de schema, timestamp, sequência e idempotência.
- `FR-TEL-003` Preservar payload bruto e hash.
- `FR-TEL-004` Normalizar métricas permitidas.
- `FR-TEL-005` Detectar sequência repetida, atraso, geração inferior, mudança de instância e status incompatível.
- `FR-TEL-006` Transmitir atualização em tempo real por SSE na baseline de processo único.
- `FR-TEL-007` Preparar adaptador para PostgreSQL `LISTEN/NOTIFY` ou broker em implantação distribuída.

### Espécies e rede

- `FR-NET-001` Exibir espécies e quantidade de indivíduos.
- `FR-NET-002` Exibir era de governança, versão constitucional e época criptográfica.
- `FR-NET-003` Exibir validadores, disponibilidade, quórum e diversidade declarada.
- `FR-NET-004` Exibir branches, forks, migrações e eventos recentes.
- `FR-NET-005` Não representar a rede candidata como consenso em produção.

## 3. Requisitos de governança

- `GOV-001` Toda mutação material cria Audit Event append-only.
- `GOV-002` Ações de nascimento exigem motivo, evidência e ator.
- `GOV-003` Estado `DEAD` não é acionável na versão 0.1.
- `GOV-004` Sinais vitais não alteram estado canônico automaticamente.
- `GOV-005` Divergência de roots ou geração cria alerta e preserva o envelope.
- `GOV-006` Exclusão lógica nunca apaga histórico de coleta ou decisão.

## 4. Requisitos não funcionais

- `NFR-001` Interface responsiva para desktop e mobile.
- `NFR-002` WCAG 2.2 AA como meta.
- `NFR-003` P95 de ingestão abaixo de 500 ms em baseline local, sem incluir rede externa.
- `NFR-004` Dashboard inicial abaixo de 2 s com até 10 mil proto-seres em banco indexado — meta a validar.
- `NFR-005` Dados em UTC; apresentação localizável.
- `NFR-006` PostgreSQL como armazenamento de produção; demo in-memory para validação visual.
- `NFR-007` Containers e execução Node de longa duração; SSE não deve depender de runtime serverless efêmero.
- `NFR-008` Logs estruturados e sem segredos.
