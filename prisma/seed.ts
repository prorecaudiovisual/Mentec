import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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

  const categories = [
    { name: "Monofásico", slug: "monofasico" },
    { name: "Trifásico", slug: "trifasico" },
    { name: "Especiais", slug: "especiais" },
    { name: "Ecológicos", slug: "ecologicos" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log("Seed concluído.");
  console.log(`Admin criado: ${admin.email} / senha: admin123`);
  console.log("IMPORTANTE: troque a senha após o primeiro login!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
