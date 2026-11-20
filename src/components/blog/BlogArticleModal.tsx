import { X, Calendar, User, Tag, Clock } from "lucide-react";
import type { BlogPost } from "@/types/blog";

export interface BlogArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function BlogArticleModal({ post, onClose }: BlogArticleModalProps) {
  if (!post) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 sm:p-6 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl rounded-xl bg-white shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="إغلاق المقال"
          className="absolute start-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black shadow-md transition-colors hover:bg-primary hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-xl bg-muted">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#9f9f9f]">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag className="h-4 w-4" />
              {post.category}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            id="article-modal-title"
            className="mt-4 text-2xl sm:text-3xl font-bold leading-snug text-heading"
          >
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="mt-4 border-s-4 border-primary bg-[#fcf8f3] p-4 text-sm font-medium leading-relaxed text-[#666666]">
            {post.excerpt}
          </p>

          {/* Full Content */}
          <div className="mt-6 space-y-4 text-sm sm:text-base leading-loose text-[#333333] whitespace-pre-line text-justify">
            {post.content}
          </div>

          {/* Modal Footer */}
          <div className="mt-8 flex justify-end border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#9a7524]"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
