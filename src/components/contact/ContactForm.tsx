"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/types/contact";

export interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = "" }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call to send message
    await new Promise((resolve) => setTimeout(resolve, 800));
    void data;
    setIsSuccess(true);
  };

  const handleReset = () => {
    reset();
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-2xl border border-emerald-200 bg-emerald-50/70 p-8 sm:p-10 text-center space-y-4 shadow-xs ${className}`.trim()}
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9 stroke-[2]" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-heading">
          تم إرسال رسالتك بنجاح!
        </h3>
        <p className="mx-auto max-w-md text-sm sm:text-base text-black/70 leading-relaxed">
          شكراً لتواصلك مع متجر Furniro. لقد استلمنا رسالتك وسيقوم فريق خدمة
          العملاء بالرد عليك في أقرب وقت ممكن.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-[5px] bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark cursor-pointer shadow-xs"
          >
            إرسال رسالة أخرى
          </button>
        </div>
      </div>
    );
  }

  const inputStyle =
    "w-full rounded-[10px] border border-[#9F9F9F] bg-white px-5 py-4 text-sm sm:text-base text-black placeholder:text-[#9F9F9F] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`space-y-6 sm:space-y-7 ${className}`.trim()}
      aria-label="نموذج مراسلة اتصل بنا"
    >
      {/* Name */}
      <div className="space-y-2">
        <label htmlFor="contact-name" className="block text-base font-medium text-black">
          الاسم
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder="أدخل اسمك"
          className={`${inputStyle} ${errors.name ? "border-red-500 focus:ring-red-300" : ""}`}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" className="text-xs text-red-500 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="contact-email" className="block text-base font-medium text-black">
          البريد الإلكتروني
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="Abc@def.com"
          dir="ltr"
          className={`text-right placeholder:text-right ${inputStyle} ${errors.email ? "border-red-500 focus:ring-red-300" : ""}`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-500 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <label htmlFor="contact-subject" className="block text-base font-medium text-black">
          الموضوع <span className="text-xs text-muted-foreground font-normal">(اختياري)</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder="هذا الحقل اختياري"
          className={inputStyle}
          {...register("subject")}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-base font-medium text-black">
          الرسالة
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="مرحباً! أود الاستفسار عن..."
          className={`resize-none ${inputStyle} ${errors.message ? "border-red-500 focus:ring-red-300" : ""}`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-red-500 font-medium">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-[55px] w-full sm:w-[237px] items-center justify-center gap-2 rounded-[5px] bg-[#B88E2F] px-8 text-base font-semibold text-white transition-all hover:bg-[#9A7524] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              <span>جاري الإرسال...</span>
            </>
          ) : (
            <>
              <span>إرسال</span>
              <Send className="h-4 w-4 -rotate-90" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
