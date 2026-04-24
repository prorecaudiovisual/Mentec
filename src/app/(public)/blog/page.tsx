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
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-heading text-3xl font-bold text-navy-900 mb-8">
        Blog & Notícias
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">Nenhum post publicado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="h-44 bg-gray-100 relative">
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
                <h2 className="font-semibold text-navy-900">{post.title}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
