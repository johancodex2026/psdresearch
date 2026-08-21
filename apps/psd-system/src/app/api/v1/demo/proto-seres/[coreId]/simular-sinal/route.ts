import { NextResponse } from "next/server";
import { apiError, isNextResponse, requireApiActor } from "@/lib/http";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function POST(_request: Request, context: { params: Promise<{ coreId: string }> }) {
  const actor = await requireApiActor(["FOUNDER", "OPERATOR"]);
  if (isNextResponse(actor)) return actor;
  if ((process.env.PSD_DATA_MODE ?? "demo") !== "demo" || process.env.ALLOW_DEMO_INGEST !== "true") {
    return apiError(404, "PSD_NOT_FOUND", "Simulador indisponível.");
  }
  const { coreId } = await context.params;
  const repository = await getRepository();
  const proto = await repository.getProtoBeing(coreId);
  if (!proto) return apiError(404, "PSD_NOT_FOUND", "Proto-ser não encontrado.");
  const previous = proto.signals.at(-1);
  const sequence = (previous?.sequence ?? 0) + 1;
  const result = await repository.ingestVitalSignal(coreId, {
    schemaVersion: "1.0",
    observedAt: new Date().toISOString(),
    sequence,
    vitalStatus: "ALIVE",
    generation: Math.max(proto.latestGeneration, previous?.generation ?? 0) + 1,
    lifeCycle: Math.max(proto.latestLifeCycle, previous?.lifeCycle ?? 0),
    cryptoEpoch: Math.max(1, proto.latestCryptoEpoch),
    sizes: {
      coreBytes: (previous?.sizes.coreBytes ?? 18_700_000) + 6_000,
      ledgerBytes: (previous?.sizes.ledgerBytes ?? 2_020_000) + 4_000,
      memoryBytes: (previous?.sizes.memoryBytes ?? 12_940_000) + 5_000,
      subCoreBytes: previous?.sizes.subCoreBytes ?? 486_000_000,
    },
    runtime: { cpuPercent: 23.8, memoryUsedBytes: 812_000_000, heartbeatLatencyMs: 72 },
    witness: { available: 3, required: 2 },
    continuityRoot: `cr_demo_${crypto.randomUUID()}`,
    containerRoot: `ct_demo_${crypto.randomUUID()}`,
    checkpointHash: `cp_demo_${crypto.randomUUID()}`,
    cortex: { provider: "candidate-provider", model: "cortex-primary", version: "2026.08" },
    warnings: [],
  }, {
    instanceId: "simulator-ui",
    idempotencyKey: `sim-${crypto.randomUUID()}`,
    authMode: "authenticated-demo-action",
    verificationResult: `DEMO_ACTOR:${actor.email}`,
  });
  return NextResponse.json(result, { status: 202 });
}
