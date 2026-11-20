import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export interface ProductBreadcrumbProps {
  title: string;
}

export function ProductBreadcrumb({ title }: ProductBreadcrumbProps) {
  return (
    <nav
      aria-label="مسار التنقل"
      className="bg-[#F9F1E7] py-6 sm:py-8 border-b border-[#F9F1E7]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 flex items-center flex-wrap gap-2 sm:gap-4 text-sm sm:text-base">
        <Link
          href="/"
          className="text-[#9F9F9F] hover:text-black transition-colors"
        >
          الرئيسية
        </Link>

        <ChevronLeft className="h-4 w-4 text-black shrink-0" aria-hidden="true" />

        <Link
          href="/products"
          className="text-[#9F9F9F] hover:text-black transition-colors"
        >
          المتجر
        </Link>

        <ChevronLeft className="h-4 w-4 text-black shrink-0" aria-hidden="true" />

        <span
          className="h-7 w-px bg-[#9F9F9F]/60 mx-1 sm:mx-2 hidden sm:inline-block"
          aria-hidden="true"
        />

        <span className="font-normal text-black truncate max-w-xs sm:max-w-md">
          {title}
        </span>
      </div>
    </nav>
  );
}
