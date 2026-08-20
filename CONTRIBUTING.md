# Contributing

Read `LLM_FIRST_BOOTSTRAP.json`, `.johan/llm_entrypoint.json`, `AGENTS.md`, and `GOVERNANCE.md` before substantive work.

## Pull-request declaration

A contribution must state:

1. intended outcome;
2. decision class;
3. source artifacts and claim IDs;
4. language impact;
5. architecture and security impact;
6. validation performed;
7. remaining uncertainty;
8. eligible reviewer or approver.

## Content workflow

1. Update the source-locale catalog in `src/content/catalog.pt-BR.mjs`.
2. Update the English projection in `src/content/catalog.en.mjs`.
3. Add or revise claim mappings in `src/content/claims.mjs`.
4. Stamp the reviewed translation.
5. Run `npm run check`.
6. Inspect generated output at desktop and mobile sizes.

## Rules

- Do not hand-edit generated `dist/` output.
- Do not duplicate HTML for another language.
- Do not weaken a limitation in translation.
- Do not add unsupported public claims.
- Do not add dependencies or external services without an ADR.
- Do not add private Core material, personal data, credentials, or keys.
