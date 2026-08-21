import { timingSafeEqual } from "node:crypto";
import { getPrisma } from "@/lib/db";
import { sha256 } from "@/lib/utils";

export interface IngestAuthResult {
  ok: boolean;
  authMode: string;
  verificationResult: string;
  keyId?: string;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function verifyIngestAuthorization(coreId: string, authorization: string | null): Promise<IngestAuthResult> {
  const token = authorization?.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!token) return { ok: false, authMode: "none", verificationResult: "MISSING_BEARER_TOKEN" };
  const mode = process.env.PSD_DATA_MODE ?? "demo";
  if (mode === "demo") {
    if (process.env.ALLOW_DEMO_INGEST !== "true") {
      return { ok: false, authMode: "demo-bearer", verificationResult: "DEMO_INGEST_DISABLED" };
    }
    const expected = process.env.PSD_DEMO_INGEST_TOKEN ?? "demo-only-change-me";
    return safeEqual(token, expected)
      ? { ok: true, authMode: "demo-bearer", verificationResult: "DEMO_VERIFIED", keyId: "demo" }
      : { ok: false, authMode: "demo-bearer", verificationResult: "INVALID_TOKEN" };
  }
  const prisma = getPrisma();
  const credential = await prisma.ingestCredential.findFirst({
    where: {
      protoBeing: { coreId },
      tokenHash: sha256(token),
      active: true,
      revokedAt: null,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
  });
  if (!credential) return { ok: false, authMode: "bearer", verificationResult: "INVALID_OR_REVOKED_TOKEN" };
  await prisma.ingestCredential.update({ where: { id: credential.id }, data: { lastUsedAt: new Date() } });
  return { ok: true, authMode: "bearer", verificationResult: "TOKEN_HASH_VERIFIED", keyId: credential.keyId };
}
