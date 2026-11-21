"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ShoppingBag,
  Search,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Filter,
} from "lucide-react";
import { api } from "@/lib/api";
import type { AdminOrder, OrderStatusType } from "@/types/admin";

const statusOptions: { value: OrderStatusType; label: string }[] = [
  { value: "PENDING", label: "قيد الانتظار" },
  { value: "CONFIRMED", label: "تم التأكيد" },
  { value: "PROCESSING", label: "قيد التجهيز" },
  { value: "SHIPPED", label: "تم الشحن" },
  { value: "DELIVERED", label: "تم التسليم" },
  { value: "CANCELLED", label: "ملغي" },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await api.get<{ data?: AdminOrder[] } | AdminOrder[]>("/orders?limit=100");
      if (res && "data" in res && Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (Array.isArray(res)) {
        setOrders(res);
      } else {
        setOrders([]);
      }
    } catch {
      setFeedback({ type: "error", text: "تعذر جلب الطلبات من السيرفر" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatusType) => {
    setUpdatingId(orderId);
    setFeedback(null);
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      );
      setFeedback({ type: "success", text: "تم تحديث حالة الطلب بنجاح" });
    } catch {
      setFeedback({ type: "error", text: "فشل تحديث حالة الطلب" });
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = selectedStatus === "ALL" || o.status === selectedStatus;
      const customer = `${o.shippingAddress?.firstName || ""} ${o.shippingAddress?.lastName || ""} ${o.user?.name || ""}`.toLowerCase();
      const orderNum = (o.orderNumber || "").toLowerCase();
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || orderNum.includes(q) || customer.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, selectedStatus, search]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">إدارة الطلبات</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            متابعة جميع طلبات العملاء وتحديث حالات الشحن والتسليم
          </p>
        </div>
        <button
          type="button"
          onClick={fetchOrders}
          className="inline-flex items-center gap-1.5 self-start rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>تحديث الطلبات</span>
        </button>
      </div>

      {/* Notification Banner */}
      {feedback && (
        <div
          role="alert"
          className={`flex items-center gap-2 rounded-lg p-3 text-xs sm:text-sm font-semibold border ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم الطلب أو اسم العميل..."
            className="w-full rounded-md border border-border bg-slate-50/50 py-2 pr-9 pl-4 text-xs sm:text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-heading focus:border-primary focus:outline-none cursor-pointer"
          >
            <option value="ALL">جميع الحالات ({orders.length})</option>
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[#FCF8F3] text-xs font-bold text-heading">
              <tr>
                <th className="px-5 py-3.5">رقم الطلب</th>
                <th className="px-5 py-3.5">العميل والشحن</th>
                <th className="px-5 py-3.5">المنتجات</th>
                <th className="px-5 py-3.5">طريقة الدفع</th>
                <th className="px-5 py-3.5">الإجمالي</th>
                <th className="px-5 py-3.5">التاريخ</th>
                <th className="px-5 py-3.5">الحالة والإجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-muted-foreground">
                    جاري تحميل سجل الطلبات...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-muted-foreground">
                    لم يتم العثور على أي طلبات تطابق معايير البحث.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => {
                  const customerName =
                    ord.user?.name ||
                    (ord.shippingAddress?.firstName
                      ? `${ord.shippingAddress.firstName} ${ord.shippingAddress.lastName || ""}`.trim()
                      : "عميل زائر");

                  const dateStr = new Date(ord.createdAt).toLocaleDateString("ar-SA", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  const itemCount =
                    ord.items?.reduce((acc, it) => acc + (it.quantity || 1), 0) ||
                    ord.items?.length ||
                    1;

                  return (
                    <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 font-mono text-xs font-bold text-heading">
                        {ord.orderNumber}
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-xs font-bold text-heading">{customerName}</p>
                        <p className="text-[11px] text-muted-foreground" dir="ltr">
                          {ord.user?.email || ord.shippingAddress?.email || "-"}
                        </p>
                        {ord.shippingAddress?.city && (
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {ord.shippingAddress.city}، {ord.shippingAddress.street || ""}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 text-xs">
                        <span className="font-semibold text-heading">{itemCount} عناصر</span>
                        <div className="mt-0.5 max-w-[180px] truncate text-[11px] text-muted-foreground">
                          {ord.items?.map((it) => it.product?.nameAr || it.product?.name).filter(Boolean).join("، ") || "أثاث Furniro"}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground font-medium">
                        {ord.paymentMethod || "دفع إلكتروني"}
                      </td>
                      <td className="px-5 py-4 font-bold text-heading text-xs whitespace-nowrap">
                        {ord.total.toLocaleString("ar-SA")} ر.س
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="px-5 py-4">
                        <select
                          disabled={updatingId === ord.id}
                          value={ord.status}
                          onChange={(e) =>
                            handleStatusChange(ord.id, e.target.value as OrderStatusType)
                          }
                          className="rounded-md border border-border bg-white px-2.5 py-1.5 text-xs font-bold text-heading shadow-2xs focus:border-primary focus:outline-none cursor-pointer disabled:opacity-50"
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
