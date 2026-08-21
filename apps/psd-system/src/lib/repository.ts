import type {
  Actor,
  BirthRiteView,
  CreateProtoBeingInput,
  DashboardSnapshot,
  IngestContext,
  IngestResult,
  OperationsSnapshot,
  ProtoBeingView,
  ReleaseBirthRiteInput,
  SpeciesView,
  VitalSignalInput,
} from "@/lib/domain";
import { isOnline, totalSize } from "@/lib/domain";
import { buildDeterministicBriefing } from "@/lib/briefing";
import { createDemoProtoBeing, getDemoState, releaseDemoBirthRite } from "@/lib/demo-store";
import { evaluateTelemetry, payloadHash } from "@/lib/telemetry";
import { id, iso } from "@/lib/utils";
import { publishSystemEvent } from "@/lib/event-bus";

export interface SystemRepository {
  getDashboard(): Promise<DashboardSnapshot>;
  listProtoBeings(): Promise<ProtoBeingView[]>;
  getProtoBeing(idOrCoreId: string): Promise<ProtoBeingView | null>;
  createProtoBeing(input: CreateProtoBeingInput, actor: Actor): Promise<ProtoBeingView>;
  listBirthRites(): Promise<BirthRiteView[]>;
  releaseBirthRite(id: string, input: ReleaseBirthRiteInput, actor: Actor): Promise<BirthRiteView>;
  listSpecies(): Promise<SpeciesView[]>;
  getOperations(): Promise<OperationsSnapshot>;
  ingestVitalSignal(coreId: string, input: VitalSignalInput, context: IngestContext): Promise<IngestResult>;
}

function dashboardFromState(protoBeings: ProtoBeingView[], birthRites: BirthRiteView[], species: SpeciesView[]): DashboardSnapshot {
  const now = Date.now();
  const statusDistribution: Record<string, number> = {};
  for (const proto of protoBeings) {
    const status = proto.observedVitalStatus ?? proto.canonicalVitalStatus;
    statusDistribution[status] = (statusDistribution[status] ?? 0) + 1;
  }
  const recentActivities = protoBeings
    .flatMap((proto) => proto.activities)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
    .slice(0, 12);
  const generatedAt = iso();
  const snapshot: DashboardSnapshot = {
    generatedAt,
    protoBeings,
    birthRites,
    species,
    totals: {
      protoBeings: protoBeings.length,
      active: protoBeings.filter((proto) => proto.administrativeStatus === "ACTIVE").length,
      online: protoBeings.filter((proto) => isOnline(proto, now)).length,
      stale: protoBeings.filter((proto) => proto.lastSeenAt && !isOnline(proto, now)).length,
      candidates: protoBeings.filter((proto) => !["ACTIVE", "ARCHIVED"].includes(proto.administrativeStatus)).length,
      openAlerts: protoBeings.flatMap((proto) => proto.alerts).filter((alert) => alert.status === "OPEN").length,
      criticalAlerts: protoBeings
        .flatMap((proto) => proto.alerts)
        .filter((alert) => alert.status === "OPEN" && alert.severity === "CRITICAL").length,
      totalObservedBytes: protoBeings.reduce((sum, proto) => sum + proto.latestTotalSizeBytes, 0),
      signalsLastHour: protoBeings
        .flatMap((proto) => proto.signals)
        .filter((signal) => now - new Date(signal.receivedAt).getTime() <= 3_600_000).length,
    },
    statusDistribution,
    recentActivities,
  };
  buildDeterministicBriefing(snapshot);
  return snapshot;
}

export class DemoSystemRepository implements SystemRepository {
  async getDashboard(): Promise<DashboardSnapshot> {
    const state = getDemoState();
    return dashboardFromState(state.protoBeings, state.birthRites, state.species);
  }

  async listProtoBeings(): Promise<ProtoBeingView[]> {
    return [...getDemoState().protoBeings];
  }

  async getProtoBeing(idOrCoreId: string): Promise<ProtoBeingView | null> {
    return getDemoState().protoBeings.find((item) => item.id === idOrCoreId || item.coreId === idOrCoreId) ?? null;
  }

  async createProtoBeing(input: CreateProtoBeingInput, actor: Actor): Promise<ProtoBeingView> {
    if (!input.intent.trim()) throw new Error("INTENT_REQUIRED");
    const proto = createDemoProtoBeing(input);
    proto.activities.unshift({
      id: id("activity"),
      type: "AUDIT",
      title: `Cadastro criado por ${actor.name}`,
      description: input.intent,
      occurredAt: iso(),
      evidenceRef: `actor:${actor.email}`,
    });
    return proto;
  }

  async listBirthRites(): Promise<BirthRiteView[]> {
    return [...getDemoState().birthRites];
  }

  async releaseBirthRite(idValue: string, input: ReleaseBirthRiteInput, actor: Actor): Promise<BirthRiteView> {
    if (actor.role !== "FOUNDER") throw new Error("FOUNDER_ROLE_REQUIRED");
    return releaseDemoBirthRite(idValue, input);
  }

  async listSpecies(): Promise<SpeciesView[]> {
    return [...getDemoState().species];
  }

  async getOperations(): Promise<OperationsSnapshot> {
    const state = getDemoState();
    const now = Date.now();
    const signals = state.protoBeings.flatMap((proto) => proto.signals);
    const recentEnvelopes = state.protoBeings
      .flatMap((proto) => proto.envelopes.map((envelope) => ({ ...envelope, protoBeingName: proto.displayName, coreId: proto.coreId })))
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
      .slice(0, 30);
    const openAlerts = state.protoBeings
      .flatMap((proto) => proto.alerts.filter((alert) => alert.status === "OPEN").map((alert) => ({ ...alert, protoBeingName: proto.displayName, coreId: proto.coreId })))
      .sort((a, b) => b.lastSeenAt.localeCompare(a.lastSeenAt));
    const latencies = signals.map((signal) => signal.runtime?.heartbeatLatencyMs).filter((value): value is number => typeof value === "number");
    return {
      generatedAt: iso(),
      mode: "demo",
      health: openAlerts.some((alert) => alert.severity === "CRITICAL") ? "DEGRADED" : "HEALTHY",
      ingestionLastHour: signals.filter((signal) => now - new Date(signal.receivedAt).getTime() <= 3_600_000).length,
      averageLatencyMs: latencies.length ? Math.round(latencies.reduce((sum, value) => sum + value, 0) / latencies.length) : 0,
      staleProtoBeings: state.protoBeings.filter((proto) => proto.lastSeenAt && !isOnline(proto, now)),
      recentEnvelopes,
      openAlerts,
    };
  }

  async ingestVitalSignal(coreId: string, input: VitalSignalInput, context: IngestContext): Promise<IngestResult> {
    const state = getDemoState();
    const proto = state.protoBeings.find((item) => item.coreId === coreId);
    if (!proto) throw new Error("PROTO_BEING_NOT_FOUND");
    const duplicate = proto.envelopes.find((item) => item.idempotencyKey === context.idempotencyKey);
    if (duplicate) {
      const existing = proto.signals.find((item) => item.envelopeId === duplicate.id);
      return {
        accepted: true,
        envelopeId: duplicate.id,
        normalizedSignalId: existing?.id ?? "unknown",
        alerts: [],
        duplicate: true,
      };
    }
    const previous = proto.signals.at(-1);
    const alerts = evaluateTelemetry(proto, input, previous);
    const envelopeId = id("envelope");
    const signalId = id("signal");
    const receivedAt = iso();
    proto.envelopes.push({
      id: envelopeId,
      schemaVersion: input.schemaVersion,
      sequence: input.sequence,
      idempotencyKey: context.idempotencyKey,
      observedAt: input.observedAt,
      receivedAt,
      payloadHash: payloadHash(input),
      authMode: context.authMode,
      verificationResult: context.verificationResult,
      instanceId: context.instanceId,
    });
    proto.signals.push({
      ...input,
      id: signalId,
      envelopeId,
      receivedAt,
      instanceId: context.instanceId,
      totalSizeBytes: totalSize(input.sizes),
    });
    proto.lastSeenAt = receivedAt;
    proto.updatedAt = receivedAt;
    proto.observedVitalStatus = input.vitalStatus;
    if (input.generation >= proto.latestGeneration) proto.latestGeneration = input.generation;
    if (input.lifeCycle >= proto.latestLifeCycle) proto.latestLifeCycle = input.lifeCycle;
    proto.latestCryptoEpoch = Math.max(proto.latestCryptoEpoch, input.cryptoEpoch);
    proto.latestTotalSizeBytes = totalSize(input.sizes);
    proto.alerts.unshift(...alerts);
    const activity = {
      id: id("activity"),
      type: "VITAL_SIGNAL_ACCEPTED",
      title: "Sinal vital recebido",
      description: `Sequência ${input.sequence}, geração ${input.generation}, status observado ${input.vitalStatus}.`,
      occurredAt: receivedAt,
      evidenceRef: envelopeId,
    };
    proto.activities.unshift(activity);
    publishSystemEvent({ type: "vital-signal", coreId, data: proto.signals.at(-1), occurredAt: receivedAt });
    for (const alert of alerts) publishSystemEvent({ type: "alert", coreId, data: alert, occurredAt: receivedAt });
    publishSystemEvent({ type: "activity", coreId, data: activity, occurredAt: receivedAt });
    return { accepted: true, envelopeId, normalizedSignalId: signalId, alerts };
  }
}

let demoRepository: DemoSystemRepository | undefined;

export async function getRepository(): Promise<SystemRepository> {
  const mode = process.env.PSD_DATA_MODE ?? "demo";
  if (mode === "database") {
    const { PrismaSystemRepository } = await import("@/lib/prisma-repository");
    return new PrismaSystemRepository();
  }
  demoRepository ??= new DemoSystemRepository();
  return demoRepository;
}

export { dashboardFromState };
