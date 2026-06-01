import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  specs: z.record(z.string()).optional(),
  imageUrls: z.array(z.string().url()).optional().default([]),
  applications: z.array(z.string()).optional().default([]),
  categoryId: z.string().cuid(),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
});

export const postSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(10).max(300),
  content: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional().default(false),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  type: z.enum(["GENERAL", "QUOTATION", "POST_SALES"]).default("GENERAL"),
});

export const serviceSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().min(1).default("build"),
  imageUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional().default(true),
  order: z.number().int().optional().default(0),
});

export type ProductInput = z.infer<typeof productSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
