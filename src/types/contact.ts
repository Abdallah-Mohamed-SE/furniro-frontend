import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "يرجى إدخال اسمك (حرفين على الأقل)" })
    .max(60, { message: "الاسم لا يمكن أن يتجاوز 60 حرفاً" }),
  email: z
    .string()
    .min(1, { message: "يرجى إدخال البريد الإلكتروني" })
    .email({ message: "صيغة البريد الإلكتروني غير صحيحة" }),
  subject: z
    .string()
    .max(120, { message: "الموضوع لا يمكن أن يتجاوز 120 حرفاً" })
    .optional(),
  message: z
    .string()
    .min(10, { message: "الرسالة يجب أن تحتوي على 10 أحرف على الأقل" })
    .max(1000, { message: "الرسالة لا يمكن أن تتجاوز 1000 حرف" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
