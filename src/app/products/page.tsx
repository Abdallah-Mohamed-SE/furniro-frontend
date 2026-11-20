import type { Metadata } from "next";
import { ShopBanner } from "@/components/sections/ShopBanner";
import { ProductsCatalog } from "@/components/sections/ProductsCatalog";
import { StoreBenefits } from "@/components/sections/StoreBenefits";
import { getProducts } from "@/services/product.service";

export const metadata: Metadata = {
  title: "المتجر | Furniro للأثاث والديكور العصري",
  description:
    "تصفح أحدث وأرقى تصاميم الأثاث المنزلي والديكور من متجر Furniro مع فلاتر ذكية، شحن مجاني وضمان معتمد.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="flex-1 space-y-12 sm:space-y-16">
      {/* 1. Page Header Banner */}
      <ShopBanner />

      {/* 2. Interactive Catalog with Furniro Toolbar & Pagination */}
      <section aria-label="دليل المنتجات التفاعلي">
        <ProductsCatalog products={products} />
      </section>

      {/* 3. Store Benefits */}
      <StoreBenefits />
    </main>
  );
}
