"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { slugify } from "@/lib/slugify";

const ICON_OPTIONS = [
  { value: "build", label: "Construção / Montagem" },
  { value: "engineering", label: "Engenharia" },
  { value: "electric_bolt", label: "Energia Elétrica" },
  { value: "settings", label: "Manutenção" },
  { value: "verified", label: "Qualidade / Certificação" },
  { value: "handshake", label: "Consultoria" },
  { value: "safety_check", label: "Inspeção / Segurança" },
  { value: "support_agent", label: "Suporte Técnico" },
  { value: "local_shipping", label: "Entrega / Logística" },
  { value: "tune", label: "Calibração / Ajuste" },
];

interface ServiceFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    imageUrl: string | null;
    published: boolean;
    order: number;
  };
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle]           = useState(initialData?.title ?? "");
  const [slug, setSlug]             = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [icon, setIcon]             = useState(initialData?.icon ?? "build");
  const [imageUrl, setImageUrl]     = useState<string[]>(
    initialData?.imageUrl ? [initialData.imageUrl] : []
  );
  const [published, setPublished]   = useState(initialData?.published ?? true);
  const [order, setOrder]           = useState(initialData?.order ?? 0);
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    if (!isEdit) setSlug(slugify(title));
  }, [title, isEdit]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const body = {
      title, slug, description, icon,
      imageUrl: imageUrl[0] ?? "",
      published, order,
    };

    const url    = isEdit ? `/api/servicos/${initialData!.id}` : "/api/servicos";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (!res.ok) {
      setError("Erro ao salvar serviço. Verifique os campos.");
    } else {
      router.push("/admin/servicos");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Título</label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Slug</label>
          <input
            className="input"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="label">Descrição</label>
        <textarea
          className="input min-h-[120px] resize-y"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label mb-2 block">Ícone</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ICON_OPTIONS.map((opt) => {
            const selected = icon === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer select-none transition-all ${
                  selected
                    ? "border-brand-orange bg-orange-50 text-brand-orange"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="icon"
                  value={opt.value}
                  checked={selected}
                  onChange={() => setIcon(opt.value)}
                  className="sr-only"
                />
                <span className="material-symbols-outlined text-xl flex-shrink-0">
                  {opt.value}
                </span>
                <span className="text-sm font-medium leading-tight">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label className="label mb-2 block">Imagem (opcional)</label>
        <ImageUpload value={imageUrl} onChange={setImageUrl} maxFiles={1} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Ordem de exibição</label>
          <input
            type="number"
            className="input"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            min={0}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4 accent-brand-orange"
        />
        <span className="text-sm text-gray-700">Publicado</span>
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {saving ? "Salvando..." : isEdit ? "Salvar Alterações" : "Criar Serviço"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-2.5 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
