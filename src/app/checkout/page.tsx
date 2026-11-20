import type { Metadata } from "next";
import { CheckoutBanner } from "@/components/checkout/CheckoutBanner";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { StoreBenefits } from "@/components/sections/StoreBenefits";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إتمام الطلب | Furniro",
  description: "أكمل عملية الشراء وأدخل تفاصيل الشحن والفوترة لطلبك من متجر Furniro.",
};

export default function CheckoutPage() {
  return (
    <main>
      <CheckoutBanner />
      <CheckoutForm />
      <StoreBenefits />
    </main>
  );
}
