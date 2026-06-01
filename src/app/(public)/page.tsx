export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import EspecificadorInterativo from "@/components/public/EspecificadorInterativo";
import HeroDecoration from "@/components/public/HeroDecoration";

export default async function HomePage() {
  const [featuredProducts] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true, published: true },
      include: { category: true },
      take: 3,
    }),
  ]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grain bg-grid relative min-h-[94vh] flex flex-col justify-center bg-inverse-surface overflow-hidden">
        {/* Vertical accent line */}
        <div
          className="absolute left-8 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(200,98,30,0.35) 30%, rgba(200,98,30,0.35) 70%, transparent)" }}
          aria-hidden="true"
        />
        {/* Right panel divider */}
        <div className="absolute right-0 top-0 bottom-0 w-[42%] border-l border-white/5 pointer-events-none hidden xl:block" aria-hidden="true" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <div
              className="anim-slide-right flex items-center gap-3 mb-10"
              style={{ animationDelay: "0.05s" }}
            >
              <span className="w-5 h-px bg-primary-container" />
              <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container">
                Mentec Equipamentos Elétricos · Desde 1995
              </span>
            </div>

            <h1
              className="anim-fade-up font-display font-bold text-white uppercase leading-[0.9] mb-8"
              style={{ fontSize: "clamp(72px, 8vw, 112px)", animationDelay: "0.15s" }}
            >
              Potência<br />
              <span className="text-primary-container">Que Move</span><br />
              a Indústria
            </h1>

            <p
              className="anim-fade-up text-body-lg text-secondary-fixed mb-10 max-w-[420px] leading-relaxed"
              style={{ animationDelay: "0.3s" }}
            >
              Soluções monofásicas, trifásicas, especiais e ecológicas para
              os setores mais exigentes do Brasil.
            </p>

            <div
              className="anim-fade-up flex flex-wrap gap-4"
              style={{ animationDelay: "0.42s" }}
            >
              <Link
                href="/contato"
                className="bg-primary-container text-white px-8 py-4 font-heading text-[10px] uppercase tracking-[0.16em] hover:bg-[#A8501A] transition-all flex items-center gap-2 active:scale-95"
              >
                Solicitar Orçamento
                <span className="material-symbols-outlined text-base">bolt</span>
              </Link>
              <Link
                href="/produtos"
                className="border border-white/20 text-white px-8 py-4 font-heading text-[10px] uppercase tracking-[0.16em] hover:bg-white/5 hover:border-white/40 transition-all"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>

          {/* Right: geometric decoration */}
          <HeroDecoration />
        </div>

        {/* Stats strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/8">
          <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-3 divide-x divide-white/8">
            {[
              { value: "30+",  label: "Anos de Mercado" },
              { value: "5k+",  label: "Ativos Mantidos" },
              { value: "15+",  label: "Estados Atendidos" },
            ].map((s) => (
              <div key={s.label} className="py-5 px-6 first:pl-0">
                <span className="font-display font-bold text-3xl text-primary-container leading-none block">
                  {s.value}
                </span>
                <span className="font-heading text-[8px] uppercase tracking-[0.16em] text-white/35 mt-1 block">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVIÇOS ──────────────────────────────────────── */}
      <section className="py-section-gap px-8 max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-12 gap-6 pb-8 border-b border-[#E3DAD0]">
          <div>
            <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary block mb-3">
              Especialidades
            </span>
            <h2 className="font-display font-bold text-5xl lg:text-6xl text-on-surface uppercase leading-none">
              Serviços de Campo
            </h2>
          </div>
          <Link
            href="/contato"
            className="hidden md:flex items-center gap-2 font-heading text-[9px] uppercase tracking-[0.16em] text-primary-container hover:text-[#A8501A] transition-colors group shrink-0"
          >
            Solicitar visita
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Feature card */}
          <div className="md:col-span-7 grain group bg-[#111827] p-10 flex flex-col justify-between hover:ring-1 hover:ring-primary-container/30 transition-all duration-300 min-h-[300px] relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-70 pointer-events-none" aria-hidden="true" />
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-primary-container mb-6 block">engineering</span>
              <h3 className="font-display font-bold text-4xl text-white uppercase mb-4 leading-tight">
                Manutenção Preditiva
              </h3>
              <p className="text-[#C8BFB5] text-sm leading-relaxed max-w-sm">
                Análise termográfica, testes de isolação e diagnósticos precisos
                para eliminar paradas não programadas em seus ativos críticos.
              </p>
            </div>
            <Link
              href="/contato"
              className="relative z-10 mt-8 self-start font-heading text-[9px] uppercase tracking-[0.16em] text-primary-container flex items-center gap-2 hover:gap-3 transition-all"
            >
              Solicitar Visita
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          {/* Smaller cards */}
          <div className="md:col-span-5 flex flex-col gap-4">
            {[
              {
                icon: "oil_barrel",
                title: "Tratamento de Óleo",
                desc: "Termovácuo, regeneração e análise físico-química de óleos minerais isolantes.",
              },
              {
                icon: "settings_suggest",
                title: "Reformas",
                desc: "Modernização completa de transformadores para novos padrões de eficiência.",
              },
              {
                icon: "construction",
                title: "Montagem",
                desc: "Instalação e comissionamento de subestações e grandes equipamentos industriais.",
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group bg-surface-container-low border border-[#E3DAD0] p-6 hover:border-primary-container/40 hover:shadow-sm transition-all duration-200 flex gap-5 items-start flex-1"
              >
                <span className="material-symbols-outlined text-2xl text-primary-container flex-shrink-0 mt-0.5">
                  {s.icon}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl uppercase text-on-surface mb-1.5 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="bg-[#111827] grain py-section-gap overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6 pb-8 border-b border-white/8">
              <div>
                <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container block mb-3">
                  Equipamentos
                </span>
                <h2 className="font-display font-bold text-5xl lg:text-6xl text-white uppercase leading-none">
                  Produtos em Destaque
                </h2>
              </div>
              <Link
                href="/produtos"
                className="text-[#C8BFB5] font-heading text-[9px] uppercase tracking-[0.16em] flex items-center gap-2 hover:text-primary-container transition-colors group shrink-0"
              >
                Ver todos os produtos
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.slug}`}
                  className="group relative bg-[#1A2535] border border-white/6 overflow-hidden hover:border-primary-container/35 transition-all duration-300"
                >
                  <div className="h-60 overflow-hidden relative bg-[#0D1520]">
                    {p.imageUrls[0] ? (
                      <Image
                        src={p.imageUrls[0]}
                        alt={p.name}
                        fill
                        className="object-contain p-5 group-hover:scale-105 transition-all duration-700"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="material-symbols-outlined text-5xl text-white/8">bolt</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary-container/90 text-white text-[8px] px-2 py-1 font-heading uppercase tracking-wider">
                        {p.category.name}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 border-t border-white/6">
                    <h3 className="font-display font-bold text-2xl text-white uppercase mb-2 leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] mb-5 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                    <span className="font-heading text-[9px] uppercase tracking-[0.16em] text-primary-container flex items-center gap-1.5">
                      Ver especificações
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SOBRE ─────────────────────────────────────────── */}
      <section className="py-section-gap overflow-hidden bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: copy */}
          <div className="relative">
            <div
              className="absolute -top-4 -left-4 font-display font-bold text-on-surface/5 leading-none select-none pointer-events-none"
              style={{ fontSize: "180px" }}
            >
              95
            </div>
            <span className="relative font-heading text-[9px] uppercase tracking-[0.22em] text-primary block mb-4">
              Nossa História
            </span>
            <h2 className="relative font-display font-bold text-5xl lg:text-7xl text-on-surface uppercase mb-8 leading-[0.9]">
              Décadas de<br />
              <span className="text-primary-container">Autoridade</span><br />
              Técnica
            </h2>
            <p className="text-body-lg text-secondary mb-10 leading-relaxed max-w-[400px]">
              A Mentec nasceu com a missão de elevar os padrões de segurança e eficiência
              energética no Brasil, consolidando parcerias com as maiores plantas industriais.
            </p>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 font-heading text-[9px] uppercase tracking-[0.16em] text-primary-container hover:text-[#A8501A] transition-colors group"
            >
              Conhecer a empresa
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Right: stat grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "30+",  label: "Anos de Mercado",    desc: "Desde 1995 servindo a indústria" },
              { value: "5k+",  label: "Ativos Mantidos",    desc: "Transformadores em operação" },
              { value: "15+",  label: "Estados Atendidos",   desc: "Presença em todo o território nacional" },
              { value: "100%", label: "Comprometimento",    desc: "Com excelência e ética" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border border-[#E3DAD0] p-8 hover:border-primary-container/40 hover:shadow-sm transition-all duration-200"
              >
                <div className="font-display font-bold text-5xl text-primary-container mb-2 leading-none">
                  {s.value}
                </div>
                <div className="font-heading text-[9px] uppercase tracking-[0.14em] text-on-surface mb-2">
                  {s.label}
                </div>
                <p className="text-xs text-secondary leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESPECIFICADOR INTERATIVO ─────────────────────── */}
      <EspecificadorInterativo />

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-primary-container relative overflow-hidden py-24 px-8">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-55deg, transparent, transparent 32px, rgba(0,0,0,0.3) 32px, rgba(0,0,0,0.3) 33px)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <h2 className="font-display font-bold text-5xl lg:text-7xl text-white uppercase mb-4 leading-none">
              Infraestrutura em<br />Mãos Seguras
            </h2>
            <p className="text-white/75 text-body-lg max-w-md">
              Agende uma consultoria técnica com nossos engenheiros especialistas.
            </p>
          </div>
          <Link
            href="/contato"
            className="bg-[#111827] text-white px-10 py-5 font-heading text-[10px] uppercase tracking-[0.16em] hover:bg-black transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-2"
          >
            Falar com Engenharia
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>
    </>
  );
}
