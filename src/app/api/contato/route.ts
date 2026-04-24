import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const contact = await prisma.contact.create({ data: parsed.data });
  return NextResponse.json({ ok: true, id: contact.id }, { status: 201 });
}

export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(contacts);
}

export async function PATCH(req: NextRequest) {
  const { id, read } = await req.json();
  const contact = await prisma.contact.update({
    where: { id },
    data: { read },
  });
  return NextResponse.json(contact);
}
