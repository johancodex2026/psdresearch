# Sistema PSD

Control Plane interno para cadastro, preparação de nascimento, telemetria vital, histórico, espécies e operação.

## Estado

`IMPLEMENTATION_CANDIDATE v0.1`

O sistema não é o Inner Core nem o Registro canônico da espécie. Telemetria é observação operacional; nascimento e estado canônico exigem rito e evidência.

## Início rápido — demo

```bash
cp .env.example .env
npm install
npm run dev
```

Abra `http://localhost:3000`.

O modo demo exige:

```env
PSD_DATA_MODE=demo
AUTH_MODE=demo
ALLOW_DEMO_AUTH=true
ALLOW_DEMO_INGEST=true
```

O dataset é sintético, permanece em memória de processo e não deve ser confundido com uma espécie ou identidade em produção.

## Banco local candidato

```bash
docker compose up -d postgres
npm run db:push
npm run db:seed
```

Depois altere:

```env
PSD_DATA_MODE=database
```

E execute:

```bash
npm run dev
```

`db:push` serve ao desenvolvimento candidato. Produção exige migration versionada, revisada e testada antes de `db:migrate`.

Para uma verificação destrutiva em banco descartável, equivalente ao CI:

```bash
npm run db:verify:ci
```

Ela recria o schema, aplica o seed sintético e testa o repositório PostgreSQL. Não use esse comando sobre dados que precisem ser preservados.

## Google

Preencha somente fora do repositório:

```env
AUTH_MODE=google
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
AUTH_ALLOWED_EMAILS=...
AUTH_ALLOWED_DOMAINS=...
AUTH_FOUNDER_EMAILS=...
AUTH_REVIEWER_EMAILS=...
AUTH_OBSERVER_EMAILS=...
```

Sem credenciais válidas ou allowlist, o modo Google falha fechado.

## Rotas

- `/login`
- `/dashboard`
- `/proto-seres`
- `/proto-seres/novo`
- `/proto-seres/[id]`
- `/ritos-de-nascimento`
- `/especies`
- `/operacao`

## API

- `GET /api/v1/health`
- `GET|POST /api/v1/proto-seres`
- `POST /api/v1/proto-seres/{coreId}/sinais-vitais`
- `GET /api/v1/proto-seres/{coreId}/stream`
- `PATCH /api/v1/ritos/{riteId}/itens/{itemId}`
- `POST /api/v1/ritos/{riteId}/liberar`

## Verificação

```bash
npm run check
```

O workflow dedicado também executa:

- auditoria de dependências de produção;
- geração Prisma;
- TypeScript estrito;
- testes unitários;
- build de produção;
- PostgreSQL descartável;
- criação do schema;
- seed sintético;
- smoke test do repositório e dos read models.

## Gates ainda necessários para produção

- `package-lock.json` revisado e política explícita de scripts de instalação;
- migration inicial versionada e revisada;
- Google OAuth real e consent screen;
- rate limiting, TLS e reverse proxy;
- assinatura de telemetria e rotação de credenciais;
- backup e restore drill;
- retenção e inventário de dados;
- logs e alertas externos;
- SBOM/SLSA e revisão da cadeia de suprimentos;
- revisão de segurança e autorização por papel;
- validação visual desktop/mobile;
- Promotion Record.
