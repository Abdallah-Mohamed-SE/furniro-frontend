"use client";

import { useCart } from "@/context/CartContext";

interface OrderSummaryProps {
  paymentMethod: "bank_transfer" | "cash_on_delivery";
  onPaymentChange: (method: "bank_transfer" | "cash_on_delivery") => void;
}

export function OrderSummary({
  paymentMethod,
  onPaymentChange,
}: OrderSummaryProps) {
  const { items, subtotal } = useCart();

  return (
    <aside
      aria-label="ملخص الطلب"
      className="bg-white rounded-sm border border-[#E8E8E8] p-6 sm:p-8 space-y-6"
    >
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#3A3A3A]">ملخص الطلب</h2>

      {/* Product List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm font-semibold text-[#3A3A3A] border-b border-[#E8E8E8] pb-3">
          <span>المنتج</span>
          <span>المجموع الفرعي</span>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-[#898989] text-center py-4">
            السلة فارغة
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => {
              const price = item.product.discountPrice ?? item.product.price;
              return (
                <li
                  key={item.product.id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-[#F4F5F7] border border-[#E8E8E8]">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-xs text-[#898989]">
                          —
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-[#3A3A3A] line-clamp-1 flex-1">
                      {item.product.title}
                      <span className="text-[#898989]">
                        {" "}
                        × {item.quantity}
                      </span>
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-[#3A3A3A] shrink-0">
                    {(price * item.quantity).toLocaleString("ar-SA")} ر.س
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Subtotal & Total */}
      <div className="space-y-3 border-t border-[#E8E8E8] pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#3A3A3A] font-medium">المجموع الفرعي</span>
          <span className="text-[#333333]">
            {subtotal.toLocaleString("ar-SA")} ر.س
          </span>
        </div>
        <div className="flex items-center justify-between text-base font-bold">
          <span className="text-[#3A3A3A]">الإجمالي النهائي</span>
          <span className="text-[#B88E2F] text-xl font-bold">
            {subtotal.toLocaleString("ar-SA")} ر.س
          </span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="border-t border-[#E8E8E8] pt-5 space-y-4">
        <h3 className="text-base font-semibold text-[#3A3A3A]">
          طريقة الدفع
        </h3>

        <fieldset className="space-y-3">
          <legend className="sr-only">اختر طريقة الدفع</legend>

          {/* Bank Transfer */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              checked={paymentMethod === "bank_transfer"}
              onChange={() => onPaymentChange("bank_transfer")}
              className="mt-1 h-4 w-4 accent-[#B88E2F] cursor-pointer"
            />
            <div>
              <span className="text-sm font-semibold text-[#3A3A3A] block">
                التحويل البنكي المباشر
              </span>
              {paymentMethod === "bank_transfer" && (
                <p className="mt-1 text-xs text-[#666666] leading-relaxed">
                  يُرجى تحويل المبلغ إلى حساب Furniro البنكي وإرسال إيصال
                  الدفع. سيتم تأكيد الطلب بعد التحقق من التحويل خلال 24 ساعة.
                </p>
              )}
            </div>
          </label>

          {/* Cash on Delivery */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name="paymentMethod"
              value="cash_on_delivery"
              checked={paymentMethod === "cash_on_delivery"}
              onChange={() => onPaymentChange("cash_on_delivery")}
              className="mt-1 h-4 w-4 accent-[#B88E2F] cursor-pointer"
            />
            <span className="text-sm font-semibold text-[#3A3A3A]">
              الدفع عند الاستلام
            </span>
          </label>
        </fieldset>
      </div>
    </aside>
  );
}
