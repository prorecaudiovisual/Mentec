import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const services = [
  // --- Laudos Elétricos ---
  {
    title: "Laudo NR10",
    slug: "laudo-nr10",
    description:
      "Inspeção e avaliação das instalações elétricas para garantir conformidade com a NR10, promovendo segurança para pessoas e equipamentos.",
    icon: "engineering",
    order: 1,
  },
  {
    title: "Laudo SPDA",
    slug: "laudo-spda",
    description:
      "Análise do Sistema de Proteção contra Descargas Atmosféricas, verificando a eficiência e conformidade da proteção contra raios.",
    icon: "bolt",
    order: 2,
  },
  {
    title: "Termografia",
    slug: "termografia",
    description:
      "Inspeção por imagem térmica para identificar aquecimentos anormais, prevenindo falhas, paradas e acidentes elétricos.",
    icon: "thermostat",
    order: 3,
  },
  {
    title: "Análise de Energia",
    slug: "analise-de-energia",
    description:
      "Monitoramento da qualidade da energia elétrica para detectar desperdícios, oscilações e oportunidades de redução de custos.",
    icon: "bar_chart",
    order: 4,
  },
  {
    title: "Projetos Elétricos",
    slug: "projetos-eletricos",
    description:
      "Criamos soluções elétricas personalizadas para indústrias, comércios e condomínios, desenvolvendo projetos seguros, eficientes e alinhados às normas técnicas vigentes.",
    icon: "design_services",
    order: 5,
  },
  // --- Manutenção ---
  {
    title: "Manutenção de Cabines Primárias",
    slug: "manutencao-cabines-primarias",
    description:
      "Serviços de inspeção, limpeza, testes e ajustes em cabines elétricas primárias para garantir segurança, desempenho e conformidade com as normas vigentes.",
    icon: "electrical_services",
    order: 6,
  },
  {
    title: "Manutenção Preditiva",
    slug: "manutencao-preditiva",
    description:
      "Monitoramento contínuo e inspeções técnicas para identificar falhas antes que elas ocorram, aumentando a confiabilidade dos equipamentos e reduzindo custos.",
    icon: "search_insights",
    order: 7,
  },
  {
    title: "Manutenção de Cabines Secundárias",
    slug: "manutencao-cabines-secundarias",
    description:
      "Serviços de inspeção, limpeza, testes e ajustes em cabines elétricas secundárias para garantir segurança, desempenho e conformidade com as normas vigentes.",
    icon: "power",
    order: 8,
  },
  {
    title: "Manutenção de Subestações",
    slug: "manutencao-subestacoes",
    description:
      "Manutenção preventiva e corretiva de subestações elétricas, assegurando a continuidade do fornecimento de energia e a operação segura dos sistemas.",
    icon: "factory",
    order: 9,
  },
  // --- Transformadores e Outros ---
  {
    title: "Locação e Venda de Transformadores a Seco",
    slug: "locacao-venda-transformadores-seco",
    description:
      "Locação, venda e manutenção de transformadores a seco (encapsulados em resina) — ideais para ambientes internos como shoppings, hospitais, edifícios comerciais e data centers. Ecologicamente corretos, sem fluidos inflamáveis e com baixíssima manutenção.",
    icon: "electric_bolt",
    order: 10,
  },
  {
    title: "Locação e Venda de Transformadores a Óleo",
    slug: "locacao-venda-transformadores-oleo",
    description:
      "Locação, venda e manutenção de transformadores a óleo — ideais para instalações externas, subestações de concessionárias e indústrias de grande porte, com excelente custo-benefício e alta resistência a intempéries.",
    icon: "oil_barrel",
    order: 11,
  },
  {
    title: "Montagem de Painéis Elétricos",
    slug: "montagem-paineis-eletricos",
    description:
      "Projeto, estruturação técnica, disposição de componentes (disjuntores, contatores e CLPs) e cabeamento estruturado para automação ou distribuição industrial.",
    icon: "dashboard",
    order: 12,
  },
  {
    title: "Montagem e Locação de Cabines Primárias",
    slug: "montagem-locacao-cabines-primarias",
    description:
      "Instalação e montagem de cabines primárias (subestações de média tensão), desde o cubículo de entrada, chaves seccionadoras e disjuntores de média tensão até a conexão segura com transformadores para recepção da energia da concessionária.",
    icon: "home_repair_service",
    order: 13,
  },
  {
    title: "Reparo de Disjuntores de Média Tensão",
    slug: "reparo-disjuntores-media-tensao",
    description:
      "Serviços especializados em disjuntores a vácuo ou gás SF6: testes de isolação, medição de resistência de contato, lubrificação, calibração e substituição de peças desgastadas para garantir a proteção correta das cabines e subestações.",
    icon: "build",
    order: 14,
  },
];

async function main() {
  let created = 0;
  let updated = 0;

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: { ...s, published: true },
    });

    const exists = await prisma.service.findUnique({ where: { slug: s.slug } });
    if (exists) updated++;
    else created++;
  }

  console.log(`\nServiços inseridos/atualizados: ${services.length}`);
  services.forEach((s) => console.log(`  • ${s.title}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
