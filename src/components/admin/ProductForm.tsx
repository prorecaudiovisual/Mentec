"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import { slugify } from "@/lib/slugify";
import { APLICACOES } from "@/lib/aplicacoes";
import { Plus, Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    specs: Record<string, string>;
    imageUrls: string[];
    applications: string[];
    categoryId: string;
    featured: boolean;
    published: boolean;
  };
  categories: Category[];
}

export default function ProductForm({ initialData, categories }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [name, setName]             = useState(initialData?.name ?? "");
  const [slug, setSlug]             = useState(initialData?.slug ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId ?? categories[0]?.id ?? "");
  const [imageUrls, setImageUrls]   = useState<string[]>(initialData?.imageUrls ?? []);
  const [applications, setApplications] = useState<string[]>(initialData?.applications ?? []);
  const [featured, setFeatured]     = useState(initialData?.featured ?? false);
  const [published, setPublished]   = useState(initialData?.published ?? true);
  const [specs, setSpecs]           = useState<{ key: string; value: string }[]>(
    Object.entries(initialData?.specs ?? {}).map(([key, value]) => ({ key, value }))
  );
  const [saving, setSaving]         = useState(false);
  const [error, setError]           = useState("");

  useEffect(() => {
    if (!isEdit) setSlug(slugify(name));
  }, [name, isEdit]);

  function addSpec() {
    setSpecs([...specs, { key: "", value: "" }]);
  }

  function updateSpec(idx: number, field: "key" | "value", val: string) {
    setSpecs(specs.map((s, i) => (i === idx ? { ...s, [field]: val } : s)));
  }

  function removeSpec(idx: number) {
    setSpecs(specs.filter((_, i) => i !== idx));
  }

  function toggleApplication(label: string) {
    setApplications((prev) =>
      prev.includes(label) ? prev.filter((a) => a !== label) : [...prev, label]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const specsObj = Object.fromEntries(
      specs.filter((s) => s.key.trim()).map((s) => [s.key.trim(), s.value.trim()])
    );

    const body = {
      name, slug, description, categoryId,
      imageUrls, applications, featured, published,
      specs: specsObj,
    };
    const url    = isEdit ? `/api/produtos/${initialData!.id}` : "/api/produtos";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setSaving(false);

    if (!res.ok) {
      setError("Erro ao salvar produto. Verifique os campos.");
    } else {
      router.push("/admin/produtos");
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Nome</label>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <label className="label">Categoria</label>
        <select
          className="input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="label">Descrição</label>
        <textarea
          className="input min-h-[100px] resize-y"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* ── Aplicações ── */}
      <div>
        <label className="label mb-3 block">
          Aplicações
          <span className="ml-2 text-gray-400 font-normal text-xs normal-case">
            ({applications.length} selecionada{applications.length !== 1 ? "s" : ""})
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {APLICACOES.map(({ icon, label }) => {
            const checked = applications.includes(label);
            return (
              <label
                key={label}
                className={`flex items-center gap-3 px-4 py-3 border rounded-lg cursor-pointer select-none transition-all ${
                  checked
                    ? "border-brand-orange bg-orange-50 text-brand-orange"
                    : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleApplication(label)}
                />
                <span
                  className="material-symbols-outlined text-xl flex-shrink-0"
                  style={{
                    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                  }}
                >
                  {icon}
                </span>
                <span className="text-sm font-medium leading-tight">{label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Especificações ── */}
      <div>
        <label className="label mb-2 block">Especificações Técnicas</label>
        <div className="space-y-2">
          {specs.map((s, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className="input flex-1"
                placeholder="Parâmetro (ex: Potência)"
                value={s.key}
                onChange={(e) => updateSpec(i, "key", e.target.value)}
              />
              <input
                className="input flex-1"
                placeholder="Valor (ex: 10 kVA)"
                value={s.value}
                onChange={(e) => updateSpec(i, "value", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                className="text-red-400 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpec}
            className="flex items-center gap-1 text-sm text-brand-orange hover:underline"
          >
            <Plus size={14} />
            Adicionar especificação
          </button>
        </div>
      </div>

      {/* ── Imagens ── */}
      <div>
        <label className="label mb-2 block">Imagens</label>
        <ImageUpload value={imageUrls} onChange={setImageUrls} />
      </div>

      {/* ── Flags ── */}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 accent-brand-orange"
          />
          <span className="text-sm text-gray-700">Produto em destaque</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 accent-brand-orange"
          />
          <span className="text-sm text-gray-700">Publicado</span>
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-60"
        >
          {saving ? "Salvando..." : isEdit ? "Salvar Alterações" : "Criar Produto"}
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
