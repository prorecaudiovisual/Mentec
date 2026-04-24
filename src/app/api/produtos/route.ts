import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria");
  const featured = searchParams.get("featured");

  const where = {
    published: true,
    ...(categoria ? { category: { slug: categoria } } : {}),
    ...(featured === "true" ? { featured: true } : {}),
  };

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { specs, ...rest } = parsed.data;
  const product = await prisma.product.create({
    data: { ...rest, specs: specs ?? {} },
    include: { category: true },
  });

  return NextResponse.json(product, { status: 201 });
}
