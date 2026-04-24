import BlogPostForm from "@/components/admin/BlogPostForm";

export const metadata = { title: "Novo Post" };

export default function NovoBlogPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-900 mb-6">
        Novo Post
      </h1>
      <BlogPostForm />
    </div>
  );
}
