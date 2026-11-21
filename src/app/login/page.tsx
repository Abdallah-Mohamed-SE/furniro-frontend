import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthVisualHero } from "@/components/auth/AuthVisualHero";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول | Furniro",
  description:
    "سجل دخولك إلى متجر Furniro لمتابعة طلباتك وقائمة أمنياتك والتمتع بتجربة تسوق راقية.",
};

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col justify-center bg-white">
      <div className="flex min-h-[750px] w-full flex-col lg:flex-row shadow-sm">
        {/* Scandinavian Visual Side */}
        <AuthVisualHero
          title="عالم من الفخامة والبساطة في متناول يدك"
          subtitle="سجل دخولك لاستعراض تشكيلاتك المفضلة ومتابعة حالة شحن وتوصيل طلباتك السابقة بكل يسر."
          imageSrc="/images/page-banner.jpg"
        />

        {/* Form Side */}
        <Suspense
          fallback={
            <div className="flex w-full items-center justify-center p-12 lg:w-1/2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
