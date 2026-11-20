import { ArrowLeft, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface HeroSectionProps {
  className?: string;
}

interface StatItem {
  value: string;
  label: string;
  highlight?: boolean;
}

const stats: StatItem[] = [
  { value: "99.9%", label: "جاهزية واستقرار النظام", highlight: true },
  { value: "10x", label: "سرعة في التطوير والإطلاق" },
  { value: "+50K", label: "مطور ومستخدم نشط" },
];

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className={`relative overflow-hidden py-16 sm:py-24 lg:py-28 ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Announcement Badge */}
        <div className="flex justify-center">
          <Badge
            variant="info"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 text-sm font-medium shadow-xs"
          >
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>إصدار 2.0 متاح الآن</span>
          </Badge>
        </div>

        {/* Main Heading */}
        <h1
          id="hero-title"
          className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="bg-gradient-to-l from-primary to-indigo-600 bg-clip-text text-transparent">
            منصتك المتكاملة
          </span>{" "}
          لبناء واجهات SaaS حديثة
        </h1>

        {/* Short Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-600 sm:text-lg md:text-xl leading-relaxed">
          صمم، طور، وانشر تطبيقات الويب الحديثة بأعلى معايير السرعة وتجربة المستخدم
          المتكاملة مع دعم كامل للغة العربية.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary" size="lg" className="w-full sm:w-auto">
            <span>ابدأ تجربتك المجانية</span>
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            طلب عرض توضيحي
          </Button>
        </div>

        {/* Wide Preview Card with Stats */}
        <div className="mt-14 sm:mt-16">
          <Card className="mx-auto max-w-4xl border-slate-200/80 bg-white/90 p-8 shadow-sm backdrop-blur-xs">
            <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-x-reverse sm:divide-slate-200">
              {stats.map((stat) => (
                <div key={stat.label} className="py-4 first:pt-0 last:pb-0 sm:py-0 sm:px-6">
                  <div
                    className={`text-3xl font-extrabold sm:text-4xl ${
                      stat.highlight ? "text-primary" : "text-slate-900"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
