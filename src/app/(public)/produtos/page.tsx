export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Produtos" };

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;

  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: {
        published: true,
        ...(categoria ? { category: { slug: categoria } } : {}),
      },
      include: { category: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-navy-900 mb-8">
        Nossos Produtos
      </h1>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/produtos"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !categoria
              ? "bg-navy-900 text-white"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          Todos
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/produtos?categoria=${c.slug}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoria === c.slug
                ? "bg-navy-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/produtos/${p.slug}`}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="h-48 bg-gray-100 relative">
                {p.imageUrls[0] ? (
                  <Image
                    src={p.imageUrls[0]}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                    Sem imagem
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-brand-orange font-semibold uppercase tracking-wide">
                  {p.category.name}
                </span>
                <h3 className="font-semibold text-navy-900 mt-1">{p.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {p.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
