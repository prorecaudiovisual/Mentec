"use client";

import { useState } from "react";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({
  value,
  onChange,
  maxFiles = 5,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    setError(null);
    const urls: string[] = [];

    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();

        if (!res.ok || !data.url) {
          setError(data.error ?? "Erro ao fazer upload. Verifique a configuração do Supabase.");
          break;
        }

        urls.push(data.url);
      } catch {
        setError("Falha na conexão ao fazer upload.");
        break;
      }
    }

    if (urls.length > 0) {
      onChange([...value, ...urls].slice(0, maxFiles));
    }
    setUploading(false);
    // reset input so the same file can be re-selected after an error
    e.target.value = "";
  }

  function remove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {value.map((url) => (
          <div key={url} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => remove(url)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        ))}

        {value.length < maxFiles && (
          <label className={`w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
            uploading
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-400 hover:border-brand-orange hover:text-brand-orange"
          }`}>
            <Upload size={20} />
            <span className="text-xs mt-1">
              {uploading ? "Enviando..." : "Adicionar"}
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFiles}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ⚠ {error}
        </p>
      )}

      <p className="text-xs text-gray-400">Máximo {maxFiles} imagens.</p>
    </div>
  );
}
