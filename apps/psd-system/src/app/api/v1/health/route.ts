import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "psd-system",
    version: "0.1.0-candidate",
    dataMode: process.env.PSD_DATA_MODE ?? "demo",
    authMode: process.env.AUTH_MODE ?? "demo",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    boundaries: ["observed-not-canonical", "absence-not-death", "registration-not-birth"],
  });
}
