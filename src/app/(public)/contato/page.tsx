import type { Metadata } from "next";
import ContactForm from "@/components/public/ContactForm";

export const metadata: Metadata = { title: "Contato" };

export default function ContatoPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grain bg-grid relative h-[360px] flex items-end bg-inverse-surface overflow-hidden">
        <div
          className="absolute left-8 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(200,98,30,0.3) 40%, rgba(200,98,30,0.3) 80%, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full pb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-primary-container" />
            <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container">
              Fale Conosco
            </span>
          </div>
          <h1
            className="font-display font-bold text-white uppercase leading-[0.9] max-w-2xl"
            style={{ fontSize: "clamp(52px, 6vw, 80px)" }}
          >
            Entre em Contato com Nossa Equipe
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Info column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Emergency card */}
            <div className="bg-[#111827] grain p-8 border-l-4 border-primary-container relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-4">
                  <span className="material-symbols-outlined text-primary-container" style={{ fontSize: "18px" }}>emergency</span>
                  <span className="font-heading text-[8px] uppercase tracking-[0.2em] text-[#9CA3AF]">
                    Atendimento Emergencial
                  </span>
                </div>
                <h3 className="font-display font-bold text-2xl text-white uppercase mb-3">Suporte 24/7</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">
                  Para falhas críticas em transformadores ou emergências em subestações,
                  entre em contato com nossa unidade de resposta rápida.
                </p>
                <a
                  href="tel:+551140000000"
                  className="font-display font-bold text-2xl text-primary-container hover:underline underline-offset-4 decoration-primary-container/40"
                >
                  +55 (11) 4000-0000
                </a>
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-5">
              {[
                {
                  icon: "location_on",
                  label: "Endereço",
                  text: "Av. Industrial, 4500\nSão Paulo, SP — Brasil",
                },
                {
                  icon: "mail",
                  label: "E-mail",
                  text: "contato@mentec.com.br",
                },
                {
                  icon: "call",
                  label: "Telefone",
                  text: "+55 (11) 4000-0000",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="w-10 h-10 bg-surface-container border border-[#E3DAD0] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-container" style={{ fontSize: "18px" }}>
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-heading text-[8px] uppercase tracking-[0.16em] text-secondary mb-1">
                      {item.label}
                    </p>
                    <p className="text-on-surface text-sm whitespace-pre-line leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <div className="p-7 border border-[#E3DAD0] bg-surface-container-lowest">
              <p className="font-heading text-[8px] uppercase tracking-[0.2em] text-secondary mb-5 pb-3 border-b border-[#E3DAD0]">
                Horário de Atendimento
              </p>
              <ul className="space-y-2.5">
                {[
                  { day: "Seg — Sex", hours: "08:00 — 18:00" },
                  { day: "Sábado",    hours: "09:00 — 13:00" },
                  { day: "Domingo",   hours: "Fechado" },
                ].map(({ day, hours }) => (
                  <li key={day} className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">{day}</span>
                    <span className="font-heading text-[9px] uppercase tracking-[0.1em] text-secondary">{hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-lowest border border-[#E3DAD0] p-10">
              <div className="mb-8">
                <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary block mb-2">
                  Formulário de Contato
                </span>
                <h2 className="font-display font-bold text-4xl text-on-surface uppercase leading-none">
                  Envie sua Solicitação
                </h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
