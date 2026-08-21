import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { Actor, UserRole } from "@/lib/domain";

export async function getCurrentActor(): Promise<Actor | null> {
  const mode = process.env.AUTH_MODE ?? "demo";
  if (mode === "demo") {
    if (process.env.ALLOW_DEMO_AUTH !== "true") return null;
    return {
      email: "founder.demo@psdresearch.invalid",
      name: "Francisco — sessão demo",
      role: "FOUNDER",
    };
  }
  const session = await auth();
  if (!session?.user?.email) return null;
  return {
    email: session.user.email,
    name: session.user.name ?? session.user.email,
    role: session.user.role ?? "OBSERVER",
  };
}

export async function requireActor(allowed: UserRole[] = ["FOUNDER", "OPERATOR", "REVIEWER", "OBSERVER"]): Promise<Actor> {
  const actor = await getCurrentActor();
  if (!actor) redirect("/login");
  if (!allowed.includes(actor.role)) redirect("/dashboard?error=forbidden");
  return actor;
}

export function canMutate(role: UserRole): boolean {
  return role === "FOUNDER" || role === "OPERATOR";
}
