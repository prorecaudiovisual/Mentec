import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getSupabaseAdmin, BUCKET } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY === "COLE_AQUI_A_SERVICE_ROLE_KEY") {
    return NextResponse.json(
      { error: "SUPABASE_SERVICE_KEY não configurada. Adicione a service_role key no .env.local." },
      { status: 500 }
    );
  }

  const supabase = getSupabaseAdmin();

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (error) {
    console.error("[upload] Supabase error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return NextResponse.json({ url: data.publicUrl });
}
