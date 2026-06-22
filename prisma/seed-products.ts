import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Garantir categorias necessárias
  const extraCategories = [
    { name: "Transformadores a Seco", slug: "transformadores-a-seco" },
    { name: "Transformadores a Óleo", slug: "transformadores-a-oleo" },
    { name: "Disjuntores", slug: "disjuntores" },
  ];

  for (const cat of extraCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
  }

  const catSeco = await prisma.category.findUniqueOrThrow({ where: { slug: "transformadores-a-seco" } });
  const catOleo = await prisma.category.findUniqueOrThrow({ where: { slug: "transformadores-a-oleo" } });
  const catDisj = await prisma.category.findUniqueOrThrow({ where: { slug: "disjuntores" } });

  const products = [
    {
      name: "Transformador a Seco",
      slug: "transformador-a-seco",
      categoryId: catSeco.id,
      featured: true,
      description:
        "Transformador a seco com isolação em resina epóxi, indicado para ambientes internos com circulação de pessoas. Disponível de 45 a 3.500 kVA, com alta confiabilidade e baixa necessidade de manutenção. Atende às normas ABNT, IEC, ANSI e IEEE.",
      applications: [
        "Indústrias",
        "Edifícios comerciais",
        "Hospitais",
        "Shopping centers",
        "Data centers",
        "Aeroportos",
        "Universidades",
        "Condomínios",
        "Subestações internas",
        "Ambientes com circulação de pessoas",
      ],
      specs: {
        "Potência Nominal": "45 a 3.500 kVA",
        "Tensão Primária": "13.800 / 13.200 / 12.600 / 12.000 / 11.400 / 10.800 / 10.200 V",
        "Tensão Secundária": "220/127 V, 380/220 V e 440/254 V",
        "Frequência de Operação": "60 Hz",
        "Elevação de Temperatura do Enrolamento": "100 °C",
        "Meio Isolante": "Resina Epóxi",
        "Grau de Proteção": "IP-00 / IP-21 e IP-54",
        "Norma Principal de Fabricação": "ABNT NBR 5356",
        "Normas Atendidas": "ABNT, IEC, ANSI e IEEE",
        Fabricante: "MENTECTRAFO",
      },
    },
    {
      name: "Transformador a Óleo",
      slug: "transformador-a-oleo",
      categoryId: catOleo.id,
      featured: true,
      description:
        "Transformador imerso em óleo mineral isolante, projetado para redes de distribuição, instalações industriais e comerciais. Disponível de 15 a 2.500 kVA, com conexão flangeada ou sem flanges. Fabricado conforme ABNT NBR 5356.",
      applications: [
        "Redes de distribuição",
        "Instalações industriais",
        "Instalações comerciais",
        "Concessionárias de energia",
      ],
      specs: {
        "Potência Nominal": "15 a 2.500 kVA",
        "Classe de Tensão Primária":
          "13.800 V, com derivações para 13.200 V, 12.600 V, 12.000 V, 11.400 V, 10.800 V e 10.200 V",
        "Tensão Secundária": "220/127 V, 380/220 V ou 440/254 V",
        "Frequência Nominal": "60 Hz",
        "Tipo de Conexão": "Flangeado ou Sem Flanges",
        "Elevação de Temperatura dos Enrolamentos": "55 °C ou 65 °C",
        "Meio Isolante": "Óleo Mineral Isolante",
        "Normas Aplicáveis": "NBR-5356",
        Fabricante: "Mentec Transformadores",
      },
    },
    {
      name: "Disjuntor de Média Tensão – Beghim MAF 15",
      slug: "disjuntor-media-tensao-beghim-maf15",
      categoryId: catDisj.id,
      featured: false,
      description:
        "Disjuntor de média tensão Beghim MAF 15, série 3510, com corrente nominal de 630 A e tensão nominal de 17,5 kV. Capacidade de interrupção de 350 MVA e NBI de 95 kV. Fabricação nacional, compatível com relé de proteção REMP-100.",
      applications: [
        "Cabines primárias",
        "Subestações de média tensão",
        "Painéis de média tensão",
        "Proteção e manobra de circuitos",
      ],
      specs: {
        Fabricante: "Beghim Ind. e Com. S/A",
        "Tipo do Disjuntor": "MAF 15",
        "Número de Série": "3510",
        "Corrente Nominal": "630 A",
        "Tensão Nominal": "17,5 kV",
        "Frequência Principal": "50/60 Hz",
        "Capacidade de Interrupção Nominal": "350 MVA",
        "Nível Básico de Isolamento de Impulso (NBI)": "95 kV",
        "Relé de Abertura (Circuito Auxiliar)": "220 V / 60 Hz",
        "Relé de Fechamento (Circuito Auxiliar)": "220 V / 60 Hz",
        "Motoredutor (Circuito Auxiliar)": "220 V / 60 Hz",
        "Relé de Proteção (Associado)": "REMP-100",
        "Origem de Fabricação": "Indústria Brasileira",
      },
    },
    {
      name: "Disjuntor de Média Tensão – Schneider SF1",
      slug: "disjuntor-media-tensao-schneider-sf1",
      categoryId: catDisj.id,
      featured: false,
      description:
        "Disjuntor de média tensão Schneider Electric série SF1 com interrupção a gás SF6 (hexafluoreto de enxofre). Tensão nominal de 17,5 kV e corrente nominal de 630 A. Alta confiabilidade, segurança operacional, baixa manutenção e excelente desempenho na interrupção de correntes de curto-circuito.",
      applications: [
        "Cabines primárias",
        "Subestações",
        "Painéis de média tensão",
        "Proteção e manobra de circuitos de média tensão",
      ],
      specs: {
        Fabricante: "Schneider Electric",
        Série: "SF1",
        "Tensão Nominal": "17,5 kV",
        "Corrente Nominal": "630 A",
        Frequência: "50/60 Hz",
        "Meio de Interrupção": "Gás SF6 (Hexafluoreto de Enxofre)",
        "Capacidade de Interrupção": "16 kA, 20 kA ou 25 kA (conforme versão)",
        "Tipo de Montagem": "Fixa",
        Acionamento: "Manual ou Motorizado (conforme configuração)",
        "Classe de Isolamento": "Média Tensão",
        "Norma Aplicável": "IEC 62271-100",
        "Vida Útil Mecânica": "Alta durabilidade para operações frequentes",
      },
    },
    {
      name: "Disjuntor a Vácuo – WEG VBW",
      slug: "disjuntor-vacuo-weg-vbw",
      categoryId: catDisj.id,
      featured: false,
      description:
        "Disjuntor a vácuo WEG modelo VBW com corrente nominal de 630 A ou 1.250 A e tensão nominal de 17,5 kV. Capacidade de interrupção de curto-circuito de 25 kA. Estrutura robusta e compacta com tecnologia de isolação por ampola de cerâmica a vácuo, desenvolvido conforme IEC 62271-100.",
      applications: [
        "Subestações industriais",
        "Cabines primárias",
        "Proteção de circuitos de média tensão",
        "Manobra de alimentadores",
      ],
      specs: {
        Modelo: "VBW – Disjuntores a Vácuo",
        Fabricante: "WEG",
        "Corrente Nominal": "630 A e 1.250 A",
        "Tensão Nominal": "17,5 kV",
        "Capacidade de Interrupção de Curto-Circuito": "25 kA",
        "Distância entre Polos": "150 mm",
        Acessórios: "Completa linha de acessórios",
        Estrutura: "Robusta e compacta",
        "Tecnologia de Isolação": "Ampola de cerâmica isolada a vácuo",
        "Norma Aplicável": "IEC 62271-100",
      },
    },
    {
      name: "Disjuntor a Óleo – PVO Beghim",
      slug: "disjuntor-oleo-pvo-beghim",
      categoryId: catDisj.id,
      featured: false,
      description:
        "Disjuntor de Pouco Volume de Óleo (PVO) para tensão máxima de 17,5 kV, fabricado pela Beghim. Equipamento seminovo, totalmente revisado, recondicionado e testado para operação segura. Atende aos requisitos da norma NBR 14039, disponível nas versões manual ou motorizada.",
      applications: [
        "Subestações de média tensão",
        "Cabines primárias",
        "Proteção e manobra de circuitos",
        "Instalações industriais",
      ],
      specs: {
        "Tipo de Equipamento": "Disjuntor PVO (Pouco Volume de Óleo)",
        "Tensão Máxima de Operação": "17,5 kV",
        Frequência: "50/60 Hz",
        Fabricante: "Beghim",
        "Conformidade Técnica": "Atende aos requisitos da norma NBR 14039",
        Acionamento: "Disponível nas versões manual ou motorizada",
        Condição: "Equipamento seminovo, totalmente revisado e recondicionado",
        "Estado de Conservação": "Inspecionado e testado para operação segura",
      },
    },
  ];

  let created = 0;
  let skipped = 0;

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await prisma.product.update({ where: { slug: p.slug }, data: p });
      skipped++;
    } else {
      await prisma.product.create({ data: { ...p, imageUrls: [] } });
      created++;
    }
  }

  console.log(`\nProdutos inseridos: ${created} | Atualizados: ${skipped}`);
  products.forEach((p) => console.log(`  • ${p.name}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
