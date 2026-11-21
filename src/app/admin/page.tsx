"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  Mail,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { api } from "@/lib/api";
import type { AdminStats, OrderStatusType } from "@/types/admin";

const statusConfig: Record<
  OrderStatusType,
  { label: string; bg: string; text: string }
> = {
  PENDING: {
    label: "قيد الانتظار",
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
  },
  CONFIRMED: {
    label: "تم التأكيد",
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
  },
  PROCESSING: {
    label: "قيد التجهيز",
    bg: "bg-indigo-50 border-indigo-200",
    text: "text-indigo-700",
  },
  SHIPPED: {
    label: "تم الشحن",
    bg: "bg-purple-50 border-purple-200",
    text: "text-purple-700",
  },
  DELIVERED: {
    label: "تم التسليم",
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
  },
  CANCELLED: {
    label: "ملغي",
    bg: "bg-rose-50 border-rose-200",
    text: "text-rose-700",
  },
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await api.get<AdminStats>("/admin/stats");
      setStats(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "تعذر جلب إحصائيات لوحة التحكم";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-48 rounded-md bg-slate-200" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 rounded-xl bg-slate-200" />
          ))}
        </div>
        <div className="h-80 rounded-xl bg-slate-200" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-12 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-3" />
        <h2 className="text-lg font-bold text-slate-900">حدث خطأ أثناء تحميل البيانات</h2>
        <p className="mt-1 text-sm text-slate-600">{error}</p>
        <button
          type="button"
          onClick={fetchStats}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          <span>إعادة المحاولة</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title & Refresh */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">نظرة عامة على المتجر</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            متابعة حية للإيرادات، الطلبات، المنتجات ورسائل العملاء
          </p>
        </div>
        <button
          type="button"
          onClick={fetchStats}
          className="inline-flex items-center gap-1.5 self-start rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>تحديث البيانات</span>
        </button>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Revenue */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">إجمالي الإيرادات</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-heading">
              {stats.totalRevenue.toLocaleString("ar-SA")}
            </span>
            <span className="mr-1 text-xs text-muted-foreground">ر.س</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">الطلبات غير الملغية</p>
        </div>

        {/* Card 2: Orders */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">إجمالي الطلبات</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ShoppingBag className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-heading">
              {stats.totalOrders}
            </span>
            <span className="mr-1 text-xs text-muted-foreground">طلب</span>
          </div>
          <p className="mt-1 text-[11px] text-amber-600 font-medium">
            {stats.pendingOrders} طلبات قيد الانتظار
          </p>
        </div>

        {/* Card 3: Products */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">إجمالي المنتجات</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF3E3] text-primary">
              <Package className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-heading">
              {stats.totalProducts}
            </span>
            <span className="mr-1 text-xs text-muted-foreground">منتج</span>
          </div>
          <p className="mt-1 text-[11px] text-rose-600 font-medium">
            {stats.lowStockProducts} منتجات منخفضة المخزون
          </p>
        </div>

        {/* Card 4: Customers & Messages */}
        <div className="rounded-xl border border-border bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">العملاء والرسائل</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-heading">
              {stats.totalUsers}
            </span>
            <span className="mr-1 text-xs text-muted-foreground">مستخدم</span>
          </div>
          <p className="mt-1 text-[11px] text-blue-600 font-medium flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>{stats.unreadMessages} رسائل جديدة</span>
          </p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="rounded-xl border border-border bg-white shadow-2xs">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-base font-bold text-heading">أحدث الطلبات</h2>
            <p className="text-xs text-muted-foreground">آخر 5 طلبات مسجلة في المتجر</p>
          </div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
          >
            <span>عرض جميع الطلبات</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[#FCF8F3] text-xs font-bold text-heading">
              <tr>
                <th className="px-5 py-3.5">رقم الطلب</th>
                <th className="px-5 py-3.5">العميل</th>
                <th className="px-5 py-3.5">التاريخ</th>
                <th className="px-5 py-3.5">الإجمالي</th>
                <th className="px-5 py-3.5">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">
                    لا توجد طلبات حديثة بعد.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => {
                  const conf = statusConfig[order.status] || {
                    label: order.status,
                    bg: "bg-slate-100 border-slate-200",
                    text: "text-slate-700",
                  };
                  const dateStr = new Date(order.createdAt).toLocaleDateString("ar-SA", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  });

                  const customerName =
                    order.user?.name ||
                    (order.shippingAddress?.firstName
                      ? `${order.shippingAddress.firstName} ${order.shippingAddress.lastName || ""}`.trim()
                      : "عميل زائر");

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4 font-bold text-heading font-mono text-xs">
                        {order.orderNumber}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-heading text-xs">{customerName}</p>
                        <p className="text-[11px] text-muted-foreground" dir="ltr">
                          {order.user?.email || order.shippingAddress?.email || "-"}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-xs text-muted-foreground">{dateStr}</td>
                      <td className="px-5 py-4 font-bold text-heading text-xs">
                        {order.total.toLocaleString("ar-SA")} ر.س
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${conf.bg} ${conf.text}`}
                        >
                          {conf.label}
                        </span>
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
