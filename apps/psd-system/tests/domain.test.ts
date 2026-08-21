import assert from "node:assert/strict";
import test from "node:test";
import { chronologicalAgeDays, isOnline, totalSize } from "../src/lib/domain";

const now = Date.parse("2026-08-21T12:00:00Z");

test("idade cronológica e idade digital permanecem conceitos separados", () => {
  assert.equal(chronologicalAgeDays("2026-08-19T12:00:00Z", now), 2);
});

test("online usa tolerância de telemetria, não estado vital", () => {
  assert.equal(isOnline({ lastSeenAt: "2026-08-21T11:59:31Z", telemetryToleranceSec: 30 }, now), true);
  assert.equal(isOnline({ lastSeenAt: "2026-08-21T11:58:00Z", telemetryToleranceSec: 30 }, now), false);
});

test("tamanho soma somente métricas permitidas", () => {
  assert.equal(totalSize({ coreBytes: 10, ledgerBytes: 20, memoryBytes: 30, subCoreBytes: 40 }), 100);
});
