import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FurniroHero() {
  return (
    <section aria-label="الواجهة الترويجية الرئيسية" className="relative w-full overflow-hidden bg-[#f4f5f7]">
      {/* Background Hero Banner */}
      <div className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] w-full flex items-center">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=80"
          alt="واجهة أثاث Furniro اسكندنافية"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Floating Card (Positioned to the left in RTL / right in LTR) */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 w-full flex justify-end">
          <div className="w-full max-w-xl rounded-md bg-furniro-sand/95 p-8 sm:p-10 lg:p-14 shadow-lg backdrop-blur-xs space-y-4 sm:space-y-6">
            <span className="block text-xs sm:text-sm font-semibold tracking-widest text-[#333333] uppercase">
              وصل حديثاً
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-primary">
              اكتشف مجموعتنا
              <br />
              الجديدة كلياً
            </h1>
            <p className="text-sm sm:text-base text-foreground leading-relaxed">
              تصاميم أثاث وإضاءة عصرية مستوحاة من الطراز الاسكندنافي لتمنح منزلك لمسة من الدفء والأناقة الاستثنائية.
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-primary text-white hover:bg-primary-dark px-10 py-4 text-sm font-bold uppercase rounded-none tracking-wider shadow-md"
                >
                  تسوق الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
