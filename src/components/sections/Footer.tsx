import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

export interface FooterProps {
  className?: string;
}

interface FooterLink {
  label: string;
  href: string;
}

const quickLinks: FooterLink[] = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/products" },
  { label: "الأسعار", href: "/pricing" },
  { label: "المدونة", href: "/blog" },
];

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`border-t border-slate-200 bg-white text-slate-600 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-slate-900 transition-colors hover:text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="tracking-tight">معمل الواجهات</span>
            </Link>
            <p className="max-w-sm text-sm text-slate-500 leading-relaxed">
              منصة متطورة لبناء واجهات برمجية وسحابية عصرية وسريعة بأعلى معايير
              تجربة المستخدم ودعم كامل للغة العربية.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">روابط سريعة</h3>
            <nav aria-label="روابط تذييل الصفحة">
              <ul className="space-y-2.5 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-500 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* About / Note */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">عن المنصة</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              تم بناء هذا المشروع بأحدث تقنيات Next.js App Router و Tailwind CSS
              مع التركيز على الأداء وإمكانية الوصول وسهولة التخصيص.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row text-xs text-slate-400">
          <p>© {currentYear} معمل الواجهات (Frontend Lab). جميع الحقوق محفوظة.</p>
          <p className="inline-flex items-center gap-1">
            <span>صُنع بشغف</span>
            <Heart
              className="h-3.5 w-3.5 text-rose-500 fill-rose-500"
              aria-hidden="true"
            />
            <span>لدعم مجتمع المطورين العربي</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
