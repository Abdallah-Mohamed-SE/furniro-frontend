import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ShieldCheck, Zap } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { DemoRequestForm } from "@/components/sections/DemoRequestForm";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return { title: "المنتج غير موجود | معمل الواجهات" };
  }

  return {
    title: `${product.title} | معمل الواجهات`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <nav aria-label="مسار التنقل">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>العودة إلى المنتجات</span>
          </Link>
        </nav>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Product Info */}
          <article className="lg:col-span-2 space-y-8">
            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="default">{product.category}</Badge>
                {product.badgeText && (
                  <Badge variant={product.badgeVariant || "default"}>
                    {product.badgeText}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                {product.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </header>

            {/* Pricing Box */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    خطة الاشتراك الشاملة
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-primary">$</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                      {product.price}
                    </span>
                    <span className="text-sm font-medium text-slate-500 mr-1.5">
                      / شهرياً
                    </span>
                  </div>
                </div>
                <Badge variant="success">شامل التحديثات والدعم الفني</Badge>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  <span>ضمان استرجاع الأموال لمدة 30 يوماً</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>تفعيل فوري لكافة الخصائص بدون انتظار</span>
                </div>
              </div>
            </div>

            {/* Features Detail Section */}
            <section aria-labelledby="features-heading" className="space-y-4">
              <h2 id="features-heading" className="text-xl font-bold text-slate-900">
                المميزات والقدرات الأساسية
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-xs"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </section>
          </article>

          {/* Interactive Demo Request Sidebar */}
          <aside aria-label="نموذج طلب تجربة سريعة" className="space-y-6">
            <DemoRequestForm productTitle={product.title} />
          </aside>
        </div>
      </div>
    </main>
  );
}
