// ============================================================
// src/types/admin.ts
// ============================================================

export type OrderStatusType =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  lowStockProducts: number;
  totalUsers: number;
  unreadMessages: number;
  recentOrders: AdminOrder[];
}

export interface AdminOrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
    nameAr?: string;
    slug: string;
    images?: string[];
  };
}

export interface AdminShippingAddress {
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  total: number;
  status: OrderStatusType;
  paymentMethod?: string;
  createdAt: string;
  updatedAt?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
  shippingAddress?: AdminShippingAddress;
  items?: AdminOrderItem[];
}

export interface AdminCategory {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  image?: string;
  _count?: {
    products: number;
  };
}

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ProductFormData {
  sku: string;
  name: string;
  nameAr: string;
  slug: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  stock: number;
  categoryId: string;
  images: string[];
  isNew?: boolean;
}
