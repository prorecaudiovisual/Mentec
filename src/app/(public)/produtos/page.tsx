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
      <section className="max-w-[1280px] mx-auto px-8 py-16">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2.5 mb-14 pb-8 border-b border-[#E3DAD0]">
          <Link
            href="/produtos"
            className={`font-heading text-[9px] uppercase tracking-[0.14em] px-4 py-2.5 transition-all duration-150 ${
              !categoria
                ? "bg-inverse-surface text-white"
                : "border border-[#D5CCB9] text-secondary hover:border-primary-container/40 hover:text-on-surface"
            }`}
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/produtos?categoria=${c.slug}`}
              className={`font-heading text-[9px] uppercase tracking-[0.14em] px-4 py-2.5 transition-all duration-150 ${
                categoria === c.slug
                  ? "bg-inverse-surface text-white"
                  : "border border-[#D5CCB9] text-secondary hover:border-primary-container/40 hover:text-on-surface"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-28 text-secondary">
            <span className="material-symbols-outlined block mb-5 opacity-20" style={{ fontSize: "64px" }}>inventory_2</span>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]">
              Nenhum produto encontrado.
            </p>
          </div>
        ) : products.length >= 3 ? (
          /* Bento grid */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Large feature card */}
            <Link
              href={`/produtos/${products[0].slug}`}
              className="md:col-span-8 group relative bg-surface-container-lowest border border-[#E3DAD0] overflow-hidden hover:border-primary-container/40 transition-all duration-300"
            >
              <div className="relative h-[400px] overflow-hidden">
                {products[0].imageUrls[0] ? (
                  <Image
                    src={products[0].imageUrls[0]}
                    alt={products[0].name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#111827] grain flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/10" style={{ fontSize: "80px" }}>bolt</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="bg-primary-container text-white px-3 py-1 font-heading text-[8px] uppercase tracking-wider mb-3 inline-block">
                    {products[0].category.name}
                  </span>
                  <h3 className="font-display font-bold text-4xl text-white uppercase leading-tight mb-2">
                    {products[0].name}
                  </h3>
                  <p className="text-[#C8BFB5] text-sm max-w-md line-clamp-2 leading-relaxed">
                    {products[0].description}
                  </p>
                </div>
              </div>
            </Link>

            {/* Secondary cards */}
            <div className="md:col-span-4 flex flex-col gap-5">
              {products.slice(1, 3).map((p) => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.slug}`}
                  className="group bg-surface-container-lowest border border-[#E3DAD0] overflow-hidden hover:border-primary-container/40 hover:shadow-sm transition-all duration-300 flex-1 relative"
                >
                  {p.imageUrls[0] && (
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={p.imageUrls[0]}
                        alt={p.name}
                        fill
                        className="object-cover transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="font-heading text-[8px] uppercase tracking-[0.16em] text-primary-container block mb-1.5">
                      {p.category.name}
                    </span>
                    <h4 className="font-display font-bold text-2xl text-on-surface uppercase mb-2 leading-tight">
                      {p.name}
                    </h4>
                    <p className="text-tertiary text-sm line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>

            {/* Remaining products */}
            {products.length > 3 && (
              <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-1">
                {products.slice(3).map((p) => (
                  <Link
                    key={p.id}
                    href={`/produtos/${p.slug}`}
                    className="group bg-surface-container-lowest border border-[#E3DAD0] overflow-hidden hover:border-primary-container/40 hover:shadow-sm transition-all duration-300 relative"
                  >
                    {p.imageUrls[0] && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={p.imageUrls[0]}
                          alt={p.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <span className="font-heading text-[8px] uppercase tracking-[0.16em] text-primary-container block mb-1.5">
                        {p.category.name}
                      </span>
                      <h4 className="font-display font-bold text-2xl text-on-surface uppercase mb-2 leading-tight">
                        {p.name}
                      </h4>
                      <p className="text-tertiary text-sm line-clamp-2 leading-relaxed">{p.description}</p>
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
        ) : (
          /* Simple grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/produtos/${p.slug}`}
                className="group bg-surface-container-lowest border border-[#E3DAD0] overflow-hidden hover:border-primary-container/40 hover:shadow-sm transition-all duration-300 relative"
              >
                <div className="h-52 relative overflow-hidden bg-surface-container">
                  {p.imageUrls[0] ? (
                    <Image
                      src={p.imageUrls[0]}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="material-symbols-outlined text-4xl text-secondary opacity-20">bolt</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="font-heading text-[8px] uppercase tracking-[0.16em] text-primary-container block mb-1.5">
                    {p.category.name}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-on-surface uppercase mb-2 leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-tertiary text-sm line-clamp-2 leading-relaxed">{p.description}</p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
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
