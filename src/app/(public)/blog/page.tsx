export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grain bg-grid relative h-[400px] flex items-end bg-inverse-surface overflow-hidden">
        <div
          className="absolute left-8 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(200,98,30,0.3) 40%, rgba(200,98,30,0.3) 80%, transparent)" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-[1280px] mx-auto w-full px-8 pb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-5 h-px bg-primary-container" />
            <span className="font-heading text-[9px] uppercase tracking-[0.22em] text-primary-container">
              Artigos &amp; Notícias
            </span>
          </div>
          <h1
            className="font-display font-bold text-white uppercase leading-[0.9]"
            style={{ fontSize: "clamp(60px, 7vw, 96px)" }}
          >
            Blog &amp; Notícias
          </h1>
        </div>
      </section>

      {/* ── POSTS GRID ────────────────────────────────────── */}
      <section className="max-w-[1280px] mx-auto px-8 py-20">
        {posts.length === 0 ? (
          <div className="text-center py-28 text-secondary">
            <span
              className="material-symbols-outlined block mb-5 opacity-20"
              style={{ fontSize: "64px" }}
            >
              article
            </span>
            <p className="font-heading text-[10px] uppercase tracking-[0.2em]">
              Nenhum post publicado ainda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group bg-surface-container-lowest border border-[#E3DAD0] overflow-hidden hover:border-primary-container/40 hover:shadow-sm transition-all duration-300 relative ${
                  i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="h-52 relative overflow-hidden bg-surface-container">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-[#111827] grain">
                      <span className="material-symbols-outlined text-4xl text-white/10">article</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <p className="font-heading text-[8px] uppercase tracking-[0.2em] text-primary-container mb-3">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : ""}
                  </p>
                  <h2 className="font-display font-bold text-2xl uppercase text-on-surface mb-3 leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-secondary text-sm line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 mt-5 font-heading text-[9px] uppercase tracking-[0.16em] text-primary-container group-hover:gap-2.5 transition-all">
                    Ler artigo
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-container scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
