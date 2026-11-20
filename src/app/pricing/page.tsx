import type { Metadata } from "next";
import { Check, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DemoRequestForm } from "@/components/sections/DemoRequestForm";
import { PRICING_PLANS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "الأسعار والباقات | معمل الواجهات",
  description: "خطط تسعير مرنة وشفافة مصممة للشركات الناشئة والمؤسسات الكبرى",
};

export default function PricingPage() {
  return (
    <main className="flex-1 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <header className="text-center space-y-4">
          <Badge variant="info">خطط شفافة ومرنة</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            باقات تناسب نمو أعمالك
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
            اختر الباقة المثالية لفريقك اليوم، مع إمكانية الترقية أو الإلغاء في أي وقت دون أي رسوم خفية.
          </p>
        </header>

        {/* Pricing Cards Grid */}
        <section
          aria-label="جدول الباقات"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {PRICING_PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={`flex h-full flex-col justify-between transition-all duration-200 ${
                plan.isPopular
                  ? "border-primary shadow-md ring-2 ring-primary/20 relative"
                  : "border-slate-200/90 hover:border-slate-300"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">{plan.name}</h2>
                  {plan.badge && (
                    <Badge variant={plan.isPopular ? "success" : "default"}>
                      {plan.badge}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed min-h-[40px]">
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 border-y border-slate-100 py-4">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-sm font-medium text-slate-500 mr-1.5">
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 text-sm text-slate-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Button
                  variant={plan.isPopular ? "primary" : "outline"}
                  className="w-full justify-center"
                >
                  {plan.ctaText}
                </Button>
              </div>
            </Card>
          ))}
        </section>

        {/* Enterprise Inquiry Section with Demo Form */}
        <section
          aria-labelledby="enterprise-heading"
          className="mx-auto max-w-3xl pt-8 border-t border-slate-200"
        >
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>استشارات الشركات والمؤسسات</span>
            </div>
            <h2 id="enterprise-heading" className="text-2xl font-bold text-slate-900 sm:text-3xl">
              هل تحتاج إلى خطة مخصصة لمؤسستك؟
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              تواصل مع خبرائنا لتصميم باقة متوافقة مع متطلبات الأمان والتكامل في منشأتك.
            </p>
          </div>
          <DemoRequestForm productTitle="استفسار الباقة المخصصة للمؤسسات" />
        </section>
      </div>
    </main>
  );
}
