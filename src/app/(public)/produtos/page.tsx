export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Produtos" };

function getSubtitle(specs: unknown, description: string): string {
  const s = specs as Record<string, string> | null;
  if (s) {
    const v = s.potencia ?? s.potência ?? s.kva ?? s.capacidade ?? s.range ?? "";
    if (v) return v;
  }
  const first = description.split(/[.;]/)[0].trim();
  return first.length > 48 ? first.slice(0, 46) + "…" : first;
}

export default async function ProdutosPage() {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({
      where: { published: true },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
  ]);

  const grouped = categories
    .map((cat) => ({
      ...cat,
      small: products.filter((p) => p.categoryId === cat.id && !p.featured),
      large: products.filter((p) => p.categoryId === cat.id && p.featured),
    }))
    .filter((g) => g.small.length + g.large.length > 0);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grain bg-grid relative h-[480px] flex items-end bg-inverse-surface overflow-hidden">
        <div
          className="absolute left-8 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(200,98,30,0.3) 40%, rgba(200,98,30,0.3) 80%, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full pb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-primary-container" />
            <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container">
              Catálogo Técnico
            </span>
          </div>
          <h1
            className="font-display font-bold text-white uppercase leading-[0.9] max-w-2xl"
            style={{ fontSize: "clamp(60px, 7vw, 96px)" }}
          >
            Nossos Produtos
          </h1>
        </div>
      </section>

      {/* ── CATALOG ───────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-8 py-16 space-y-16">
        {grouped.length === 0 ? (
          <div className="text-center py-28 text-secondary">
            <span className="material-symbols-outlined block mb-5 opacity-20" style={{ fontSize: "64px" }}>inventory_2</span>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]">Nenhum produto encontrado.</p>
          </div>
        ) : (
          grouped.map((group) => (
            <div key={group.id}>
              {/* Category header */}
              <div className="flex items-center gap-4 mb-5">
                <span className="font-display font-bold text-base text-on-surface uppercase tracking-[0.1em]">
                  {group.name}
                </span>
                <div className="flex-1 h-px bg-[#E3DAD0]" />
              </div>

              {/* Product grid */}
              <div className={
                group.large.length > 0
                  ? "grid grid-cols-1 lg:grid-cols-3 gap-3"
                  : ""
              }>
                {/* ── Small cards (non-featured) ── */}
                {group.small.length > 0 && (
                  <div className={`${group.large.length > 0 ? "lg:col-span-2" : ""} grid grid-cols-2 md:grid-cols-4 gap-3`}>
                    {group.small.map((p) => (
                      <Link
                        key={p.id}
                        href={`/produtos/${p.slug}`}
                        className="group bg-[#111827] grain flex flex-col items-center text-center p-4 hover:ring-1 hover:ring-primary-container/30 transition-all duration-200"
                      >
                        <div className="w-full h-24 relative mb-3 flex-shrink-0">
                          {p.imageUrls[0] ? (
                            <Image
                              src={p.imageUrls[0]}
                              alt={p.name}
                              fill
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-white/15" style={{ fontSize: "44px" }}>bolt</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-display font-bold text-sm text-white uppercase leading-tight mb-1">
                          {p.name}
                        </h3>
                        <p className="font-heading text-[9px] text-white/40 tracking-wide leading-snug">
                          {getSubtitle(p.specs, p.description)}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}

                {/* ── Large cards (featured) ── */}
                {group.large.length > 0 && (
                  <div className="lg:col-span-1 flex flex-col gap-3">
                    {group.large.map((p) => (
                      <Link
                        key={p.id}
                        href={`/produtos/${p.slug}`}
                        className="group relative flex-1 overflow-hidden min-h-[160px] bg-[#111827] grain"
                      >
                        {p.imageUrls[0] && (
                          <Image
                            src={p.imageUrls[0]}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5">
                          <h3 className="font-display font-bold text-2xl text-white uppercase leading-tight mb-0.5">
                            {p.name}
                          </h3>
                          <p className="font-heading text-[9px] text-white/50 tracking-wide">
                            {getSubtitle(p.specs, p.description)}
                          </p>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-8 pb-section-gap">
        <div className="grain bg-[#111827] p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <h2 className="font-display font-bold text-5xl lg:text-6xl text-white uppercase mb-4 leading-none">
                Pronto para Equipar<br />sua Instalação?
              </h2>
              <p className="text-[#C8BFB5] text-body-lg max-w-lg leading-relaxed">
                Nossa equipe de engenharia está pronta para consultar sobre seus requisitos
                específicos e fornecer uma cotação técnica detalhada.
              </p>
            </div>
            <Link
              href="/contato"
              className="bg-primary-container text-white px-10 py-5 font-heading text-[10px] uppercase tracking-[0.16em] hover:bg-[#A8501A] transition-all whitespace-nowrap flex-shrink-0"
            >
              Contatar Engenharia
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
