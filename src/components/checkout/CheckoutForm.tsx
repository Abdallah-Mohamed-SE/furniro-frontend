"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/checkout/FormField";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCart } from "@/context/CartContext";
import { checkoutSchema, type CheckoutFormData } from "@/types/order";
import { CheckCircle } from "lucide-react";

const COUNTRY_OPTIONS = [
  { value: "SA", label: "المملكة العربية السعودية" },
  { value: "AE", label: "الإمارات العربية المتحدة" },
  { value: "KW", label: "الكويت" },
  { value: "QA", label: "قطر" },
  { value: "BH", label: "البحرين" },
  { value: "OM", label: "سلطنة عُمان" },
  { value: "JO", label: "الأردن" },
  { value: "EG", label: "مصر" },
];

function generateOrderNumber(): string {
  return `ORD-${Date.now().toString().slice(-6)}`;
}

export function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<
    "bank_transfer" | "cash_on_delivery"
  >("bank_transfer");
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      country: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      phone: "",
      email: "",
      notes: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: CheckoutFormData) => {
    void data;
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const generatedOrderNumber = generateOrderNumber();
    setOrderNumber(generatedOrderNumber);
    clearCart();
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6 space-y-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-500">
          <CheckCircle className="h-12 w-12" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3A3A3A]">
            تم تأكيد طلبك بنجاح! 🎉
          </h2>
          <p className="text-[#666666] text-base">
            شكراً لشرائك من Furniro. رقم طلبك هو:
          </p>
          <p className="text-[#B88E2F] text-xl font-bold">{orderNumber}</p>
          <p className="text-sm text-[#898989]">
            سيتم التواصل معك قريباً لتأكيد تفاصيل التوصيل.
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/products")}
          className="mt-4"
        >
          متابعة التسوق
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 px-6 space-y-4">
        <p className="text-[#3A3A3A] text-lg font-semibold">
          سلتك فارغة حالياً
        </p>
        <p className="text-[#666666] text-sm">
          أضف منتجات للسلة قبل إتمام الطلب.
        </p>
        <Button
          variant="primary"
          size="md"
          onClick={() => router.push("/products")}
        >
          تصفح المتجر
        </Button>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="نموذج إتمام الطلب"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 xl:gap-16">
            {/* Billing Details */}
            <section aria-labelledby="billing-heading">
              <h2
                id="billing-heading"
                className="text-2xl font-bold text-[#3A3A3A] mb-8"
              >
                تفاصيل الفوترة والشحن
              </h2>

              <div className="space-y-5">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    name="firstName"
                    label="الاسم الأول"
                    placeholder="محمد"
                    required
                  />
                  <FormField
                    name="lastName"
                    label="اسم العائلة"
                    placeholder="الأحمد"
                    required
                  />
                </div>

                {/* Company (optional) */}
                <FormField
                  name="companyName"
                  label="اسم الشركة (اختياري)"
                  placeholder="شركة Furniro للتصميم الداخلي"
                />

                {/* Country */}
                <FormField
                  name="country"
                  label="الدولة / المنطقة"
                  placeholder="اختر دولتك"
                  as="select"
                  options={COUNTRY_OPTIONS}
                  required
                />

                {/* Street Address */}
                <FormField
                  name="streetAddress"
                  label="العنوان التفصيلي"
                  placeholder="رقم المبنى، اسم الشارع، الحي"
                  required
                />

                {/* City */}
                <FormField
                  name="city"
                  label="المدينة"
                  placeholder="الرياض"
                  required
                />

                {/* Postal Code */}
                <FormField
                  name="postalCode"
                  label="الرمز البريدي"
                  placeholder="12345"
                  required
                />

                {/* Phone */}
                <FormField
                  name="phone"
                  label="رقم الهاتف"
                  placeholder="+966 5X XXX XXXX"
                  type="tel"
                  required
                />

                {/* Email */}
                <FormField
                  name="email"
                  label="البريد الإلكتروني"
                  placeholder="example@email.com"
                  type="email"
                  required
                />

                {/* Notes */}
                <FormField
                  name="notes"
                  label="ملاحظات إضافية (اختياري)"
                  placeholder="أي تعليمات خاصة بالطلب أو التوصيل..."
                  as="textarea"
                />
              </div>
            </section>

            {/* Order Summary */}
            <div className="space-y-6">
              <OrderSummary
                paymentMethod={paymentMethod}
                onPaymentChange={setPaymentMethod}
              />

              {/* Place Order Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="w-full justify-center text-base font-bold tracking-wide"
              >
                {isSubmitting ? "جارٍ تأكيد الطلب..." : "تأكيد الطلب"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
