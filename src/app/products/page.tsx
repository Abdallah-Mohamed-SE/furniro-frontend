import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { ProductsCatalog } from "@/components/sections/ProductsCatalog";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "منتجاتنا | معمل الواجهات",
  description:
    "استكشف حلول ومنتجات SaaS الحديثة المصممة لتسريع وتطوير أعمالك الرقمية",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="text-center space-y-4">
          <Badge variant="info">حلول متكاملة</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            منتجاتنا
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
            اختر الحل الأمثل لنمو مشروعك وتسريع إنتاجية فريقك مع حزم مصممة خصيصاً للشركات الحديثة.
          </p>
        </header>

        {/* Interactive Products Catalog */}
        <section aria-label="دليل المنتجات التفاعلي" className="mt-12 sm:mt-16">
          <ProductsCatalog products={PRODUCTS} />
        </section>
      </div>
    </main>
  );
}
