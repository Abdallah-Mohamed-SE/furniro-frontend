import type { Metadata } from "next";
import { ContactBanner } from "@/components/contact/ContactBanner";
import { ContactSection } from "@/components/contact/ContactSection";
import { StoreBenefits } from "@/components/sections/StoreBenefits";

export const metadata: Metadata = {
  title: "اتصل بنا | Furniro",
  description:
    "تواصل مع فريق متجر Furniro للأثاث والديكور العصري. نحن هنا لمساعدتك والإجابة على جميع استفساراتك وتقديم أفضل الخدمات.",
};

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* 1. Header Banner with Furniro Logo & Breadcrumbs */}
      <ContactBanner />

      {/* 2. Main Two-column Contact Section */}
      <ContactSection />

      {/* 3. Store Benefits Bar */}
      <StoreBenefits />
    </main>
  );
}
