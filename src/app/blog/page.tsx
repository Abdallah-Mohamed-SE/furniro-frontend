import type { Metadata } from "next";
import { BlogBanner } from "@/components/blog/BlogBanner";
import { BlogContent } from "@/components/blog/BlogContent";
import { StoreBenefits } from "@/components/sections/StoreBenefits";
import { getBlogPosts } from "@/services/blog.service";

export const metadata: Metadata = {
  title: "المدونة | Furniro للأثاث والديكور العصري",
  description:
    "استكشف أحدث مقالات الديكور الداخلي والأثاث المنزلي من خبراء متجر Furniro. نصائح ملهمة في التصميم الاسكندنافي والحرف اليدوية وفنون تأثيث المنزل.",
};

export default async function BlogPage() {
  const { posts, categories } = await getBlogPosts({ limit: 50 });
  const recentPosts = posts.slice(0, 5);

  return (
    <main className="bg-white">
      {/* 1. Page Header Banner with Furniro Brand Logo & Breadcrumbs */}
      <BlogBanner />

      {/* 2. Main Two-column Section: Posts List & Interactive Sidebar */}
      <BlogContent
        initialPosts={posts}
        categories={categories}
        recentPosts={recentPosts}
      />

      {/* 3. Furniro Store Benefits Bar */}
      <StoreBenefits />
    </main>
  );
}
