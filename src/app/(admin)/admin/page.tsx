export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { Package, BookOpen, Mail } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import Link from "next/link";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const [totalProducts, totalPosts, unreadContacts, recentContacts] =
    await Promise.all([
      prisma.product.count(),
      prisma.post.count(),
      prisma.contact.count({ where: { read: false } }),
      prisma.contact.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-navy-900">
          Dashboard
        </h1>
        <div className="flex gap-3">
          <Link
            href="/admin/produtos/novo"
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Novo Produto
          </Link>
          <Link
            href="/admin/blog/novo"
            className="border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            + Novo Post
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Produtos cadastrados"
          value={totalProducts}
          icon={<Package size={20} />}
          color="bg-blue-600"
        />
        <StatCard
          label="Posts publicados"
          value={totalPosts}
          icon={<BookOpen size={20} />}
          color="bg-green-600"
        />
        <StatCard
          label="Mensagens não lidas"
          value={unreadContacts}
          icon={<Mail size={20} />}
          color="bg-brand-orange"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h2 className="font-semibold text-navy-900 mb-4">
          Últimas mensagens de contato
        </h2>
        {recentContacts.length === 0 ? (
          <p className="text-gray-400 text-sm">Nenhuma mensagem recebida.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                <th className="pb-2 font-medium">Nome</th>
                <th className="pb-2 font-medium">Email</th>
                <th className="pb-2 font-medium">Tipo</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentContacts.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5">{c.name}</td>
                  <td className="py-2.5 text-gray-600">{c.email}</td>
                  <td className="py-2.5 text-gray-600">
                    {c.type === "QUOTATION"
                      ? "Orçamento"
                      : c.type === "POST_SALES"
                      ? "Pós-venda"
                      : "Geral"}
                  </td>
                  <td className="py-2.5">
                    {c.read ? (
                      <span className="text-gray-400">Lido</span>
                    ) : (
                      <span className="text-brand-orange font-semibold">
                        Novo
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link
          href="/admin/contatos"
          className="inline-block mt-4 text-sm text-brand-orange hover:underline"
        >
          Ver todas as mensagens →
        </Link>
      </div>
    </div>
  );
}
