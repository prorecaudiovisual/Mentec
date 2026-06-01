"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── Data ─────────────────────────────────────────────── */

const ETAPAS = [
  {
    id: "aplicacao",
    titulo: "Qual é a aplicação principal?",
    subtitulo: "Selecione o setor onde o equipamento será instalado",
    cols: 3,
    opcoes: [
      { value: "rural",       icon: "electric_bolt",      label: "Eletrificação Rural" },
      { value: "iluminacao",  icon: "lightbulb",          label: "Iluminação Pública" },
      { value: "construcao",  icon: "construction",       label: "Construção Civil" },
      { value: "residencial", icon: "home",               label: "Residencial" },
      { value: "industrial",  icon: "factory",            label: "Uso Industrial" },
      { value: "comercial",   icon: "storefront",         label: "Comércio e Serviços" },
    ],
  },
  {
    id: "potencia",
    titulo: "Qual faixa de potência necessária?",
    subtitulo: "Estimativa de carga em kVA (quilovolt-ampère)",
    cols: 2,
    opcoes: [
      { value: "small",  icon: "power_input",           label: "Até 25 kVA",       detalhe: "Residencial / pequeno comércio" },
      { value: "medium", icon: "offline_bolt",          label: "25 — 150 kVA",     detalhe: "Comércio médio / condomínios" },
      { value: "large",  icon: "electrical_services",   label: "150 — 500 kVA",    detalhe: "Indústria leve / grandes edifícios" },
      { value: "xlarge", icon: "bolt",                  label: "500 kVA ou mais",  detalhe: "Indústria pesada / subestações" },
    ],
  },
  {
    id: "rede",
    titulo: "Qual é o tipo de alimentação?",
    subtitulo: "Configuração da rede elétrica de entrada",
    cols: 3,
    opcoes: [
      { value: "mono",     icon: "electric_meter",           label: "Monofásica",            detalhe: "127V / 220V" },
      { value: "tri",      icon: "rotate_90_degrees_ccw",    label: "Trifásica",             detalhe: "220V / 380V / 13,8kV" },
      { value: "especial", icon: "settings_suggest",         label: "Especial",              detalhe: "Ambiente agressivo / norma específica" },
    ],
  },
] as const;

type Aplicacao = typeof ETAPAS[0]["opcoes"][number]["value"];
type Potencia  = typeof ETAPAS[1]["opcoes"][number]["value"];
type Rede      = typeof ETAPAS[2]["opcoes"][number]["value"];
type Selecoes  = { aplicacao: Aplicacao | ""; potencia: Potencia | ""; rede: Rede | "" };

/* ── Recommendation engine ────────────────────────────── */

function getRecomendacao(s: Required<{ aplicacao: string; potencia: string; rede: string }>) {
  if (s.rede === "especial") {
    return {
      codigo: "TR-ESP",
      tipo: "Transformador Especial",
      nivel: "Projeto Customizado",
      cor: "text-amber-400",
      icone: "settings_suggest",
      desc: "Seu projeto exige uma solução projetada sob medida. Nossa engenharia desenvolve transformadores para ambientes agressivos, requisitos normativos específicos, blindagem eletromagnética ou geometrias não-padrão.",
      urgencia: "Recomendamos um briefing técnico com nossos engenheiros antes da especificação final.",
    };
  }
  if (s.aplicacao === "industrial" || s.potencia === "xlarge") {
    return {
      codigo: "TR-IND",
      tipo: "Transformador Trifásico Industrial",
      nivel: "Alta Potência — Linha Industrial",
      cor: "text-orange-400",
      icone: "factory",
      desc: "Para sua demanda, recomendamos nossa linha trifásica de alta potência, projetada para operação contínua em ambientes exigentes. Construção robusta com núcleo laminado de alta permeabilidade e bobinagem em cobre eletrolítico.",
      urgencia: "Grandes projetos industriais requerem análise de carga e estudo de curto-circuito.",
    };
  }
  if (s.potencia === "large") {
    return {
      codigo: "TR-DIS",
      tipo: "Transformador Trifásico de Distribuição",
      nivel: "Média-Alta Potência",
      cor: "text-orange-400",
      icone: "electrical_services",
      desc: "Nossa linha trifásica de distribuição é ideal para sua aplicação. Certificada pelas normas ABNT NBR 5356, opera com eficiência acima de 98,5% na faixa de carga nominal com baixo índice de perdas no núcleo.",
      urgencia: "Instalação requer laudo de aterramento e SPDA conforme NR-10.",
    };
  }
  if (s.aplicacao === "rural") {
    return {
      codigo: "TR-RUR",
      tipo: "Transformador de Distribuição Rural",
      nivel: "Linha Rural — ANEEL",
      cor: "text-green-400",
      icone: "electric_bolt",
      desc: "Linha certificada para redes rurais de distribuição, com gabinete em aço galvanizado, proteção IP65 contra intempéries e oxidação. Atende plenamente as resoluções ANEEL para eletrificação em campo aberto.",
      urgencia: "Verificar tensão de distribuição da concessionária local antes de especificar.",
    };
  }
  if (s.rede === "mono" || s.aplicacao === "residencial" || s.potencia === "small") {
    return {
      codigo: "TR-MON",
      tipo: "Transformador Monofásico",
      nivel: "Baixa-Média Potência",
      cor: "text-sky-400",
      icone: "home",
      desc: "Nossa linha monofásica combina alta eficiência energética com instalação simplificada e baixo custo de manutenção. Ideal para aplicações residenciais, comércio de pequeno porte e sistemas de iluminação de vias públicas.",
      urgencia: "Dimensionar de acordo com a demanda real de pico — recomendamos folga de 20%.",
    };
  }
  return {
    codigo: "TR-COM",
    tipo: "Transformador Comercial de Distribuição",
    nivel: "Uso Geral Comercial",
    cor: "text-violet-400",
    icone: "storefront",
    desc: "Com base no perfil informado, nossa linha comercial de distribuição é a solução mais adequada — eficiente, certificada e com suporte técnico especializado em todo o ciclo de vida do equipamento.",
    urgencia: "Consulte nossa equipe para análise do sistema de proteção (fusíveis / relés).",
  };
}

/* ── Component ────────────────────────────────────────── */

export default function EspecificadorInterativo() {
  const [etapa, setEtapa]       = useState(0);
  const [selecoes, setSelecoes] = useState<Selecoes>({ aplicacao: "", potencia: "", rede: "" });
  const [resultado, setResultado] = useState(false);
  const [visivel, setVisivel]   = useState(true);
  const [typed, setTyped]       = useState("");
  const panelRef                = useRef<HTMLDivElement>(null);

  const campos: (keyof Selecoes)[] = ["aplicacao", "potencia", "rede"];

  /* Typing animation for the "terminal header" */
  const terminalText = "> SISTEMA DE ESPECIFICAÇÃO TÉCNICA v2.1_";
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(terminalText.slice(0, i));
      if (i >= terminalText.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, []);

  function handleOpcao(valor: string) {
    const campo = campos[etapa];
    const novas = { ...selecoes, [campo]: valor } as Selecoes;
    setSelecoes(novas);

    // Fade out → advance
    setVisivel(false);
    setTimeout(() => {
      if (etapa < 2) {
        setEtapa(etapa + 1);
      } else {
        setResultado(true);
      }
      setVisivel(true);
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 220);
  }

  function handleVoltar() {
    setVisivel(false);
    setTimeout(() => {
      if (resultado) {
        setResultado(false);
        setEtapa(2);
      } else {
        setEtapa(etapa - 1);
      }
      setVisivel(true);
    }, 220);
  }

  function handleReiniciar() {
    setVisivel(false);
    setTimeout(() => {
      setEtapa(0);
      setSelecoes({ aplicacao: "", potencia: "", rede: "" });
      setResultado(false);
      setVisivel(true);
    }, 220);
  }

  const etapaAtual = ETAPAS[etapa];
  const rec = resultado
    ? getRecomendacao({
        aplicacao: selecoes.aplicacao,
        potencia:  selecoes.potencia,
        rede:      selecoes.rede,
      })
    : null;

  return (
    <section className="bg-[#0B1420] grain py-section-gap overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-12">
          <div>
            <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container block mb-3">
              Especificador Técnico
            </span>
            <h2 className="font-display font-bold text-5xl lg:text-6xl text-white uppercase leading-none">
              Encontre o<br />
              <span className="text-primary-container">Transformador</span><br />
              Certo
            </h2>
          </div>
          <p className="text-[#9CA3AF] leading-relaxed max-w-md lg:text-right">
            Responda três perguntas e nosso sistema identifica o equipamento
            mais adequado para o seu projeto. Sem cadastro, sem espera.
          </p>
        </div>

        {/* ── Console panel ── */}
        <div
          ref={panelRef}
          className="border border-white/8 bg-[#111827] overflow-hidden"
          style={{ boxShadow: "0 0 60px rgba(200,98,30,0.04), inset 0 1px 0 rgba(255,255,255,0.04)" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-white/6 bg-[#0D1520]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
            </div>
            <span className="font-heading text-[9px] text-white/30 tracking-[0.2em] uppercase flex-1 text-center">
              {typed}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Step progress bar */}
          {!resultado && (
            <div className="flex border-b border-white/6">
              {ETAPAS.map((e, i) => (
                <div
                  key={e.id}
                  className={`flex-1 h-[3px] transition-all duration-500 ${
                    i < etapa
                      ? "bg-primary-container"
                      : i === etapa
                      ? "bg-primary-container/50"
                      : "bg-white/5"
                  }`}
                />
              ))}
            </div>
          )}

          {/* ── Content area ── */}
          <div
            className="p-8 lg:p-12 transition-all duration-200"
            style={{ opacity: visivel ? 1 : 0, transform: visivel ? "none" : "translateY(8px)" }}
          >
            {!resultado ? (
              /* Step UI */
              <>
                {/* Step indicator */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="font-heading text-[8px] uppercase tracking-[0.2em] text-white/25">
                    Etapa {etapa + 1} / {ETAPAS.length}
                  </div>
                  <div className="flex gap-2 ml-1">
                    {ETAPAS.map((_, i) => (
                      <div
                        key={i}
                        className={`h-px transition-all duration-300 ${
                          i <= etapa ? "w-6 bg-primary-container" : "w-3 bg-white/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-display font-bold text-3xl lg:text-4xl text-white uppercase leading-tight mb-2">
                  {etapaAtual.titulo}
                </h3>
                <p className="font-heading text-[9px] uppercase tracking-[0.16em] text-white/35 mb-10">
                  {etapaAtual.subtitulo}
                </p>

                {/* Options */}
                <div
                  className={`grid gap-3 ${
                    etapaAtual.cols === 2
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-2 sm:grid-cols-3"
                  }`}
                >
                  {etapaAtual.opcoes.map((op) => {
                    const campo   = campos[etapa];
                    const selecionado = selecoes[campo] === op.value;
                    return (
                      <button
                        key={op.value}
                        type="button"
                        onClick={() => handleOpcao(op.value)}
                        className={`group text-left flex items-start gap-4 p-5 border transition-all duration-150 active:scale-[0.98] ${
                          selecionado
                            ? "border-primary-container bg-primary-container/10 ring-1 ring-primary-container/30"
                            : "border-white/8 bg-[#1A2535] hover:border-primary-container/35 hover:bg-[#1E2D44]"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-2xl flex-shrink-0 mt-0.5 transition-colors ${
                            selecionado ? "text-primary-container" : "text-white/35 group-hover:text-white/60"
                          }`}
                        >
                          {op.icon}
                        </span>
                        <div className="min-w-0">
                          <span
                            className={`font-display font-bold text-lg uppercase leading-tight block transition-colors ${
                              selecionado ? "text-white" : "text-white/70 group-hover:text-white"
                            }`}
                          >
                            {op.label}
                          </span>
                          {"detalhe" in op && (
                            <span className="font-heading text-[8px] uppercase tracking-[0.12em] text-white/25 mt-1 block">
                              {op.detalhe}
                            </span>
                          )}
                        </div>
                        {selecionado && (
                          <span className="material-symbols-outlined text-base text-primary-container ml-auto flex-shrink-0 mt-1">
                            check_circle
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Back */}
                {etapa > 0 && (
                  <button
                    type="button"
                    onClick={handleVoltar}
                    className="mt-8 flex items-center gap-2 font-heading text-[9px] uppercase tracking-[0.16em] text-white/30 hover:text-white/60 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Etapa anterior
                  </button>
                )}
              </>
            ) : (
              /* Result UI */
              rec && (
                <>
                  {/* Selections recap */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {[
                      { label: ETAPAS[0].opcoes.find((o) => o.value === selecoes.aplicacao)?.label },
                      { label: ETAPAS[1].opcoes.find((o) => o.value === selecoes.potencia)?.label },
                      { label: ETAPAS[2].opcoes.find((o) => o.value === selecoes.rede)?.label },
                    ].map(({ label }, i) =>
                      label ? (
                        <span
                          key={i}
                          className="font-heading text-[8px] uppercase tracking-[0.14em] px-3 py-1.5 border border-white/8 text-white/40"
                        >
                          {label}
                        </span>
                      ) : null
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left: recommendation */}
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <span
                          className={`material-symbols-outlined text-3xl ${rec.cor}`}
                        >
                          {rec.icone}
                        </span>
                        <div>
                          <p className="font-heading text-[8px] uppercase tracking-[0.2em] text-white/30">
                            Recomendação Técnica
                          </p>
                          <p className={`font-heading text-[9px] uppercase tracking-[0.14em] ${rec.cor} mt-0.5`}>
                            {rec.nivel}
                          </p>
                        </div>
                      </div>

                      <div className="border-l-2 border-primary-container/40 pl-5 mb-6">
                        <h3 className="font-display font-bold text-3xl lg:text-4xl text-white uppercase leading-tight mb-2">
                          {rec.tipo}
                        </h3>
                        <p className="font-heading text-[8px] uppercase tracking-[0.16em] text-white/25">
                          {rec.codigo}
                        </p>
                      </div>

                      <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">
                        {rec.desc}
                      </p>

                      {/* Technical note */}
                      <div className="flex gap-3 p-4 bg-amber-500/5 border border-amber-500/15">
                        <span className="material-symbols-outlined text-base text-amber-500/60 flex-shrink-0 mt-0.5">
                          info
                        </span>
                        <p className="font-heading text-[8px] uppercase tracking-[0.1em] text-amber-500/50 leading-relaxed">
                          {rec.urgencia}
                        </p>
                      </div>
                    </div>

                    {/* Right: CTAs */}
                    <div className="flex flex-col gap-4">
                      <div className="bg-[#0D1520] border border-white/6 p-7">
                        <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-primary-container mb-3">
                          Próximo Passo
                        </p>
                        <p className="text-white text-sm leading-relaxed mb-6">
                          Compartilhe seus requisitos com nossa equipe. Elaboramos
                          uma proposta técnica completa com especificações, prazo e custo.
                        </p>
                        <Link
                          href="/contato"
                          className="block w-full bg-primary-container text-white text-center font-heading text-[10px] uppercase tracking-[0.16em] px-6 py-4 hover:bg-[#A8501A] transition-colors"
                        >
                          Solicitar Proposta Técnica
                        </Link>
                      </div>

                      <Link
                        href="/produtos"
                        className="flex items-center justify-between border border-white/8 px-7 py-5 text-white/60 hover:text-white hover:border-white/20 transition-all group"
                      >
                        <span className="font-heading text-[9px] uppercase tracking-[0.16em]">
                          Ver catálogo de produtos
                        </span>
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </Link>

                      <button
                        type="button"
                        onClick={handleReiniciar}
                        className="flex items-center gap-2 font-heading text-[9px] uppercase tracking-[0.16em] text-white/25 hover:text-white/50 transition-colors mt-2 self-start"
                      >
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Refazer especificação
                      </button>
                    </div>
                  </div>

                  {/* Back */}
                  <button
                    type="button"
                    onClick={handleVoltar}
                    className="mt-8 flex items-center gap-2 font-heading text-[9px] uppercase tracking-[0.16em] text-white/25 hover:text-white/50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Alterar última resposta
                  </button>
                </>
              )
            )}
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-5 font-heading text-[8px] uppercase tracking-[0.16em] text-white/15 text-center">
          Especificação orientativa · Consulte sempre um engenheiro habilitado para validação técnica final
        </p>
      </div>
    </section>
  );
}
