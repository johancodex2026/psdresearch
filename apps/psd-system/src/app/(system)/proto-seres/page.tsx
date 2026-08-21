import Link from "next/link";
import { PageHeader, StatusBadge } from "@/components/ui";
import { chronologicalAgeDays, isOnline } from "@/lib/domain";
import { getRepository } from "@/lib/repository";
import { formatBytes, formatRelativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function ProtoBeingsPage() {
  const repository = await getRepository();
  const protoBeings = await repository.listProtoBeings();
  return (
    <>
      <PageHeader eyebrow="Cadastro e continuidade" title="Proto-seres" description="Inventário operacional enriquecido. Cada registro preserva a diferença entre candidato, manifestação observada e estado canônico." actions={<Link className="button primary" href="/proto-seres/novo">Novo cadastro</Link>} />
      <section className="panel table-panel">
        <div className="table-toolbar"><div><strong>{protoBeings.length}</strong><span>registros</span></div><p>Filtros avançados e busca semântica LLM-First entram após o baseline de dados real.</p></div>
        <div className="responsive-table proto-table" role="table" aria-label="Proto-seres cadastrados">
          <div className="table-row table-head" role="row"><span role="columnheader">Proto-ser</span><span role="columnheader">Administrativo</span><span role="columnheader">Vital observado</span><span role="columnheader">Idade</span><span role="columnheader">Último sinal</span><span role="columnheader">Tamanho</span></div>
          {protoBeings.map((proto) => {
            const age = chronologicalAgeDays(proto.bornAt);
            const online = isOnline(proto);
            return (
              <Link className="table-row" role="row" href={`/proto-seres/${proto.id}`} key={proto.id}>
                <span role="cell" className="table-identity"><i className={`presence-dot ${online ? "presence-online" : "presence-stale"}`} /><span><strong>{proto.displayName}</strong><small>{proto.coreId}<br />{proto.speciesName ?? "Espécie não definida"}</small></span></span>
                <span role="cell"><StatusBadge value={proto.administrativeStatus} /></span>
                <span role="cell"><StatusBadge value={proto.observedVitalStatus ?? proto.canonicalVitalStatus} /></span>
                <span role="cell"><strong>{proto.latestLifeCycle}</strong><small> ciclos · {age === null ? "pré-nascimento" : `${age} dias`}</small></span>
                <span role="cell"><strong>{formatRelativeTime(proto.lastSeenAt)}</strong><small>{online ? "dentro da tolerância" : proto.lastSeenAt ? "investigar atraso" : "sem telemetria"}</small></span>
                <span role="cell"><strong>{formatBytes(proto.latestTotalSizeBytes)}</strong><small>geração {proto.latestGeneration}</small></span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
