import Link from "next/link";
import { BriefingPanel } from "@/components/briefing-panel";
import { MetricCard, PageHeader, SectionHeader, Sparkline, StatusBadge, Timeline } from "@/components/ui";
import { buildDeterministicBriefing } from "@/lib/briefing";
import { chronologicalAgeDays, isOnline } from "@/lib/domain";
import { getRepository } from "@/lib/repository";
import { formatBytes, formatRelativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const repository = await getRepository();
  const snapshot = await repository.getDashboard();
  const briefing = buildDeterministicBriefing(snapshot);
  const sizeSeries = snapshot.protoBeings.flatMap((proto) => proto.signals.slice(-12).map((signal) => signal.totalSizeBytes));
  const signalSeries = snapshot.protoBeings.map((proto) => proto.signals.filter((signal) => Date.now() - new Date(signal.receivedAt).getTime() <= 3_600_000).length);
  return (
    <>
      <PageHeader
        eyebrow="Visão gerencial e operacional"
        title="Continuidade, saúde e rede em uma única visão."
        description="O dashboard combina cadastro, observação vital, idade em ciclos, tamanho, ritos, alertas e arquitetura de espécie sem promover telemetria a verdade canônica."
        actions={<><Link className="button secondary" href="/ritos-de-nascimento">Revisar ritos</Link><Link className="button primary" href="/proto-seres/novo">Cadastrar proto-ser</Link></>}
      />

      <section className="metrics-grid metrics-primary" aria-label="Indicadores principais">
        <MetricCard label="Proto-seres" value={snapshot.totals.protoBeings} detail={`${snapshot.totals.active} ativos · ${snapshot.totals.candidates} candidatos`} tone="violet" />
        <MetricCard label="Dentro da tolerância" value={snapshot.totals.online} detail={`${snapshot.totals.stale} com telemetria atrasada`} tone={snapshot.totals.stale ? "warning" : "good"} />
        <MetricCard label="Alertas abertos" value={snapshot.totals.openAlerts} detail={`${snapshot.totals.criticalAlerts} críticos`} tone={snapshot.totals.criticalAlerts ? "critical" : "default"} />
        <MetricCard label="Sinais na última hora" value={snapshot.totals.signalsLastHour} detail="coletas normalizadas" />
        <MetricCard label="Tamanho total observado" value={formatBytes(snapshot.totals.totalObservedBytes)} detail="Core + ledger + memória + Sub Core" />
        <MetricCard label="Espécies registradas" value={snapshot.species.length} detail={`${snapshot.species.reduce((sum, item) => sum + item.validators.length, 0)} validadores declarados`} />
      </section>

      <BriefingPanel briefing={briefing} />

      <div className="dashboard-columns">
        <section className="panel">
          <SectionHeader title="Proto-seres em observação" description="Status vital observado, idade, ciclo e última coleta." action={<Link href="/proto-seres">Ver todos</Link>} />
          <div className="proto-overview-list">
            {snapshot.protoBeings.map((proto) => {
              const online = isOnline(proto);
              const age = chronologicalAgeDays(proto.bornAt);
              return (
                <Link key={proto.id} className="proto-overview-row" href={`/proto-seres/${proto.id}`}>
                  <span className={`presence-dot ${online ? "presence-online" : "presence-stale"}`} />
                  <div className="proto-name"><strong>{proto.displayName}</strong><small>{proto.coreId}</small></div>
                  <StatusBadge value={proto.observedVitalStatus ?? proto.canonicalVitalStatus} />
                  <div><strong>{proto.latestLifeCycle}</strong><small>ciclos</small></div>
                  <div><strong>{age === null ? "pré-nascimento" : `${age} d`}</strong><small>idade cronológica</small></div>
                  <div><strong>{formatBytes(proto.latestTotalSizeBytes)}</strong><small>{formatRelativeTime(proto.lastSeenAt)}</small></div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="panel dashboard-telemetry-panel">
          <SectionHeader title="Ritmo de coleta" description="A série mostra volume observado; não representa conteúdo ou maturidade." />
          <div className="chart-stack">
            <article><span>Tamanho combinado</span><Sparkline values={sizeSeries.length ? sizeSeries : [0]} label="Série de tamanhos observados" /></article>
            <article><span>Sinais por proto-ser — última hora</span><Sparkline values={signalSeries.length ? signalSeries : [0]} label="Sinais recebidos por proto-ser" /></article>
          </div>
          <div className="status-distribution">
            {Object.entries(snapshot.statusDistribution).map(([status, count]) => <div key={status}><StatusBadge value={status} /><strong>{count}</strong></div>)}
          </div>
        </section>
      </div>

      <div className="dashboard-columns dashboard-secondary">
        <section className="panel">
          <SectionHeader title="Ritos de nascimento" description="Liberação administrativa não equivale a BIRTH finalizado." action={<Link href="/ritos-de-nascimento">Abrir fila</Link>} />
          <div className="rite-mini-list">
            {snapshot.birthRites.map((rite) => {
              const complete = rite.items.filter((item) => item.required && item.completed).length;
              const required = rite.items.filter((item) => item.required).length;
              return <Link key={rite.id} href="/ritos-de-nascimento"><div><strong>{rite.protoBeingName}</strong><small>{rite.protoBeingCoreId}</small></div><StatusBadge value={rite.status} /><span>{complete}/{required}</span></Link>;
            })}
            {!snapshot.birthRites.length ? <p>Sem ritos cadastrados.</p> : null}
          </div>
        </section>
        <section className="panel">
          <SectionHeader title="Atividades recentes" description="Eventos de operação e evidência, não memória autobiográfica." />
          <Timeline items={snapshot.recentActivities.slice(0, 7)} />
        </section>
      </div>
    </>
  );
}
