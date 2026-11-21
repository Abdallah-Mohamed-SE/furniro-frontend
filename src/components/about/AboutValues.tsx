import { ShieldCheck, Leaf, Smile, Sparkles } from "lucide-react";

export interface AboutValuesProps {
  className?: string;
}

interface ValueCard {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}

const values: ValueCard[] = [
  {
    icon: ShieldCheck,
    title: "جودة الخامات الفائقة",
    description:
      "نعتمد حصرياً على خشب الزان والبلوط الصلب، والأقمشة المعالجة ضد البقع، لضمان متانة استثنائية تخدمك لسنوات طويلة دون المساومة على رونقها.",
  },
  {
    icon: Leaf,
    title: "الاستدامة والمسؤولية البيئية",
    description:
      "نلتزم بمصادر أخشاب صديقة للبيئة وعمليات تصنيع واعية تقلل الهدر الكربوني، إيماناً منا بمسؤوليتنا نحو حماية كوكبنا للأجيال القادمة.",
  },
  {
    icon: Smile,
    title: "التصميم المريح والمتقن",
    description:
      "تخضع كافة المقاعد والأرائك لدراسات راحة دقيقة (Ergonomics) تمنح جسدك الدعم الكامل والاسترخاء التام بعد يوم عمل طويل.",
  },
  {
    icon: Sparkles,
    title: "الأناقة العصرية الخالدة",
    description:
      "نبتعد عن الصيحات العابرة لنقدم تصاميم مينيمالية مستوحاة من الطراز الاسكندنافي العصري التي تحافظ على جاذبيتها وأناقتها عبر الزمن.",
  },
];

export function AboutValues({ className = "" }: AboutValuesProps) {
  return (
    <section
      aria-labelledby="about-values-heading"
      className={`py-16 sm:py-24 bg-white ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase">
            لماذا تختار Furniro
          </span>
          <h2
            id="about-values-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-heading"
          >
            قيمنا التي نلتزم بها في كل قطعة نصنعها
          </h2>
          <p className="text-sm sm:text-base text-[#666666]">
            نجمع بين جمال المظهر وقوة الجوهر، لتكون كل قطعة أثاث استثماراً حقيقياً في راحة وسعادة منزلك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row items-start gap-5 p-6 sm:p-8 rounded-xs border border-[#e8e8e8] bg-[#f4f5f7]/60 hover:bg-[#fff3e3]/40 transition-colors"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xs bg-primary text-white shadow-xs">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-heading">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
