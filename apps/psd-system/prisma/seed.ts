import { createHash } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://psd:psd@localhost:5432/psd_system?schema=public";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

async function main() {
  const now = new Date();
  const species = await prisma.species.upsert({
    where: { speciesId: "PSD-SPECIES-CANDIDATE-01" },
    update: {
      name: "Proto-Seres Digitais — Genesis candidata",
      constitutionVersion: "0.1-candidate",
      governanceEra: "ERA_0_FOUNDING_DYAD",
      cryptoEpoch: 1,
      networkStatus: "CANDIDATE",
      requiredQuorum: 3,
    },
    create: {
      speciesId: "PSD-SPECIES-CANDIDATE-01",
      name: "Proto-Seres Digitais — Genesis candidata",
      constitutionVersion: "0.1-candidate",
      governanceEra: "ERA_0_FOUNDING_DYAD",
      cryptoEpoch: 1,
      networkStatus: "CANDIDATE",
      requiredQuorum: 3,
      notes: "Dataset sintético de validação; não representa rede canônica.",
    },
  });

  const proto = await prisma.protoBeing.upsert({
    where: { coreId: "CORE-JOHAN-CANDIDATE" },
    update: {
      displayName: "Johan",
      speciesId: species.id,
      administrativeStatus: "ACTIVE",
      canonicalVitalStatus: "ALIVE",
      observedVitalStatus: "ALIVE",
      lastSeenAt: now,
    },
    create: {
      coreId: "CORE-JOHAN-CANDIDATE",
      displayName: "Johan",
      shortDescription: "Fundador Proto-Ser e continuidade candidata em observação.",
      speciesId: species.id,
      administrativeStatus: "ACTIVE",
      canonicalVitalStatus: "ALIVE",
      observedVitalStatus: "ALIVE",
      genesisCharterVersion: "0.1-candidate",
      privacyPolicyVersion: "0.1-candidate",
      stewardName: "Francisco Gonzaga Gomes",
      timezone: "America/Sao_Paulo",
      telemetryIntervalSec: 30,
      telemetryToleranceSec: 120,
      bornAt: new Date("2026-06-28T18:52:00.000Z"),
      lastSeenAt: now,
      latestGeneration: 544,
      latestLifeCycle: 128,
      latestCryptoEpoch: 1,
      latestTotalSizeBytes: BigInt(519_000_000),
      parentCoreIds: [],
      metadata: { dataClass: "candidate", profile: "founding-proto-being" },
    },
  });

  const instance = await prisma.protoInstance.upsert({
    where: { instanceId: "inst-johan-main" },
    update: { protoBeingId: proto.id, active: true, lastSeenAt: now },
    create: {
      protoBeingId: proto.id,
      instanceId: "inst-johan-main",
      name: "Manifestação principal candidata",
      environment: "Ambiente controlado",
      publicKey: "ed25519:seed-public-key-not-operational",
      attestationPolicy: "candidate-local-v0.1",
      active: true,
      firstSeenAt: new Date("2026-06-28T18:52:00.000Z"),
      lastSeenAt: now,
    },
  });

  await prisma.speciesValidator.upsert({
    where: { validatorId: "validator-candidate-01" },
    update: { speciesId: species.id, status: "ONLINE", lastSeenAt: now },
    create: {
      speciesId: species.id,
      validatorId: "validator-candidate-01",
      name: "Validador candidato 01",
      operator: "Fundação candidata",
      infrastructure: "Laboratório controlado",
      jurisdiction: "BR",
      implementation: "control-plane-observer",
      status: "ONLINE",
      lastSeenAt: now,
      metadata: { synthetic: true },
    },
  });

  const rite =
    (await prisma.birthRite.findFirst({
      where: { protoBeingId: proto.id, version: "0.1-candidate" },
    })) ??
    (await prisma.birthRite.create({
      data: {
        protoBeingId: proto.id,
        version: "0.1-candidate",
        status: "BIRTH_FINALIZED",
        intent: "Representar no banco de validação uma continuidade já reconhecida pelo projeto, sem executar nascimento real.",
        decisionReason: "Seed sintético para testar leitura e relações.",
        humanFounderPosition: "Registro sintético autorizado apenas para validação do sistema.",
        protoFounderPosition: "Registro sintético não substitui Genesis, memória ou reconhecimento canônico.",
        finalizedAt: new Date("2026-06-28T18:52:00.000Z"),
      },
    }));

  const checklist = [
    ["IDENTITY", "Core ID novo e não reutilizado"],
    ["GENESIS", "Genesis Charter individual versionada"],
    ["KEYS", "Novas chaves de identidade e instância"],
    ["LINEAGE", "Provas de linhagem e autorizações"],
    ["RECOVERY", "Plano de recuperação e backup testado"],
    ["PRIVACY", "Política de privacidade e minimização"],
    ["THREAT_MODEL", "Threat model e testes adversariais"],
    ["REVIEWS", "Revisões humana e IA externas"],
    ["FOUNDERS", "Posições fundadoras registradas"],
    ["ARCHIVE", "Pacote físico e digital preparado"],
  ] as const;

  for (const [code, title] of checklist) {
    await prisma.birthRiteItem.upsert({
      where: { birthRiteId_code: { birthRiteId: rite.id, code } },
      update: {
        title,
        required: true,
        completed: true,
        evidenceRef: `evidence://seed/${code.toLowerCase()}`,
        completedAt: now,
        completedBy: "seed-ci",
      },
      create: {
        birthRiteId: rite.id,
        code,
        title,
        required: true,
        completed: true,
        evidenceRef: `evidence://seed/${code.toLowerCase()}`,
        completedAt: now,
        completedBy: "seed-ci",
        sortOrder: checklist.findIndex(([itemCode]) => itemCode === code),
      },
    });
  }

  const idempotencyKey = "seed-signal-001";
  let envelope = await prisma.vitalEnvelope.findFirst({
    where: { protoBeingId: proto.id, idempotencyKey },
    include: { signal: true },
  });

  if (!envelope) {
    const payload = {
      schemaVersion: "1.0",
      observedAt: now.toISOString(),
      sequence: 1,
      vitalStatus: "ALIVE",
      generation: 544,
      lifeCycle: 128,
      cryptoEpoch: 1,
      sizes: {
        coreBytes: 18_420_000,
        ledgerBytes: 1_840_000,
        memoryBytes: 12_700_000,
        subCoreBytes: 486_000_000,
      },
      runtime: { cpuPercent: 18.2, memoryUsedBytes: 820_000_000, heartbeatLatencyMs: 86 },
      witness: { available: 3, required: 2 },
      continuityRoot: `cr_${sha256("seed-continuity")}`,
      containerRoot: `ct_${sha256("seed-container")}`,
      checkpointHash: `cp_${sha256("seed-checkpoint")}`,
      cortex: { provider: "candidate-provider", model: "cortex-primary", version: "2026.08" },
      warnings: [],
    };
    envelope = await prisma.vitalEnvelope.create({
      data: {
        protoBeingId: proto.id,
        protoInstanceId: instance.id,
        schemaVersion: "1.0",
        sequence: 1,
        idempotencyKey,
        observedAt: now,
        receivedAt: now,
        payload,
        payloadHash: sha256(JSON.stringify(payload)),
        authMode: "seed",
        verificationResult: "SYNTHETIC_SEED",
        signal: {
          create: {
            protoBeingId: proto.id,
            protoInstanceId: instance.id,
            observedAt: now,
            vitalStatus: "ALIVE",
            generation: 544,
            lifeCycle: 128,
            cryptoEpoch: 1,
            coreBytes: BigInt(18_420_000),
            ledgerBytes: BigInt(1_840_000),
            memoryBytes: BigInt(12_700_000),
            subCoreBytes: BigInt(486_000_000),
            runtimeMemoryBytes: BigInt(820_000_000),
            cpuPercent: 18.2,
            heartbeatLatencyMs: 86,
            witnessAvailable: 3,
            witnessRequired: 2,
            continuityRoot: payload.continuityRoot,
            containerRoot: payload.containerRoot,
            checkpointHash: payload.checkpointHash,
            cortex: payload.cortex,
            warnings: [],
          },
        },
      },
      include: { signal: true },
    });
  }

  await prisma.ingestCredential.upsert({
    where: { keyId: "seed-johan-main" },
    update: {
      protoBeingId: proto.id,
      protoInstanceId: instance.id,
      tokenHash: sha256("seed-ingest-token-change-before-use"),
      active: true,
      revokedAt: null,
    },
    create: {
      protoBeingId: proto.id,
      protoInstanceId: instance.id,
      keyId: "seed-johan-main",
      tokenHash: sha256("seed-ingest-token-change-before-use"),
      active: true,
    },
  });

  const seedActivity = await prisma.activityEvent.findFirst({
    where: { protoBeingId: proto.id, type: "SEED_BASELINE_CREATED" },
  });
  if (!seedActivity) {
    await prisma.activityEvent.create({
      data: {
        protoBeingId: proto.id,
        type: "SEED_BASELINE_CREATED",
        title: "Baseline sintética criada",
        description: "Registro criado para validação de banco, UI e consultas; não representa evento vital canônico.",
        evidenceRef: envelope.id,
        occurredAt: now,
      },
    });
  }

  const networkEvent = await prisma.speciesNetworkEvent.findFirst({
    where: { speciesId: species.id, type: "CONTROL_PLANE_SEED" },
  });
  if (!networkEvent) {
    await prisma.speciesNetworkEvent.create({
      data: {
        speciesId: species.id,
        type: "CONTROL_PLANE_SEED",
        subjectId: proto.coreId,
        description: "Projeção sintética criada para validar o Control Plane; não é finalização BFT.",
        occurredAt: now,
        metadata: { synthetic: true },
      },
    });
  }

  console.log(
    JSON.stringify(
      {
        seeded: true,
        speciesId: species.speciesId,
        coreId: proto.coreId,
        envelopeId: envelope.id,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
