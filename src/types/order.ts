// ============================================================
// src/types/order.ts
// ============================================================

import { z } from "zod";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: number;
  productSlug: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  id: number;
  userId: number;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  items: { productId: number; quantity: number }[];
  shippingAddress: ShippingAddress;
  notes?: string;
}

// ─── Checkout Form Zod Schema ────────────────────────────────
export const checkoutSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "الاسم الأول يجب أن يكون حرفين على الأقل" }),
  lastName: z
    .string()
    .min(2, { message: "اسم العائلة يجب أن يكون حرفين على الأقل" }),
  companyName: z.string().optional(),
  country: z.string().min(1, { message: "يرجى اختيار الدولة" }),
  streetAddress: z
    .string()
    .min(5, { message: "يرجى إدخال العنوان التفصيلي كاملاً" }),
  city: z.string().min(2, { message: "يرجى إدخال المدينة" }),
  postalCode: z
    .string()
    .min(4, { message: "الرمز البريدي غير صحيح" })
    .max(10, { message: "الرمز البريدي غير صحيح" }),
  phone: z
    .string()
    .min(9, { message: "رقم الهاتف غير صحيح" })
    .regex(/^[+\d\s\-()]+$/, { message: "رقم الهاتف يحتوي على أحرف غير صالحة" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  notes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
