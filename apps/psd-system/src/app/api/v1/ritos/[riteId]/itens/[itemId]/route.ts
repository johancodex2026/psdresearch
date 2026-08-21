import { NextResponse } from "next/server";
import { getDemoState } from "@/lib/demo-store";
import { getPrisma } from "@/lib/db";
import { isNextResponse, requireApiActor, apiError } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function PATCH(request: Request, context: { params: Promise<{ riteId: string; itemId: string }> }) {
  const actor = await requireApiActor(["FOUNDER", "OPERATOR", "REVIEWER"]);
  if (isNextResponse(actor)) return actor;
  const { riteId, itemId } = await context.params;
  let raw: unknown;
  try { raw = await request.json(); } catch { return apiError(400, "PSD_INVALID_JSON", "JSON inválido."); }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return apiError(400, "PSD_VALIDATION_ERROR", "Payload inválido.");
  const value = raw as Record<string, unknown>;
  if (typeof value.completed !== "boolean") return apiError(400, "PSD_VALIDATION_ERROR", "completed deve ser booleano.");
  const evidenceRef = typeof value.evidenceRef === "string" && value.evidenceRef.trim() ? value.evidenceRef.trim() : undefined;
  if (value.completed && !evidenceRef) return apiError(400, "PSD_EVIDENCE_REQUIRED", "Item concluído exige referência de evidência.");
  const intent = typeof value.intent === "string" && value.intent.trim() ? value.intent.trim() : "Atualizar checklist do rito";
  if ((process.env.PSD_DATA_MODE ?? "demo") === "demo") {
    const state = getDemoState();
    const rite = state.birthRites.find((item) => item.id === riteId);
    const item = rite?.items.find((entry) => entry.id === itemId);
    if (!rite || !item) return apiError(404, "PSD_NOT_FOUND", "Rito ou item não encontrado.");
    item.completed = value.completed;
    item.evidenceRef = value.completed ? evidenceRef : undefined;
    item.completedAt = value.completed ? new Date().toISOString() : undefined;
    item.completedBy = value.completed ? actor.name : undefined;
    rite.updatedAt = new Date().toISOString();
    return NextResponse.json({ item, intent });
  }
  const prisma = getPrisma();
  const item = await prisma.birthRiteItem.findFirst({ where: { id: itemId, birthRiteId: riteId } });
  if (!item) return apiError(404, "PSD_NOT_FOUND", "Rito ou item não encontrado.");
  const updated = await prisma.$transaction(async (tx) => {
    const next = await tx.birthRiteItem.update({
      where: { id: itemId },
      data: {
        completed: value.completed,
        evidenceRef: value.completed ? evidenceRef : null,
        completedAt: value.completed ? new Date() : null,
        completedBy: value.completed ? actor.name : null,
      },
    });
    await tx.auditEvent.create({
      data: {
        actorEmail: actor.email,
        actorName: actor.name,
        actorRole: actor.role,
        intent,
        action: value.completed ? "BIRTH_RITE_ITEM_COMPLETED" : "BIRTH_RITE_ITEM_REOPENED",
        entityType: "BirthRiteItem",
        entityId: itemId,
        evidence: evidenceRef ? [evidenceRef] : [],
        result: "SUCCEEDED",
      },
    });
    return next;
  });
  return NextResponse.json({ item: updated, intent });
}
