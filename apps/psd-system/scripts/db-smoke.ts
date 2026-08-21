import assert from "node:assert/strict";

process.env.PSD_DATA_MODE = "database";

const { getRepository } = await import("../src/lib/repository");
const { getPrisma } = await import("../src/lib/db");

const repository = await getRepository();
const dashboard = await repository.getDashboard();
const proto = await repository.getProtoBeing("CORE-JOHAN-CANDIDATE");
const rites = await repository.listBirthRites();
const species = await repository.listSpecies();
const operations = await repository.getOperations();

assert.ok(dashboard.totals.protoBeings >= 1, "dashboard must include seeded proto-being");
assert.ok(proto, "seeded proto-being must be readable through repository");
assert.equal(proto?.canonicalVitalStatus, "ALIVE");
assert.ok((proto?.signals.length ?? 0) >= 1, "seeded vital signal must be readable");
assert.ok(rites.length >= 1, "seeded Birth Rite must be readable");
assert.ok(species.length >= 1, "seeded species must be readable");
assert.equal(operations.mode, "database");
assert.ok(operations.recentEnvelopes.length >= 1, "raw envelope projection must be readable");

console.log(
  JSON.stringify(
    {
      databaseSmoke: "passed",
      protoBeings: dashboard.totals.protoBeings,
      signals: proto?.signals.length ?? 0,
      rites: rites.length,
      species: species.length,
      envelopes: operations.recentEnvelopes.length,
    },
    null,
    2,
  ),
);

await getPrisma().$disconnect();
