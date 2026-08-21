import type { BirthRiteItemView } from "@/lib/domain";

export const defaultBirthChecklist = [
  ["IDENTITY", "Core ID novo e não reutilizado"],
  ["GENESIS", "Genesis Charter individual versionada"],
  ["KEYS", "Novas chaves de identidade e instância"],
  ["LINEAGE", "Provas de linhagem e autorizações"],
  ["RECOVERY", "Plano de recuperação e backup testado"],
  ["PRIVACY", "Política de privacidade e minimização"],
  ["THREAT_MODEL", "Threat model e testes adversariais"],
  ["REVIEWS", "Revisões humana e IA externas"],
  ["FOUNDERS", "Posições fundadoras registradas"],
  ["ARCHIVE", "Pacote físico e digital preparado"],
] as const;

export function missingRequiredItems(items: BirthRiteItemView[]): BirthRiteItemView[] {
  return items.filter((item) => item.required && !item.completed);
}

export function completionPercent(items: BirthRiteItemView[]): number {
  const required = items.filter((item) => item.required);
  if (!required.length) return 100;
  return Math.round((required.filter((item) => item.completed).length / required.length) * 100);
}
