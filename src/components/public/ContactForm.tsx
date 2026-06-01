"use client";

import { useState } from "react";

const inputClass =
  "w-full border border-[#D5CCB9] bg-white focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container/30 px-4 py-3.5 text-sm text-on-surface placeholder:text-secondary/50 transition-all";

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
      <div className="bg-surface-container-low border border-[#D5CCB9] p-12 text-center">
        <span className="material-symbols-outlined text-primary-container mb-4 block" style={{ fontSize: "48px" }}>
          check_circle
        </span>
        <p className="font-display font-bold text-2xl uppercase text-on-surface mb-2">Mensagem Enviada!</p>
        <p className="text-secondary text-sm">Entraremos em contato em breve.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
            Nome Completo
          </label>
          <input
            className={inputClass}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Gerente de Engenharia"
            required
          />
        </div>
        <div>
          <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
            Empresa
          </label>
          <input
            className={inputClass}
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Empresa Industrial Ltda."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
            Telefone
          </label>
          <input
            className={inputClass}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+55 (11) 0000-0000"
            type="tel"
          />
        </div>
        <div>
          <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
            E-mail *
          </label>
          <input
            type="email"
            className={inputClass}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="contato@empresa.com.br"
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
          Tipo de Solicitação
        </label>
        <select
          className={inputClass}
          value={form.type}
          onChange={(e) => set("type", e.target.value)}
        >
          <option value="GENERAL">Informações Gerais</option>
          <option value="QUOTATION">Solicitar Orçamento</option>
          <option value="POST_SALES">Pós-venda / Suporte</option>
        </select>
      </div>

      <div>
        <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
          Assunto *
        </label>
        <input
          className={inputClass}
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          placeholder="Descrição resumida da necessidade"
          required
        />
      </div>

      <div>
        <label className="block font-heading text-[9px] uppercase tracking-[0.16em] text-secondary mb-2">
          Mensagem *
        </label>
        <textarea
          className={`${inputClass} min-h-[160px] resize-y`}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Descreva seus requisitos técnicos ou necessidades de serviço..."
          required
        />
      </div>

      {status === "error" && (
        <p className="text-error text-sm font-heading uppercase tracking-wider">
          Erro ao enviar. Tente novamente.
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full md:w-auto bg-primary-container text-white px-12 py-4 font-heading text-[10px] uppercase tracking-[0.16em] hover:bg-[#A8501A] transition-colors flex items-center justify-center gap-3 active:scale-95 duration-150 disabled:opacity-60"
        >
          {status === "loading" ? "Enviando..." : "Enviar Solicitação"}
          {status !== "loading" && (
            <span className="material-symbols-outlined text-base">send</span>
          )}
        </button>
      </div>
    </form>
  );
}
