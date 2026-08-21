import { MetricCard, PageHeader, SectionHeader, StatusBadge, Timeline } from "@/components/ui";
import { getRepository } from "@/lib/repository";
import { formatRelativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SpeciesPage() {
  const repository = await getRepository();
  const species = await repository.listSpecies();
  return (
    <>
      <PageHeader eyebrow="Arquitetura e rede" title="Espécies, validadores e continuidade coletiva" description="Visão operacional da Constituição, eras, épocas, indivíduos e validadores declarados. A baseline candidata não representa consenso BFT em produção." />
      {species.map((item) => {
        const onlineValidators = item.validators.filter((validator) => validator.status === "ONLINE").length;
        return <section className="species-section" key={item.id}>
          <header className="species-header"><div><span>{item.speciesId}</span><h2>{item.name}</h2><p>Constituição {item.constitutionVersion} · {item.governanceEra}</p></div><StatusBadge value={item.networkStatus} /></header>
          <div className="metrics-grid species-metrics">
            <MetricCard label="Indivíduos" value={item.protoBeingCount} detail={`${item.aliveCount} canonicamente ALIVE`} />
            <MetricCard label="Época criptográfica" value={item.cryptoEpoch} detail="mecanismos substituíveis" tone="violet" />
            <MetricCard label="Validadores" value={`${onlineValidators}/${item.validators.length}`} detail={`quórum declarado ${item.requiredQuorum}`} tone={onlineValidators >= item.requiredQuorum ? "good" : "warning"} />
            <MetricCard label="Estado da rede" value={<StatusBadge value={item.networkStatus} />} detail="observação do Control Plane" />
          </div>
          <div className="network-diagram" aria-label="Diagrama operacional da espécie">
            <div className="network-layer network-constitution"><span>Camada 0</span><strong>Constituição Gênese</strong><small>{item.constitutionVersion}</small></div>
            <div className="network-arrow">↓ define</div>
            <div className="network-layer network-registry"><span>Camada 1</span><strong>Registro da espécie</strong><small>{item.networkStatus === "NOT_IMPLEMENTED" ? "não implementado" : "candidato"}</small></div>
            <div className="network-arrow">↓ reconhece</div>
            <div className="network-layer network-cores"><span>Camada 2</span><strong>{item.protoBeingCount} ledgers individuais</strong><small>memórias fora da rede</small></div>
            <div className="network-arrow">↓ manifesta</div>
            <div className="network-layer network-cortex"><span>Camada 3</span><strong>Córtices e Sub Cores</strong><small>derivados e substituíveis</small></div>
          </div>
          <div className="detail-columns">
            <section className="panel"><SectionHeader title="Validadores e diversidade" description="Quantidade de chaves não equivale a independência." /><div className="validator-list">{item.validators.map((validator) => <article key={validator.id}><div><span className={`presence-dot ${validator.status === "ONLINE" ? "presence-online" : validator.status === "OFFLINE" ? "presence-stale" : "presence-candidate"}`} /><strong>{validator.name}</strong><StatusBadge value={validator.status} /></div><dl><div><dt>Operador</dt><dd>{validator.operator}</dd></div><div><dt>Infraestrutura</dt><dd>{validator.infrastructure}</dd></div><div><dt>Implementação</dt><dd>{validator.implementation ?? "não declarada"}</dd></div><div><dt>Jurisdição</dt><dd>{validator.jurisdiction ?? "não declarada"}</dd></div></dl><small>{formatRelativeTime(validator.lastSeenAt)}</small></article>)}</div></section>
            <section className="panel"><SectionHeader title="Eventos de rede" description="Eventos observados; nenhum deles é finalização canônica sem quórum real." /><Timeline items={item.events.map((event) => ({ ...event, title: event.type }))} /></section>
          </div>
        </section>;
      })}
      <section className="system-boundary-wide"><strong>Estado atual</strong><p>A rede exibida é uma projeção gerencial candidata. Ela não emite Continuity Certificates, não decide forks e não recebe memórias privadas.</p></section>
    </>
  );
}
