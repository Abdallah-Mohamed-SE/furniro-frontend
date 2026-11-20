"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export interface BlogErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorProps) {
  useEffect(() => {
    console.error("Blog Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[65vh] items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="max-w-md w-full border-amber-200/80 bg-white p-8 text-center shadow-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </div>

        <h1 className="mt-5 text-xl font-bold text-slate-900">
          تعذر تحميل المقالات حالياً
        </h1>

        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          حدث خطأ غير متوقع أثناء محاولة استرجاع المقالات من الخادم. يرجى التحقق
          من اتصالك بالإنترنت والمحاولة مجدداً.
        </p>

        {error.digest && (
          <p className="mt-3 text-xs font-mono text-slate-400">
            رمز الخطأ: {error.digest}
          </p>
        )}

        <div className="mt-6 flex justify-center">
          <Button
            type="button"
            variant="primary"
            onClick={reset}
            className="w-full sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            <span>إعادة المحاولة</span>
          </Button>
        </div>
      </Card>
    </main>
  );
}
