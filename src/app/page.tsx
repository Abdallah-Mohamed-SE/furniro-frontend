import type { Metadata } from "next";
import Link from "next/link";
import { FurniroHero } from "@/components/sections/FurniroHero";
import { BrowseTheRange } from "@/components/sections/BrowseTheRange";
import { InspirationRooms } from "@/components/sections/InspirationRooms";
import { ShareSetup } from "@/components/sections/ShareSetup";
import { StoreBenefits } from "@/components/sections/StoreBenefits";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { getProducts } from "@/services/product.service";

export const metadata: Metadata = {
  title: "Furniro | متجر الأثاث والديكور العصري",
  description:
    "اكتشف تشكيلة راقية من الأثاث العصري، غرف المعيشة، غرف النوم، والديكورات المنزلية من متجر Furniro بأعلى معايير الجودة.",
};

export default async function HomePage() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 8);

  return (
    <main className="flex-1">
      {/* 1. Hero Section */}
      <FurniroHero />

      {/* 2. Browse The Range */}
      <BrowseTheRange />

      {/* 3. Our Products Section */}
      <section aria-labelledby="products-heading" className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          {/* Section Heading */}
          <div className="text-center mb-10 sm:mb-14 space-y-2">
            <h2 id="products-heading" className="text-3xl sm:text-4xl font-extrabold text-heading">
              منتجاتنا
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              تشكيلة حصرية من الأثاث العصري المختار بعناية لمنزلك
            </p>
          </div>

          {/* 4-Column Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Show More Button */}
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-w-[245px] py-3.5 px-8 text-primary border-primary rounded-none hover:bg-primary hover:text-white font-bold transition-all"
              >
                عرض المزيد
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Beautiful Rooms Inspiration */}
      <InspirationRooms />

      {/* 5. #FuniroFurniture Gallery */}
      <ShareSetup />

      {/* 6. Store Benefits */}
      <StoreBenefits />
    </main>
  );
}
