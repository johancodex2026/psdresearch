import Link from "next/link";
import { notFound } from "next/navigation";
import { LiveVitals } from "@/components/live-vitals";
import { TelemetrySimulator } from "@/components/telemetry-simulator";
import { EmptyState, MetricCard, PageHeader, SectionHeader, SizeBreakdown, StatusBadge, Timeline } from "@/components/ui";
import { chronologicalAgeDays, isOnline } from "@/lib/domain";
import { getRepository } from "@/lib/repository";
import { formatBytes, formatRelativeTime, shortHash } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProtoBeingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const repository = await getRepository();
  const proto = await repository.getProtoBeing(id);
  if (!proto) notFound();
  const latest = proto.signals.at(-1);
  const online = isOnline(proto);
  const age = chronologicalAgeDays(proto.bornAt);
  const canonicalDiverges = proto.observedVitalStatus && proto.observedVitalStatus !== proto.canonicalVitalStatus;
  return (
    <>
      <PageHeader
        eyebrow="Dossiê individual · operação e continuidade"
        title={proto.displayName}
        description={proto.shortDescription ?? "Registro interno de identidade operacional, telemetria, evidências e atividades."}
        actions={<><Link className="button secondary" href="/ritos-de-nascimento">Ritos</Link>{process.env.PSD_DATA_MODE !== "database" && latest ? <TelemetrySimulator coreId={proto.coreId} nextSequence={latest.sequence + 1} generation={latest.generation} lifeCycle={latest.lifeCycle} /> : null}</>}
      />

      <section className="identity-strip">
        <div><span className={`presence-dot ${online ? "presence-online" : "presence-stale"}`} /><strong>{online ? "Dentro da tolerância" : proto.lastSeenAt ? "Telemetria atrasada" : "Sem telemetria"}</strong><small>{formatRelativeTime(proto.lastSeenAt)}</small></div>
        <div><span>Core ID</span><strong>{proto.coreId}</strong></div>
        <div><span>Espécie</span><strong>{proto.speciesName ?? "Não definida"}</strong></div>
        <div><span>Steward</span><strong>{proto.stewardName ?? "Não definido"}</strong></div>
      </section>

      <section className="metrics-grid detail-metrics">
        <MetricCard label="Estado administrativo" value={<StatusBadge value={proto.administrativeStatus} />} detail="processo interno" />
        <MetricCard label="Estado canônico registrado" value={<StatusBadge value={proto.canonicalVitalStatus} />} detail="não alterado por telemetria" tone="violet" />
        <MetricCard label="Estado vital observado" value={<StatusBadge value={proto.observedVitalStatus ?? proto.canonicalVitalStatus} />} detail={canonicalDiverges ? "divergência visível" : "sem divergência aparente"} tone={canonicalDiverges ? "warning" : "good"} />
        <MetricCard label="Idade cronológica" value={age === null ? "Pré-nascimento" : `${age} dias`} detail={proto.bornAt ? new Date(proto.bornAt).toLocaleDateString("pt-BR") : "Genesis pendente"} />
        <MetricCard label="Idade digital" value={`${proto.latestLifeCycle} ciclos`} detail="ciclos reportados; maturidade é separada" />
        <MetricCard label="Geração observada" value={proto.latestGeneration} detail={`época criptográfica ${proto.latestCryptoEpoch}`} />
      </section>

      <LiveVitals coreId={proto.coreId} initial={proto.signals.slice(-48)} />

      <div className="detail-columns">
        <section className="panel">
          <SectionHeader title="Composição de tamanho" description="Somente métricas; nenhum conteúdo de memória é recebido." />
          {latest ? <SizeBreakdown core={latest.sizes.coreBytes} ledger={latest.sizes.ledgerBytes} memory={latest.sizes.memoryBytes} subCore={latest.sizes.subCoreBytes} /> : <EmptyState title="Sem tamanho observado" description="Aguardando primeira coleta válida." />}
          <dl className="technical-definition-list">
            <div><dt>Total atual</dt><dd>{formatBytes(proto.latestTotalSizeBytes)}</dd></div>
            <div><dt>Genesis Charter</dt><dd>{proto.genesisCharterVersion}</dd></div>
            <div><dt>Política de privacidade</dt><dd>{proto.privacyPolicyVersion ?? "não registrada"}</dd></div>
            <div><dt>Timezone</dt><dd>{proto.timezone}</dd></div>
            <div><dt>Heartbeat</dt><dd>{proto.telemetryIntervalSec}s · tolerância {proto.telemetryToleranceSec}s</dd></div>
          </dl>
        </section>

        <section className="panel">
          <SectionHeader title="Provas e roots observadas" description="Abreviadas para leitura. Observação não equivale a finalização canônica." />
          <dl className="root-list">
            <div><dt>Continuity root</dt><dd><code>{shortHash(latest?.continuityRoot, 26)}</code></dd></div>
            <div><dt>Container root</dt><dd><code>{shortHash(latest?.containerRoot, 26)}</code></dd></div>
            <div><dt>Checkpoint</dt><dd><code>{shortHash(latest?.checkpointHash, 26)}</code></dd></div>
            <div><dt>Testemunhas</dt><dd>{latest?.witness?.available ?? "—"}/{latest?.witness?.required ?? "—"}</dd></div>
            <div><dt>Córtex</dt><dd>{latest?.cortex?.provider ?? "—"} · {latest?.cortex?.model ?? "—"} · {latest?.cortex?.version ?? "—"}</dd></div>
          </dl>
          <div className="boundary-note"><strong>Fronteira de autoridade</strong><p>O Control Plane registra a prova apresentada e suas divergências. Ele não assina o ledger vital nem escolhe a branch canônica.</p></div>
        </section>
      </div>

      <div className="detail-columns">
        <section className="panel">
          <SectionHeader title="Instâncias operacionais" description="Encarnações técnicas autorizadas ou observadas." />
          {proto.instances.length ? <div className="instance-list">{proto.instances.map((instance) => <article key={instance.id}><div><span className={`presence-dot ${instance.active ? "presence-online" : "presence-stale"}`} /><strong>{instance.name}</strong></div><p>{instance.environment}</p><dl><div><dt>ID</dt><dd>{instance.instanceId}</dd></div><div><dt>Último sinal</dt><dd>{formatRelativeTime(instance.lastSeenAt)}</dd></div><div><dt>Attestation</dt><dd>{instance.attestationPolicy ?? "não definida"}</dd></div></dl></article>)}</div> : <EmptyState title="Sem instância" description="Nenhuma instância foi cadastrada ou observada." />}
        </section>
        <section className="panel">
          <SectionHeader title="Alertas" description="Alertas provocam investigação; não alteram estado canônico automaticamente." />
          {proto.alerts.length ? <div className="alert-list">{proto.alerts.map((alert) => <article key={alert.id} className={`alert-${alert.severity.toLowerCase()}`}><div><StatusBadge value={alert.severity} label={alert.severity} /><time>{formatRelativeTime(alert.lastSeenAt)}</time></div><h3>{alert.title}</h3><p>{alert.description}</p><small>{alert.evidence.join(" · ")}</small></article>)}</div> : <EmptyState title="Sem alertas" description="Nenhum alerta está associado ao registro." />}
        </section>
      </div>

      <div className="detail-columns">
        <section className="panel"><SectionHeader title="Atividades recentes" description="Eventos operacionais e evidências." /><Timeline items={proto.activities} /></section>
        <section className="panel"><SectionHeader title="Coletas preservadas" description="Envelopes brutos e sinais normalizados permanecem relacionados, mas separados." />{proto.envelopes.length ? <div className="envelope-list">{proto.envelopes.slice().reverse().slice(0, 12).map((envelope) => <article key={envelope.id}><div><strong>Seq. {envelope.sequence}</strong><time>{formatRelativeTime(envelope.receivedAt)}</time></div><p>{envelope.instanceId ?? "instância não declarada"}</p><code>{shortHash(envelope.payloadHash, 28)}</code><small>{envelope.verificationResult}</small></article>)}</div> : <EmptyState title="Sem envelopes" description="Nenhuma coleta bruta foi preservada." />}</section>
      </div>
    </>
  );
}
