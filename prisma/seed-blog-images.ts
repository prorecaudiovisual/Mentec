import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMAGES: Record<string, string> = {
  "transformadores-monofasicos-vs-trifasicos": "/blog/monofasicos-vs-trifasicos.svg",
  "eficiencia-energetica-transformadores": "/blog/eficiencia-energetica.svg",
  "transformadores-secos-seguranca-aplicacoes": "/blog/transformadores-secos.svg",
  "manutencao-preventiva-transformadores-guia": "/blog/manutencao-preventiva.svg",
  "transformadores-energia-solar-fotovoltaica": "/blog/energia-solar.svg",
  "como-dimensionar-transformador-distribuicao": "/blog/dimensionamento.svg",
  "transformadores-subterraneos-distribuicao-urbana": "/blog/subterraneos.svg",
  "normas-abnt-transformadores-comprador": "/blog/normas-abnt.svg",
  "transformadores-de-forca-alta-tensao-transmissao": "/blog/transformadores-forca.svg",
  "protecao-transformadores-reles-fusiveis-alarme": "/blog/protecao-transformadores.svg",
};

async function main() {
  for (const [slug, coverImage] of Object.entries(IMAGES)) {
    await prisma.post.update({
      where: { slug },
      data: { coverImage },
    });
    console.log(`✓ Imagem adicionada: ${slug}`);
  }
  console.log("\nConcluído!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
