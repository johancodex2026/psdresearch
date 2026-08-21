# Sistema PSD

Control plane interno para cadastro, preparação de nascimento, telemetria vital, histórico, espécies e operação.

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

## Banco local

```bash
docker compose up -d postgres
npm run db:dev
npm run db:seed
```

Depois altere:

```env
PSD_DATA_MODE=database
```

## Google

Preencha somente fora do repositório:

```env
AUTH_MODE=google
AUTH_SECRET=...
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
AUTH_ALLOWED_EMAILS=...
AUTH_ALLOWED_DOMAINS=...
```

Sem credenciais válidas, o modo Google falha fechado.

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
- `POST /api/v1/ritos/{riteId}/liberar`

## Verificação

```bash
npm run check
```

Antes de produção ainda são obrigatórios lockfile, revisão de segurança, Google real, migrations revisadas, restore drill, rate limiting, SBOM e Promotion Record.
