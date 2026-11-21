import Link from "next/link";
import { ArrowLeft, Compass, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface AboutStoryProps {
  className?: string;
}

export function AboutStory({ className = "" }: AboutStoryProps) {
  return (
    <section
      aria-labelledby="about-story-title"
      className={`py-16 sm:py-24 bg-white ${className}`.trim()}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text and Vision Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-xs bg-[#fff3e3] px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-primary">
              <Compass className="h-4 w-4" aria-hidden="true" />
              <span>قصتنا ورؤيتنا</span>
            </div>

            <h2
              id="about-story-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-heading leading-tight"
            >
              نصنع مساحات تنبض{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                بالدفء والفخامة
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#666666] leading-relaxed">
              <p>
                انطلقت علامة <strong>Furniro</strong> برؤية واضحة لإعادة تعريف
                مفهوم الأثاث والديكور العصري في المنازل العربية. نؤمن بأن كل منزل
                يحمل قصة فريدة، وأن قطع الأثاث ليست مجرد مقتنيات وظيفية، بل هي
                عناصر تلهم الحياة وتمنح كل لحظة مع عائلتك بعداً خاصاً من الراحة
                والأناقة.
              </p>
              <p>
                نستلهم تصاميمنا من البساطة الاسكندنافية الراقية مع مراعاة أدق
                تفاصيل الاستخدام اليومي والذوق العربي الرفيع. ننتقي أخشابنا بعناية
                فائقة من الغابات المستدامة، وندمج الحرفية اليدوية التقليدية مع أحدث
                تقنيات التصنيع العالمية لنقدم قطعاً تعيش لأجيال.
              </p>
            </div>

            {/* Vision Highlight Box */}
            <div className="border-r-4 border-primary bg-[#fcf8f3] p-5 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-heading font-bold text-base">
                <HeartHandshake className="h-5 w-5 text-primary" aria-hidden="true" />
                <span>رؤيتنا المستقبلية</span>
              </div>
              <p className="text-sm text-[#666666] leading-normal">
                أن نكون الوجهة الأولى والمفضلة لكل من يبحث عن التوازن المثالي بين
                جمالية التصميم المستدام، الجودة العالية، وتجربة الشراء الراقية.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-white rounded-none px-8 py-3.5 font-bold shadow-md inline-flex items-center gap-2"
                >
                  <span>استكشف منتجاتنا</span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>

          {/* High-quality Brand Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden rounded-xs bg-[#f4f5f7] shadow-xl">
              <img
                src="/images/about-story.jpg"
                alt="قصة متجر Furniro وتصميم الأثاث العصري الفاخر"
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Decorative Overlay Card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white border border-[#e8e8e8] p-5 shadow-lg rounded-xs max-w-xs">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                معايير Furniro الذهبية
              </p>
              <p className="text-sm font-bold text-heading mt-1">
                حرفية يدوية وتصاميم اسكندنافية فاخرة تدوم طويلاً.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
