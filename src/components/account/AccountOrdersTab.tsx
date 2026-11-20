import Link from "next/link";
import { Package } from "lucide-react";
import type { UserOrder } from "@/types/auth";

export interface AccountOrdersTabProps {
  orders: UserOrder[];
}

export function AccountOrdersTab({ orders }: AccountOrdersTabProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-16 text-center">
        <Package className="mx-auto h-12 w-12 text-muted-foreground stroke-1" />
        <h3 className="mt-4 text-lg font-bold text-heading">لا توجد طلبات سابقة حتى الآن</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          استكشف تشكيلات الأثاث المميزة وابدأ طلبك الأول الآن.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-sm bg-primary px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark shadow-xs"
        >
          تصفح المتجر
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: UserOrder["status"], text: string) => {
    switch (status) {
      case "delivered":
        return <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">{text}</span>;
      case "processing":
      case "shipped":
        return <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">{text}</span>;
      default:
        return <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">{text}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-xl border border-border bg-white p-5 sm:p-6 shadow-2xs transition-shadow hover:shadow-xs"
        >
          {/* Order Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">رقم الطلب</span>
              <p className="font-mono text-base font-bold text-heading" dir="ltr">
                {order.orderNumber}
              </p>
            </div>

            <div className="space-y-1 text-start sm:text-center">
              <span className="text-xs text-muted-foreground">تاريخ الطلب</span>
              <p className="text-sm font-medium text-heading">{order.date}</p>
            </div>

            <div className="space-y-1 text-start sm:text-end">
              <span className="text-xs text-muted-foreground">الحالة</span>
              <div>{getStatusBadge(order.status, order.statusText)}</div>
            </div>
          </div>

          {/* Items preview */}
          <div className="divide-y divide-border/60 py-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 rounded-md object-cover bg-muted shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="truncate text-sm font-semibold text-heading">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    الكمية: {item.quantity} × {item.price.toLocaleString("ar-SA")} ر.س
                  </p>
                </div>
                <div className="text-sm font-bold text-primary">
                  {(item.price * item.quantity).toLocaleString("ar-SA")} ر.س
                </div>
              </div>
            ))}
          </div>

          {/* Footer Total */}
          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium text-muted-foreground">
              إجمالي الطلب ({order.itemCount} منتجات)
            </span>
            <div className="text-lg font-extrabold text-heading">
              {order.total.toLocaleString("ar-SA")} <span className="text-xs font-normal">ر.س</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
