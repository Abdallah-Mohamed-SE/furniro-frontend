"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { loginSchema, type LoginInput } from "@/types/auth";
import { useAuth } from "@/context/AuthContext";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/account";
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setFormError(null);
    const result = await login(data);
    if (result.success) {
      router.push(redirectPath);
      router.refresh();
    } else {
      setFormError(result.error || "تعذر تسجيل الدخول، يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-16">
      <div className="mx-auto w-full max-w-md">
        {/* Mobile Header Logo */}
        <div className="mb-8 flex items-center justify-center gap-2.5 lg:justify-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-white shadow-xs">
            <Sparkles className="h-5 w-5 fill-white" aria-hidden="true" />
          </span>
          <span className="text-2xl font-extrabold tracking-tight text-heading font-sans">
            Furniro
          </span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-heading">
            مرحباً بعودتك
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            أدخل بيانات حسابك للمتابعة وإدارة طلباتك المفضلة.
          </p>
        </div>

        {formError && (
          <div className="mb-6 flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-heading mb-1.5"
            >
              البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="name@example.com"
                dir="ltr"
                className="w-full rounded-sm border border-border bg-white py-3 ps-10 pe-4 text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-left"
              />
              <Mail className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-heading"
              >
                كلمة المرور
              </label>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("يرجى إدخال أي كلمة مرور لا تقل عن 6 أحرف للدخول التجريبي.");
                }}
                className="text-xs text-primary hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                dir="ltr"
                className="w-full rounded-sm border border-border bg-white py-3 ps-10 pe-10 text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-left"
              />
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-heading"
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600 font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 rounded-xs border-border text-primary focus:ring-primary accent-primary"
            />
            <label htmlFor="rememberMe" className="text-xs sm:text-sm text-muted-foreground">
              تذكر تسجيل دخولي على هذا الجهاز
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-sm bg-primary py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-dark disabled:opacity-70 shadow-xs cursor-pointer"
          >
            {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          ليس لديك حساب؟{" "}
          <Link
            href={`/register${redirectPath !== "/account" ? `?redirect=${encodeURIComponent(redirectPath)}` : ""}`}
            className="font-bold text-primary hover:underline"
          >
            أنشئ حساباً جديداً الآن
          </Link>
        </p>
      </div>
    </div>
  );
}
