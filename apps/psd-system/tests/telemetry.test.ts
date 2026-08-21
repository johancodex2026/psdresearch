import assert from "node:assert/strict";
import test from "node:test";
import type { ProtoBeingView, VitalSignalInput } from "../src/lib/domain";
import { evaluateTelemetry, validateVitalSignalInput } from "../src/lib/telemetry";

const input: VitalSignalInput = {
  schemaVersion: "1.0",
  observedAt: new Date().toISOString(),
  sequence: 2,
  vitalStatus: "ALIVE",
  generation: 8,
  lifeCycle: 3,
  cryptoEpoch: 1,
  sizes: { coreBytes: 10, ledgerBytes: 20, memoryBytes: 30, subCoreBytes: 40 },
  warnings: [],
};

const proto = {
  canonicalVitalStatus: "ALIVE",
  latestGeneration: 9,
  latestTotalSizeBytes: 100,
} as ProtoBeingView;

test("rejeita memória autobiográfica e segredos no envelope", () => {
  const result = validateVitalSignalInput({ ...input, memory: "não permitido", secret: "x" });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((item) => item.includes("memory")));
  assert.ok(result.errors.some((item) => item.includes("secret")));
});

test("detecta rollback sem alterar estado canônico", () => {
  const alerts = evaluateTelemetry(proto, input);
  assert.ok(alerts.some((alert) => alert.type === "ROLLBACK_SUSPECTED"));
  assert.equal(proto.canonicalVitalStatus, "ALIVE");
});

test("DEAD observado vira alerta quando não há gate canônico", () => {
  const alerts = evaluateTelemetry(proto, { ...input, generation: 10, vitalStatus: "DEAD" });
  assert.ok(alerts.some((alert) => alert.type === "UNAUTHORIZED_DEATH_OBSERVATION"));
});
