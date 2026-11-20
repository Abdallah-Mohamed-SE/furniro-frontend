"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Package, User as UserIcon, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AccountHeader } from "@/components/account/AccountHeader";
import { AccountOrdersTab } from "@/components/account/AccountOrdersTab";
import { AccountProfileTab } from "@/components/account/AccountProfileTab";
import { AccountAddressesTab } from "@/components/account/AccountAddressesTab";
import { StoreBenefits } from "@/components/sections/StoreBenefits";
import type { UserOrder, UserAddress } from "@/types/auth";

const SAMPLE_ORDERS: UserOrder[] = [
  {
    id: "ord-1",
    orderNumber: "FUR-98214",
    date: "18 نوفمبر 2024",
    status: "processing",
    statusText: "قيد التجهيز والشحن",
    total: 3500,
    itemCount: 2,
    items: [
      {
        title: "كرسي مقهى سيلثرين العصري (Syltherine)",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        price: 2500,
      },
      {
        title: "مصباح Aura الأنيق المعلق",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        price: 1000,
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "FUR-94301",
    date: "04 أكتوبر 2024",
    status: "delivered",
    statusText: "تم التسليم بنجاح",
    total: 7000,
    itemCount: 1,
    items: [
      {
        title: "أريكة لوليتو الفاخرة (Lolito Luxury Sofa)",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        price: 7000,
      },
    ],
  },
];

const SAMPLE_ADDRESSES: UserAddress[] = [
  {
    id: "addr-1",
    title: "المنزل الرئيسي",
    recipientName: "أحمد بن عبد الله",
    phone: "+966 50 123 4567",
    city: "الرياض",
    street: "طريق الملك فهد، حي النخيل، فيلا 24",
    postalCode: "12382",
    isDefault: true,
  },
  {
    id: "addr-2",
    title: "مكتب العمل",
    recipientName: "أحمد بن عبد الله",
    phone: "+966 50 123 4567",
    city: "الرياض",
    street: "طريق العليا، برج الأعمال، الطابق 14",
    postalCode: "11564",
    isDefault: false,
  },
];

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?redirect=/account");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground font-medium">جاري تحميل بيانات الحساب...</p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-12 space-y-10">
        {/* Header Profile Summary */}
        <AccountHeader user={user} onLogout={logout} />

        {/* Tabs Bar */}
        <div className="border-b border-border">
          <nav aria-label="أقسام الحساب" className="flex gap-2 sm:gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-2 border-b-2 py-4 text-sm sm:text-base font-bold transition-colors cursor-pointer ${
                activeTab === "orders"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-heading"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>طلباتي ({SAMPLE_ORDERS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`flex items-center gap-2 border-b-2 py-4 text-sm sm:text-base font-bold transition-colors cursor-pointer ${
                activeTab === "profile"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-heading"
              }`}
            >
              <UserIcon className="h-4 w-4" />
              <span>الملف الشخصي</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("addresses")}
              className={`flex items-center gap-2 border-b-2 py-4 text-sm sm:text-base font-bold transition-colors cursor-pointer ${
                activeTab === "addresses"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-heading"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>عناوين الشحن</span>
            </button>
          </nav>
        </div>

        {/* Tab Content Panels */}
        <div>
          {activeTab === "orders" && <AccountOrdersTab orders={SAMPLE_ORDERS} />}
          {activeTab === "profile" && (
            <AccountProfileTab user={user} onUpdate={updateUser} />
          )}
          {activeTab === "addresses" && (
            <AccountAddressesTab addresses={SAMPLE_ADDRESSES} />
          )}
        </div>
      </div>

      {/* Furniro Store Benefits */}
      <StoreBenefits />
    </main>
  );
}
