"use client";

import Link from "next/link";
import { Share2, Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const hasDiscount =
    typeof product.discountPrice === "number" &&
    product.discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  return (
    <div
      className={`group relative flex flex-col overflow-hidden bg-furniro-light transition-all duration-300 hover:shadow-xl ${className}`.trim()}
    >
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-slate-200">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            لا توجد صورة
          </div>
        )}

        {/* Circular Badges (Top-right in RTL) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {hasDiscount && (
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-discount text-xs font-bold text-white shadow-sm">
              -{discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-new text-xs font-bold text-white shadow-sm">
              جديد
            </span>
          )}
        </div>

        {/* Furniro Hover Overlay */}
        <div className="absolute inset-0 bg-heading/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center p-4 z-20">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full max-w-[202px] bg-white text-[#B88E2F] py-3.5 px-6 text-sm font-bold shadow-md hover:bg-white/95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 text-[#B88E2F]" aria-hidden="true" />
            <span>أضف إلى السلة</span>
          </button>

          {/* Quick Action Buttons */}
          <div className="mt-5 flex items-center gap-4 text-xs font-semibold text-white">
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center gap-1 hover:text-furniro-sand transition-colors"
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>التفاصيل</span>
            </Link>
            <button
              type="button"
              aria-label="مشاركة المنتج"
              className="flex items-center gap-1 hover:text-furniro-sand transition-colors cursor-pointer"
            >
              <Share2 className="h-4 w-4" aria-hidden="true" />
              <span>مشاركة</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              aria-label={isWishlisted ? "إزالة من المفضلة" : "إضافة للمفضلة"}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                isWishlisted
                  ? "text-red-400 hover:text-red-300"
                  : "hover:text-rose-400"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${
                  isWishlisted ? "fill-red-500 text-red-500" : ""
                }`}
                aria-hidden="true"
              />
              <span>{isWishlisted ? "في المفضلة" : "إعجاب"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-heading group-hover:text-primary transition-colors line-clamp-1">
            <Link href={`/products/${product.slug}`}>{product.title}</Link>
          </h3>
          <p className="text-xs sm:text-sm text-[#898989] line-clamp-1 mt-1">
            {product.description}
          </p>
        </div>

        {/* Price Box */}
        <div className="pt-2 flex items-baseline gap-3">
          {hasDiscount ? (
            <>
              <span className="text-base sm:text-lg font-bold text-heading">
                {product.discountPrice} ر.س
              </span>
              <span className="text-xs sm:text-sm text-[#b0b0b0] line-through">
                {product.price} ر.س
              </span>
            </>
          ) : (
            <span className="text-base sm:text-lg font-bold text-heading">
              {product.price} ر.س
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
