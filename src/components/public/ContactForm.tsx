"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    type: "GENERAL" as "GENERAL" | "QUOTATION" | "POST_SALES",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-green-700 font-semibold text-lg">Mensagem enviada!</p>
        <p className="text-green-600 text-sm mt-2">
          Entraremos em contato em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="label">Tipo de contato</label>
        <select
          className="input"
          value={form.type}
          onChange={(e) => set("type", e.target.value)}
        >
          <option value="GENERAL">Geral</option>
          <option value="QUOTATION">Solicitar Orçamento</option>
          <option value="POST_SALES">Pós-venda / Suporte</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Nome *</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="label">Email *</label>
          <input
            type="email"
            className="input"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Telefone</label>
          <input
            className="input"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
        </div>
        <div>
          <label className="label">Empresa</label>
          <input
            className="input"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="label">Assunto *</label>
        <input
          className="input"
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label">Mensagem *</label>
        <textarea
          className="input min-h-[120px] resize-y"
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          required
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">
          Erro ao enviar. Tente novamente.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "Enviando..." : "Enviar Mensagem"}
      </button>
    </form>
  );
}
