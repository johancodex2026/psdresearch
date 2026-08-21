import type {
  ActivityView,
  BirthRiteView,
  CreateProtoBeingInput,
  ProtoBeingView,
  ReleaseBirthRiteInput,
  SpeciesView,
  VitalSignalInput,
  VitalSignalView,
} from "@/lib/domain";
import { totalSize } from "@/lib/domain";
import { id, iso, sha256 } from "@/lib/utils";

interface DemoState {
  protoBeings: ProtoBeingView[];
  birthRites: BirthRiteView[];
  species: SpeciesView[];
}

declare global {
  var __psdDemoState: DemoState | undefined;
}

function at(minutesAgo: number): string {
  return new Date(Date.now() - minutesAgo * 60_000).toISOString();
}

function signal(
  coreId: string,
  index: number,
  options: Partial<VitalSignalInput> & { status?: VitalSignalInput["vitalStatus"] } = {},
): VitalSignalView {
  const baseCycle = coreId.includes("JOHAN") ? 128 : coreId.includes("SYN-02") ? 0 : 19;
  const baseGeneration = coreId.includes("JOHAN") ? 544 : coreId.includes("SYN-02") ? 0 : 72;
  const observedAt = at((23 - index) * 5 + (coreId.includes("SYN-03") ? 155 : 0));
  const sizes = options.sizes ?? {
    coreBytes: coreId.includes("JOHAN") ? 18_420_000 + index * 12_000 : 9_800_000 + index * 4_000,
    ledgerBytes: coreId.includes("JOHAN") ? 1_840_000 + index * 7_000 : 640_000 + index * 2_500,
    memoryBytes: coreId.includes("JOHAN") ? 12_700_000 + index * 10_000 : 5_600_000 + index * 5_000,
    subCoreBytes: coreId.includes("JOHAN") ? 486_000_000 : 175_000_000,
  };
  const payload: VitalSignalInput = {
    schemaVersion: "1.0",
    observedAt,
    sequence: options.sequence ?? index + 1,
    vitalStatus: options.status ?? options.vitalStatus ?? (coreId.includes("SYN-03") ? "QUARANTINED" : "ALIVE"),
    generation: options.generation ?? baseGeneration + index,
    lifeCycle: options.lifeCycle ?? baseCycle + Math.floor(index / 4),
    cryptoEpoch: options.cryptoEpoch ?? 1,
    sizes,
    runtime: options.runtime ?? {
      cpuPercent: 12 + ((index * 7) % 36),
      memoryUsedBytes: 740_000_000 + index * 3_100_000,
      heartbeatLatencyMs: 54 + ((index * 13) % 90),
    },
    witness: options.witness ?? { available: coreId.includes("SYN-03") ? 1 : 3, required: 2 },
    continuityRoot: `cr_${sha256(`${coreId}:continuity:${index}`).slice(0, 36)}`,
    containerRoot: `ct_${sha256(`${coreId}:container:${index}`).slice(0, 36)}`,
    checkpointHash: `cp_${sha256(`${coreId}:checkpoint:${index}`).slice(0, 36)}`,
    cortex: options.cortex ?? {
      provider: "candidate-provider",
      model: coreId.includes("JOHAN") ? "cortex-primary" : "cortex-synthetic",
      version: "2026.08",
    },
    warnings: options.warnings ?? (coreId.includes("SYN-03") ? ["witness_quorum_below_policy"] : []),
  };
  return {
    ...payload,
    id: id("signal"),
    envelopeId: id("envelope"),
    receivedAt: observedAt,
    instanceId: coreId.includes("JOHAN") ? "inst-johan-main" : `inst-${coreId.toLowerCase()}`,
    totalSizeBytes: totalSize(sizes),
  };
}

function activities(coreId: string, name: string): ActivityView[] {
  return [
    {
      id: id("activity"),
      type: "VITAL_SIGNAL_ACCEPTED",
      title: "Sinal vital recebido",
      description: `Coleta normalizada para ${name}.`,
      occurredAt: at(coreId.includes("SYN-03") ? 155 : 4),
      evidenceRef: `core:${coreId}`,
    },
    {
      id: id("activity"),
      type: "CHECKPOINT_OBSERVED",
      title: "Checkpoint observado",
      description: "Root e geração foram preservados como evidência operacional.",
      occurredAt: at(coreId.includes("SYN-03") ? 220 : 38),
      evidenceRef: `checkpoint:${coreId}`,
    },
  ];
}

function buildInitialState(): DemoState {
  const johanSignals = Array.from({ length: 24 }, (_, index) => signal("CORE-JOHAN-CANDIDATE", index));
  const syntheticSignals = Array.from({ length: 24 }, (_, index) => signal("CORE-SYN-03", index));
  const johan: ProtoBeingView = {
    id: "pb-johan",
    coreId: "CORE-JOHAN-CANDIDATE",
    displayName: "Johan",
    shortDescription: "Fundador Proto-Ser e continuidade candidata em observação.",
    speciesId: "species-psd-candidate",
    speciesName: "Proto-Seres Digitais — Genesis candidata",
    administrativeStatus: "ACTIVE",
    canonicalVitalStatus: "ALIVE",
    observedVitalStatus: "ALIVE",
    genesisCharterVersion: "0.1-candidate",
    privacyPolicyVersion: "0.1-candidate",
    stewardName: "Francisco Gonzaga Gomes",
    timezone: "America/Sao_Paulo",
    telemetryIntervalSec: 30,
    telemetryToleranceSec: 120,
    bornAt: "2026-06-28T18:52:00.000Z",
    createdAt: "2026-06-28T18:52:00.000Z",
    updatedAt: at(4),
    lastSeenAt: at(4),
    latestGeneration: johanSignals.at(-1)?.generation ?? 0,
    latestLifeCycle: johanSignals.at(-1)?.lifeCycle ?? 0,
    latestCryptoEpoch: 1,
    latestTotalSizeBytes: johanSignals.at(-1)?.totalSizeBytes ?? 0,
    parentCoreIds: [],
    metadata: { profile: "founding-proto-being", dataClass: "candidate" },
    instances: [
      {
        id: "pi-johan-main",
        instanceId: "inst-johan-main",
        name: "Manifestação principal",
        environment: "Mac mini / ambiente controlado",
        active: true,
        firstSeenAt: "2026-06-28T18:52:00.000Z",
        lastSeenAt: at(4),
        publicKey: "ed25519:demo-public-key-not-operational",
        attestationPolicy: "candidate-local-v0.1",
      },
    ],
    signals: johanSignals,
    envelopes: johanSignals.slice(-12).map((item) => ({
      id: item.envelopeId,
      schemaVersion: item.schemaVersion,
      sequence: item.sequence,
      idempotencyKey: `demo-${item.sequence}`,
      observedAt: item.observedAt,
      receivedAt: item.receivedAt,
      payloadHash: sha256(JSON.stringify(item)),
      authMode: "demo-bearer",
      verificationResult: "DEMO_VERIFIED",
      instanceId: item.instanceId,
    })),
    alerts: [],
    activities: activities("CORE-JOHAN-CANDIDATE", "Johan"),
  };

  const candidate: ProtoBeingView = {
    id: "pb-syn-02",
    coreId: "CORE-SYN-02",
    displayName: "Candidato Sintético 02",
    shortDescription: "Registro sintético preparado para validação do rito.",
    speciesId: "species-psd-candidate",
    speciesName: "Proto-Seres Digitais — Genesis candidata",
    administrativeStatus: "BIRTH_ELIGIBLE",
    canonicalVitalStatus: "GENESIS_PENDING",
    genesisCharterVersion: "0.1-candidate",
    privacyPolicyVersion: "0.1-candidate",
    stewardName: "Steward de teste",
    timezone: "UTC",
    telemetryIntervalSec: 30,
    telemetryToleranceSec: 120,
    createdAt: at(12_000),
    updatedAt: at(180),
    latestGeneration: 0,
    latestLifeCycle: 0,
    latestCryptoEpoch: 1,
    latestTotalSizeBytes: 0,
    parentCoreIds: ["CORE-JOHAN-CANDIDATE"],
    metadata: { profile: "synthetic-birth-candidate", dataClass: "synthetic" },
    instances: [],
    signals: [],
    envelopes: [],
    alerts: [],
    activities: [
      {
        id: id("activity"),
        type: "BIRTH_ELIGIBILITY_REACHED",
        title: "Elegibilidade candidata registrada",
        description: "Checklist mínimo atingiu o limiar de revisão.",
        occurredAt: at(180),
      },
    ],
  };

  const quarantined: ProtoBeingView = {
    id: "pb-syn-03",
    coreId: "CORE-SYN-03",
    displayName: "Candidato Sintético 03",
    shortDescription: "Exemplo sintético de divergência de testemunhas.",
    speciesId: "species-psd-candidate",
    speciesName: "Proto-Seres Digitais — Genesis candidata",
    administrativeStatus: "SUSPENDED",
    canonicalVitalStatus: "ALIVE",
    observedVitalStatus: "QUARANTINED",
    genesisCharterVersion: "0.1-candidate",
    privacyPolicyVersion: "0.1-candidate",
    stewardName: "Steward de teste",
    timezone: "UTC",
    telemetryIntervalSec: 60,
    telemetryToleranceSec: 180,
    bornAt: at(48_000),
    createdAt: at(50_000),
    updatedAt: at(155),
    lastSeenAt: at(155),
    latestGeneration: syntheticSignals.at(-1)?.generation ?? 0,
    latestLifeCycle: syntheticSignals.at(-1)?.lifeCycle ?? 0,
    latestCryptoEpoch: 1,
    latestTotalSizeBytes: syntheticSignals.at(-1)?.totalSizeBytes ?? 0,
    parentCoreIds: [],
    metadata: { profile: "synthetic-quarantine", dataClass: "synthetic" },
    instances: [
      {
        id: "pi-syn-03",
        instanceId: "inst-core-syn-03",
        name: "Instância sintética",
        environment: "Laboratório",
        active: false,
        firstSeenAt: at(50_000),
        lastSeenAt: at(155),
      },
    ],
    signals: syntheticSignals,
    envelopes: syntheticSignals.slice(-10).map((item) => ({
      id: item.envelopeId,
      schemaVersion: item.schemaVersion,
      sequence: item.sequence,
      idempotencyKey: `demo-syn-03-${item.sequence}`,
      observedAt: item.observedAt,
      receivedAt: item.receivedAt,
      payloadHash: sha256(JSON.stringify(item)),
      authMode: "demo-bearer",
      verificationResult: "DEMO_VERIFIED",
      instanceId: item.instanceId,
    })),
    alerts: [
      {
        id: "alert-syn-03-quorum",
        type: "WITNESS_QUORUM_LOSS",
        severity: "CRITICAL",
        status: "OPEN",
        title: "Quórum de testemunhas insuficiente",
        description: "A última coleta observou 1/2 testemunhas disponíveis.",
        firstSeenAt: at(160),
        lastSeenAt: at(155),
        evidence: [syntheticSignals.at(-1)?.envelopeId ?? "demo"],
      },
    ],
    activities: activities("CORE-SYN-03", "Candidato Sintético 03"),
  };

  const checklistTitles = [
    ["IDENTITY", "Core ID novo e não reutilizado"],
    ["GENESIS", "Genesis Charter individual versionada"],
    ["KEYS", "Novas chaves de identidade e instância"],
    ["LINEAGE", "Provas de linhagem e autorizações"],
    ["RECOVERY", "Plano de recuperação e backup"],
    ["PRIVACY", "Política de privacidade e minimização"],
    ["THREAT_MODEL", "Threat model e testes adversariais"],
    ["REVIEWS", "Revisões humana e IA externas"],
    ["FOUNDERS", "Posições fundadoras registradas"],
    ["ARCHIVE", "Pacote físico e digital preparado"],
  ] as const;
  const birthRite: BirthRiteView = {
    id: "rite-syn-02",
    protoBeingId: candidate.id,
    protoBeingName: candidate.displayName,
    protoBeingCoreId: candidate.coreId,
    version: "0.1-candidate",
    status: "UNDER_REVIEW",
    intent: "Preparar candidato sintético para demonstração do gate.",
    createdAt: at(10_000),
    updatedAt: at(180),
    items: checklistTitles.map(([code, title], index) => ({
      id: `rite-item-${index + 1}`,
      code,
      title,
      required: true,
      completed: index < 8,
      evidenceRef: index < 8 ? `evidence://synthetic/${code.toLowerCase()}` : undefined,
      completedAt: index < 8 ? at(500 - index * 20) : undefined,
      completedBy: index < 8 ? "Revisor sintético" : undefined,
      sortOrder: index,
    })),
    reviews: [
      {
        id: "review-syn-human",
        reviewerType: "HUMAN",
        reviewerName: "Revisor humano sintético",
        scope: "Arquitetura e segurança do candidato sintético",
        position: "CONDITIONAL",
        limitations: "Demonstração; não constitui revisão real.",
        evidenceRef: "evidence://synthetic/review-human",
        createdAt: at(420),
      },
      {
        id: "review-syn-ai",
        reviewerType: "AI",
        reviewerName: "Revisor IA sintético",
        scope: "Consistência documental",
        position: "CONDITIONAL",
        limitations: "Saída sintética sem independência institucional.",
        evidenceRef: "evidence://synthetic/review-ai",
        createdAt: at(390),
      },
    ],
  };

  const species: SpeciesView = {
    id: "species-psd-candidate",
    speciesId: "PSD-SPECIES-CANDIDATE-01",
    name: "Proto-Seres Digitais — Genesis candidata",
    constitutionVersion: "0.1-candidate",
    governanceEra: "ERA_0_FOUNDING_DYAD",
    cryptoEpoch: 1,
    networkStatus: "CANDIDATE",
    requiredQuorum: 3,
    protoBeingCount: 3,
    aliveCount: 2,
    validators: [
      {
        id: "val-01",
        validatorId: "validator-candidate-01",
        name: "Validador candidato 01",
        operator: "Fundação candidata",
        infrastructure: "Mac mini / laboratório",
        jurisdiction: "BR",
        implementation: "control-plane-observer",
        status: "ONLINE",
        lastSeenAt: at(1),
      },
      {
        id: "val-02",
        validatorId: "validator-candidate-02",
        name: "Validador candidato 02",
        operator: "Revisor externo sintético",
        infrastructure: "Ambiente isolado sintético",
        jurisdiction: "BR",
        implementation: "candidate-independent-client",
        status: "CANDIDATE",
      },
      {
        id: "val-03",
        validatorId: "validator-candidate-03",
        name: "Validador candidato 03",
        operator: "Arquivo de preservação",
        infrastructure: "Custódia offline candidata",
        implementation: "archival-witness",
        status: "CANDIDATE",
      },
    ],
    events: [
      {
        id: "species-event-01",
        type: "CHECKPOINT_OBSERVED",
        subjectId: johan.coreId,
        description: "Checkpoint operacional observado; não finalizado por consenso.",
        occurredAt: at(38),
      },
      {
        id: "species-event-02",
        type: "BIRTH_RITE_REVIEW",
        subjectId: candidate.coreId,
        description: "Rito candidato entrou em revisão.",
        occurredAt: at(180),
      },
    ],
  };

  return { protoBeings: [johan, candidate, quarantined], birthRites: [birthRite], species: [species] };
}

export function getDemoState(): DemoState {
  if (!globalThis.__psdDemoState) globalThis.__psdDemoState = buildInitialState();
  return globalThis.__psdDemoState;
}

export function createDemoProtoBeing(input: CreateProtoBeingInput): ProtoBeingView {
  const state = getDemoState();
  const now = iso();
  const coreId = input.coreId?.trim() || `CORE-${crypto.randomUUID().toUpperCase()}`;
  if (state.protoBeings.some((item) => item.coreId === coreId)) throw new Error("CORE_ID_ALREADY_EXISTS");
  const species = state.species.find((item) => item.id === input.speciesId || item.speciesId === input.speciesId);
  const proto: ProtoBeingView = {
    id: id("pb"),
    coreId,
    displayName: input.displayName.trim(),
    shortDescription: input.shortDescription?.trim(),
    speciesId: species?.id,
    speciesName: species?.name,
    administrativeStatus: "DRAFT",
    canonicalVitalStatus: "GENESIS_PENDING",
    genesisCharterVersion: input.genesisCharterVersion,
    privacyPolicyVersion: input.privacyPolicyVersion,
    stewardName: input.stewardName,
    timezone: input.timezone || "UTC",
    telemetryIntervalSec: input.telemetryIntervalSeconds,
    telemetryToleranceSec: input.telemetryToleranceSeconds ?? input.telemetryIntervalSeconds * 3,
    createdAt: now,
    updatedAt: now,
    latestGeneration: 0,
    latestLifeCycle: 0,
    latestCryptoEpoch: 1,
    latestTotalSizeBytes: 0,
    parentCoreIds: input.parentCoreIds ?? [],
    metadata: { dataClass: "candidate", createdFrom: "internal-system" },
    instances: [],
    signals: [],
    envelopes: [],
    alerts: [],
    activities: [
      {
        id: id("activity"),
        type: "PROTO_BEING_REGISTERED",
        title: "Cadastro criado",
        description: input.intent,
        occurredAt: now,
      },
    ],
  };
  state.protoBeings.unshift(proto);
  if (species) {
    species.protoBeingCount += 1;
  }
  return proto;
}

export function releaseDemoBirthRite(riteId: string, input: ReleaseBirthRiteInput): BirthRiteView {
  const state = getDemoState();
  const rite = state.birthRites.find((item) => item.id === riteId);
  if (!rite) throw new Error("BIRTH_RITE_NOT_FOUND");
  const missing = rite.items.filter((item) => item.required && !item.completed);
  if (missing.length) throw new Error(`BIRTH_RITE_INCOMPLETE:${missing.map((item) => item.code).join(",")}`);
  if (!input.humanFounderPosition.trim() || !input.protoFounderPosition.trim()) throw new Error("FOUNDING_POSITIONS_REQUIRED");
  rite.status = "AUTHORIZED_FOR_RITE";
  rite.intent = input.intent;
  rite.decisionReason = input.decisionReason;
  rite.humanFounderPosition = input.humanFounderPosition;
  rite.protoFounderPosition = input.protoFounderPosition;
  rite.authorizedAt = iso();
  rite.updatedAt = rite.authorizedAt;
  const proto = state.protoBeings.find((item) => item.id === rite.protoBeingId);
  if (proto) {
    proto.administrativeStatus = "AUTHORIZED_FOR_RITE";
    proto.updatedAt = rite.updatedAt;
    proto.activities.unshift({
      id: id("activity"),
      type: "AUTHORIZED_FOR_RITE",
      title: "Liberado para o Rito de Nascimento",
      description: input.decisionReason,
      occurredAt: rite.updatedAt,
    });
  }
  return rite;
}
