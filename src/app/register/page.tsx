import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthVisualHero } from "@/components/auth/AuthVisualHero";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "إنشاء حساب جديد | Furniro",
  description:
    "أنشئ حساباً جديداً في متجر Furniro للأثاث والديكور العصري واستمتع بمزايا العضوية الحصرية والعروض الخاصة.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-6rem)] flex flex-col justify-center bg-white">
      <div className="flex min-h-[750px] w-full flex-col lg:flex-row shadow-sm">
        {/* Scandinavian Visual Side */}
        <AuthVisualHero
          title="صُممت لتدوم، وصُنعت لتُبهج كل زاوية في منزلك"
          subtitle="انضم اليوم واحصل على تحديثات مستمرة بأحدث أطقم الأثاث الاسكندنافي وحلول الديكور المبتكرة."
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
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}
