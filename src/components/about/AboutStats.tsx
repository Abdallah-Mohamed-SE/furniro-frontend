import { Trophy, Armchair, Users, Sparkles } from "lucide-react";

export interface AboutStatsProps {
  className?: string;
}

interface StatItem {
  value: string;
  label: string;
  sublabel: string;
  icon: typeof Trophy;
}

const stats: StatItem[] = [
  {
    value: "+10",
    label: "سنوات من الخبرة",
    sublabel: "في صناعة وتصميم الأثاث الراقي",
    icon: Trophy,
  },
  {
    value: "+500",
    label: "قطعة أثاث فريدة",
    sublabel: "تصاميم حصرية لكافة أرجاء المنزل",
    icon: Armchair,
  },
  {
    value: "+15,000",
    label: "عميل سعيد",
    sublabel: "يثقون بجودتنا في جميع مدن المملكة",
    icon: Users,
  },
  {
    value: "100%",
    label: "خامات أصلية",
    sublabel: "أخشاب صلبة وأقمشة مقاومة للتلف",
    icon: Sparkles,
  },
];

export function AboutStats({ className = "" }: AboutStatsProps) {
  return (
    <section
      aria-label="إحصائيات وإنجازات متجر Furniro"
      className={`py-14 sm:py-20 bg-[#fcf8f3] border-y border-[#f0e6d6] ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-heading">
            إنجازاتنا تتحدث عن شغفنا
          </h2>
          <p className="text-sm sm:text-base text-[#666666]">
            أرقام حقيقية تعكس ثقة عملائنا والتزامنا بتقديم تجربة أثاث استثنائية.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white border border-[#e8e8e8] p-6 sm:p-8 rounded-xs text-center shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xs bg-[#fff3e3] text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                  {stat.value}
                </div>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-heading">
                  {stat.label}
                </h3>
                <p className="mt-1 text-xs text-[#898989] leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
