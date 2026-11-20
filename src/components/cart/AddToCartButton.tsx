"use client";

import { useState } from "react";
import { ShoppingBag, Plus, Minus, Check } from "lucide-react";
import type { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const isOutOfStock = product.stock <= 0;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openCart();
    }, 800);
  };

  return (
    <div className={`space-y-4 ${className}`.trim()}>
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-700">الكمية:</span>
        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1 || isOutOfStock}
            aria-label="تقليل الكمية"
            className="flex h-8 w-8 items-center justify-center rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center font-bold text-sm text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity >= product.stock || isOutOfStock}
            aria-label="زيادة الكمية"
            className="flex h-8 w-8 items-center justify-center rounded text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <span className="text-xs text-slate-500">
          ({product.stock} متوفر في المخزون)
        </span>
      </div>

      {/* Add To Cart CTA Button */}
      <Button
        type="button"
        variant={isAdded ? "outline" : "primary"}
        size="lg"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="w-full justify-center gap-2 text-base font-bold shadow-sm"
      >
        {isAdded ? (
          <>
            <Check className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-emerald-700">تمت الإضافة إلى السلة!</span>
          </>
        ) : (
          <>
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            <span>{isOutOfStock ? "المنتج غير متوفر" : "إضافة إلى سلة التسوق"}</span>
          </>
        )}
      </Button>
    </div>
  );
}
