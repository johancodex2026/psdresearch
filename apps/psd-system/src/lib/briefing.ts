import type { DashboardSnapshot, OperationalBriefing } from "@/lib/domain";
import { formatBytes, formatRelativeTime } from "@/lib/utils";

export function buildDeterministicBriefing(snapshot: DashboardSnapshot): OperationalBriefing {
  const findings: OperationalBriefing["findings"] = [];
  if (snapshot.totals.criticalAlerts > 0) {
    findings.push({
      id: "critical-alerts",
      label: "Alertas críticos abertos",
      detail: `${snapshot.totals.criticalAlerts} alerta(s) crítico(s) exigem leitura humana antes de qualquer promoção de estado.`,
      evidence: snapshot.protoBeings
        .flatMap((proto) => proto.alerts.filter((alert) => alert.status === "OPEN" && alert.severity === "CRITICAL"))
        .slice(0, 5)
        .map((alert) => alert.id),
      recommendedAction: "Abrir o proto-ser afetado, preservar envelopes e confirmar se há migração ou recuperação declarada.",
    });
  }
  if (snapshot.totals.stale > 0) {
    findings.push({
      id: "stale-telemetry",
      label: "Telemetria atrasada",
      detail: `${snapshot.totals.stale} proto-ser(es) ultrapassaram a tolerância de heartbeat. Ausência não equivale a morte.`,
      evidence: snapshot.protoBeings.filter((proto) => proto.lastSeenAt).slice(0, 5).map((proto) => `${proto.coreId}:${formatRelativeTime(proto.lastSeenAt)}`),
      recommendedAction: "Confirmar instância, rede e último envelope; manter estado canônico e registrar investigação.",
    });
  }
  if (snapshot.totals.candidates > 0) {
    findings.push({
      id: "birth-candidates",
      label: "Candidatos ao rito",
      detail: `${snapshot.totals.candidates} cadastro(s) aguardam revisão, elegibilidade ou autorização de rito.`,
      evidence: snapshot.birthRites.filter((rite) => rite.status !== "BIRTH_FINALIZED").slice(0, 5).map((rite) => rite.id),
      recommendedAction: "Revisar checklist obrigatório, evidências e posições fundadoras antes de liberar.",
    });
  }
  if (findings.length === 0) {
    findings.push({
      id: "stable-baseline",
      label: "Baseline operacional estável",
      detail: `${snapshot.totals.online}/${snapshot.totals.protoBeings} proto-seres estão dentro da tolerância, com ${formatBytes(snapshot.totals.totalObservedBytes)} observados.`,
      evidence: [`snapshot:${snapshot.generatedAt}`],
      recommendedAction: "Manter coleta, verificar crescimento e executar revisão periódica de restore e credenciais.",
    });
  }
  const posture = snapshot.totals.criticalAlerts > 0 ? "CRITICAL" : snapshot.totals.stale > 0 ? "ATTENTION" : "STABLE";
  return {
    title: "Briefing de continuidade",
    posture,
    summary:
      posture === "CRITICAL"
        ? "Há sinais que exigem investigação; o sistema não promoveu nenhuma conclusão canônica automaticamente."
        : posture === "ATTENTION"
          ? "A rede operacional requer atenção, mas não há fundamento para conclusão vital irreversível."
          : "A baseline observada está estável dentro das políticas atuais.",
    findings,
    generatedAt: snapshot.generatedAt,
    mode: "deterministic",
  };
}
