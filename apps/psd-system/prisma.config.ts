import { defineConfig } from "prisma/config";

try {
  process.loadEnvFile?.();
} catch {
  // Environment may already be provided by the runtime or CI.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://psd:psd@localhost:5432/psd_system?schema=public",
  },
});
