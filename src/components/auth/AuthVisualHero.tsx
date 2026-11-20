import { Sparkles, CheckCircle2 } from "lucide-react";

export interface AuthVisualHeroProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
}

export function AuthVisualHero({
  title = "أناقة اسكندنافية تناسب ذوقك الرفيع",
  subtitle = "انضم إلى مجتمع Furniro واستمتع بتجربة تسوق استثنائية لأرقى قطع الأثاث والديكور العصري.",
  imageSrc = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
}: AuthVisualHeroProps) {
  return (
    <div className="relative hidden w-full lg:flex lg:w-1/2 flex-col justify-between overflow-hidden bg-heading p-12 text-white">
      {/* Background Image with Dark Vignette */}
      <img
        src={imageSrc}
        alt="ديكور Furniro العصري"
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

      {/* Top Brand Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary text-white shadow-md">
          <Sparkles className="h-6 w-6 fill-white" aria-hidden="true" />
        </span>
        <span className="text-3xl font-extrabold tracking-tight font-sans">
          Furniro.
        </span>
      </div>

      {/* Center/Bottom Inspiring Quote & Features */}
      <div className="relative z-10 space-y-6">
        <div className="rounded-xl border border-white/15 bg-white/10 p-6 backdrop-blur-md">
          <p className="text-xl sm:text-2xl font-bold leading-relaxed text-white">
            &ldquo;{title}&rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            {subtitle}
          </p>
        </div>

        <ul className="flex flex-col gap-3 text-sm text-white/90">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>خامات طبيعية مختارة بعناية فائقة وضمان لأكثر من سنتين</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>توصيل سريع ومجاني للطلبات المؤهلة مع خيارات دفع آمنة</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>فريق دعم متخصص متاح على مدار الساعة لخدمتكم</span>
          </li>
        </ul>
      </div>

      {/* Copyright Footer */}
      <div className="relative z-10 text-xs text-white/60">
        © {new Date().getFullYear()} Furniro. جميع الحقوق محفوظة.
      </div>
    </div>
  );
}
