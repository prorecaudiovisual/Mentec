export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const metadata = { title: "Serviços" };

export default async function AdminServicosPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-navy-900">Serviços</h1>
        <Link
          href="/admin/servicos/novo"
          className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Novo Serviço
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Título</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Ordem</th>
              <th className="text-left px-4 py-3 font-medium text-gray-500">Publicado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400">
                  Nenhum serviço cadastrado.
                </td>
              </tr>
            )}
            {services.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-brand-orange">{s.icon}</span>
                  {s.title}
                </td>
                <td className="px-4 py-3 text-gray-500">{s.slug}</td>
                <td className="px-4 py-3 text-gray-500">{s.order}</td>
                <td className="px-4 py-3">
                  {s.published ? (
                    <span className="text-green-600 font-semibold">Sim</span>
                  ) : (
                    <span className="text-gray-400">Não</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/servicos/${s.id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <DeleteButton id={s.id} endpoint="/api/servicos" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
