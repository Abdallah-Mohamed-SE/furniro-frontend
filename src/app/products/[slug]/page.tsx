import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/services/product.service";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { RelatedProducts } from "@/components/product/RelatedProducts";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "المنتج غير موجود | Furniro" };
  }

  return {
    title: `${product.title} | Furniro`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    typeof product.discountPrice === "number" &&
    product.discountPrice < product.price;

  return (
    <main className="flex-1 bg-white">
      {/* 1. Furniro Breadcrumb Bar */}
      <ProductBreadcrumb title={product.title} />

      {/* 2. Interactive Product Section */}
      <section
        aria-label="عرض تفاصيل المنتج"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-8 sm:py-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <ProductGallery
            images={product.images}
            title={product.title}
            hasDiscount={hasDiscount}
          />
          <ProductInfo product={product} />
        </div>
      </section>

      {/* 3. Bottom Tabs (Description, Additional Information, Reviews) */}
      <ProductTabs product={product} />

      {/* 4. Related Products with Show More Button */}
      <RelatedProducts
        currentProduct={product}
        allProducts={allProducts}
      />
    </main>
  );
}
