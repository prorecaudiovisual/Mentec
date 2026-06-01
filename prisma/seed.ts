import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Monofásicos",             slug: "monofasicos" },
  { name: "Monofásicos Ecológicos",  slug: "monofasicos-ecologicos" },
  { name: "Trifásicos",              slug: "trifasicos" },
  { name: "Trifásicos Ecológicos",   slug: "trifasicos-ecologicos" },
  { name: "Força",                   slug: "forca" },
  { name: "Força Ecológico",         slug: "forca-ecologico" },
  { name: "Secos",                   slug: "secos" },
  { name: "Média Força",             slug: "media-forca" },
  { name: "Subterrâneos",            slug: "subterraneos" },
  { name: "Pedestais",               slug: "pedestais" },
];

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@mentec.com.br" },
    update: {},
    create: {
      email: "admin@mentec.com.br",
      password: hashedPassword,
      name: "Administrador",
      role: "ADMIN",
    },
  });

  // Remove categorias antigas que não estão na nova lista e não têm produtos vinculados
  const newSlugs = CATEGORIES.map((c) => c.slug);
  await prisma.category.deleteMany({
    where: {
      slug: { notIn: newSlugs },
      products: { none: {} },
    },
  });

  // Upsert das 10 categorias
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
  }

  console.log("Seed concluído.");
  console.log(`Admin: ${admin.email} / senha: admin123`);
  console.log("IMPORTANTE: troque a senha após o primeiro login!");
  console.log("\nCategorias criadas:");
  CATEGORIES.forEach((c) => console.log(`  • ${c.name}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
