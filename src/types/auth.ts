// ============================================================
// src/types/auth.ts
// ============================================================
import { z } from "zod";
import type { User } from "./user";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "يرجى إدخال البريد الإلكتروني" })
    .email({ message: "البريد الإلكتروني المدخل غير صالح" }),
  password: z
    .string()
    .min(6, { message: "كلمة المرور يجب أن لا تقل عن 6 أحرف" }),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "الاسم الكامل يجب أن يتكون من حرفين على الأقل" })
      .max(60, { message: "الاسم طويل جداً" }),
    email: z
      .string()
      .min(1, { message: "يرجى إدخال البريد الإلكتروني" })
      .email({ message: "البريد الإلكتروني المدخل غير صالح" }),
    phone: z
      .string()
      .min(9, { message: "يرجى إدخال رقم جوال صحيح يتكون من 9 أرقام على الأقل" })
      .regex(/^[+\d\s\-()]+$/, { message: "رقم الجوال يحتوي على رموز غير صالحة" }),
    password: z
      .string()
      .min(6, { message: "كلمة المرور يجب ألا تقل عن 6 أحرف" }),
    confirmPassword: z
      .string()
      .min(1, { message: "يرجى تأكيد كلمة المرور" }),
    agreeToTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "يجب الموافقة على الشروط وسياسة الخصوصية",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export interface UserAddress {
  id: string;
  title: string;
  recipientName: string;
  phone: string;
  city: string;
  street: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  statusText: string;
  total: number;
  itemCount: number;
  items: {
    title: string;
    image: string;
    quantity: number;
    price: number;
  }[];
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterInput) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}
