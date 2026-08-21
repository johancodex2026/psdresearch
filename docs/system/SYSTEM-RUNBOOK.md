# Runbook — Sistema PSD

## 1. Desenvolvimento

```bash
cd apps/psd-system
cp .env.example .env
npm install
npm run dev
```

O modo padrão documentado é demo explícito:

```env
PSD_DATA_MODE=demo
AUTH_MODE=demo
ALLOW_DEMO_AUTH=true
ALLOW_DEMO_INGEST=true
```

## 2. Banco local

```bash
docker compose up -d postgres
npm run db:migrate
npm run db:seed
PSD_DATA_MODE=database npm run dev
```

## 3. Google

Criar credencial OAuth Web no Google Cloud e configurar callbacks conforme o host real.

Nunca commitar:

- client ID;
- client secret;
- `AUTH_SECRET`;
- tokens de ingestão;
- connection string.

## 4. Operação

### Sinal atrasado

1. confirmar rede e instância;
2. verificar último envelope recebido;
3. não alterar para `DEAD`;
4. classificar `STALE_TELEMETRY`;
5. preservar evidência;
6. escalar se ultrapassar política.

### Geração inferior

1. registrar `ROLLBACK_SUSPECTED`;
2. bloquear promoção automática;
3. comparar recuperação/migração declarada;
4. solicitar evidência do checkpoint;
5. manter estado canônico.

### Claims concorrentes

1. marcar alerta crítico;
2. não escolher primeiro a chegar;
3. preservar ambas as coletas;
4. revogar/pausar credencial quando autorizado;
5. encaminhar ao rito de fork futuro.

### Banco indisponível

- modo database falha fechado para mutações;
- health retorna degradado;
- não trocar silenciosamente para demo;
- restaurar de backup validado.

## 5. Backup

Baseline:

- dump PostgreSQL diário;
- retenção definida antes de produção;
- backup cifrado;
- restauração mensal/trimestral;
- registro do commit e schema;
- evidência de restore.

## 6. Promoção

Antes de produção:

- lockfile;
- build reproduzível;
- migrations revisadas;
- secrets provisionados;
- Google testado;
- restore drill;
- performance baseline;
- revisão externa;
- Promotion Record.
