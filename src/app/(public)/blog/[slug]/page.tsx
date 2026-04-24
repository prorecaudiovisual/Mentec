export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

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
    <article className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-navy-900 mb-8"
      >
        <ArrowLeft size={14} /> Voltar para o Blog
      </Link>

      {post.coverImage && (
        <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden mb-8 bg-gray-100">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
        </div>
      )}

      <p className="text-sm text-gray-400 mb-2">
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : ""}
      </p>

      <h1 className="font-heading text-3xl font-bold text-navy-900 mb-6">
        {post.title}
      </h1>

      <div
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
