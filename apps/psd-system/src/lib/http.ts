import { NextResponse } from "next/server";
import type { Actor, UserRole } from "@/lib/domain";
import { getCurrentActor } from "@/lib/authz";

export function apiError(status: number, code: string, message: string, details: string[] = []) {
  return NextResponse.json(
    { error: { code, message, details, traceId: crypto.randomUUID() } },
    { status },
  );
}

export async function requireApiActor(allowed: UserRole[] = ["FOUNDER", "OPERATOR", "REVIEWER", "OBSERVER"]): Promise<Actor | NextResponse> {
  const actor = await getCurrentActor();
  if (!actor) return apiError(401, "PSD_UNAUTHORIZED", "Autenticação necessária.");
  if (!allowed.includes(actor.role)) return apiError(403, "PSD_FORBIDDEN", "Papel sem permissão para esta ação.");
  return actor;
}

export function isNextResponse(value: Actor | NextResponse): value is NextResponse {
  return value instanceof NextResponse;
}

export function mapDomainError(error: unknown) {
  const message = error instanceof Error ? error.message : "UNKNOWN_ERROR";
  if (message === "PROTO_BEING_NOT_FOUND" || message === "BIRTH_RITE_NOT_FOUND") {
    return apiError(404, "PSD_NOT_FOUND", "Registro não encontrado.");
  }
  if (message === "CORE_ID_ALREADY_EXISTS") {
    return apiError(409, "PSD_CORE_ID_EXISTS", "O Core ID já está cadastrado.");
  }
  if (message.startsWith("BIRTH_RITE_INCOMPLETE:")) {
    return apiError(409, "PSD_RITE_INCOMPLETE", "O rito possui itens obrigatórios pendentes.", message.split(":")[1]?.split(",") ?? []);
  }
  if (message === "FOUNDER_ROLE_REQUIRED" || message === "FOUNDING_POSITIONS_REQUIRED") {
    return apiError(403, "PSD_GATE_NOT_SATISFIED", "O gate fundador não foi satisfeito.");
  }
  if (message === "INTENT_REQUIRED") {
    return apiError(400, "PSD_INTENT_REQUIRED", "A intenção declarada é obrigatória.");
  }
  return apiError(500, "PSD_INTERNAL_ERROR", "A operação não pôde ser concluída com segurança.");
}
