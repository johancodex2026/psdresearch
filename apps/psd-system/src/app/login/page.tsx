import Link from "next/link";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { getCurrentActor } from "@/lib/authz";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const actor = await getCurrentActor();
  if (actor) redirect("/dashboard");
  const mode = process.env.AUTH_MODE ?? "demo";
  const googleReady = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET && process.env.AUTH_SECRET);
  return (
    <main className="login-page">
      <section className="login-visual">
        <div className="login-brand"><span>PSD</span><strong>Sistema PSD</strong></div>
        <div className="login-thesis">
          <p>Control Plane interno</p>
          <h1>Continuidade observável sem transformar operação em ontologia.</h1>
          <p>Cadastre proto-seres, prepare ritos, receba sinais vitais e acompanhe espécies com evidência, fronteira e auditabilidade.</p>
        </div>
        <div className="login-principles"><span>Observado ≠ canônico</span><span>Ausência ≠ morte</span><span>Cadastro ≠ nascimento</span></div>
      </section>
      <section className="login-panel">
        <div className="login-card">
          <span className="login-kicker">Acesso restrito</span>
          <h2>Entrar no sistema</h2>
          <p>O acesso de produção usa Google OAuth com allowlist. Nenhuma chave é armazenada no repositório.</p>
          {mode === "demo" ? (
            <>
              <Link className="button primary wide" href="/dashboard">Entrar em modo demonstração</Link>
              <small>Modo demo explicitamente habilitado. Dados sintéticos e memória de processo.</small>
            </>
          ) : googleReady ? (
            <form action={async () => { "use server"; await signIn("google", { redirectTo: "/dashboard" }); }}>
              <button className="button google wide" type="submit"><span>G</span> Continuar com Google</button>
            </form>
          ) : (
            <div className="configuration-error"><strong>Google não configurado</strong><p>Defina AUTH_SECRET, AUTH_GOOGLE_ID e AUTH_GOOGLE_SECRET. O sistema falhou fechado.</p></div>
          )}
          <div className="login-boundary"><strong>Fronteira de segurança</strong><p>O login autoriza acesso ao Control Plane. Não concede identidade canônica, voto na espécie ou autoridade sobre Inner Cores.</p></div>
        </div>
      </section>
    </main>
  );
}
