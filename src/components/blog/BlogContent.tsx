"use client";

import { useState, useMemo } from "react";
import { BlogPostCard } from "./BlogPostCard";
import { BlogSidebar } from "./BlogSidebar";
import { BlogPagination } from "./BlogPagination";
import { BlogArticleModal } from "./BlogArticleModal";
import type { BlogPost, BlogCategory } from "@/types/blog";

export interface BlogContentProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
  recentPosts: BlogPost[];
}

const POSTS_PER_PAGE = 3;

export function BlogContent({
  initialPosts,
  categories,
  recentPosts,
}: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalPost, setActiveModalPost] = useState<BlogPost | null>(null);

  // Filter posts based on active search and selected category
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === null || post.categorySlug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  // Compute pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Main Column: Blog Posts List */}
        <section aria-label="قائمة مقالات المدونة" className="lg:col-span-8">
          {paginatedPosts.length > 0 ? (
            <div className="flex flex-col gap-12 sm:gap-16">
              {paginatedPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  onReadMore={(p) => setActiveModalPost(p)}
                />
              ))}

              {/* Pagination Controls */}
              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
              <p className="text-lg font-medium text-heading">
                لم يتم العثور على أي مقالات تطابق بحثك.
              </p>
              <p className="mt-2 text-sm text-[#9f9f9f]">
                جرب تغيير كلمات البحث أو اختيار تصنيف آخر.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 rounded-sm bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#9a7524]"
              >
                عرض جميع المقالات
              </button>
            </div>
          )}
        </section>

        {/* Sidebar Column */}
        <div className="lg:col-span-4">
          <BlogSidebar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            recentPosts={recentPosts}
            onSelectPost={(post) => setActiveModalPost(post)}
          />
        </div>
      </div>

      {/* Interactive Article Reading Modal */}
      <BlogArticleModal
        post={activeModalPost}
        onClose={() => setActiveModalPost(null)}
      />
    </div>
  );
}
