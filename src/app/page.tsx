import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";

export const metadata: Metadata = {
  title: "الرئيسية | معمل الواجهات",
  description:
    "منصتك المتكاملة لبناء واجهات SaaS حديثة وسريعة مع دعم كامل للغة العربية",
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
    </main>
  );
}
