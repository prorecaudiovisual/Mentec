import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const imageMap: Record<string, string> = {
  "laudo-nr10": "/images/services/laudo-nr10.svg",
  "laudo-spda": "/images/services/laudo-spda.svg",
  "termografia": "/images/services/termografia.svg",
  "analise-de-energia": "/images/services/analise-de-energia.svg",
  "projetos-eletricos": "/images/services/projetos-eletricos.svg",
  "manutencao-cabines-primarias": "/images/services/manutencao-cabines-primarias.svg",
  "manutencao-preditiva": "/images/services/manutencao-preditiva.svg",
  "manutencao-cabines-secundarias": "/images/services/manutencao-cabines-secundarias.svg",
  "manutencao-subestacoes": "/images/services/manutencao-subestacoes.svg",
  "locacao-venda-transformadores-seco": "/images/services/locacao-venda-transformadores-seco.svg",
  "locacao-venda-transformadores-oleo": "/images/services/locacao-venda-transformadores-oleo.svg",
  "montagem-paineis-eletricos": "/images/services/montagem-paineis-eletricos.svg",
  "montagem-locacao-cabines-primarias": "/images/services/montagem-locacao-cabines-primarias.svg",
  "reparo-disjuntores-media-tensao": "/images/services/reparo-disjuntores-media-tensao.svg",
};

async function main() {
  let updated = 0;
  for (const [slug, imageUrl] of Object.entries(imageMap)) {
    const result = await prisma.service.updateMany({
      where: { slug },
      data: { imageUrl },
    });
    if (result.count > 0) {
      console.log(`  ✓ ${slug}`);
      updated++;
    } else {
      console.log(`  ✗ não encontrado: ${slug}`);
    }
  }
  console.log(`\nImagens atualizadas: ${updated}/${Object.keys(imageMap).length}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
