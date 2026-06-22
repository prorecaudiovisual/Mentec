import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.post.count();
  console.log("Posts no banco:", count);
  const posts = await prisma.post.findMany({ select: { slug: true, coverImage: true } });
  posts.forEach(p => console.log(p.slug, "|", p.coverImage));
}
main().catch(console.error).finally(() => prisma.$disconnect());
