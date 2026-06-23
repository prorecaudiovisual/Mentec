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

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { slug, published: true },
      include: { category: true },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      where: { products: { some: { published: true } } },
      include: {
        products: {
          where: { published: true },
          select: { imageUrls: true, slug: true },
          take: 1,
        },
      },
    }),
  ]);

  if (!product) notFound();

  const specs = (product.specs as Record<string, string>) ?? {};

  // Título da seção de especificações conforme a categoria do produto.
  const categoriaLower = product.category.name.toLowerCase();
  const detalhesTitulo = categoriaLower.includes("disjuntor")
    ? "Detalhes do Disjuntor"
    : "Detalhes do Transformador";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedApplications: string[] = (product as any).applications ?? [];
  const filteredApplications = APLICACOES.filter((a) =>
    storedApplications.includes(a.label)
  );
  // Sempre exibir a seção de aplicações: usa as cadastradas ou, na ausência,
  // o conjunto padrão de aplicações do equipamento.
  const aplicacoes =
    filteredApplications.length > 0 ? filteredApplications : APLICACOES;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grain bg-grid bg-inverse-surface overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch">
          {/* Product image — preenche toda a lateral esquerda */}
          <div className="relative bg-white min-h-[340px] lg:min-h-[600px] flex items-center justify-center overflow-hidden lg:[clip-path:polygon(0_0,88%_0,100%_100%,0_100%)]">
            {product.imageUrls[0] ? (
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                fill
                className="object-contain p-6 lg:p-12"
                priority
              />
            ) : (
              <span className="material-symbols-outlined text-black/10" style={{ fontSize: "100px" }}>bolt</span>
            )}
          </div>

          {/* Product info */}
          <div className="relative z-10 flex flex-col justify-center px-8 lg:pl-12 lg:pr-16 py-14 lg:py-20 max-w-[640px]">
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
              className="font-display font-bold text-white mb-4 leading-[0.9]"
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
              <h2 className="font-display font-bold text-4xl text-white mb-10 leading-none">
                {detalhesTitulo}
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

            <div className="relative h-96 lg:h-[560px] flex items-center justify-center overflow-visible">
              {(product.imageUrls[1] ?? product.imageUrls[0]) ? (
                <Image
                  src={product.imageUrls[1] ?? product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <span className="material-symbols-outlined text-white/8" style={{ fontSize: "80px" }}>bolt</span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── APLICAÇÕES ────────────────────────────────────── */}
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

      {/* ── NOSSOS PRODUTOS ───────────────────────────────── */}
      {categories.length > 0 && (
        <section className="bg-[#F5F5F5] py-16">
          <div className="max-w-[1280px] mx-auto px-8">
            <h2 className="font-display font-bold text-3xl text-center text-on-surface mb-10">
              Nossos Produtos
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((cat) => {
                const img = cat.products[0]?.imageUrls?.[0] ?? null;
                const href = cat.products[0]
                  ? `/produtos/${cat.products[0].slug}`
                  : `/produtos?categoria=${cat.slug}`;
                return (
                  <Link
                    key={cat.id}
                    href={href}
                    className="group flex flex-col items-center bg-white rounded-xl border border-[#E0E0E0] p-4 hover:shadow-md hover:border-primary-container/40 transition-all duration-200"
                  >
                    <div className="relative w-full h-28 mb-3">
                      {img ? (
                        <Image
                          src={img}
                          alt={cat.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <span className="material-symbols-outlined text-4xl text-gray-300">bolt</span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-center text-gray-600 group-hover:text-primary-container transition-colors leading-tight">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
