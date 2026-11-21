"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export interface ProductInfoProps {
  product: Product;
}

const AVAILABLE_SIZES = ["L", "XL", "XS"] as const;
type SizeOption = (typeof AVAILABLE_SIZES)[number];

const AVAILABLE_COLORS = [
  { id: "purple", value: "#816DFA", label: "أرجواني" },
  { id: "black", value: "#000000", label: "أسود" },
  { id: "gold", value: "#B88E2F", label: "ذهبي فيرنيرو" },
];

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, openCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<SizeOption>("L");
  const [selectedColor, setSelectedColor] = useState<string>("#816DFA");
  const [quantity, setQuantity] = useState(1);

  const hasDiscount =
    typeof product.discountPrice === "number" &&
    product.discountPrice < product.price;

  const handleAddToCart = () => {
    addItem(product, quantity);
    openCart();
  };

  const skuCode = `SS${product.id.toString().padStart(3, "0")}`;

  return (
    <article className="space-y-6 w-full max-w-xl">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-heading leading-tight">
        {product.title}
      </h1>

      {/* Pricing */}
      <div className="flex items-baseline gap-3">
        {hasDiscount ? (
          <>
            <span className="text-2xl sm:text-[24px] font-medium text-[#3A3A3A]">
              {product.discountPrice?.toLocaleString("ar-SA")} ر.س
            </span>
            <span className="text-base sm:text-lg text-[#9F9F9F] line-through">
              {product.price.toLocaleString("ar-SA")} ر.س
            </span>
          </>
        ) : (
          <span className="text-2xl sm:text-[24px] font-medium text-[#9F9F9F]">
            {product.price.toLocaleString("ar-SA")} ر.س
          </span>
        )}
      </div>

      {/* Ratings & Customer Reviews */}
      <div className="flex items-center gap-4 text-sm text-[#9F9F9F]">
        <div className="flex items-center gap-1" aria-label={`التقييم ${product.rating} من 5`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${
                star <= Math.round(product.rating)
                  ? "fill-[#FFC700] text-[#FFC700]"
                  : "text-slate-300"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="h-6 w-px bg-[#9F9F9F]/60" aria-hidden="true" />
        <span className="text-[13px] text-[#9F9F9F]">
          {product.reviewCount} تقييم للعملاء
        </span>
      </div>

      {/* Short Description */}
      <p className="text-[13px] sm:text-sm text-black/85 leading-relaxed">
        {product.description}
      </p>

      {/* Size Selector */}
      <div className="space-y-3">
        <span className="text-sm text-[#9F9F9F] block">المقاس</span>
        <div className="flex items-center gap-3">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`h-[30px] w-[30px] rounded-[5px] text-[13px] font-normal flex items-center justify-center transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#B88E2F] text-white shadow-xs"
                    : "bg-[#F9F1E7] text-black hover:bg-[#F9F1E7]/80"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selector */}
      <div className="space-y-3">
        <span className="text-sm text-[#9F9F9F] block">اللون</span>
        <div className="flex items-center gap-3">
          {AVAILABLE_COLORS.map((c) => {
            const isSelected = selectedColor === c.value;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedColor(c.value)}
                aria-label={c.label}
                style={{ backgroundColor: c.value }}
                className={`h-[30px] w-[30px] rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-[#B88E2F] scale-110"
                    : "hover:scale-105"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Quantity & Add to Cart Controls */}
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <div className="flex items-center justify-between border border-[#9F9F9F] rounded-[10px] w-[123px] h-[58px] sm:h-[64px] px-4 bg-white text-base">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="text-black hover:text-[#B88E2F] text-xl font-medium p-1 cursor-pointer transition-colors"
            aria-label="تقليل الكمية"
          >
            -
          </button>
          <span className="font-medium text-black">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => (product.stock ? Math.min(product.stock, prev + 1) : prev + 1))}
            className="text-black hover:text-[#B88E2F] text-xl font-medium p-1 cursor-pointer transition-colors"
            aria-label="زيادة الكمية"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-[215px] h-[58px] sm:h-[64px] border border-black rounded-[15px] text-black text-lg sm:text-[20px] font-normal hover:bg-black hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs active:scale-[0.99]"
        >
          أضف إلى السلة
        </button>
      </div>

      {/* Meta Specifications Divider */}
      <div className="border-t border-[#D9D9D9] pt-8 space-y-3 text-sm sm:text-base text-[#9F9F9F]">
        <div className="flex items-center gap-4">
          <span className="w-24 shrink-0">رمز المنتج</span>
          <span className="text-black/80">: {skuCode}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 shrink-0">التصنيف</span>
          <span className="text-black/80">
            :{" "}
            {typeof product.category === "object" && product.category !== null
              ? (product.category as { nameAr?: string; name?: string }).nameAr ||
                (product.category as { nameAr?: string; name?: string }).name ||
                ""
              : String(product.category || "")}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 shrink-0">الوسوم</span>
          <span className="text-black/80">
            : {product.tags?.join("، ") || "أثاث، منزل، ديكور"}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-24 shrink-0">المشاركة</span>
          <div className="flex items-center gap-3 text-black">
            <span>:</span>
            <button
              type="button"
              aria-label="مشاركة عبر فيسبوك"
              className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold hover:bg-[#B88E2F] transition-colors"
            >
              f
            </button>
            <button
              type="button"
              aria-label="مشاركة عبر لينكد إن"
              className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold hover:bg-[#B88E2F] transition-colors"
            >
              in
            </button>
            <button
              type="button"
              aria-label="مشاركة عبر تويتر"
              className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold hover:bg-[#B88E2F] transition-colors"
            >
              𝕏
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
