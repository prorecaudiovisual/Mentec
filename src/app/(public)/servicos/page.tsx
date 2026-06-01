export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços | Mentec",
  description: "Conheça os serviços de engenharia elétrica oferecidos pela Mentec.",
};

export default async function ServicosPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <main>
      {/* Hero */}
      <section className="bg-[#111827] pt-20 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-primary-container mb-4">
            O que fazemos
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl">
            Soluções completas em equipamentos elétricos
          </h1>
          <p className="mt-4 text-white/60 text-lg max-w-xl leading-relaxed">
            Da consultoria técnica à entrega, a Mentec oferece serviços especializados para
            cada etapa do seu projeto elétrico.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-6 bg-[#FDFAF5]">
        <div className="max-w-[1280px] mx-auto">
          {services.length === 0 ? (
            <div className="text-center py-24 text-[#4A4540]">
              <span className="material-symbols-outlined text-5xl text-[#C4B9AC] mb-4 block">
                engineering
              </span>
              <p className="text-lg">Nenhum serviço disponível no momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="group bg-white border border-[#E3DAD0] rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {service.imageUrl ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-[#111827] flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-6xl text-primary-container"
                        style={{ fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48" }}
                      >
                        {service.icon}
                      </span>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="material-symbols-outlined text-2xl text-primary-container"
                        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
                      >
                        {service.icon}
                      </span>
                      <h2 className="font-heading font-bold text-[#111827] text-lg leading-tight">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-[#4A4540] text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#111827]">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
              Precisa de um orçamento?
            </h2>
            <p className="text-white/60 mt-1">
              Nossa equipe técnica está pronta para atendê-lo.
            </p>
          </div>
          <Link
            href="/contato"
            className="shrink-0 bg-primary-container text-white font-heading text-[11px] uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#A8501A] transition-colors"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </section>
    </main>
  );
}
