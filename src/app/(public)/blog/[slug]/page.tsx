export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  return { title: post?.title ?? "Post" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <article className="max-w-[1280px] mx-auto px-8 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 mb-14">
        <Link
          href="/blog"
          className="font-heading text-[9px] uppercase tracking-[0.16em] text-secondary hover:text-primary-container transition-colors flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Blog
        </Link>
        <span className="text-[#D5CCB9] font-heading text-[9px]">/</span>
        <span className="font-heading text-[9px] uppercase tracking-[0.14em] text-on-surface truncate max-w-xs">
          {post.title}
        </span>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Cover image */}
        {post.coverImage && (
          <div className="relative h-64 sm:h-[420px] overflow-hidden mb-12 border border-[#E3DAD0]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-6 h-px bg-primary-container" />
          <p className="font-heading text-[9px] uppercase tracking-[0.2em] text-primary-container">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-5xl uppercase text-on-surface mb-10 leading-none">
          {post.title}
        </h1>

        {/* Divider */}
        <div className="w-12 h-[3px] bg-primary-container mb-10" />

        {/* Content */}
        <div
          className="prose prose-gray max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-a:text-primary-container prose-a:no-underline hover:prose-a:underline prose-strong:text-on-surface prose-img:border prose-img:border-[#E3DAD0]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-[#E3DAD0]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-heading text-[9px] uppercase tracking-[0.16em] text-secondary hover:text-primary-container transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Voltar para o Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
