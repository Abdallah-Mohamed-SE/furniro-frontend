"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  function handleCheckout() {
    closeCart();
    router.push("/checkout");
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="سلة المشتريات"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 left-0 flex max-w-full">
        <aside className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-900">سلة المشتريات</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {totalItems}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="إغلاق السلة"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <ShoppingBag className="h-8 w-8" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  سلتك فارغة حالياً
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  لم تقم بإضافة أي منتجات بعد.
                </p>
                <div className="mt-6">
                  <Button variant="primary" size="sm" onClick={closeCart}>
                    <Link href="/products">تصفح المنتجات الآن</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {items.map((item) => {
                  const price =
                    item.product.discountPrice ?? item.product.price;
                  return (
                    <div
                      key={item.product.id}
                      className="flex gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      {/* Product Thumbnail */}
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                        {item.product.images?.[0] ? (
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                            لا توجد صورة
                          </div>
                        )}
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                              <Link
                                href={`/products/${item.product.slug}`}
                                onClick={closeCart}
                                className="hover:text-primary transition-colors"
                              >
                                {item.product.title}
                              </Link>
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {item.product.category}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id)}
                            aria-label={`حذف ${item.product.title} من السلة`}
                            className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Controls */}
                          <div className="flex items-center rounded-md border border-slate-200 bg-slate-50 p-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              aria-label="تقليل الكمية"
                              className="flex h-6 w-6 items-center justify-center rounded text-slate-600 hover:bg-white transition-colors"
                            >
                              <Minus className="h-3 w-3" aria-hidden="true" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              aria-label="زيادة الكمية"
                              className="flex h-6 w-6 items-center justify-center rounded text-slate-600 hover:bg-white transition-colors"
                            >
                              <Plus className="h-3 w-3" aria-hidden="true" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="text-sm font-bold text-slate-900">
                            {price * item.quantity} ر.س
                          </span>
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
                <span>المجموع الفرعي:</span>
                <span className="text-xl text-primary">{subtotal} ر.س</span>
              </div>
              <p className="text-xs text-slate-500">
                الضرائب وتكلفة الشحن يتم احتسابها عند إتمام الدفع.
              </p>

              <div className="space-y-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center gap-2"
                  onClick={handleCheckout}
                >
                  <span>متابعة الشراء</span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-center text-xs text-slate-500 hover:text-rose-600"
                  onClick={clearCart}
                >
                  إفراغ السلة
                </Button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
