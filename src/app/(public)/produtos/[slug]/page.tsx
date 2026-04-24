import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  return { title: product?.name ?? "Produto" };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, published: true },
    include: { category: true },
  });

  if (!product) notFound();

  const specs = (product.specs as Record<string, string>) ?? {};

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <Link
        href="/produtos"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-900 mb-8"
      >
        <ArrowLeft size={14} /> Voltar para Produtos
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div>
          {product.imageUrls.length > 0 ? (
            <div className="space-y-3">
              <div className="relative h-72 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              {product.imageUrls.length > 1 && (
                <div className="flex gap-2">
                  {product.imageUrls.slice(1).map((url, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border border-gray-200"
                    >
                      <Image src={url} alt="" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-72 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
              Sem imagem
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="text-xs text-brand-orange font-semibold uppercase tracking-wide">
            {product.category.name}
          </span>
          <h1 className="font-heading text-2xl font-bold text-navy-900 mt-2 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {Object.keys(specs).length > 0 && (
            <div className="mb-8">
              <h2 className="font-semibold text-navy-900 mb-3">
                Especificações Técnicas
              </h2>
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-medium text-gray-700 w-1/2">{k}</td>
                      <td className="py-2 text-gray-600">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Link
            href="/contato"
            className="inline-block bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </div>
    </div>
  );
}
