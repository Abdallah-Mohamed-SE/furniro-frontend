"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  Search,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

export interface NavbarProps {
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "المتجر", href: "/products" },
  { label: "المدونة", href: "/blog" },
  { label: "من نحن", href: "/about" },
  { label: "اتصل بنا", href: "/contact" },
];

export function Navbar({ className = "" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { totalItems: wishlistTotalItems, openDrawer: openWishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => {
    setIsOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-md transition-all ${className}`.trim()}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Furniro Brand Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary text-white shadow-xs">
            <Sparkles className="h-5 w-5 fill-white" aria-hidden="true" />
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-heading font-sans">
            Furniro
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* User Account Desktop Menu */}
          {isAuthenticated ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-label="قائمة الحساب"
                className="flex items-center gap-1.5 rounded-full p-1 text-foreground hover:text-primary transition-colors focus:outline-none cursor-pointer"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fff3e3] border border-primary/30 text-primary text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                </span>
              </button>

              {isUserMenuOpen && (
                <div
                  className="absolute start-0 mt-2 w-48 rounded-lg border border-border bg-white py-2 shadow-lg z-50"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <div className="border-b border-border px-4 py-2">
                    <p className="truncate text-xs font-bold text-heading">{user?.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground" dir="ltr">{user?.email}</p>
                  </div>
                  {user?.role?.toUpperCase() === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex w-full items-center gap-2 px-4 py-2 text-xs font-bold text-primary hover:bg-[#fff3e3] transition-colors border-b border-border/50"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      <span>لوحة الإدارة</span>
                    </Link>
                  )}
                  <Link
                    href="/account"
                    className="flex w-full items-center px-4 py-2 text-xs font-medium text-heading hover:bg-[#fff3e3] hover:text-primary transition-colors"
                  >
                    حسابي وطلباتي
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              aria-label="تسجيل الدخول"
              className="hidden sm:inline-flex text-foreground hover:text-primary transition-colors p-1"
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>
          )}

          {/* Search */}
          <Link
            href="/products"
            aria-label="البحث عن منتجات"
            className="hidden sm:inline-flex text-foreground hover:text-primary transition-colors p-1"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>

          {/* Wishlist */}
          <button
            type="button"
            onClick={openWishlist}
            aria-label={`المفضلة (${wishlistTotalItems} عناصر)`}
            className="relative hidden sm:inline-flex text-foreground hover:text-primary transition-colors p-1 cursor-pointer"
          >
            <Heart
              className={`h-5 w-5 ${
                wishlistTotalItems > 0 ? "text-red-500 fill-red-500" : ""
              }`}
              aria-hidden="true"
            />
            {wishlistTotalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow-xs">
                {wishlistTotalItems > 99 ? "+99" : wishlistTotalItems}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            type="button"
            onClick={openCart}
            aria-label={`سلة التسوق (${totalItems} عناصر)`}
            className="relative inline-flex text-foreground hover:text-primary transition-colors p-1"
          >
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-white shadow-xs">
                {totalItems > 99 ? "+99" : totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
            aria-expanded={isOpen}
            aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-b border-border bg-white px-6 py-6 md:hidden shadow-xl">
          <nav aria-label="تنقل الهاتف" className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="py-2 text-lg font-medium text-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                closeMenu();
                openWishlist();
              }}
              className="py-2 text-lg font-medium text-foreground transition-colors hover:text-primary flex items-center justify-between cursor-pointer text-start"
            >
              <span className="flex items-center gap-2">
                <Heart
                  className={`h-5 w-5 ${
                    wishlistTotalItems > 0 ? "text-red-500 fill-red-500" : ""
                  }`}
                  aria-hidden="true"
                />
                <span>قائمة المفضلة</span>
              </span>
              {wishlistTotalItems > 0 && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  {wishlistTotalItems}
                </span>
              )}
            </button>

            <div className="mt-2 border-t border-border pt-4">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  {user?.role?.toUpperCase() === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={closeMenu}
                      className="py-2 text-base font-bold text-primary flex items-center gap-2"
                    >
                      <ShieldCheck className="h-5 w-5" />
                      <span>لوحة الإدارة</span>
                    </Link>
                  )}
                  <Link
                    href="/account"
                    onClick={closeMenu}
                    className="py-2 text-base font-bold text-primary flex items-center justify-between"
                  >
                    <span>حسابي وطلباتي</span>
                    <span className="text-xs text-muted-foreground">{user?.name}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="text-start py-1.5 text-sm font-semibold text-red-600"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary py-2.5 text-center text-sm font-bold text-white shadow-xs"
                >
                  <User className="h-4 w-4" />
                  <span>تسجيل الدخول / إنشاء حساب</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
