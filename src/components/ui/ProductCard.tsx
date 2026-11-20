import Link from "next/link";
import { Check, ArrowLeft } from "lucide-react";
import type { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  return (
    <Card
      className={`flex h-full flex-col justify-between border-slate-200/90 transition-all duration-200 hover:border-primary/50 hover:shadow-md ${className}`.trim()}
    >
      <div className="flex flex-1 flex-col space-y-4">
        {/* Badges Header */}
        <div className="flex items-center justify-between">
          <Badge variant="default" className="text-xs font-medium">
            {product.category}
          </Badge>
          {product.badgeText && (
            <Badge variant={product.badgeVariant || "default"}>
              {product.badgeText}
            </Badge>
          )}
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-lg font-bold text-slate-900">{product.title}</h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* SaaS-Styled Price Display */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-primary">$</span>
            <span className="text-3xl font-black tracking-tight text-slate-900">
              {product.price}
            </span>
            <span className="text-xs font-medium text-slate-500 mr-1">
              / شهرياً
            </span>
          </div>
          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
            تجديد مرن
          </span>
        </div>

        {/* Features List */}
        <ul className="space-y-2.5 text-sm text-slate-600">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check
                className="h-4 w-4 shrink-0 text-emerald-600"
                aria-hidden="true"
              />
              <span className="line-clamp-1">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Aligned Action Button at the bottom linking to product details */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link href={`/products/${product.id}`} className="block w-full">
          <Button variant="primary" className="w-full justify-center">
            <span>اكتشف المزيد</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
