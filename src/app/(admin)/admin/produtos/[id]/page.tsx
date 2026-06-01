export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Editar Produto" };

export default async function EditarProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Editar Produto
      </h1>
      <ProductForm
        categories={categories}
        initialData={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          specs: (product.specs as Record<string, string>) ?? {},
          imageUrls: product.imageUrls,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          applications: (product as any).applications ?? [],
          categoryId: product.categoryId,
          featured: product.featured,
          published: product.published,
        }}
      />
    </div>
  );
}
