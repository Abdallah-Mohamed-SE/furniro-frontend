"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Eye, EyeOff, Lock, Mail, User as UserIcon, Phone, AlertCircle } from "lucide-react";
import { registerSchema, type RegisterInput } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/account";
  const { register: authRegister } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: true,
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    setFormError(null);
    const result = await authRegister(data);
    if (result.success) {
      router.push(redirectPath);
      router.refresh();
    } else {
      setFormError(result.error || "تعذر إنشاء الحساب، يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-16">
      <div className="mx-auto w-full max-w-md">
        {/* Mobile Header Logo */}
        <div className="mb-6 flex items-center justify-center gap-2.5 lg:justify-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-white shadow-xs">
            <Sparkles className="h-5 w-5 fill-white" aria-hidden="true" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-heading font-sans">
            Furniro
          </span>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">
            إنشاء حساب جديد
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            انضم إلى مجتمع Furniro لتتمتع بعروض خاصة ومتابعة فورية لطلباتك.
          </p>
        </div>

        {formError && (
          <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="reg-name" className="block text-xs font-semibold text-heading mb-1">
              الاسم الكامل
            </label>
            <div className="relative">
              <input
                id="reg-name"
                type="text"
                {...register("name")}
                placeholder="أحمد محمد"
                className="w-full rounded-sm border border-border bg-white py-2.5 ps-10 pe-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <UserIcon className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" className="block text-xs font-semibold text-heading mb-1">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                id="reg-email"
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                dir="ltr"
                className="w-full rounded-sm border border-border bg-white py-2.5 ps-10 pe-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-left"
              />
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="reg-phone" className="block text-xs font-semibold text-heading mb-1">
              رقم الجوال
            </label>
            <div className="relative">
              <input
                id="reg-phone"
                type="tel"
                {...register("phone")}
                placeholder="+966 50 123 4567"
                dir="ltr"
                className="w-full rounded-sm border border-border bg-white py-2.5 ps-10 pe-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-left"
              />
              <Phone className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone.message}</p>
            )}
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="reg-password" className="block text-xs font-semibold text-heading mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full rounded-sm border border-border bg-white py-2.5 ps-9 pe-8 text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-left"
                />
                <Lock className="absolute start-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-heading"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="reg-confirm" className="block text-xs font-semibold text-heading mb-1">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <input
                  id="reg-confirm"
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="••••••••"
                  dir="ltr"
                  className="w-full rounded-sm border border-border bg-white py-2.5 ps-9 pe-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-left"
                />
                <Lock className="absolute start-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Terms checkbox */}
          <div>
            <div className="flex items-start gap-2 pt-1">
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register("agreeToTerms")}
                className="mt-1 h-4 w-4 rounded-xs border-border text-primary focus:ring-primary accent-primary"
              />
              <label htmlFor="agreeToTerms" className="text-xs text-muted-foreground leading-relaxed">
                أوافق على الشروط والأحكام و
                <Link href="/#privacy" className="text-primary hover:underline mx-1">
                  سياسة الخصوصية
                </Link>
                الخاصة بمتجر Furniro.
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.agreeToTerms.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-sm bg-primary py-3 text-base font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-70 shadow-xs cursor-pointer mt-2"
          >
            {isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          لديك حساب بالفعل؟{" "}
          <Link
            href={`/login${redirectPath !== "/account" ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
            className="font-bold text-primary hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
