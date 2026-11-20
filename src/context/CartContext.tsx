"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

const CART_STORAGE_KEY = "storefront_cart";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedRaw = "";
let cachedItems: CartItem[] = [];

function getCartSnapshot(): CartItem[] {
  if (typeof window === "undefined") return cachedItems;
  const raw = localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      const parsed = JSON.parse(raw);
      cachedItems = Array.isArray(parsed) ? parsed : [];
    } catch {
      cachedItems = [];
    }
  }
  return cachedItems;
}

const emptyItems: CartItem[] = [];
function getServerSnapshot(): CartItem[] {
  return emptyItems;
}

function saveCart(items: CartItem[]) {
  cachedItems = items;
  cachedRaw = JSON.stringify(items);
  try {
    localStorage.setItem(CART_STORAGE_KEY, cachedRaw);
  } catch (error) {
    console.error("فشل حفظ السلة في localStorage:", error);
  }
  listeners.forEach((listener) => listener());
}

export interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const items = useSyncExternalStore(subscribe, getCartSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (quantity <= 0) return;
      const current = getCartSnapshot();
      const existingIndex = current.findIndex(
        (item) => item.product.id === product.id
      );

      let updated: CartItem[];
      if (existingIndex > -1) {
        updated = [...current];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: product.stock ? Math.min(newQty, product.stock) : newQty,
        };
      } else {
        updated = [
          ...current,
          {
            product,
            quantity: product.stock
              ? Math.min(quantity, product.stock)
              : quantity,
          },
        ];
      }
      saveCart(updated);
    },
    []
  );

  const removeItem = useCallback((productId: number) => {
    const current = getCartSnapshot();
    const updated = current.filter((item) => item.product.id !== productId);
    saveCart(updated);
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    const current = getCartSnapshot();
    if (quantity <= 0) {
      saveCart(current.filter((item) => item.product.id !== productId));
      return;
    }
    const updated = current.map((item) => {
      if (item.product.id === productId) {
        const finalQty = item.product.stock
          ? Math.min(quantity, item.product.stock)
          : quantity;
        return { ...item, quantity: finalQty };
      }
      return item;
    });
    saveCart(updated);
  }, []);

  const clearCart = useCallback(() => {
    saveCart([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((total, item) => {
        const effectivePrice =
          item.product.discountPrice ?? item.product.price;
        return total + effectivePrice * item.quantity;
      }, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
