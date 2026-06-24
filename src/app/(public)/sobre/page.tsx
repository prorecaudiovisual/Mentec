import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história e os valores da Mentec Transformadores.",
};

export default function SobrePage() {
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
              Sobre a Mentec
            </span>
          </div>
          <h1
            className="font-display font-bold text-white uppercase leading-[0.9] max-w-3xl"
            style={{ fontSize: "clamp(34px, 8vw, 96px)" }}
          >
            Engenharia de Precisão Desde o Primeiro Dia
          </h1>
        </div>
      </section>

      {/* ── HISTÓRIA ──────────────────────────────────────── */}
      <section className="py-section-gap max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-6">
            <span className="inline-block px-3 py-1 bg-surface-container border border-[#E3DAD0] font-heading text-[9px] uppercase tracking-[0.2em] text-secondary mb-8">
              Perfil Corporativo
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-on-surface mb-8 uppercase leading-none">
              Um Legado de{" "}
              <span className="text-primary-container">Excelência Técnica</span>
            </h2>
            <p className="text-body-lg text-secondary mb-8 leading-relaxed">
              A Mentec Transformadores é uma empresa brasileira especializada na fabricação
              e comercialização de transformadores elétricos de alta performance, atendendo
              indústrias, distribuidoras de energia e o setor comercial em todo o Brasil.
            </p>
            <div className="space-y-5 border-l-2 border-[#E3DAD0] pl-6">
              <p className="text-on-surface-variant leading-relaxed">
                Nossas instalações são projetadas para o rigoroso teste e montagem de
                transformadores de alta performance. O que começou como uma unidade de
                serviço especializado evoluiu para um hub de engenharia completo.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                Prezamos por uma cultura de rigor técnico, onde cada componente é analisado
                quanto à durabilidade e desempenho sob condições extremas de carga.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            {/* Image placeholder with location info */}
            <div className="bg-[#111827] grain relative overflow-hidden aspect-[4/3] flex items-center justify-center mb-4">
              <div className="absolute inset-0 bg-grid" aria-hidden="true" />
              <span className="material-symbols-outlined text-7xl text-white/10 relative z-10">factory</span>
            </div>
            <div className="flex items-center gap-3 text-secondary">
              <div className="w-8 h-8 flex items-center justify-center bg-primary-container/10 border border-primary-container/20">
                <span className="material-symbols-outlined text-primary-container" style={{ fontSize: "18px" }}>location_on</span>
              </div>
              <span className="font-heading text-[9px] uppercase tracking-[0.16em]">
                Vila Granada — São Paulo, SP
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSÃO / VISÃO / VALORES ───────────────────────── */}
      <section className="bg-[#111827] grain py-section-gap">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container block mb-3">
              Nosso Núcleo
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-6xl uppercase text-white leading-none">
              Missão &amp; Filosofia
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "bolt",
                title: "Missão",
                text: "Fornecer transformadores elétricos de excelência, garantindo segurança, eficiência e durabilidade, contribuindo para o desenvolvimento da infraestrutura elétrica nacional.",
              },
              {
                icon: "visibility",
                title: "Visão",
                text: "Ser reconhecida como a principal autoridade em tecnologia de transformadores, liderando a transição para redes elétricas mais inteligentes e resilientes no Brasil.",
              },
              {
                icon: "verified",
                title: "Valores",
                text: "Integridade inabalável, excelência técnica e segurança em primeiro lugar. Acreditamos em engenharia que resiste ao teste do tempo e das cargas extremas.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#1A2535] border border-white/6 p-10 flex flex-col gap-5 hover:border-primary-container/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-container/10 border border-primary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary-container" style={{ fontSize: "22px" }}>
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl uppercase text-white">{item.title}</h3>
                <div className="h-px w-8 bg-primary-container" />
                <p className="text-[#9CA3AF] leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICAÇÕES ─────────────────────────────────── */}
      <section className="py-section-gap max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 lg:sticky lg:top-24">
            <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary block mb-3">
              Normas
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase text-on-surface mb-6 leading-none">
              Conformidade &amp; Padrões
            </h2>
            <p className="text-secondary leading-relaxed text-sm max-w-xs">
              Nossas operações seguem rigorosamente os padrões internacionais de qualidade
              e as regulamentações de segurança locais.
            </p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "shield",                   label: "ISO 9001:2015", desc: "Sistemas de Gestão da Qualidade" },
              { icon: "precision_manufacturing",  label: "NBR 5356",      desc: "Transformadores de Potência" },
              { icon: "engineering",              label: "NR-10 e NR-12", desc: "Segurança em Instalações Elétricas" },
              { icon: "eco",                      label: "ISO 14001",     desc: "Gestão Ambiental" },
            ].map((cert) => (
              <div
                key={cert.label}
                className="flex items-center gap-6 p-8 border border-[#E3DAD0] bg-surface-container-lowest group hover:border-primary-container/40 hover:shadow-sm transition-all duration-200"
              >
                <div className="text-primary-container group-hover:scale-110 transition-transform duration-200">
                  <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>{cert.icon}</span>
                </div>
                <div>
                  <span className="font-display font-bold text-xl text-on-surface uppercase block">{cert.label}</span>
                  <p className="font-heading text-[9px] uppercase tracking-[0.12em] text-secondary mt-1">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-8 pb-section-gap">
        <div className="grain bg-[#111827] text-white p-12 lg:p-20 flex flex-col lg:flex-row justify-between items-center gap-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
          <div className="text-center lg:text-left relative z-10">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-6xl uppercase mb-5 leading-none">
              Parceria com<br />Excelência Técnica
            </h2>
            <p className="text-[#C8BFB5] text-body-lg max-w-md leading-relaxed">
              Discuta seus requisitos específicos de energia com nossa equipe sênior de engenharia.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto shrink-0">
            <Link
              href="/contato"
              className="bg-primary-container text-white font-heading text-[10px] uppercase tracking-[0.16em] px-10 py-5 hover:bg-[#A8501A] transition-all text-center"
            >
              Falar com Vendas
            </Link>
            <Link
              href="/produtos"
              className="border border-white/20 text-white font-heading text-[10px] uppercase tracking-[0.16em] px-10 py-5 hover:bg-white/5 hover:border-white/40 transition-all text-center"
            >
              Ver Produtos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
