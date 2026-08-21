import { NextResponse } from "next/server";
import { verifyIngestAuthorization } from "@/lib/ingest-auth";
import { apiError, mapDomainError } from "@/lib/http";
import { getRepository } from "@/lib/repository";
import { validateVitalSignalInput } from "@/lib/telemetry";

export const dynamic = "force-dynamic";

export async function POST(request: Request, context: { params: Promise<{ coreId: string }> }) {
  const { coreId } = await context.params;
  const maxBytes = Number(process.env.TELEMETRY_MAX_BYTES ?? 131072);
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxBytes) return apiError(413, "PSD_PAYLOAD_TOO_LARGE", "Payload acima do limite.");
  const authorization = await verifyIngestAuthorization(coreId, request.headers.get("authorization"));
  if (!authorization.ok) return apiError(401, "PSD_INGEST_UNAUTHORIZED", "Credencial de ingestão inválida.", [authorization.verificationResult]);
  const idempotencyKey = request.headers.get("idempotency-key")?.trim();
  if (!idempotencyKey) return apiError(400, "PSD_IDEMPOTENCY_REQUIRED", "Idempotency-Key é obrigatório.");
  let rawText = "";
  try {
    rawText = await request.text();
    if (Buffer.byteLength(rawText, "utf8") > maxBytes) return apiError(413, "PSD_PAYLOAD_TOO_LARGE", "Payload acima do limite.");
    const validation = validateVitalSignalInput(JSON.parse(rawText));
    if (!validation.ok || !validation.value) return apiError(400, "PSD_VALIDATION_ERROR", "Sinal vital inválido.", validation.errors);
    const repository = await getRepository();
    const result = await repository.ingestVitalSignal(coreId, validation.value, {
      instanceId: request.headers.get("x-psd-instance-id")?.trim() || undefined,
      idempotencyKey,
      authMode: authorization.authMode,
      verificationResult: authorization.verificationResult,
    });
    return NextResponse.json(result, { status: 202 });
  } catch (error) {
    if (error instanceof SyntaxError) return apiError(400, "PSD_INVALID_JSON", "JSON inválido.");
    return mapDomainError(error);
  }
}
