import { z } from "zod";

export const demoSchema = z.object({
  fullName: z
    .string()
    .min(1, "يرجى إدخال الاسم الكامل")
    .min(3, "يجب أن يحتوي الاسم على 3 أحرف على الأقل"),
  email: z
    .string()
    .min(1, "يرجى إدخال البريد الإلكتروني")
    .email("يرجى إدخال بريد إلكتروني صالح"),
  company: z.string().optional(),
  notes: z.string().optional(),
});

export type DemoFormData = z.infer<typeof demoSchema>;
