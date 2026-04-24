"use client";

import { useState, useEffect } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

const typeLabel: Record<string, string> = {
  GENERAL: "Geral",
  QUOTATION: "Orçamento",
  POST_SALES: "Pós-venda",
};

export default function ContatosPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/contato")
      .then((r) => r.json())
      .then(setContacts);
  }, []);

  async function toggleRead(c: Contact) {
    await fetch("/api/contato", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, read: !c.read }),
    });
    setContacts((prev) =>
      prev.map((x) => (x.id === c.id ? { ...x, read: !c.read } : x))
    );
  }

  const filtered =
    filter === "ALL" ? contacts : contacts.filter((c) => c.type === filter);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Mensagens de Contato
      </h1>

      <div className="flex gap-2 mb-4">
        {["ALL", "GENERAL", "QUOTATION", "POST_SALES"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors font-medium ${
              filter === t
                ? "bg-navy-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {t === "ALL" ? "Todos" : typeLabel[t]}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Nome</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Email</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Tipo</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Data</th>
              <th className="px-4 py-3 font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  Nenhuma mensagem.
                </td>
              </tr>
            )}
            {filtered.map((c) => (
              <>
                <tr
                  key={c.id}
                  className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <td className={`px-4 py-3 ${!c.read ? "font-semibold" : ""}`}>
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.email}</td>
                  <td className="px-4 py-3 text-gray-600">{typeLabel[c.type]}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRead(c);
                      }}
                      className={`text-xs px-2 py-1 rounded-full font-medium transition-colors ${
                        c.read
                          ? "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          : "bg-brand-orange text-white hover:bg-brand-orange-hover"
                      }`}
                    >
                      {c.read ? "Lido" : "Novo"}
                    </button>
                  </td>
                </tr>
                {expanded === c.id && (
                  <tr key={`${c.id}-detail`} className="bg-gray-50">
                    <td colSpan={5} className="px-4 py-4 text-gray-700 text-sm border-b border-gray-100">
                      <p className="font-semibold mb-1">Assunto: {c.subject}</p>
                      {c.company && <p className="text-gray-500 mb-1">Empresa: {c.company}</p>}
                      {c.phone && <p className="text-gray-500 mb-1">Telefone: {c.phone}</p>}
                      <p className="whitespace-pre-wrap mt-2">{c.message}</p>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
