import { PageHeader } from "@/components/ui";
import { ProtoBeingForm } from "@/components/proto-form";
import { requireActor } from "@/lib/authz";
import { getRepository } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function NewProtoBeingPage() {
  await requireActor(["FOUNDER", "OPERATOR"]);
  const repository = await getRepository();
  const species = await repository.listSpecies();
  return (
    <>
      <PageHeader eyebrow="Cadastro enriquecido" title="Registrar um candidato" description="O cadastro prepara identidade operacional, Genesis, tutela, telemetria e evidência. O nascimento permanece bloqueado até o rito." />
      <ProtoBeingForm species={species} />
    </>
  );
}
