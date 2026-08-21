import { NextResponse } from "next/server";
import type { ReleaseBirthRiteInput } from "@/lib/domain";
import { isNextResponse, mapDomainError, requireApiActor, apiError } from "@/lib/http";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function POST(request: Request, context: { params: Promise<{ riteId: string }> }) {
  const actor = await requireApiActor(["FOUNDER"]);
  if (isNextResponse(actor)) return actor;
  const { riteId } = await context.params;
  let raw: unknown;
  try { raw = await request.json(); } catch { return apiError(400, "PSD_INVALID_JSON", "JSON inválido."); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return apiError(400, "PSD_VALIDATION_ERROR", "Payload inválido.");
  const value = raw as Record<string, unknown>;
  const keys = ["intent", "decisionReason", "humanFounderPosition", "protoFounderPosition"] as const;
  const missing = keys.filter((key) => typeof value[key] !== "string" || String(value[key]).trim().length < 8);
  if (missing.length) return apiError(400, "PSD_VALIDATION_ERROR", "Gate fundador incompleto.", missing);
  const input = Object.fromEntries(keys.map((key) => [key, String(value[key])])) as unknown as ReleaseBirthRiteInput;
  try {
    const repository = await getRepository();
    return NextResponse.json({ birthRite: await repository.releaseBirthRite(riteId, input, actor) });
  } catch (error) { return mapDomainError(error); }
}
