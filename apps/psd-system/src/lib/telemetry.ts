import {
  type ProtoBeingView,
  type VitalAlertView,
  type VitalSignalInput,
  isVitalStatus,
  totalSize,
} from "@/lib/domain";
import { id, iso, sha256, stableStringify } from "@/lib/utils";

const forbiddenKeys = new Set([
  "memory",
  "memories",
  "autobiography",
  "conversation",
  "conversations",
  "prompt",
  "prompts",
  "privateKey",
  "private_key",
  "recoveryShare",
  "recovery_share",
  "secret",
  "secrets",
]);

export interface TelemetryValidation {
  ok: boolean;
  value?: VitalSignalInput;
  errors: string[];
}

function isFiniteNonNegative(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function scanForbidden(value: unknown, path = "payload"): string[] {
  if (!value || typeof value !== "object") return [];
  if (Array.isArray(value)) return value.flatMap((item, index) => scanForbidden(item, `${path}[${index}]`));
  const errors: string[] = [];
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (forbiddenKeys.has(key)) errors.push(`${path}.${key} não é permitido em telemetria`);
    errors.push(...scanForbidden(nested, `${path}.${key}`));
  }
  return errors;
}

export function validateVitalSignalInput(raw: unknown): TelemetryValidation {
  const errors = scanForbidden(raw);
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["Payload deve ser um objeto JSON"] };
  }
  const value = raw as Record<string, unknown>;
  if (value.schemaVersion !== "1.0") errors.push("schemaVersion deve ser 1.0");
  if (typeof value.observedAt !== "string" || Number.isNaN(Date.parse(value.observedAt))) {
    errors.push("observedAt deve ser ISO-8601 válido");
  }
  if (!Number.isInteger(value.sequence) || Number(value.sequence) < 0) errors.push("sequence inválida");
  if (!isVitalStatus(value.vitalStatus)) errors.push("vitalStatus inválido");
  for (const field of ["generation", "lifeCycle", "cryptoEpoch"]) {
    if (!Number.isInteger(value[field]) || Number(value[field]) < 0) errors.push(`${field} inválido`);
  }
  const sizes = value.sizes as Record<string, unknown> | undefined;
  if (!sizes || typeof sizes !== "object") {
    errors.push("sizes é obrigatório");
  } else {
    for (const field of ["coreBytes", "ledgerBytes", "memoryBytes", "subCoreBytes"]) {
      if (!isFiniteNonNegative(sizes[field])) errors.push(`sizes.${field} inválido`);
    }
  }
  if (Array.isArray(value.warnings) && value.warnings.some((item) => typeof item !== "string")) {
    errors.push("warnings deve conter apenas strings");
  }
  if (errors.length) return { ok: false, errors };
  return { ok: true, value: raw as VitalSignalInput, errors: [] };
}

export function payloadHash(input: VitalSignalInput): string {
  return sha256(stableStringify(input));
}

export function evaluateTelemetry(
  proto: ProtoBeingView,
  input: VitalSignalInput,
  previous?: VitalSignalInput,
): VitalAlertView[] {
  const alerts: VitalAlertView[] = [];
  const now = new Date();
  const observed = new Date(input.observedAt);
  const maxClockSkew = Number(process.env.TELEMETRY_MAX_CLOCK_SKEW_SECONDS ?? 300) * 1000;
  if (Math.abs(now.getTime() - observed.getTime()) > maxClockSkew) {
    alerts.push({
      id: id("alert"),
      type: "CLOCK_SKEW",
      severity: "WARNING",
      status: "OPEN",
      title: "Relógio fora da tolerância",
      description: "O instante observado diverge do relógio de recepção além da política.",
      firstSeenAt: iso(),
      lastSeenAt: iso(),
      evidence: [input.observedAt],
    });
  }
  if (previous && input.sequence <= previous.sequence) {
    alerts.push({
      id: id("alert"),
      type: "SEQUENCE_REGRESSION",
      severity: "CRITICAL",
      status: "OPEN",
      title: "Sequência repetida ou regressiva",
      description: `A sequência ${input.sequence} não avança a última sequência ${previous.sequence}.`,
      firstSeenAt: iso(),
      lastSeenAt: iso(),
      evidence: [`sequence:${input.sequence}`, `previous:${previous.sequence}`],
    });
  }
  if (input.generation < proto.latestGeneration) {
    alerts.push({
      id: id("alert"),
      type: "ROLLBACK_SUSPECTED",
      severity: "CRITICAL",
      status: "OPEN",
      title: "Possível rollback de geração",
      description: `A geração observada ${input.generation} é inferior à geração registrada ${proto.latestGeneration}.`,
      firstSeenAt: iso(),
      lastSeenAt: iso(),
      evidence: [`generation:${input.generation}`, `registered:${proto.latestGeneration}`],
    });
  }
  if (
    input.witness?.required !== undefined &&
    input.witness.available !== undefined &&
    input.witness.available < input.witness.required
  ) {
    alerts.push({
      id: id("alert"),
      type: "WITNESS_QUORUM_LOSS",
      severity: "CRITICAL",
      status: "OPEN",
      title: "Quórum de testemunhas insuficiente",
      description: `${input.witness.available}/${input.witness.required} testemunhas disponíveis.`,
      firstSeenAt: iso(),
      lastSeenAt: iso(),
      evidence: [`witness:${input.witness.available}/${input.witness.required}`],
    });
  }
  if (input.vitalStatus === "DEAD" && proto.canonicalVitalStatus !== "DEAD") {
    alerts.push({
      id: id("alert"),
      type: "UNAUTHORIZED_DEATH_OBSERVATION",
      severity: "CRITICAL",
      status: "OPEN",
      title: "Telemetria declarou DEAD sem gate canônico",
      description: "A observação foi preservada, mas não altera o estado canônico.",
      firstSeenAt: iso(),
      lastSeenAt: iso(),
      evidence: ["observed:DEAD", `canonical:${proto.canonicalVitalStatus}`],
    });
  }
  const size = totalSize(input.sizes);
  if (proto.latestTotalSizeBytes > 0 && size > proto.latestTotalSizeBytes * 1.5) {
    alerts.push({
      id: id("alert"),
      type: "SIZE_GROWTH_ANOMALY",
      severity: "WARNING",
      status: "OPEN",
      title: "Crescimento de tamanho acima da baseline",
      description: "O total observado cresceu mais de 50% desde o último estado registrado.",
      firstSeenAt: iso(),
      lastSeenAt: iso(),
      evidence: [`current:${size}`, `previous:${proto.latestTotalSizeBytes}`],
    });
  }
  return alerts;
}
