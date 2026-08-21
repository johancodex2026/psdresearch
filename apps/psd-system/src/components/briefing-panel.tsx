import type { OperationalBriefing } from "@/lib/domain";

export function BriefingPanel({ briefing }: { briefing: OperationalBriefing }) {
  return (
    <section className={`briefing-panel briefing-${briefing.posture.toLowerCase()}`}>
      <div className="briefing-header">
        <div><span>LLM-First · briefing operacional</span><h2>{briefing.title}</h2></div>
        <strong>{briefing.posture}</strong>
      </div>
      <p className="briefing-summary">{briefing.summary}</p>
      <div className="briefing-findings">
        {briefing.findings.map((finding, index) => (
          <article key={finding.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{finding.label}</h3><p>{finding.detail}</p><strong>Próximo passo</strong><p>{finding.recommendedAction}</p><small>Evidências: {finding.evidence.join(" · ") || "snapshot atual"}</small></div>
          </article>
        ))}
      </div>
      <footer>Gerado em {new Date(briefing.generatedAt).toLocaleString("pt-BR")} · modo {briefing.mode}</footer>
    </section>
  );
}
