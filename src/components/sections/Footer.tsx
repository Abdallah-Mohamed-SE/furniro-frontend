"use client";

import Link from "next/link";

export interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t border-border bg-white text-muted-foreground ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span dir="ltr" className="text-2xl font-black text-black tracking-tight font-sans inline-block">
                Furniro.
              </span>
            </Link>
            <address className="not-italic text-sm text-[#9f9f9f] leading-relaxed max-w-xs space-y-1">
              <p>طريق الملك فهد، حي النخيل،</p>
              <p>الرياض 12382، المملكة العربية السعودية</p>
            </address>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#9f9f9f]">الروابط</h3>
            <ul className="space-y-4 text-sm font-medium text-black">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="transition-colors hover:text-primary">
                  المتجر
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-primary">
                  المدونة
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-primary">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-primary">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#9f9f9f]">المساعدة</h3>
            <ul className="space-y-4 text-sm font-medium text-black">
              <li>
                <Link href="/#faq" className="transition-colors hover:text-primary">
                  خيارات الدفع
                </Link>
              </li>
              <li>
                <Link href="/#returns" className="transition-colors hover:text-primary">
                  الإرجاع والاستبدال
                </Link>
              </li>
              <li>
                <Link href="/#privacy" className="transition-colors hover:text-primary">
                  سياسة الخصوصية
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-[#9f9f9f]">النشرة البريدية</h3>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                البريد الإلكتروني
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full border-b border-black/50 bg-transparent py-1.5 text-xs text-black placeholder:text-[#9f9f9f] focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="border-b border-black py-1.5 text-xs font-bold text-black uppercase hover:text-primary hover:border-primary transition-colors shrink-0"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-14 border-t border-border pt-8 text-sm text-black">
          <p>© {currentYear} Furniro. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
