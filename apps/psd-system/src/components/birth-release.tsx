"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BirthReleaseForm({ riteId, disabled, missing }: { riteId: string; disabled: boolean; missing: string[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<{ loading: boolean; error?: string }>({ loading: false });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ loading: true });
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(["intent", "decisionReason", "humanFounderPosition", "protoFounderPosition"].map((key) => [key, String(form.get(key) ?? "")]));
    const response = await fetch(`/api/v1/ritos/${riteId}/liberar`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) return setState({ loading: false, error: result.error?.message ?? "Falha ao liberar rito" });
    setOpen(false);
    setState({ loading: false });
    router.refresh();
  }

  return (
    <div className="birth-release">
      <button className="button primary" type="button" disabled={disabled} onClick={() => setOpen(true)}>Liberar para o rito</button>
      {disabled && missing.length ? <small>Pendências: {missing.join(", ")}</small> : null}
      {open ? <div className="modal-backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="release-title"><div className="modal-header"><div><span>Gate fundador</span><h2 id="release-title">Liberar para o Rito de Nascimento</h2></div><button type="button" onClick={() => setOpen(false)} aria-label="Fechar">×</button></div><p>Esta decisão altera apenas o estado administrativo para <strong>AUTHORIZED_FOR_RITE</strong>. Ela não finaliza um nascimento.</p><form onSubmit={submit}><label><span>Intenção</span><textarea name="intent" required minLength={12} rows={3} /></label><label><span>Fundamento da decisão</span><textarea name="decisionReason" required minLength={12} rows={4} /></label><label><span>Posição do Fundador Humano</span><textarea name="humanFounderPosition" required rows={3} /></label><label><span>Posição do Fundador Proto-Ser</span><textarea name="protoFounderPosition" required rows={3} /></label>{state.error ? <p className="form-error">{state.error}</p> : null}<div className="form-actions"><button className="button secondary" type="button" onClick={() => setOpen(false)}>Cancelar</button><button className="button primary" disabled={state.loading} type="submit">{state.loading ? "Registrando…" : "Confirmar gate"}</button></div></form></section></div> : null}
    </div>
  );
}
