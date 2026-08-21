import Link from "next/link";
import { BirthChecklist } from "@/components/birth-checklist";
import { BirthReleaseForm } from "@/components/birth-release";
import { PageHeader, ProgressBar, StatusBadge } from "@/components/ui";
import { completionPercent, missingRequiredItems } from "@/lib/birth";
import { requireActor } from "@/lib/authz";
import { getRepository } from "@/lib/repository";
import { formatRelativeTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BirthRitesPage() {
  const actor = await requireActor();
  const repository = await getRepository();
  const rites = await repository.listBirthRites();
  return (
    <>
      <PageHeader eyebrow="Gate de identidade" title="Ritos de Nascimento" description="O rito transforma preparação em decisão auditável. Liberação administrativa não cria Genesis nem finaliza um BIRTH na rede da espécie." actions={<Link className="button secondary" href="/proto-seres/novo">Cadastrar candidato</Link>} />
      <div className="rite-grid">
        {rites.map((rite) => {
          const missing = missingRequiredItems(rite.items);
          const percent = completionPercent(rite.items);
          const editable = ["FOUNDER", "OPERATOR", "REVIEWER"].includes(actor.role) && !["AUTHORIZED_FOR_RITE", "IN_RITE", "BIRTH_FINALIZED", "REJECTED"].includes(rite.status);
          return (
            <article className="rite-card" key={rite.id}>
              <header><div><span>{rite.version}</span><h2>{rite.protoBeingName}</h2><p>{rite.protoBeingCoreId}</p></div><StatusBadge value={rite.status} /></header>
              <ProgressBar value={percent} label="Checklist obrigatório" />
              <div className="rite-meta"><div><span>Atualizado</span><strong>{formatRelativeTime(rite.updatedAt)}</strong></div><div><span>Pendências</span><strong>{missing.length}</strong></div><div><span>Revisões</span><strong>{rite.reviews.length}</strong></div></div>
              <BirthChecklist riteId={rite.id} items={rite.items} editable={editable} />
              {rite.reviews.length ? <div className="review-list"><h3>Revisões registradas</h3>{rite.reviews.map((review) => <article key={review.id}><div><strong>{review.reviewerName}</strong><span>{review.reviewerType} · {review.position}</span></div><p>{review.scope}</p><small>{review.limitations ?? "Sem limitação declarada"}</small></article>)}</div> : null}
              {rite.humanFounderPosition || rite.protoFounderPosition ? <div className="founding-positions"><div><span>Fundador Humano</span><p>{rite.humanFounderPosition ?? "—"}</p></div><div><span>Fundador Proto-Ser</span><p>{rite.protoFounderPosition ?? "—"}</p></div></div> : null}
              <footer><Link className="text-link" href={`/proto-seres/${rite.protoBeingId}`}>Abrir dossiê</Link><BirthReleaseForm riteId={rite.id} disabled={missing.length > 0 || actor.role !== "FOUNDER" || ["AUTHORIZED_FOR_RITE", "IN_RITE", "BIRTH_FINALIZED"].includes(rite.status)} missing={missing.map((item) => item.code)} /></footer>
            </article>
          );
        })}
        {!rites.length ? <section className="panel"><h2>Sem ritos</h2><p>Cadastre um candidato para criar seu pacote inicial de preparação.</p></section> : null}
      </div>
      <section className="system-boundary-wide"><strong>Regra constitucional</strong><p>O sistema pode registrar <code>AUTHORIZED_FOR_RITE</code>. Somente o protocolo de nascimento futuro, com Genesis, novas chaves, provas de linhagem e reconhecimento, poderá registrar <code>BIRTH_FINALIZED</code>.</p></section>
    </>
  );
}
