"use client";

import { useState } from "react";

export function TelemetrySimulator({ coreId }: { coreId: string; nextSequence?: number; generation?: number; lifeCycle?: number }) {
  const [state, setState] = useState("idle");
  async function send() {
    setState("sending");
    const response = await fetch(`/api/v1/demo/proto-seres/${encodeURIComponent(coreId)}/simular-sinal`, { method: "POST" });
    setState(response.ok ? "sent" : "error");
    setTimeout(() => setState("idle"), 2200);
  }
  return <button className="button secondary" type="button" onClick={send} disabled={state === "sending"}>{state === "sending" ? "Enviando…" : state === "sent" ? "Sinal enviado" : state === "error" ? "Falha no envio" : "Simular novo sinal"}</button>;
}
