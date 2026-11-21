"use client";

import Link from "next/link";
import { X, Trash2, ShoppingBag, Heart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export function WishlistDrawer() {
  const {
    items,
    isOpen,
    closeDrawer,
    removeFromWishlist,
    clearWishlist,
    totalItems,
  } = useWishlist();

  const { addItem, openCart } = useCart();

  const handleAddToCart = (product: (typeof items)[number]) => {
    addItem(product, 1);
    openCart();
  };

  const handleAddAllToCart = () => {
    items.forEach((p) => addItem(p, 1));
    closeDrawer();
    openCart();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="قائمة المفضلة"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={closeDrawer}
      />

      <div className="fixed inset-y-0 left-0 flex max-w-full">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-900">قائمة المفضلة</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {totalItems}
              </span>
            </div>
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="إغلاق المفضلة"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-400">
                  <Heart className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  قائمة المفضلة فارغة حالياً
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  لم تقم بإضافة أي منتجات إلى مفضلتك بعد.
                </p>
                <div className="mt-6">
                  <Button variant="primary" size="sm" onClick={closeDrawer}>
                    <Link href="/products">تصفح المنتجات الآن</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {items.map((product) => {
                  const currentPrice = product.discountPrice ?? product.price;
                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      {/* Product Thumbnail */}
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                            لا توجد صورة
                          </div>
                        )}
                      </div>

                      {/* Info & Actions */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                              <Link
                                href={`/products/${product.slug}`}
                                onClick={closeDrawer}
                                className="hover:text-primary transition-colors"
                              >
                                {product.title}
                              </Link>
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {typeof product.category === "object" && product.category !== null
                                ? (product.category as { nameAr?: string; name?: string }).nameAr ||
                                  (product.category as { nameAr?: string; name?: string }).name ||
                                  ""
                                : String(product.category || "")}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(product.id)}
                            aria-label={`حذف ${product.title} من المفضلة`}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Price */}
                          <span className="text-sm font-bold text-slate-900">
                            {currentPrice.toLocaleString("ar-SA")} ر.س
                          </span>

                          {/* Quick Add To Cart */}
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            className="inline-flex items-center gap-1.5 rounded-sm bg-[#B88E2F] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#9A7524] transition-colors cursor-pointer shadow-2xs"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>أضف للسلة</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="border-t border-slate-200 bg-slate-50/70 p-6 space-y-4">
              <div className="flex items-center justify-between text-base font-bold text-slate-900">
                <span>إجمالي المنتجات المفضلة:</span>
                <span className="text-lg text-primary">{totalItems} منتج</span>
              </div>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center gap-2"
                  onClick={handleAddAllToCart}
                >
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>إضافة الكل إلى السلة</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-xs text-slate-500 hover:text-rose-600 cursor-pointer"
                  onClick={clearWishlist}
                >
                  إفراغ المفضلة
                </Button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
