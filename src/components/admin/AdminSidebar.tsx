"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Layers,
  Mail,
  ArrowRight,
  Sparkles,
  X,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "نظرة عامة", href: "/admin", icon: LayoutDashboard },
  { label: "المنتجات", href: "/admin/products", icon: Package },
  { label: "الطلبات", href: "/admin/orders", icon: ShoppingBag },
  { label: "التصنيفات", href: "/admin/categories", icon: Layers },
  { label: "رسائل التواصل", href: "/admin/messages", icon: Mail },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col justify-between border-l border-border bg-[#FCF8F3] p-6 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-8">
          {/* Brand Logo & Close Button */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-white shadow-xs">
                <Sparkles className="h-5 w-5 fill-white" aria-hidden="true" />
              </span>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-heading">
                  Furniro
                </span>
                <span className="mr-1 rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                  الإدارة
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق القائمة الجانبية"
              className="rounded-md p-1.5 text-muted-foreground hover:bg-white hover:text-heading lg:hidden cursor-pointer"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav aria-label="تنقل لوحة التحكم" className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-md px-3.5 py-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary text-white shadow-xs"
                      : "text-heading hover:bg-white/80 hover:text-primary"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Quick Exit */}
        <div className="border-t border-border pt-4 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3.5 py-2.5 text-xs font-bold text-heading hover:bg-white/80 hover:text-primary transition-colors"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span>العودة إلى متجر Furniro</span>
          </Link>

          <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-2xs border border-border">
            <div className="truncate">
              <p className="truncate text-xs font-bold text-heading">{user?.name}</p>
              <p className="truncate text-[10px] text-muted-foreground" dir="ltr">
                {user?.email}
              </p>
            </div>
            <button
              type="button"
              onClick={logout}
              aria-label="تسجيل الخروج"
              className="rounded-sm p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
