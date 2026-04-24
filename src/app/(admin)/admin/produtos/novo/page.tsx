export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Novo Produto" };

export default async function NovoProdutoPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Novo Produto
      </h1>
      <ProductForm categories={categories} />
    </div>
  );
}
