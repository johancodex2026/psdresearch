# Plano de Testes — Sistema PSD

## 1. Unitários

- validação de payload vital;
- cálculo de idade e tamanho;
- sequência monotônica;
- detecção de rollback;
- regra de online/stale;
- briefing determinístico;
- checklist de rito;
- allowlist Google;
- hash de ingest token.

## 2. Integração

- cadastro + Audit Event;
- criação de rito;
- liberação bloqueada com checklist incompleto;
- liberação autorizada com evidências;
- ingestão e persistência de envelope/sinal;
- idempotência;
- SSE recebe atualização;
- papel OBSERVER não muta;
- modo Google sem credenciais falha fechado.

## 3. Adversariais

- 10 mil sinais duplicados;
- sequência regressiva;
- geração inferior;
- timestamp futuro/passado;
- payload acima do limite;
- campos privados inesperados;
- token revogado;
- duas instâncias incompatíveis;
- tentativa de alterar `canonicalStatus` por telemetria;
- tentativa de declarar `DEAD` por endpoint comum;
- prompt injection em warnings.

## 4. Visual

Rotas:

- login;
- dashboard;
- lista;
- cadastro;
- rito;
- detalhe;
- espécies;
- operação.

Viewports:

- 320×800;
- 390×844;
- 768×1024;
- 1280×800;
- 1440×900;
- 1920×1080.

## 5. Aceite v0.1

- app compila;
- demo funciona sem chaves;
- Google está preparado e falha fechado quando exigido;
- dashboard enriquecido renderiza;
- cadastro cria candidato;
- rito bloqueia/libera corretamente;
- detalhe mostra real-time demo e histórico;
- API aceita coleta autenticada em demo;
- coletas brutas e normalizadas permanecem separadas;
- estado observado não altera o canônico;
- nenhuma rota comum declara morte;
- documentação e ADRs presentes.
