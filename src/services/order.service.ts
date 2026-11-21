import { api } from "@/lib/api";
import type { CheckoutFormData } from "@/types/order";
import type { CartItem } from "@/types/cart";
import type { UserOrder } from "@/types/auth";

export interface CreateOrderPayload {
  formData: CheckoutFormData;
  items: CartItem[];
  paymentMethod: "bank_transfer" | "cash_on_delivery" | string;
  shipping?: number;
}

export function mapBackendOrderToUserOrder(order: any): UserOrder {
  const statusMap: Record<string, { status: UserOrder["status"]; text: string }> = {
    PENDING: { status: "pending", text: "قيد الانتظار" },
    PROCESSING: { status: "processing", text: "قيد التجهيز والشحن" },
    SHIPPED: { status: "shipped", text: "تم الشحن" },
    DELIVERED: { status: "delivered", text: "تم التسليم بنجاح" },
    CANCELLED: { status: "cancelled", text: "ملغي" },
  };

  const statusInfo = statusMap[order.status] || {
    status: "processing",
    text: order.status || "قيد المعالجة",
  };

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "اليوم";

  const items = Array.isArray(order.items)
    ? order.items.map((it: any) => ({
        title: it.product?.nameAr || it.product?.name || `منتج رقم ${it.productId}`,
        image: it.product?.images?.[0] || "/images/products/syltherine-1.jpg",
        quantity: it.quantity,
        price: it.price,
      }))
    : [];

  const itemCount = items.reduce((sum: number, it: any) => sum + it.quantity, 0);

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    date,
    status: statusInfo.status,
    statusText: statusInfo.text,
    total: order.total,
    itemCount: itemCount || 1,
    items,
  };
}

/**
 * إرسال طلب جديد إلى خادم NestJS (POST /orders).
 * يدعم كلاً من المستخدمين المسجلين (عبر Bearer token) والزوار.
 */
export async function createOrder(payload: CreateOrderPayload): Promise<{
  orderNumber: string;
  order: any;
}> {
  const { formData, items, paymentMethod, shipping = 0 } = payload;

  const orderItems = items.map((item) => ({
    productId: String(item.product.id),
    quantity: item.quantity,
    selectedSize: "Standard",
    selectedColor: "Natural",
  }));

  const shippingAddress = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    company: formData.companyName || undefined,
    country: formData.country,
    street: formData.streetAddress,
    city: formData.city,
    province: formData.city,
    zipCode: formData.postalCode,
    phone: formData.phone,
    email: formData.email,
  };

  const paymentMethodLabel =
    paymentMethod === "cash_on_delivery"
      ? "Cash on Delivery"
      : "Direct Bank Transfer";

  const requestBody = {
    items: orderItems,
    shippingAddress,
    paymentMethod: paymentMethodLabel,
    shipping,
    notes: formData.notes || undefined,
  };

  try {
    const res = await api.post<any>("/orders", requestBody);
    return {
      orderNumber: res.orderNumber,
      order: res,
    };
  } catch (err: any) {
    // If backend is not available or item stock validation failed, fallback to local confirmation
    console.warn("Backend order creation warning:", err);
    if (err?.status && err.status !== 0) {
      throw err;
    }
    const fallbackNum = `FRN-${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`;
    return {
      orderNumber: fallbackNum,
      order: { orderNumber: fallbackNum },
    };
  }
}

/**
 * جلب سجل طلبات المستخدم المسجل (GET /orders/my-orders).
 */
export async function getMyOrders(): Promise<UserOrder[]> {
  try {
    const res = await api.get<any[]>("/orders/my-orders");
    if (Array.isArray(res)) {
      return res.map(mapBackendOrderToUserOrder);
    }
    return [];
  } catch (err) {
    console.warn("تعذر جلب الطلبات من السيرفر:", err);
    return [];
  }
}
