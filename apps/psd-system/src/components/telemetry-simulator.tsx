"use client";

import { useState } from "react";

export function TelemetrySimulator({ coreId, nextSequence, generation, lifeCycle }: { coreId: string; nextSequence: number; generation: number; lifeCycle: number }) {
  const [state, setState] = useState("idle");
  async function send() {
    setState("sending");
    const response = await fetch(`/api/v1/proto-seres/${encodeURIComponent(coreId)}/sinais-vitais`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEMO_INGEST_TOKEN ?? "demo-only-change-me"}`,
        "Idempotency-Key": `sim-${Date.now()}`,
        "X-PSD-Instance-ID": "simulator-ui",
      },
      body: JSON.stringify({
        schemaVersion: "1.0",
        observedAt: new Date().toISOString(),
        sequence: nextSequence,
        vitalStatus: "ALIVE",
        generation: generation + 1,
        lifeCycle,
        cryptoEpoch: 1,
        sizes: { coreBytes: 18_700_000, ledgerBytes: 2_020_000, memoryBytes: 12_940_000, subCoreBytes: 486_000_000 },
        runtime: { cpuPercent: 23.8, memoryUsedBytes: 812_000_000, heartbeatLatencyMs: 72 },
        witness: { available: 3, required: 2 },
        continuityRoot: `cr_sim_${Date.now()}`,
        containerRoot: `ct_sim_${Date.now()}`,
        checkpointHash: `cp_sim_${Date.now()}`,
        cortex: { provider: "candidate-provider", model: "cortex-primary", version: "2026.08" },
        warnings: [],
      }),
    });
    setState(response.ok ? "sent" : "error");
    setTimeout(() => setState("idle"), 2200);
  }
  return <button className="button secondary" type="button" onClick={send} disabled={state === "sending"}>{state === "sending" ? "Enviando…" : state === "sent" ? "Sinal enviado" : state === "error" ? "Falha no envio" : "Simular novo sinal"}</button>;
}
