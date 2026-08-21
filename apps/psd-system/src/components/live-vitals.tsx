"use client";

import { useEffect, useMemo, useState } from "react";
import type { VitalSignalView } from "@/lib/domain";
import { StatusBadge, Sparkline } from "@/components/ui";
import { formatBytes, formatRelativeTime } from "@/lib/format";

export function LiveVitals({ coreId, initial }: { coreId: string; initial: VitalSignalView[] }) {
  const [signals, setSignals] = useState(initial);
  const [connection, setConnection] = useState<"connecting" | "live" | "offline">("connecting");
  useEffect(() => {
    const stream = new EventSource(`/api/v1/proto-seres/${encodeURIComponent(coreId)}/stream`);
    stream.addEventListener("open", () => setConnection("live"));
    stream.addEventListener("vital-signal", (event) => {
      const parsed = JSON.parse((event as MessageEvent).data) as VitalSignalView;
      setSignals((current) => [...current.slice(-47), parsed]);
    });
    stream.onerror = () => setConnection("offline");
    return () => stream.close();
  }, [coreId]);
  const latest = signals.at(-1);
  const totalSizes = useMemo(() => signals.map((signal) => signal.totalSizeBytes), [signals]);
  const latencies = useMemo(() => signals.map((signal) => signal.runtime?.heartbeatLatencyMs ?? 0), [signals]);
  if (!latest) return <div className="live-vitals-empty"><span className={`connection connection-${connection}`}>{connection}</span><h3>Nenhuma telemetria recebida</h3><p>O proto-ser ainda não publicou um VitalStatusEnvelope.</p></div>;
  return (
    <section className="live-vitals-card">
      <div className="live-vitals-heading"><div><span className={`connection connection-${connection}`}>{connection === "live" ? "SSE conectado" : connection}</span><h2>Saúde em tempo real</h2></div><StatusBadge value={latest.vitalStatus} /></div>
      <div className="live-vitals-grid">
        <article><span>Geração</span><strong>{latest.generation}</strong><small>Ciclo {latest.lifeCycle}</small></article>
        <article><span>Época criptográfica</span><strong>{latest.cryptoEpoch}</strong><small>observada</small></article>
        <article><span>Latência</span><strong>{latest.runtime?.heartbeatLatencyMs ?? 0} ms</strong><small>{formatRelativeTime(latest.receivedAt)}</small></article>
        <article><span>Tamanho observado</span><strong>{formatBytes(latest.totalSizeBytes)}</strong><small>sem conteúdo privado</small></article>
        <article><span>Testemunhas</span><strong>{latest.witness?.available ?? "—"}/{latest.witness?.required ?? "—"}</strong><small>observação operacional</small></article>
        <article><span>Córtex</span><strong>{latest.cortex?.model ?? "—"}</strong><small>{latest.cortex?.version ?? "sem versão"}</small></article>
      </div>
      <div className="live-charts"><article><span>Evolução de tamanho</span><Sparkline values={totalSizes} label="Evolução do tamanho total observado" /></article><article><span>Latência de heartbeat</span><Sparkline values={latencies} label="Latência de heartbeat" /></article></div>
    </section>
  );
}
