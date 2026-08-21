import Link from "next/link";
import { MetricCard, PageHeader, SectionHeader, StatusBadge } from "@/components/ui";
import { getRepository } from "@/lib/repository";
import { formatRelativeTime, shortHash } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OperationsPage() {
  const repository = await getRepository();
  const snapshot = await repository.getOperations();
  return (
    <>
      <PageHeader eyebrow="Sala operacional" title="Coletas, alertas e ingestão vital" description="A operação preserva cada envelope recebido, sua projeção normalizada e as divergências detectadas. Falhas de coleta não são convertidas em morte." actions={<Link className="button secondary" href="/api/v1/health">Health JSON</Link>} />
      <section className="metrics-grid operations-metrics">
        <MetricCard label="Saúde do Control Plane" value={snapshot.health} detail={`modo ${snapshot.mode}`} tone={snapshot.health === "HEALTHY" ? "good" : "warning"} />
        <MetricCard label="Ingestões — 1h" value={snapshot.ingestionLastHour} detail="envelopes normalizados" />
        <MetricCard label="Latência média" value={`${snapshot.averageLatencyMs} ms`} detail="heartbeat reportado" />
        <MetricCard label="Telemetria atrasada" value={snapshot.staleProtoBeings.length} detail="investigar; não declarar morte" tone={snapshot.staleProtoBeings.length ? "warning" : "good"} />
        <MetricCard label="Alertas abertos" value={snapshot.openAlerts.length} detail={`${snapshot.openAlerts.filter((item) => item.severity === "CRITICAL").length} críticos`} tone={snapshot.openAlerts.some((item) => item.severity === "CRITICAL") ? "critical" : "default"} />
      </section>

      <div className="detail-columns">
        <section className="panel"><SectionHeader title="Alertas abertos" description="Ordenados por evidência mais recente." />{snapshot.openAlerts.length ? <div className="alert-list">{snapshot.openAlerts.map((alert) => <article key={alert.id} className={`alert-${alert.severity.toLowerCase()}`}><div><StatusBadge value={alert.severity} label={alert.severity} /><time>{formatRelativeTime(alert.lastSeenAt)}</time></div><h3>{alert.title}</h3><p><Link href={`/proto-seres/${alert.coreId}`}>{alert.protoBeingName}</Link> · {alert.description}</p><small>{alert.evidence.join(" · ")}</small></article>)}</div> : <p>Sem alertas abertos.</p>}</section>
        <section className="panel"><SectionHeader title="Proto-seres atrasados" description="Atraso é falta de evidência recente, não estado vital irreversível." />{snapshot.staleProtoBeings.length ? <div className="stale-list">{snapshot.staleProtoBeings.map((proto) => <Link key={proto.id} href={`/proto-seres/${proto.id}`}><span className="presence-dot presence-stale" /><div><strong>{proto.displayName}</strong><small>{proto.coreId}</small></div><span>{formatRelativeTime(proto.lastSeenAt)}</span></Link>)}</div> : <p>Todos os proto-seres com telemetria estão dentro da tolerância.</p>}</section>
      </div>

      <section className="panel table-panel">
        <SectionHeader title="Envelopes de coleta" description="Registro bruto append-only lógico. O payload não é exposto nesta visão." />
        <div className="responsive-table envelope-table" role="table" aria-label="Envelopes vitais recentes">
          <div className="table-row table-head" role="row"><span>Recebido</span><span>Proto-ser</span><span>Sequência</span><span>Instância</span><span>Verificação</span><span>Hash</span></div>
          {snapshot.recentEnvelopes.map((envelope) => <div className="table-row" role="row" key={envelope.id}><span>{formatRelativeTime(envelope.receivedAt)}</span><span><strong>{envelope.protoBeingName}</strong><small>{envelope.coreId}</small></span><span>{envelope.sequence}</span><span>{envelope.instanceId ?? "—"}</span><span>{envelope.verificationResult}</span><code>{shortHash(envelope.payloadHash, 24)}</code></div>)}
        </div>
      </section>

      <section className="ingestion-contract">
        <div><span>Contrato de ingestão v1</span><h2>Cada proto-ser publica um VitalStatusEnvelope.</h2><p>Autenticação baseline por bearer token escopado; evolução planejada para assinatura de instância, nonce, timestamp, attestation e vínculo com certificado.</p></div>
        <pre>{`POST /api/v1/proto-seres/{coreId}/sinais-vitais\nAuthorization: Bearer <token>\nIdempotency-Key: <unique>\nX-PSD-Instance-ID: <instance>\n\n{ schemaVersion, observedAt, sequence, vitalStatus,\n  generation, lifeCycle, cryptoEpoch, sizes, runtime,\n  witness, roots, cortex, warnings }`}</pre>
      </section>
    </>
  );
}
