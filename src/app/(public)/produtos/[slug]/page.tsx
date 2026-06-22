import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { APLICACOES } from "@/lib/aplicacoes";

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

  const [product, otherProducts] = await Promise.all([
    prisma.product.findUnique({
      where: { slug, published: true },
      include: { category: true },
    }),
    prisma.product.findMany({
      where: { published: true, slug: { not: slug } },
      include: { category: true },
      take: 8,
    }),
  ]);

  if (!product) notFound();

  const specs = (product.specs as Record<string, string>) ?? {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedApplications: string[] = (product as any).applications ?? [];
  const aplicacoes = storedApplications.length > 0
    ? APLICACOES.filter((a) => storedApplications.includes(a.label))
    : [];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grain bg-grid bg-inverse-surface overflow-hidden relative">
        <div
          className="absolute left-8 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(200,98,30,0.3) 40%, rgba(200,98,30,0.3) 80%, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product image */}
          <div className="relative h-80 lg:h-[420px] bg-white border border-white/6 flex items-center justify-center overflow-hidden">
            {product.imageUrls[0] ? (
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            ) : (
              <span className="material-symbols-outlined text-white/8" style={{ fontSize: "80px" }}>bolt</span>
            )}
          </div>

          {/* Product info */}
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              <Link
                href="/produtos"
                className="font-heading text-[9px] uppercase tracking-[0.16em] text-white/40 hover:text-white/70 transition-colors"
              >
                Produtos
              </Link>
              <span className="text-white/20 font-heading text-[9px]">/</span>
              <span className="font-heading text-[9px] uppercase tracking-[0.16em] text-primary-container">
                {product.category.name}
              </span>
            </div>

            <h1
              className="font-display font-bold text-white uppercase mb-4 leading-[0.9]"
              style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
            >
              {product.name}
            </h1>
            <p className="text-secondary-fixed text-body-lg mb-10 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contato"
                className="bg-primary-container text-white px-8 py-4 font-heading text-[10px] uppercase tracking-[0.16em] hover:bg-[#A8501A] active:scale-95 transition-all flex items-center gap-2"
              >
                Solicitar Orçamento
                <span className="material-symbols-outlined text-base">send</span>
              </Link>
              <Link
                href="/contato"
                className="border border-white/20 text-white px-8 py-4 font-heading text-[10px] uppercase tracking-[0.16em] hover:bg-white/5 hover:border-white/40 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">description</span>
                Catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESPECIFICAÇÕES ────────────────────────────────── */}
      {Object.keys(specs).length > 0 && (
        <section className="bg-[#1A2535]">
          <div className="max-w-[1280px] mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-5 h-px bg-primary-container" />
                <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container">
                  Especificações Técnicas
                </span>
              </div>
              <h2 className="font-display font-bold text-4xl text-white uppercase mb-10 leading-none">
                Detalhes do Transformador
              </h2>
              <table className="w-full border-collapse">
                <tbody>
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-white/8 group">
                      <td className="py-4 pr-6 font-heading text-[9px] uppercase tracking-[0.14em] text-white/40 w-1/2 group-hover:text-white/60 transition-colors">
                        {k}
                      </td>
                      <td className="py-4 text-white text-sm font-medium">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="relative h-80 lg:h-[420px] bg-white border border-white/6 flex items-center justify-center overflow-hidden">
              {(product.imageUrls[1] ?? product.imageUrls[0]) ? (
                <Image
                  src={product.imageUrls[1] ?? product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                />
              ) : (
                <span className="material-symbols-outlined text-white/8" style={{ fontSize: "80px" }}>bolt</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── APLICAÇÕES ────────────────────────────────────── */}
      {aplicacoes.length > 0 && (
        <section className="bg-[#111827] grain">
          <div className="max-w-[1280px] mx-auto px-8 py-16">
            <div className="text-center mb-12">
              <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container block mb-3">
                Onde é utilizado
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-white uppercase leading-none">
                Aplicações
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {aplicacoes.map((app) => (
                <div
                  key={app.label}
                  className="flex flex-col items-center gap-4 p-6 border border-white/6 bg-[#1A2535] hover:border-primary-container/30 hover:bg-[#1E2D42] transition-all duration-200 group"
                >
                  <span className="material-symbols-outlined text-3xl text-white/40 group-hover:text-primary-container transition-colors duration-200">
                    {app.icon}
                  </span>
                  <span className="font-heading text-[8px] uppercase tracking-[0.14em] text-white/50 text-center group-hover:text-white/80 transition-colors">
                    {app.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OUTROS PRODUTOS ───────────────────────────────── */}
      {otherProducts.length > 0 && (
        <section className="bg-surface-container-low py-16">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#E3DAD0]">
              <h2 className="font-display font-bold text-4xl text-on-surface uppercase leading-none">
                Nossos Transformadores
              </h2>
              <Link
                href="/produtos"
                className="font-heading text-[9px] uppercase tracking-[0.16em] text-primary-container flex items-center gap-2 hover:text-[#A8501A] transition-colors group"
              >
                Ver todos
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.slug}`}
                  className="group bg-white border border-[#E3DAD0] overflow-hidden hover:border-primary-container/40 hover:shadow-sm transition-all duration-200 relative"
                >
                  <div className="relative h-32 bg-white overflow-hidden">
                    {p.imageUrls[0] ? (
                      <Image
                        src={p.imageUrls[0]}
                        alt={p.name}
                        fill
                        className="object-contain p-3 transition-all duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="material-symbols-outlined text-3xl text-secondary opacity-20">bolt</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-[#E3DAD0]">
                    <span className="font-heading text-[8px] uppercase tracking-[0.14em] text-primary-container block mb-1">
                      {p.category.name}
                    </span>
                    <p className="font-display font-bold text-sm text-on-surface uppercase leading-tight line-clamp-2">
                      {p.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
