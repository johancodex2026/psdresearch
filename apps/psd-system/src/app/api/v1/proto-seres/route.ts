import { NextResponse } from "next/server";
import type { CreateProtoBeingInput } from "@/lib/domain";
import { getRepository } from "@/lib/repository";
import { apiError, isNextResponse, mapDomainError, requireApiActor } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const actor = await requireApiActor();
  if (isNextResponse(actor)) return actor;
  const repository = await getRepository();
  return NextResponse.json({ protoBeings: await repository.listProtoBeings() });
}

export async function POST(request: Request) {
  const actor = await requireApiActor(["FOUNDER", "OPERATOR"]);
  if (isNextResponse(actor)) return actor;
  let raw: unknown;
  try { raw = await request.json(); } catch { return apiError(400, "PSD_INVALID_JSON", "JSON inválido."); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return apiError(400, "PSD_VALIDATION_ERROR", "Payload inválido.");
  const value = raw as Record<string, unknown>;
  const errors: string[] = [];
  if (typeof value.displayName !== "string" || value.displayName.trim().length < 2) errors.push("displayName");
  if (typeof value.genesisCharterVersion !== "string" || !value.genesisCharterVersion.trim()) errors.push("genesisCharterVersion");
  if (!Number.isInteger(value.telemetryIntervalSeconds) || Number(value.telemetryIntervalSeconds) < 5) errors.push("telemetryIntervalSeconds");
  if (typeof value.intent !== "string" || value.intent.trim().length < 12) errors.push("intent");
  if (errors.length) return apiError(400, "PSD_VALIDATION_ERROR", "Campos obrigatórios inválidos.", errors);
  const input: CreateProtoBeingInput = {
    displayName: value.displayName as string,
    coreId: typeof value.coreId === "string" && value.coreId.trim() ? value.coreId : undefined,
    shortDescription: typeof value.shortDescription === "string" ? value.shortDescription : undefined,
    speciesId: typeof value.speciesId === "string" && value.speciesId ? value.speciesId : undefined,
    genesisCharterVersion: value.genesisCharterVersion as string,
    privacyPolicyVersion: typeof value.privacyPolicyVersion === "string" ? value.privacyPolicyVersion : undefined,
    stewardName: typeof value.stewardName === "string" ? value.stewardName : undefined,
    timezone: typeof value.timezone === "string" ? value.timezone : "UTC",
    telemetryIntervalSeconds: Number(value.telemetryIntervalSeconds),
    telemetryToleranceSeconds: Number.isInteger(value.telemetryToleranceSeconds) ? Number(value.telemetryToleranceSeconds) : undefined,
    parentCoreIds: Array.isArray(value.parentCoreIds) ? value.parentCoreIds.filter((item): item is string => typeof item === "string") : [],
    intent: value.intent as string,
  };
  try {
    const repository = await getRepository();
    const protoBeing = await repository.createProtoBeing(input, actor);
    return NextResponse.json({ protoBeing }, { status: 201 });
  } catch (error) { return mapDomainError(error); }
}
