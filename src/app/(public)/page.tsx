export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function HomePage() {
  const [featuredProducts, recentPosts] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true, published: true },
      include: { category: true },
      take: 3,
    }),
    prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
            Transformadores de Alta Performance
            <br />
            <span className="text-brand-orange">para a Indústria Brasileira</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Soluções em transformadores elétricos monofásicos, trifásicos, especiais e ecológicos
            para atender a demanda da indústria com qualidade e confiabilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/produtos"
              className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ver Produtos
            </Link>
            <Link
              href="/contato"
              className="border border-white text-white hover:bg-white hover:text-navy-900 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Solicitar Orçamento
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-navy-900">
                Produtos em Destaque
              </h2>
              <Link
                href="/produtos"
                className="flex items-center gap-1 text-sm text-brand-orange hover:underline font-medium"
              >
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/produtos/${p.slug}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                >
                  <div className="h-48 bg-gray-100 relative">
                    {p.imageUrls[0] ? (
                      <Image
                        src={p.imageUrls[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300 text-sm">
                        Sem imagem
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-brand-orange font-semibold uppercase tracking-wide">
                      {p.category.name}
                    </span>
                    <h3 className="font-semibold text-navy-900 mt-1">{p.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Summary */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold text-navy-900 mb-4">
            Sobre a Mentec
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            A Mentec é especializada na fabricação e comercialização de transformadores
            elétricos de alta qualidade. Com décadas de experiência no setor, atendemos
            indústrias, distribuidoras de energia e o setor comercial em todo o Brasil.
          </p>
          <Link
            href="/sobre"
            className="inline-flex items-center gap-1 text-brand-orange hover:underline font-medium"
          >
            Saiba mais <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Blog Preview */}
      {recentPosts.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-navy-900">
                Últimas Notícias
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-1 text-sm text-brand-orange hover:underline font-medium"
              >
                Ver todas <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="h-40 bg-gray-100 relative">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("pt-BR")
                        : ""}
                    </p>
                    <h3 className="font-semibold text-navy-900">{post.title}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Contact */}
      <section className="bg-brand-orange py-14 px-4 text-white text-center">
        <h2 className="font-heading text-2xl font-bold mb-3">
          Precisa de um orçamento?
        </h2>
        <p className="text-orange-100 mb-6">
          Entre em contato com nossa equipe comercial.
        </p>
        <Link
          href="/contato"
          className="bg-white text-brand-orange hover:bg-orange-50 font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Falar com a equipe
        </Link>
      </section>
    </>
  );
}
