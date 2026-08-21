"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BirthRiteItemView } from "@/lib/domain";

export function BirthChecklist({ riteId, items, editable }: { riteId: string; items: BirthRiteItemView[]; editable: boolean }) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function update(item: BirthRiteItemView, completed: boolean) {
    if (!editable) return;
    const evidenceRef = completed ? window.prompt("Referência da evidência", item.evidenceRef ?? "evidence://") : "";
    if (completed && !evidenceRef?.trim()) return;
    setPending(item.id);
    setError(null);
    const response = await fetch(`/api/v1/ritos/${riteId}/itens/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed, evidenceRef: completed ? evidenceRef : null, intent: completed ? `Registrar evidência para ${item.code}` : `Reabrir item ${item.code}` }),
    });
    const result = await response.json();
    if (!response.ok) setError(result.error?.message ?? "Falha ao atualizar checklist");
    setPending(null);
    router.refresh();
  }

  return (
    <div className="birth-checklist">
      {items.map((item) => (
        <article key={item.id} className={item.completed ? "checklist-complete" : "checklist-pending"}>
          <button type="button" disabled={!editable || pending === item.id} aria-label={`${item.completed ? "Reabrir" : "Concluir"} ${item.title}`} onClick={() => update(item, !item.completed)}>
            {item.completed ? "✓" : ""}
          </button>
          <div><span>{item.code}</span><h3>{item.title}</h3><p>{item.completed ? `Evidência: ${item.evidenceRef ?? "registrada"}` : item.required ? "Obrigatório · pendente" : "Opcional"}</p></div>
        </article>
      ))}
      {error ? <p className="form-error" role="alert">{error}</p> : null}
    </div>
  );
}
