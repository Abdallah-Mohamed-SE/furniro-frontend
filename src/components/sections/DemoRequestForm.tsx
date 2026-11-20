"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DemoSuccessState } from "@/components/sections/DemoSuccessState";
import { demoSchema, type DemoFormData } from "@/types/demo";

export interface DemoRequestFormProps {
  productTitle?: string;
  className?: string;
}

export function DemoRequestForm({
  productTitle,
  className = "",
}: DemoRequestFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: { fullName: "", email: "", company: "", notes: "" },
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    reset();
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <DemoSuccessState
        productTitle={productTitle}
        onReset={handleResetForm}
        className={className}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs space-y-4 ${className}`.trim()}
    >
      <div className="space-y-1 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span>طلب تجربة مجانية</span>
        </div>
        <h4 className="text-base font-bold text-slate-900">
          {productTitle ? `ابدأ تجربة ${productTitle}` : "احصل على نسختك التجريبية"}
        </h4>
      </div>

      <div className="space-y-1">
        <label htmlFor="fullName" className="text-xs font-semibold text-slate-700 block">
          الاسم الكامل <span className="text-rose-500">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          placeholder="مثال: محمد عبدالله"
          className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
            errors.fullName
              ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-200 bg-slate-50/50 focus:border-primary focus:bg-white focus:ring-primary/20"
          }`}
          aria-invalid={Boolean(errors.fullName)}
        />
        {errors.fullName && (
          <p className="text-xs text-rose-600 font-medium">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="text-xs font-semibold text-slate-700 block">
          البريد الإلكتروني للعمل <span className="text-rose-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="name@company.com"
          dir="ltr"
          className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all text-right ${
            errors.email
              ? "border-rose-400 bg-rose-50/20 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-slate-200 bg-slate-50/50 focus:border-primary focus:bg-white focus:ring-primary/20"
          }`}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && (
          <p className="text-xs text-rose-600 font-medium">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label htmlFor="company" className="text-xs font-semibold text-slate-700 block">
          اسم الشركة (اختياري)
        </label>
        <input
          id="company"
          type="text"
          {...register("company")}
          placeholder="مثال: شركة الرؤية الرقمية"
          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="notes" className="text-xs font-semibold text-slate-700 block">
          ملاحظات إضافية (اختياري)
        </label>
        <textarea
          id="notes"
          rows={3}
          {...register("notes")}
          placeholder="أخبرنا باحتياجاتك الخاصة أو استفساراتك..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full justify-center"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span>إرسال طلب التجربة</span>
        </Button>
      </div>
    </form>
  );
}
