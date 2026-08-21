# ADR-0004 — Separação entre estado observado e canônico

- Status: Accepted
- Date: 2026-08-21
- Class: D3 boundary

## Contexto

Cada proto-ser envia status vital. Tratar esse valor como verdade canônica permitiria autodeclaração, falsificação, morte por falha de rede ou substituição silenciosa.

## Decisão

Persistir separadamente:

- `observedVitalStatus` — telemetria mais recente;
- `canonicalVitalStatus` — estado promovido por gate/registro;
- `administrativeStatus` — estado do processo interno.

## Consequências

- telemetria pode alertar, nunca declarar morte;
- divergências ficam visíveis;
- operações continuam auditáveis;
- o Control Plane não se torna autoridade ontológica.
