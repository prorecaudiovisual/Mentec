export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ServiceForm from "@/components/admin/ServiceForm";

export const metadata = { title: "Editar Serviço" };

export default async function EditarServicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Editar Serviço
      </h1>
      <ServiceForm
        initialData={{
          id: service.id,
          title: service.title,
          slug: service.slug,
          description: service.description,
          icon: service.icon,
          imageUrl: service.imageUrl,
          published: service.published,
          order: service.order,
        }}
      />
    </div>
  );
}
