"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Product } from "@/types/product";

const WISHLIST_STORAGE_KEY = "furniro_wishlist";

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
let cachedItems: Product[] = [];

function getWishlistSnapshot(): Product[] {
  if (typeof window === "undefined") return cachedItems;
  const raw = localStorage.getItem(WISHLIST_STORAGE_KEY) ?? "[]";
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

const emptyItems: Product[] = [];
function getServerSnapshot(): Product[] {
  return emptyItems;
}

function saveWishlist(items: Product[]) {
  cachedItems = items;
  cachedRaw = JSON.stringify(items);
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, cachedRaw);
  } catch (error) {
    console.error("فشل حفظ المفضلة في localStorage:", error);
  }
  listeners.forEach((listener) => listener());
}

export interface WishlistContextValue {
  items: Product[];
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const items = useSyncExternalStore(
    subscribe,
    getWishlistSnapshot,
    getServerSnapshot
  );
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);

  const isInWishlist = useCallback(
    (productId: string | number) => {
      const current = getWishlistSnapshot();
      return current.some((item) => String(item.id) === String(productId));
    },
    []
  );

  const removeFromWishlist = useCallback((productId: string | number) => {
    const current = getWishlistSnapshot();
    const updated = current.filter(
      (item) => String(item.id) !== String(productId)
    );
    saveWishlist(updated);
  }, []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      const current = getWishlistSnapshot();
      const exists = current.some(
        (item) => String(item.id) === String(product.id)
      );

      if (exists) {
        removeFromWishlist(product.id);
      } else {
        saveWishlist([...current, product]);
      }
    },
    [removeFromWishlist]
  );

  const clearWishlist = useCallback(() => {
    saveWishlist([]);
  }, []);

  const value: WishlistContextValue = {
    items,
    isOpen,
    openDrawer,
    closeDrawer,
    toggleWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    totalItems: items.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
