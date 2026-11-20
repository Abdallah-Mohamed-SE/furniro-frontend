import type { Metadata } from "next";
import { BlogBanner } from "@/components/blog/BlogBanner";
import { BlogContent } from "@/components/blog/BlogContent";
import { StoreBenefits } from "@/components/sections/StoreBenefits";
import { BLOG_POSTS, BLOG_CATEGORIES, getRecentPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "المدونة | Furniro للأثاث والديكور العصري",
  description:
    "استكشف أحدث مقالات الديكور الداخلي والأثاث المنزلي من خبراء متجر Furniro. نصائح ملهمة في التصميم الاسكندنافي والحرف اليدوية وفنون تأثيث المنزل.",
};

export default function BlogPage() {
  const recentPosts = getRecentPosts(5);

  return (
    <main className="bg-white">
      {/* 1. Page Header Banner with Furniro Brand Logo & Breadcrumbs */}
      <BlogBanner />

      {/* 2. Main Two-column Section: Posts List & Interactive Sidebar */}
      <BlogContent
        initialPosts={BLOG_POSTS}
        categories={BLOG_CATEGORIES}
        recentPosts={recentPosts}
      />

      {/* 3. Furniro Store Benefits Bar */}
      <StoreBenefits />
    </main>
  );
}
