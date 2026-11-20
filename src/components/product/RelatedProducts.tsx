import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";

export interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
}

export function RelatedProducts({
  currentProduct,
  allProducts,
}: RelatedProductsProps) {
  // Filter out current product and pick up to 4 related products
  const related = allProducts
    .filter((p) => p.id !== currentProduct.id)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === currentProduct.category && b.category !== currentProduct.category) return -1;
      if (b.category === currentProduct.category && a.category !== currentProduct.category) return 1;
      return 0;
    })
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section aria-label="منتجات ذات صلة" className="border-t border-[#D9D9D9] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-10 sm:space-y-12">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-medium text-black text-center">
          منتجات ذات صلة
        </h2>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center pt-4">
          <Link
            href="/products"
            className="inline-flex items-center justify-center border border-[#B88E2F] text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white px-16 py-3.5 text-base font-semibold transition-all duration-300"
          >
            عرض المزيد
          </Link>
        </div>
      </div>
    </section>
  );
}
