import type { Metadata } from "next";
import Link from "next/link";
import { FileQuestion, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة | معمل الواجهات",
  description:
    "عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو ربما تم نقله إلى عنوان آخر",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center p-6 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-primary">
          <FileQuestion className="h-10 w-10" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-sm font-bold tracking-wider text-primary uppercase">
            خطأ 404
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            الصفحة غير موجودة
          </h1>
          <p className="text-sm text-slate-600 sm:text-base leading-relaxed">
            عذراً، الرابط الذي تحاول الوصول إليه غير موجود أو ربما تم نقله إلى
            عنوان آخر.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <Home className="h-4 w-4" aria-hidden="true" />
              <span>العودة للصفحة الرئيسية</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
