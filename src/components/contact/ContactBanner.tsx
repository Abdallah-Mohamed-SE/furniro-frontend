import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";

export interface ContactBannerProps {
  className?: string;
}

export function ContactBanner({ className = "" }: ContactBannerProps) {
  return (
    <section
      aria-label="عنوان صفحة اتصل بنا"
      className={`relative flex h-72 sm:h-80 w-full items-center justify-center overflow-hidden bg-[#f4f5f7] ${className}`.trim()}
    >
      {/* Background Image with blur & opacity matching Furniro design */}
      <img
        src="/images/page-banner.jpg"
        alt="خلفية صفحة التواصل مع Furniro"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-40 blur-[2px]"
      />

      {/* Centered Breadcrumb and Title */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-white shadow-xs mb-1">
          <Sparkles className="h-5 w-5 fill-white" aria-hidden="true" />
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heading tracking-tight">
          اتصل بنا
        </h1>

        {/* Breadcrumb Path */}
        <nav aria-label="مسار التنقل" className="pt-1">
          <ol className="flex items-center gap-1.5 text-sm sm:text-base font-medium">
            <li>
              <Link
                href="/"
                className="text-black font-bold transition-colors hover:text-primary"
              >
                الرئيسية
              </Link>
            </li>
            <li className="text-slate-400" aria-hidden="true">
              <ChevronLeft className="h-4 w-4" />
            </li>
            <li className="text-slate-600 font-light" aria-current="page">
              اتصل بنا
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
