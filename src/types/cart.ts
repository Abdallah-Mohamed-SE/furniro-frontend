// ============================================================
// src/types/cart.ts
// ============================================================

import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
}
