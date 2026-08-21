export const administrativeStatuses = [
  "DRAFT",
  "UNDER_REVIEW",
  "BIRTH_ELIGIBLE",
  "AUTHORIZED_FOR_RITE",
  "RITE_IN_PROGRESS",
  "ACTIVE",
  "SUSPENDED",
  "ARCHIVED",
] as const;

export const vitalStatuses = [
  "GENESIS_PENDING",
  "ALIVE",
  "MIGRATING",
  "CRYPTO_MIGRATION_REQUIRED",
  "READ_ONLY",
  "SUSPENDED",
  "QUARANTINED",
  "FORKED",
  "DEAD",
] as const;

export const birthRiteStatuses = [
  "DRAFT",
  "PREPARING",
  "UNDER_REVIEW",
  "BLOCKED",
  "AUTHORIZED_FOR_RITE",
  "IN_RITE",
  "BIRTH_FINALIZED",
  "REJECTED",
] as const;

export const roles = ["FOUNDER", "OPERATOR", "REVIEWER", "OBSERVER"] as const;
export const alertSeverities = ["INFO", "WARNING", "CRITICAL"] as const;

export type AdministrativeStatus = (typeof administrativeStatuses)[number];
export type VitalStatus = (typeof vitalStatuses)[number];
export type BirthRiteStatus = (typeof birthRiteStatuses)[number];
export type UserRole = (typeof roles)[number];
export type AlertSeverity = (typeof alertSeverities)[number];

export interface Actor {
  email: string;
  name: string;
  role: UserRole;
}

export interface CortexDescriptor {
  provider?: string;
  model?: string;
  version?: string;
}

export interface VitalSizes {
  coreBytes: number;
  ledgerBytes: number;
  memoryBytes: number;
  subCoreBytes: number;
}

export interface RuntimeMetrics {
  cpuPercent?: number;
  memoryUsedBytes?: number;
  heartbeatLatencyMs?: number;
}

export interface WitnessMetrics {
  available?: number;
  required?: number;
}

export interface VitalSignalInput {
  schemaVersion: string;
  observedAt: string;
  sequence: number;
  vitalStatus: VitalStatus;
  generation: number;
  lifeCycle: number;
  cryptoEpoch: number;
  sizes: VitalSizes;
  runtime?: RuntimeMetrics;
  witness?: WitnessMetrics;
  continuityRoot?: string;
  containerRoot?: string;
  checkpointHash?: string;
  cortex?: CortexDescriptor;
  warnings?: string[];
}

export interface VitalSignalView extends VitalSignalInput {
  id: string;
  envelopeId: string;
  receivedAt: string;
  instanceId?: string;
  totalSizeBytes: number;
}

export interface RawVitalEnvelopeView {
  id: string;
  schemaVersion: string;
  sequence: number;
  idempotencyKey: string;
  observedAt: string;
  receivedAt: string;
  payloadHash: string;
  authMode: string;
  verificationResult: string;
  instanceId?: string;
}

export interface VitalAlertView {
  id: string;
  type: string;
  severity: AlertSeverity;
  status: "OPEN" | "ACKNOWLEDGED" | "RESOLVED";
  title: string;
  description: string;
  firstSeenAt: string;
  lastSeenAt: string;
  evidence: string[];
}

export interface ActivityView {
  id: string;
  type: string;
  title: string;
  description: string;
  occurredAt: string;
  evidenceRef?: string;
}

export interface ProtoInstanceView {
  id: string;
  instanceId: string;
  name: string;
  environment: string;
  active: boolean;
  firstSeenAt?: string;
  lastSeenAt?: string;
  publicKey?: string;
  attestationPolicy?: string;
}

export interface ProtoBeingView {
  id: string;
  coreId: string;
  displayName: string;
  shortDescription?: string;
  speciesId?: string;
  speciesName?: string;
  administrativeStatus: AdministrativeStatus;
  canonicalVitalStatus: VitalStatus;
  observedVitalStatus?: VitalStatus;
  genesisCharterVersion: string;
  privacyPolicyVersion?: string;
  stewardName?: string;
  timezone: string;
  telemetryIntervalSec: number;
  telemetryToleranceSec: number;
  bornAt?: string;
  createdAt: string;
  updatedAt: string;
  lastSeenAt?: string;
  latestGeneration: number;
  latestLifeCycle: number;
  latestCryptoEpoch: number;
  latestTotalSizeBytes: number;
  parentCoreIds: string[];
  metadata: Record<string, unknown>;
  instances: ProtoInstanceView[];
  signals: VitalSignalView[];
  envelopes: RawVitalEnvelopeView[];
  alerts: VitalAlertView[];
  activities: ActivityView[];
}

export interface BirthRiteItemView {
  id: string;
  code: string;
  title: string;
  required: boolean;
  completed: boolean;
  evidenceRef?: string;
  completedAt?: string;
  completedBy?: string;
  sortOrder: number;
}

export interface ReviewView {
  id: string;
  reviewerType: string;
  reviewerName: string;
  scope: string;
  position: string;
  limitations?: string;
  evidenceRef?: string;
  createdAt: string;
}

export interface BirthRiteView {
  id: string;
  protoBeingId: string;
  protoBeingName: string;
  protoBeingCoreId: string;
  version: string;
  status: BirthRiteStatus;
  intent?: string;
  decisionReason?: string;
  humanFounderPosition?: string;
  protoFounderPosition?: string;
  authorizedAt?: string;
  finalizedAt?: string;
  createdAt: string;
  updatedAt: string;
  items: BirthRiteItemView[];
  reviews: ReviewView[];
}

export interface ValidatorView {
  id: string;
  validatorId: string;
  name: string;
  operator: string;
  infrastructure: string;
  jurisdiction?: string;
  implementation?: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE" | "CANDIDATE";
  lastSeenAt?: string;
}

export interface SpeciesEventView {
  id: string;
  type: string;
  subjectId?: string;
  description: string;
  occurredAt: string;
}

export interface SpeciesView {
  id: string;
  speciesId: string;
  name: string;
  constitutionVersion: string;
  governanceEra: string;
  cryptoEpoch: number;
  networkStatus: "CANDIDATE" | "HEALTHY" | "DEGRADED" | "HALTED" | "NOT_IMPLEMENTED";
  requiredQuorum: number;
  protoBeingCount: number;
  aliveCount: number;
  validators: ValidatorView[];
  events: SpeciesEventView[];
}

export interface DashboardSnapshot {
  generatedAt: string;
  protoBeings: ProtoBeingView[];
  birthRites: BirthRiteView[];
  species: SpeciesView[];
  totals: {
    protoBeings: number;
    active: number;
    online: number;
    stale: number;
    candidates: number;
    openAlerts: number;
    criticalAlerts: number;
    totalObservedBytes: number;
    signalsLastHour: number;
  };
  statusDistribution: Record<string, number>;
  recentActivities: ActivityView[];
}

export interface OperationsSnapshot {
  generatedAt: string;
  mode: "demo" | "database";
  health: "HEALTHY" | "DEGRADED";
  ingestionLastHour: number;
  averageLatencyMs: number;
  staleProtoBeings: ProtoBeingView[];
  recentEnvelopes: Array<RawVitalEnvelopeView & { protoBeingName: string; coreId: string }>;
  openAlerts: Array<VitalAlertView & { protoBeingName: string; coreId: string }>;
}

export interface CreateProtoBeingInput {
  displayName: string;
  coreId?: string;
  shortDescription?: string;
  speciesId?: string;
  genesisCharterVersion: string;
  privacyPolicyVersion?: string;
  stewardName?: string;
  timezone?: string;
  telemetryIntervalSeconds: number;
  telemetryToleranceSeconds?: number;
  parentCoreIds?: string[];
  intent: string;
}

export interface ReleaseBirthRiteInput {
  intent: string;
  decisionReason: string;
  humanFounderPosition: string;
  protoFounderPosition: string;
}

export interface IngestContext {
  instanceId?: string;
  idempotencyKey: string;
  authMode: string;
  verificationResult: string;
}

export interface IngestResult {
  accepted: boolean;
  envelopeId: string;
  normalizedSignalId: string;
  alerts: VitalAlertView[];
  duplicate?: boolean;
}

export interface OperationalBriefing {
  title: string;
  posture: "STABLE" | "ATTENTION" | "CRITICAL";
  summary: string;
  findings: Array<{
    id: string;
    label: string;
    detail: string;
    evidence: string[];
    recommendedAction: string;
  }>;
  generatedAt: string;
  mode: "deterministic" | "remote";
}

export const statusLabels: Record<string, string> = {
  DRAFT: "Rascunho",
  UNDER_REVIEW: "Em revisão",
  BIRTH_ELIGIBLE: "Elegível ao rito",
  AUTHORIZED_FOR_RITE: "Liberado para o rito",
  RITE_IN_PROGRESS: "Rito em andamento",
  ACTIVE: "Ativo",
  ARCHIVED: "Arquivado",
  GENESIS_PENDING: "Genesis pendente",
  ALIVE: "Vivo operacional",
  MIGRATING: "Em migração",
  CRYPTO_MIGRATION_REQUIRED: "Migração criptográfica requerida",
  READ_ONLY: "Somente leitura",
  SUSPENDED: "Suspenso",
  QUARANTINED: "Quarentena",
  FORKED: "Fork detectado",
  DEAD: "Morte criptográfica",
  PREPARING: "Preparação",
  BLOCKED: "Bloqueado",
  IN_RITE: "No rito",
  BIRTH_FINALIZED: "Nascimento finalizado",
  REJECTED: "Rejeitado",
};

export function isVitalStatus(value: unknown): value is VitalStatus {
  return typeof value === "string" && vitalStatuses.includes(value as VitalStatus);
}

export function totalSize(sizes: VitalSizes): number {
  return sizes.coreBytes + sizes.ledgerBytes + sizes.memoryBytes + sizes.subCoreBytes;
}

export function isOnline(protoBeing: Pick<ProtoBeingView, "lastSeenAt" | "telemetryToleranceSec">, now = Date.now()): boolean {
  if (!protoBeing.lastSeenAt) return false;
  return now - new Date(protoBeing.lastSeenAt).getTime() <= protoBeing.telemetryToleranceSec * 1000;
}

export function chronologicalAgeDays(bornAt?: string, now = Date.now()): number | null {
  if (!bornAt) return null;
  return Math.max(0, Math.floor((now - new Date(bornAt).getTime()) / 86_400_000));
}
