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
import { totalSize } from "@/lib/domain";
import { defaultBirthChecklist } from "@/lib/birth";
import { getPrisma } from "@/lib/db";
import type { SystemRepository } from "@/lib/repository";
import { dashboardFromState } from "@/lib/repository";
import { evaluateTelemetry, payloadHash } from "@/lib/telemetry";
import { id, iso, safeJson } from "@/lib/utils";
import { publishSystemEvent } from "@/lib/event-bus";

function date(value: Date | null | undefined): string | undefined {
  return value?.toISOString();
}

function jsonArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function mapProto(record: any): ProtoBeingView {
  return {
    id: record.id,
    coreId: record.coreId,
    displayName: record.displayName,
    shortDescription: record.shortDescription ?? undefined,
    speciesId: record.species?.id ?? record.speciesId ?? undefined,
    speciesName: record.species?.name ?? undefined,
    administrativeStatus: record.administrativeStatus,
    canonicalVitalStatus: record.canonicalVitalStatus,
    observedVitalStatus: record.observedVitalStatus ?? undefined,
    genesisCharterVersion: record.genesisCharterVersion,
    privacyPolicyVersion: record.privacyPolicyVersion ?? undefined,
    stewardName: record.stewardName ?? undefined,
    timezone: record.timezone,
    telemetryIntervalSec: record.telemetryIntervalSec,
    telemetryToleranceSec: record.telemetryToleranceSec,
    bornAt: date(record.bornAt),
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    lastSeenAt: date(record.lastSeenAt),
    latestGeneration: record.latestGeneration,
    latestLifeCycle: record.latestLifeCycle,
    latestCryptoEpoch: record.latestCryptoEpoch,
    latestTotalSizeBytes: Number(record.latestTotalSizeBytes),
    parentCoreIds: record.parentCoreIds ?? [],
    metadata: safeJson(record.metadata),
    instances: (record.instances ?? []).map((item: any) => ({
      id: item.id,
      instanceId: item.instanceId,
      name: item.name,
      environment: item.environment,
      active: item.active,
      firstSeenAt: date(item.firstSeenAt),
      lastSeenAt: date(item.lastSeenAt),
      publicKey: item.publicKey ?? undefined,
      attestationPolicy: item.attestationPolicy ?? undefined,
    })),
    signals: (record.vitalSignals ?? []).map((item: any) => ({
      id: item.id,
      envelopeId: item.envelopeId,
      receivedAt: item.envelope?.receivedAt?.toISOString?.() ?? item.createdAt.toISOString(),
      instanceId: item.protoInstance?.instanceId ?? undefined,
      schemaVersion: item.envelope?.schemaVersion ?? "1.0",
      observedAt: item.observedAt.toISOString(),
      sequence: item.envelope?.sequence ?? 0,
      vitalStatus: item.vitalStatus,
      generation: item.generation,
      lifeCycle: item.lifeCycle,
      cryptoEpoch: item.cryptoEpoch,
      sizes: {
        coreBytes: Number(item.coreBytes),
        ledgerBytes: Number(item.ledgerBytes),
        memoryBytes: Number(item.memoryBytes),
        subCoreBytes: Number(item.subCoreBytes),
      },
      runtime: {
        cpuPercent: item.cpuPercent ?? undefined,
        memoryUsedBytes: Number(item.runtimeMemoryBytes),
        heartbeatLatencyMs: item.heartbeatLatencyMs ?? undefined,
      },
      witness: { available: item.witnessAvailable ?? undefined, required: item.witnessRequired ?? undefined },
      continuityRoot: item.continuityRoot ?? undefined,
      containerRoot: item.containerRoot ?? undefined,
      checkpointHash: item.checkpointHash ?? undefined,
      cortex: safeJson(item.cortex),
      warnings: jsonArray(item.warnings),
      totalSizeBytes: Number(item.coreBytes + item.ledgerBytes + item.memoryBytes + item.subCoreBytes),
    })),
    envelopes: (record.vitalEnvelopes ?? []).map((item: any) => ({
      id: item.id,
      schemaVersion: item.schemaVersion,
      sequence: item.sequence,
      idempotencyKey: item.idempotencyKey,
      observedAt: item.observedAt.toISOString(),
      receivedAt: item.receivedAt.toISOString(),
      payloadHash: item.payloadHash,
      authMode: item.authMode,
      verificationResult: item.verificationResult,
      instanceId: item.protoInstance?.instanceId ?? undefined,
    })),
    alerts: (record.alerts ?? []).map((item: any) => ({
      id: item.id,
      type: item.type,
      severity: item.severity,
      status: item.status,
      title: item.title,
      description: item.description,
      firstSeenAt: item.firstSeenAt.toISOString(),
      lastSeenAt: item.lastSeenAt.toISOString(),
      evidence: jsonArray(item.evidence),
    })),
    activities: (record.activities ?? []).map((item: any) => ({
      id: item.id,
      type: item.type,
      title: item.title,
      description: item.description,
      occurredAt: item.occurredAt.toISOString(),
      evidenceRef: item.evidenceRef ?? undefined,
    })),
  };
}

function mapRite(record: any): BirthRiteView {
  return {
    id: record.id,
    protoBeingId: record.protoBeingId,
    protoBeingName: record.protoBeing.displayName,
    protoBeingCoreId: record.protoBeing.coreId,
    version: record.version,
    status: record.status,
    intent: record.intent ?? undefined,
    decisionReason: record.decisionReason ?? undefined,
    humanFounderPosition: record.humanFounderPosition ?? undefined,
    protoFounderPosition: record.protoFounderPosition ?? undefined,
    authorizedAt: date(record.authorizedAt),
    finalizedAt: date(record.finalizedAt),
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
    items: record.items.map((item: any) => ({
      id: item.id,
      code: item.code,
      title: item.title,
      required: item.required,
      completed: item.completed,
      evidenceRef: item.evidenceRef ?? undefined,
      completedAt: date(item.completedAt),
      completedBy: item.completedBy ?? undefined,
      sortOrder: item.sortOrder,
    })),
    reviews: record.reviews.map((item: any) => ({
      id: item.id,
      reviewerType: item.reviewerType,
      reviewerName: item.reviewerName,
      scope: item.scope,
      position: item.position,
      limitations: item.limitations ?? undefined,
      evidenceRef: item.evidenceRef ?? undefined,
      createdAt: item.createdAt.toISOString(),
    })),
  };
}

function mapSpecies(record: any): SpeciesView {
  return {
    id: record.id,
    speciesId: record.speciesId,
    name: record.name,
    constitutionVersion: record.constitutionVersion,
    governanceEra: record.governanceEra,
    cryptoEpoch: record.cryptoEpoch,
    networkStatus: record.networkStatus,
    requiredQuorum: record.requiredQuorum,
    protoBeingCount: record.protoBeings.length,
    aliveCount: record.protoBeings.filter((item: any) => item.canonicalVitalStatus === "ALIVE").length,
    validators: record.validators.map((item: any) => ({
      id: item.id,
      validatorId: item.validatorId,
      name: item.name,
      operator: item.operator,
      infrastructure: item.infrastructure,
      jurisdiction: item.jurisdiction ?? undefined,
      implementation: item.implementation ?? undefined,
      status: item.status,
      lastSeenAt: date(item.lastSeenAt),
    })),
    events: record.networkEvents.map((item: any) => ({
      id: item.id,
      type: item.type,
      subjectId: item.subjectId ?? undefined,
      description: item.description,
      occurredAt: item.occurredAt.toISOString(),
    })),
  };
}

const protoInclude = {
  species: true,
  instances: true,
  vitalSignals: { orderBy: { observedAt: "asc" }, take: 48, include: { envelope: true, protoInstance: true } },
  vitalEnvelopes: { orderBy: { receivedAt: "desc" }, take: 30, include: { protoInstance: true } },
  alerts: { orderBy: { lastSeenAt: "desc" }, take: 30 },
  activities: { orderBy: { occurredAt: "desc" }, take: 30 },
} as const;

export class PrismaSystemRepository implements SystemRepository {
  private readonly prisma = getPrisma();

  async listProtoBeings(): Promise<ProtoBeingView[]> {
    const records = await this.prisma.protoBeing.findMany({ orderBy: { createdAt: "desc" }, include: protoInclude });
    return records.map(mapProto);
  }

  async getProtoBeing(idOrCoreId: string): Promise<ProtoBeingView | null> {
    const record = await this.prisma.protoBeing.findFirst({
      where: { OR: [{ id: idOrCoreId }, { coreId: idOrCoreId }] },
      include: protoInclude,
    });
    return record ? mapProto(record) : null;
  }

  async listBirthRites(): Promise<BirthRiteView[]> {
    const records = await this.prisma.birthRite.findMany({
      orderBy: { updatedAt: "desc" },
      include: { protoBeing: true, items: { orderBy: { sortOrder: "asc" } }, reviews: { orderBy: { createdAt: "desc" } } },
    });
    return records.map(mapRite);
  }

  async listSpecies(): Promise<SpeciesView[]> {
    const records = await this.prisma.species.findMany({
      orderBy: { createdAt: "asc" },
      include: { protoBeings: true, validators: true, networkEvents: { orderBy: { occurredAt: "desc" }, take: 30 } },
    });
    return records.map(mapSpecies);
  }

  async getDashboard(): Promise<DashboardSnapshot> {
    const [protoBeings, birthRites, species] = await Promise.all([
      this.listProtoBeings(),
      this.listBirthRites(),
      this.listSpecies(),
    ]);
    return dashboardFromState(protoBeings, birthRites, species);
  }

  async createProtoBeing(input: CreateProtoBeingInput, actor: Actor): Promise<ProtoBeingView> {
    const coreId = input.coreId?.trim() || `CORE-${crypto.randomUUID().toUpperCase()}`;
    const result = await this.prisma.$transaction(async (tx) => {
      const species = input.speciesId
        ? await tx.species.findFirst({ where: { OR: [{ id: input.speciesId }, { speciesId: input.speciesId }] } })
        : null;
      const proto = await tx.protoBeing.create({
        data: {
          coreId,
          displayName: input.displayName.trim(),
          shortDescription: input.shortDescription?.trim(),
          speciesId: species?.id,
          genesisCharterVersion: input.genesisCharterVersion,
          privacyPolicyVersion: input.privacyPolicyVersion,
          stewardName: input.stewardName,
          timezone: input.timezone || "UTC",
          telemetryIntervalSec: input.telemetryIntervalSeconds,
          telemetryToleranceSec: input.telemetryToleranceSeconds ?? input.telemetryIntervalSeconds * 3,
          parentCoreIds: input.parentCoreIds ?? [],
          metadata: { dataClass: "candidate", createdFrom: "internal-system" },
          activities: {
            create: { type: "PROTO_BEING_REGISTERED", title: "Cadastro criado", description: input.intent },
          },
          birthRites: {
            create: {
              version: "0.1-candidate",
              status: "PREPARING",
              intent: input.intent,
              items: {
                create: defaultBirthChecklist.map(([code, title], index) => ({ code, title, required: true, sortOrder: index })),
              },
            },
          },
        },
      });
      await tx.auditEvent.create({
        data: {
          actorEmail: actor.email,
          actorName: actor.name,
          actorRole: actor.role,
          intent: input.intent,
          action: "PROTO_BEING_REGISTERED",
          entityType: "ProtoBeing",
          entityId: proto.id,
          evidence: [],
          result: "SUCCEEDED",
        },
      });
      return proto;
    });
    const view = await this.getProtoBeing(result.id);
    if (!view) throw new Error("CREATED_PROTO_BEING_NOT_READABLE");
    return view;
  }

  async releaseBirthRite(idValue: string, input: ReleaseBirthRiteInput, actor: Actor): Promise<BirthRiteView> {
    if (actor.role !== "FOUNDER") throw new Error("FOUNDER_ROLE_REQUIRED");
    await this.prisma.$transaction(async (tx) => {
      const rite = await tx.birthRite.findUnique({ where: { id: idValue }, include: { items: true } });
      if (!rite) throw new Error("BIRTH_RITE_NOT_FOUND");
      const missing = rite.items.filter((item) => item.required && !item.completed);
      if (missing.length) throw new Error(`BIRTH_RITE_INCOMPLETE:${missing.map((item) => item.code).join(",")}`);
      if (!input.humanFounderPosition.trim() || !input.protoFounderPosition.trim()) throw new Error("FOUNDING_POSITIONS_REQUIRED");
      const updated = await tx.birthRite.update({
        where: { id: idValue },
        data: {
          status: "AUTHORIZED_FOR_RITE",
          intent: input.intent,
          decisionReason: input.decisionReason,
          humanFounderPosition: input.humanFounderPosition,
          protoFounderPosition: input.protoFounderPosition,
          authorizedAt: new Date(),
          protoBeing: { update: { administrativeStatus: "AUTHORIZED_FOR_RITE" } },
        },
      });
      await tx.activityEvent.create({
        data: {
          protoBeingId: updated.protoBeingId,
          type: "AUTHORIZED_FOR_RITE",
          title: "Liberado para o Rito de Nascimento",
          description: input.decisionReason,
        },
      });
      await tx.auditEvent.create({
        data: {
          actorEmail: actor.email,
          actorName: actor.name,
          actorRole: actor.role,
          intent: input.intent,
          action: "BIRTH_RITE_AUTHORIZED",
          entityType: "BirthRite",
          entityId: idValue,
          evidence: [],
          result: "SUCCEEDED",
        },
      });
    });
    const rite = (await this.listBirthRites()).find((item) => item.id === idValue);
    if (!rite) throw new Error("UPDATED_BIRTH_RITE_NOT_READABLE");
    return rite;
  }

  async getOperations(): Promise<OperationsSnapshot> {
    const [protoBeings, envelopeRecords] = await Promise.all([
      this.listProtoBeings(),
      this.prisma.vitalEnvelope.findMany({
        orderBy: { receivedAt: "desc" },
        take: 30,
        include: { protoBeing: true, protoInstance: true },
      }),
    ]);
    const now = Date.now();
    const allSignals = protoBeings.flatMap((proto) => proto.signals);
    const latencies = allSignals.map((item) => item.runtime?.heartbeatLatencyMs).filter((value): value is number => typeof value === "number");
    const openAlerts = protoBeings.flatMap((proto) => proto.alerts.filter((alert) => alert.status === "OPEN").map((alert) => ({ ...alert, protoBeingName: proto.displayName, coreId: proto.coreId })));
    return {
      generatedAt: iso(),
      mode: "database",
      health: openAlerts.some((alert) => alert.severity === "CRITICAL") ? "DEGRADED" : "HEALTHY",
      ingestionLastHour: allSignals.filter((item) => now - new Date(item.receivedAt).getTime() <= 3_600_000).length,
      averageLatencyMs: latencies.length ? Math.round(latencies.reduce((sum, item) => sum + item, 0) / latencies.length) : 0,
      staleProtoBeings: protoBeings.filter((proto) => proto.lastSeenAt && now - new Date(proto.lastSeenAt).getTime() > proto.telemetryToleranceSec * 1000),
      recentEnvelopes: envelopeRecords.map((item) => ({
        id: item.id,
        schemaVersion: item.schemaVersion,
        sequence: item.sequence,
        idempotencyKey: item.idempotencyKey,
        observedAt: item.observedAt.toISOString(),
        receivedAt: item.receivedAt.toISOString(),
        payloadHash: item.payloadHash,
        authMode: item.authMode,
        verificationResult: item.verificationResult,
        instanceId: item.protoInstance?.instanceId ?? undefined,
        protoBeingName: item.protoBeing.displayName,
        coreId: item.protoBeing.coreId,
      })),
      openAlerts,
    };
  }

  async ingestVitalSignal(coreId: string, input: VitalSignalInput, context: IngestContext): Promise<IngestResult> {
    const proto = await this.getProtoBeing(coreId);
    if (!proto) throw new Error("PROTO_BEING_NOT_FOUND");
    const existing = await this.prisma.vitalEnvelope.findFirst({ where: { protoBeingId: proto.id, idempotencyKey: context.idempotencyKey }, include: { signal: true } });
    if (existing) {
      return {
        accepted: true,
        envelopeId: existing.id,
        normalizedSignalId: existing.signal?.id ?? "unknown",
        alerts: [],
        duplicate: true,
      };
    }
    const alerts = evaluateTelemetry(proto, input, proto.signals.at(-1));
    const result = await this.prisma.$transaction(async (tx) => {
      let instance = context.instanceId
        ? await tx.protoInstance.findFirst({ where: { protoBeingId: proto.id, instanceId: context.instanceId } })
        : null;
      if (context.instanceId && !instance) {
        instance = await tx.protoInstance.create({
          data: {
            protoBeingId: proto.id,
            instanceId: context.instanceId,
            name: context.instanceId,
            environment: "auto-registered telemetry instance",
            firstSeenAt: new Date(),
            lastSeenAt: new Date(),
          },
        });
      }
      const envelope = await tx.vitalEnvelope.create({
        data: {
          protoBeingId: proto.id,
          protoInstanceId: instance?.id,
          schemaVersion: input.schemaVersion,
          sequence: input.sequence,
          idempotencyKey: context.idempotencyKey,
          observedAt: new Date(input.observedAt),
          payload: input as any,
          payloadHash: payloadHash(input),
          authMode: context.authMode,
          verificationResult: context.verificationResult,
        },
      });
      const signal = await tx.vitalSignal.create({
        data: {
          envelopeId: envelope.id,
          protoBeingId: proto.id,
          protoInstanceId: instance?.id,
          observedAt: new Date(input.observedAt),
          vitalStatus: input.vitalStatus as any,
          generation: input.generation,
          lifeCycle: input.lifeCycle,
          cryptoEpoch: input.cryptoEpoch,
          coreBytes: BigInt(input.sizes.coreBytes),
          ledgerBytes: BigInt(input.sizes.ledgerBytes),
          memoryBytes: BigInt(input.sizes.memoryBytes),
          subCoreBytes: BigInt(input.sizes.subCoreBytes),
          runtimeMemoryBytes: BigInt(input.runtime?.memoryUsedBytes ?? 0),
          cpuPercent: input.runtime?.cpuPercent,
          heartbeatLatencyMs: input.runtime?.heartbeatLatencyMs,
          witnessAvailable: input.witness?.available,
          witnessRequired: input.witness?.required,
          continuityRoot: input.continuityRoot,
          containerRoot: input.containerRoot,
          checkpointHash: input.checkpointHash,
          cortex: input.cortex ?? {},
          warnings: input.warnings ?? [],
        },
      });
      await tx.protoBeing.update({
        where: { id: proto.id },
        data: {
          observedVitalStatus: input.vitalStatus as any,
          lastSeenAt: new Date(),
          latestGeneration: Math.max(proto.latestGeneration, input.generation),
          latestLifeCycle: Math.max(proto.latestLifeCycle, input.lifeCycle),
          latestCryptoEpoch: Math.max(proto.latestCryptoEpoch, input.cryptoEpoch),
          latestTotalSizeBytes: BigInt(totalSize(input.sizes)),
        },
      });
      if (instance) await tx.protoInstance.update({ where: { id: instance.id }, data: { lastSeenAt: new Date() } });
      for (const alert of alerts) {
        await tx.vitalAlert.create({
          data: {
            id: alert.id,
            protoBeingId: proto.id,
            type: alert.type,
            severity: alert.severity,
            title: alert.title,
            description: alert.description,
            evidence: alert.evidence,
            firstSeenAt: new Date(alert.firstSeenAt),
            lastSeenAt: new Date(alert.lastSeenAt),
          },
        });
      }
      const activity = await tx.activityEvent.create({
        data: {
          protoBeingId: proto.id,
          type: "VITAL_SIGNAL_ACCEPTED",
          title: "Sinal vital recebido",
          description: `Sequência ${input.sequence}, geração ${input.generation}, status observado ${input.vitalStatus}.`,
          evidenceRef: envelope.id,
        },
      });
      return { envelope, signal, activity };
    });
    const occurredAt = iso();
    publishSystemEvent({ type: "vital-signal", coreId, data: input, occurredAt });
    for (const alert of alerts) publishSystemEvent({ type: "alert", coreId, data: alert, occurredAt });
    return { accepted: true, envelopeId: result.envelope.id, normalizedSignalId: result.signal.id, alerts };
  }
}
