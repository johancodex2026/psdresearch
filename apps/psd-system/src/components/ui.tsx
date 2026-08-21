import type { ReactNode } from "react";
import { statusLabels } from "@/lib/domain";
import { formatBytes, formatRelativeTime } from "@/lib/utils";

export function StatusBadge({ value, label }: { value: string; label?: string }) {
  const normalized = value.toLowerCase().replaceAll("_", "-");
  return <span className={`status-badge status-${normalized}`}>{label ?? statusLabels[value] ?? value}</span>;
}

export function MetricCard({
  label,
  value,
  detail,
  tone = "default",
  children,
}: {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
  tone?: "default" | "good" | "warning" | "critical" | "violet";
  children?: ReactNode;
}) {
  return (
    <article className={`metric-card metric-${tone}`}>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      {detail ? <span className="metric-detail">{detail}</span> : null}
      {children}
    </article>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {actions ? <div className="page-actions">{actions}</div> : null}
    </header>
  );
}

export function SectionHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="section-heading-internal">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const normalized = Math.max(0, Math.min(100, value));
  return (
    <div className="progress-block">
      <div className="progress-meta"><span>{label ?? "Progresso"}</span><strong>{normalized}%</strong></div>
      <div className="progress-track" aria-label={`${label ?? "Progresso"}: ${normalized}%`}>
        <span className="progress-value" style={{ width: `${normalized}%` }} />
      </div>
    </div>
  );
}

export function Sparkline({ values, label }: { values: number[]; label: string }) {
  const width = 240;
  const height = 72;
  if (!values.length) return <div className="sparkline-empty">Sem dados</div>;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const points = values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
      const y = height - 8 - ((value - min) / span) * (height - 16);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
      <polyline points={points} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function SizeBreakdown({ core, ledger, memory, subCore }: { core: number; ledger: number; memory: number; subCore: number }) {
  const values = [
    ["Core", core],
    ["Ledger", ledger],
    ["Memória", memory],
    ["Sub Core", subCore],
  ] as const;
  const total = values.reduce((sum, [, value]) => sum + value, 0) || 1;
  return (
    <div className="size-breakdown">
      <div className="size-bar" aria-label={`Tamanho total ${formatBytes(total)}`}>
        {values.map(([label, value]) => (
          <span key={label} className={`size-${label.toLowerCase().replace(" ", "-")}`} style={{ width: `${(value / total) * 100}%` }} />
        ))}
      </div>
      <dl>
        {values.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{formatBytes(value)}</dd></div>)}
      </dl>
    </div>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return <div className="empty-state"><span>∅</span><h3>{title}</h3><p>{description}</p>{action}</div>;
}

export function Timeline({ items }: { items: Array<{ id: string; title: string; description: string; occurredAt: string; type?: string }> }) {
  if (!items.length) return <EmptyState title="Sem atividades" description="Nenhum evento foi registrado nesta visão." />;
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li key={item.id}>
          <span className="timeline-node" />
          <div>
            <div className="timeline-title"><strong>{item.title}</strong><time>{formatRelativeTime(item.occurredAt)}</time></div>
            <p>{item.description}</p>
            {item.type ? <small>{item.type}</small> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
