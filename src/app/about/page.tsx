import type { Metadata } from "next";
import { AboutBanner } from "@/components/about/AboutBanner";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutValues } from "@/components/about/AboutValues";
import { StoreBenefits } from "@/components/sections/StoreBenefits";

export const metadata: Metadata = {
  title: "من نحن | Furniro للأثاث والديكور العصري",
  description:
    "تعرف على قصة متجر Furniro ورؤيتنا في تصميم الأثاث العصري الفاخر المستوحى من الطراز الاسكندنافي. جودة استثنائية وخامات طبيعية لأناقة منزلك.",
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* 1. Page Header Banner with Furniro Logo & Breadcrumbs */}
      <AboutBanner />

      {/* 2. Furniro Brand Story & Vision Section */}
      <AboutStory />

      {/* 3. Numerical Highlights & Statistics */}
      <AboutStats />

      {/* 4. Why Choose Furniro & Core Values */}
      <AboutValues />

      {/* 5. Furniro Store Benefits Bar */}
      <StoreBenefits />
    </main>
  );
}
