import { api } from "@/lib/api";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog";
import type { BlogPost, BlogCategory } from "@/types/blog";

function normalizePost(raw: Record<string, unknown>): BlogPost {
  const category =
    typeof raw.categoryAr === "string" && raw.categoryAr
      ? raw.categoryAr
      : typeof raw.category === "string"
        ? raw.category
        : "";

  const categorySlug =
    typeof raw.category === "string"
      ? raw.category.toLowerCase().replace(/\s+/g, "-")
      : typeof raw.categorySlug === "string"
        ? raw.categorySlug
        : "";

  const publishedAt =
    typeof raw.publishedAt === "string" ? raw.publishedAt : undefined;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : typeof raw.date === "string"
      ? raw.date
      : "";

  return {
    id: typeof raw.id === "string" ? raw.id : String(raw.id ?? ""),
    slug: typeof raw.slug === "string" ? raw.slug : "",
    title:
      typeof raw.titleAr === "string" && raw.titleAr
        ? raw.titleAr
        : typeof raw.title === "string"
          ? raw.title
          : "",
    titleAr: typeof raw.titleAr === "string" ? raw.titleAr : undefined,
    excerpt:
      typeof raw.excerptAr === "string" && raw.excerptAr
        ? raw.excerptAr
        : typeof raw.excerpt === "string"
          ? raw.excerpt
          : "",
    excerptAr: typeof raw.excerptAr === "string" ? raw.excerptAr : undefined,
    content:
      typeof raw.contentAr === "string" && raw.contentAr
        ? raw.contentAr
        : typeof raw.content === "string"
          ? raw.content
          : "",
    contentAr: typeof raw.contentAr === "string" ? raw.contentAr : undefined,
    author:
      typeof raw.author === "string" ? raw.author : "فريق Furniro",
    date,
    publishedAt,
    category,
    categoryAr: typeof raw.categoryAr === "string" ? raw.categoryAr : undefined,
    categorySlug,
    image:
      typeof raw.image === "string" && raw.image
        ? raw.image
        : "/images/blog/blog-1.jpg",
    readTime: typeof raw.readTime === "string" ? raw.readTime : undefined,
  };
}

export interface BlogPostsResult {
  posts: BlogPost[];
  total: number;
  categories: BlogCategory[];
}

export async function getBlogPosts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<BlogPostsResult> {
  try {
    const qp = new URLSearchParams();
    if (params?.category) qp.set("category", params.category);
    if (params?.search) qp.set("search", params.search);
    if (params?.page) qp.set("page", String(params.page));
    qp.set("limit", String(params?.limit ?? 50));

    const res = await api.get<{ data: Record<string, unknown>[]; meta: { total?: number } }>(
      `/blog?${qp.toString()}`,
    );

    if (res?.data && Array.isArray(res.data)) {
      const posts = res.data.map(normalizePost);
      // Derive categories from returned posts
      const categoryMap = new Map<string, number>();
      posts.forEach((p) => {
        if (p.categorySlug) {
          categoryMap.set(p.categorySlug, (categoryMap.get(p.categorySlug) ?? 0) + 1);
        }
      });
      const categories: BlogCategory[] = Array.from(categoryMap.entries()).map(
        ([slug, count], i) => {
          const matchingPost = posts.find((p) => p.categorySlug === slug);
          return {
            id: String(i + 1),
            name: matchingPost?.category ?? slug,
            slug,
            count,
          };
        },
      );
      return { posts, total: res.meta?.total ?? posts.length, categories };
    }
  } catch {
    // Fall through to local data
  }

  return {
    posts: BLOG_POSTS,
    total: BLOG_POSTS.length,
    categories: BLOG_CATEGORIES,
  };
}
