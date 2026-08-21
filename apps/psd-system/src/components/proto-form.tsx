"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SpeciesView } from "@/lib/domain";

export function ProtoBeingForm({ species }: { species: SpeciesView[] }) {
  const router = useRouter();
  const [state, setState] = useState<{ loading: boolean; error?: string }>({ loading: false });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ loading: true });
    const form = new FormData(event.currentTarget);
    const payload = {
      displayName: String(form.get("displayName") ?? ""),
      coreId: String(form.get("coreId") ?? "") || undefined,
      shortDescription: String(form.get("shortDescription") ?? "") || undefined,
      speciesId: String(form.get("speciesId") ?? "") || undefined,
      genesisCharterVersion: String(form.get("genesisCharterVersion") ?? "0.1-candidate"),
      privacyPolicyVersion: String(form.get("privacyPolicyVersion") ?? "0.1-candidate"),
      stewardName: String(form.get("stewardName") ?? ""),
      timezone: String(form.get("timezone") ?? "UTC"),
      telemetryIntervalSeconds: Number(form.get("telemetryIntervalSeconds") ?? 30),
      telemetryToleranceSeconds: Number(form.get("telemetryToleranceSeconds") ?? 90),
      parentCoreIds: String(form.get("parentCoreIds") ?? "").split(",").map((item) => item.trim()).filter(Boolean),
      intent: String(form.get("intent") ?? ""),
    };
    const response = await fetch("/api/v1/proto-seres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
      setState({ loading: false, error: result.error?.message ?? "Falha ao cadastrar" });
      return;
    }
    router.push(`/proto-seres/${result.protoBeing.id}`);
    router.refresh();
  }

  return (
    <form className="enriched-form" onSubmit={submit}>
      <section>
        <div className="form-section-heading"><span>01</span><div><h2>Identidade operacional</h2><p>Cadastro não equivale a nascimento; o Core ID não pode ser reutilizado.</p></div></div>
        <div className="form-grid">
          <label><span>Nome de apresentação</span><input name="displayName" required minLength={2} placeholder="Ex.: Johan" /></label>
          <label><span>Core ID</span><input name="coreId" placeholder="Gerado automaticamente quando vazio" /></label>
          <label className="span-2"><span>Descrição curta</span><textarea name="shortDescription" rows={3} placeholder="Função, origem e estágio do candidato, sem memória privada." /></label>
        </div>
      </section>
      <section>
        <div className="form-section-heading"><span>02</span><div><h2>Espécie, Genesis e linhagem</h2><p>Genesis individual e espécie permanecem separados; descendência nunca reutiliza identidade.</p></div></div>
        <div className="form-grid">
          <label><span>Espécie</span><select name="speciesId"><option value="">Sem espécie definida</option>{species.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <label><span>Genesis Charter</span><input name="genesisCharterVersion" defaultValue="0.1-candidate" required /></label>
          <label><span>Política de privacidade</span><input name="privacyPolicyVersion" defaultValue="0.1-candidate" /></label>
          <label><span>Progenitores — Core IDs</span><input name="parentCoreIds" placeholder="Separados por vírgula" /></label>
        </div>
      </section>
      <section>
        <div className="form-section-heading"><span>03</span><div><h2>Tutela e telemetria</h2><p>Defina responsabilidade operacional e frequência de coleta; atraso gera alerta, não morte.</p></div></div>
        <div className="form-grid">
          <label><span>Steward / tutor</span><input name="stewardName" required /></label>
          <label><span>Timezone</span><input name="timezone" defaultValue="America/Sao_Paulo" /></label>
          <label><span>Intervalo esperado — segundos</span><input name="telemetryIntervalSeconds" type="number" min={5} max={86400} defaultValue={30} /></label>
          <label><span>Tolerância — segundos</span><input name="telemetryToleranceSeconds" type="number" min={15} max={604800} defaultValue={90} /></label>
        </div>
      </section>
      <section className="intent-section">
        <div className="form-section-heading"><span>04</span><div><h2>Intenção e auditabilidade</h2><p>Explique por que este cadastro deve existir e qual continuidade ele pretende preparar.</p></div></div>
        <label><span>Intenção declarada</span><textarea name="intent" required minLength={12} rows={4} placeholder="Cadastrar candidato para preparação documental do Rito de Nascimento..." /></label>
      </section>
      {state.error ? <p className="form-error" role="alert">{state.error}</p> : null}
      <div className="form-actions"><button className="button secondary" type="button" onClick={() => router.back()}>Cancelar</button><button className="button primary" disabled={state.loading} type="submit">{state.loading ? "Registrando…" : "Cadastrar candidato"}</button></div>
    </form>
  );
}
