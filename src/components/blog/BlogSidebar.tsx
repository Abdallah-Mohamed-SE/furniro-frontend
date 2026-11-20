import { Search, X } from "lucide-react";
import type { BlogPost, BlogCategory } from "@/types/blog";

export interface BlogSidebarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categories: BlogCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categorySlug: string | null) => void;
  recentPosts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export function BlogSidebar({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onSelectCategory,
  recentPosts,
  onSelectPost,
}: BlogSidebarProps) {
  return (
    <aside aria-label="الشريط الجانبي للمدونة" className="flex flex-col gap-10">
      {/* 1. Instant Search Widget */}
      <div className="relative w-full">
        <label htmlFor="blog-search" className="sr-only">
          البحث في مقالات المدونة
        </label>
        <input
          id="blog-search"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="ابحث في المقالات..."
          className="w-full rounded-[10px] border border-[#9f9f9f] bg-white px-4 py-3.5 pe-12 text-sm text-heading placeholder:text-[#9f9f9f] transition-all focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <div className="absolute end-4 top-1/2 -translate-y-1/2 flex items-center">
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="مسح البحث"
              className="text-[#9f9f9f] hover:text-black transition-colors p-1"
            >
              <X className="h-4 w-4" />
            </button>
          ) : (
            <Search className="h-5 w-5 text-black" aria-hidden="true" />
          )}
        </div>
      </div>

      {/* 2. Categories Widget */}
      <div className="bg-white">
        <h3 className="mb-6 text-2xl font-bold text-heading">التصنيفات</h3>
        <ul className="flex flex-col gap-1 text-base">
          <li>
            <button
              type="button"
              onClick={() => onSelectCategory(null)}
              className={`flex w-full items-center justify-between py-2.5 transition-colors ${
                selectedCategory === null
                  ? "font-bold text-primary"
                  : "text-[#9f9f9f] hover:text-primary"
              }`}
            >
              <span>جميع التصنيفات</span>
              <span className="text-sm">الكل</span>
            </button>
          </li>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <li key={cat.id}>
                <button
                  type="button"
                  onClick={() =>
                    onSelectCategory(isSelected ? null : cat.slug)
                  }
                  className={`flex w-full items-center justify-between py-2.5 transition-colors ${
                    isSelected
                      ? "font-bold text-primary"
                      : "text-[#9f9f9f] hover:text-primary"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-sm text-[#9f9f9f]">{cat.count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. Recent Posts Widget */}
      <div className="bg-white">
        <h3 className="mb-6 text-2xl font-bold text-heading">أحدث المقالات</h3>
        <div className="flex flex-col gap-6">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group flex cursor-pointer items-center gap-4 transition-transform hover:-translate-x-1"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <h4 className="line-clamp-2 text-sm font-semibold text-heading transition-colors group-hover:text-primary">
                  {post.title}
                </h4>
                <time
                  dateTime={post.date}
                  className="text-xs text-[#9f9f9f]"
                >
                  {post.date}
                </time>
              </div>
            </article>
          ))}
        </div>
      </div>
    </aside>
  );
}
