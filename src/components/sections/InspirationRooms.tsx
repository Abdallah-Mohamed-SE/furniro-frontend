import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function InspirationRooms() {
  return (
    <section aria-labelledby="inspiration-heading" className="bg-furniro-cream py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Text Content */}
          <div className="lg:col-span-5 space-y-6">
            <h2
              id="inspiration-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-heading leading-tight"
            >
              أكثر من 50 تصميماً
              <br />
              لغرف ملهمة وعصرية
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              قام مهندسونا الداخليون بتنسيق نماذج غرف متكاملة تمنحك أفكاراً لا حصر لها لتأثيث منزلك بأرقى طراز.
            </p>
            <div>
              <Link href="/products">
                <Button size="lg" className="rounded-none px-9 py-4 font-bold text-sm tracking-wide">
                  <span>استكشف المزيد</span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Showcase Gallery */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Featured Room Card */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md shadow-md">
              <img
                src="/images/rooms/room-1.jpg"
                alt="تصميم غرفة معيشة اسكندنافية ملهمة"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xs p-5 shadow-lg max-w-[240px]">
                <span className="text-xs text-muted-foreground block font-medium">01 — غرفة المعيشة</span>
                <span className="text-lg font-bold text-heading mt-1 block">الهدوء والسكينة</span>
              </div>
            </div>

            {/* Second Room Card */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md shadow-md hidden sm:block">
              <img
                src="/images/rooms/room-2.jpg"
                alt="تصميم غرفة نوم عصرية"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xs p-5 shadow-lg max-w-[240px]">
                <span className="text-xs text-muted-foreground block font-medium">02 — غرفة النوم</span>
                <span className="text-lg font-bold text-heading mt-1 block">راحة البال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
