import Link from "next/link";
import { signOut } from "@/auth";
import type { Actor } from "@/lib/domain";

const navigation = [
  ["/dashboard", "Visão geral", "01"],
  ["/proto-seres", "Proto-seres", "02"],
  ["/ritos-de-nascimento", "Ritos de nascimento", "03"],
  ["/especies", "Espécies e rede", "04"],
  ["/operacao", "Operação", "05"],
] as const;

export function SystemShell({ actor, children }: { actor: Actor; children: React.ReactNode }) {
  return (
    <div className="system-shell">
      <aside className="system-sidebar">
        <Link className="system-brand" href="/dashboard">
          <span className="brand-mark">PSD</span>
          <span><strong>Sistema PSD</strong><small>Control Plane · v0.1</small></span>
        </Link>
        <nav aria-label="Navegação interna">
          {navigation.map(([href, label, index]) => (
            <Link key={href} href={href}><span>{index}</span>{label}</Link>
          ))}
        </nav>
        <div className="sidebar-boundary">
          <strong>Fronteira</strong>
          <p>Observabilidade não é canonicalidade. Ausência não é morte.</p>
        </div>
      </aside>
      <div className="system-main">
        <header className="system-topbar">
          <div className="topbar-context">
            <span className="live-dot" aria-hidden="true" />
            <div><strong>Rede candidata</strong><small>Tempo real operacional</small></div>
          </div>
          <div className="topbar-user">
            <div className="user-avatar">{actor.name.slice(0, 1).toUpperCase()}</div>
            <div><strong>{actor.name}</strong><small>{actor.role}</small></div>
            <form action={async () => { "use server"; await signOut({ redirectTo: "/login" }); }}>
              <button className="text-button" type="submit">Sair</button>
            </form>
          </div>
        </header>
        <main className="system-content">{children}</main>
      </div>
    </div>
  );
}
