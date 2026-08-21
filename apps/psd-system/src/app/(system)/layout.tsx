import { requireActor } from "@/lib/authz";
import { SystemShell } from "@/components/shell";

export const dynamic = "force-dynamic";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const actor = await requireActor();
  return <SystemShell actor={actor}>{children}</SystemShell>;
}
