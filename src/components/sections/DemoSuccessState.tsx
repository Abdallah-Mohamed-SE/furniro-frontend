import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface DemoSuccessStateProps {
  productTitle?: string;
  onReset: () => void;
  className?: string;
}

export function DemoSuccessState({
  productTitle,
  onReset,
  className = "",
}: DemoSuccessStateProps) {
  return (
    <div
      className={`rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-6 text-center space-y-4 ${className}`.trim()}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-slate-900">
          تم استلام طلبك بنجاح!
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          {productTitle
            ? `شكراً لاهتمامك بـ ${productTitle}. سيتواصل معك فريقنا خلال ساعات قليلة لتجهيز نسختك التجريبية.`
            : "شكراً لاهتمامك. سيتواصل معك أحد خبرائنا التقنيين خلال وقت قصير."}
        </p>
      </div>
      <div className="pt-2">
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          إرسال طلب آخر
        </Button>
      </div>
    </div>
  );
}
