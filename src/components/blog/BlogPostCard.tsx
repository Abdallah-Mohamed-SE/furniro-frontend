import { User, Calendar, Tag } from "lucide-react";
import type { BlogPost } from "@/types/blog";

export interface BlogPostCardProps {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}

export function BlogPostCard({ post, onReadMore }: BlogPostCardProps) {
  return (
    <article className="group flex flex-col bg-white">
      {/* Article Featured Image */}
      <div
        onClick={() => onReadMore(post)}
        className="relative h-[320px] sm:h-[420px] lg:h-[480px] w-full cursor-pointer overflow-hidden rounded-[10px] bg-muted shadow-xs transition-transform duration-300 hover:shadow-md"
      >
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Meta Information Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-5 sm:gap-8 text-sm text-[#9f9f9f]">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-[#9f9f9f]" aria-hidden="true" />
          <span>{post.author}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[#9f9f9f]" aria-hidden="true" />
          <time dateTime={post.date}>{post.date}</time>
        </div>

        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-[#9f9f9f]" aria-hidden="true" />
          <span>{post.category}</span>
        </div>
      </div>

      {/* Post Title */}
      <h2
        onClick={() => onReadMore(post)}
        className="mt-4 text-2xl sm:text-[28px] lg:text-[30px] font-bold leading-snug text-heading transition-colors hover:text-primary cursor-pointer"
      >
        {post.title}
      </h2>

      {/* Post Excerpt */}
      <p className="mt-3 text-justify text-[15px] leading-relaxed text-[#9f9f9f]">
        {post.excerpt}
      </p>

      {/* Interactive Read More Action */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => onReadMore(post)}
          className="inline-flex flex-col items-start gap-1 text-base font-medium text-black transition-colors hover:text-primary"
        >
          <span>اقرأ المزيد</span>
          <span className="h-[2px] w-20 bg-black transition-all duration-300 group-hover:w-full group-hover:bg-primary" />
        </button>
      </div>
    </article>
  );
}
