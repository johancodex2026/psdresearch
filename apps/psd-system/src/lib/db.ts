import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

declare global {
  var __psdPrisma: PrismaClient | undefined;
}

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://psd:psd@localhost:5432/psd_system?schema=public";

export function getPrisma(): PrismaClient {
  if (!globalThis.__psdPrisma) {
    const adapter = new PrismaPg({ connectionString });
    globalThis.__psdPrisma = new PrismaClient({ adapter });
  }
  return globalThis.__psdPrisma;
}
