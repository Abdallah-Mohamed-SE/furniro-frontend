"use client";

import { useState } from "react";
import type { Product } from "@/types/product";

export interface ProductTabsProps {
  product: Product;
}

type TabType = "description" | "additional" | "reviews";

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  return (
    <section aria-label="تفاصيل المنتج الإضافية" className="border-t border-[#D9D9D9] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-10">
        {/* Tab Headers */}
        <div className="flex items-center justify-center flex-wrap gap-8 sm:gap-14 text-xl sm:text-2xl">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={`transition-colors cursor-pointer pb-2 ${
              activeTab === "description"
                ? "text-black font-medium border-b-2 border-black"
                : "text-[#9F9F9F] font-normal hover:text-black"
            }`}
          >
            الوصف
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("additional")}
            className={`transition-colors cursor-pointer pb-2 ${
              activeTab === "additional"
                ? "text-black font-medium border-b-2 border-black"
                : "text-[#9F9F9F] font-normal hover:text-black"
            }`}
          >
            معلومات إضافية
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`transition-colors cursor-pointer pb-2 ${
              activeTab === "reviews"
                ? "text-black font-medium border-b-2 border-black"
                : "text-[#9F9F9F] font-normal hover:text-black"
            }`}
          >
            المراجعات [{product.reviewCount || 5}]
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "description" && (
          <div className="space-y-8 max-w-5xl mx-auto text-justify text-[#9F9F9F] text-sm sm:text-base leading-relaxed">
            <p>
              يجسد هذا المنتج أسمى معايير التصميم العصري والأناقة الخالدة لمجموعة Furniro،
              حيث تم تصميمه بعناية فائقة لتوفير تجربة استخدام مريحة ومميزة في مساحتك المفضلة.
              تمت معالجة الخامات المستخدمة بدقة لتضمن متانة فائقة تدوم لسنوات مع الحفاظ على رونقها ولمعانها.
            </p>
            <p>
              يتميز المنتج بخفة الوزن والتصميم المريح المتوازن، مع حواف ناعمة وتشطيبات يدوية راقية تعكس براعة
              الصناعة الحرفية. سواء كنت تؤثث ركن معيشة هادئ أو مكتباً عصرياً، فإن هذا التصميم يمنحك التوازن
              المثالي بين الوظيفة العملية والجمال البصري الملهم.
            </p>

            {/* 2 Lifestyle Showcase Cards matching Furniro design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="h-[300px] sm:h-[348px] rounded-[10px] bg-[#F9F1E7] p-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                  alt="عرض تفاصيل الأثاث 1"
                  className="h-full w-full object-cover rounded-[8px] mix-blend-multiply"
                  loading="lazy"
                />
              </div>
              <div className="h-[300px] sm:h-[348px] rounded-[10px] bg-[#F9F1E7] p-6 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80"
                  alt="عرض تفاصيل الأثاث 2"
                  className="h-full w-full object-cover rounded-[8px] mix-blend-multiply"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "additional" && (
          <div className="max-w-3xl mx-auto overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-right text-sm sm:text-base divide-y divide-slate-200">
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-heading w-1/3 bg-slate-50/80">الأبعاد العامة</td>
                  <td className="py-3 px-4 text-slate-600">العرض 220 سم × العمق 90 سم × الارتفاع 85 سم</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-heading bg-slate-50/80">الوزن الصافي</td>
                  <td className="py-3 px-4 text-slate-600">38.5 كجم</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-heading bg-slate-50/80">مادة الهيكل</td>
                  <td className="py-3 px-4 text-slate-600">خشب الزان الطبيعي الصلب المقاوم للرطوبة</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-heading bg-slate-50/80">نوع التنجيد والنسيج</td>
                  <td className="py-3 px-4 text-slate-600">كتان طبيعي فخم مقاوم للبقع وسهل التنظيف</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-heading bg-slate-50/80">بلد المنشأ</td>
                  <td className="py-3 px-4 text-slate-600">تصميم وتصنيع إيطالي حصري لـ Furniro</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-medium text-heading bg-slate-50/80">فترة الضمان</td>
                  <td className="py-3 px-4 text-slate-600">ضمان معتمد وشامل لمدة سنتين كاملتين</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-heading">أحمد الغامدي</span>
                <span className="text-xs text-slate-400">منذ 3 أيام</span>
              </div>
              <div className="text-amber-400 text-sm">★★★★★</div>
              <p className="text-slate-600 text-sm">
                جودة خيالية وتشطيب مذهل، مريح جداً للجلوس والتوصيل كان أسرع مما توقعت. شكراً Furniro!
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-heading">سارة الشمري</span>
                <span className="text-xs text-slate-400">منذ أسبوع</span>
              </div>
              <div className="text-amber-400 text-sm">★★★★★</div>
              <p className="text-slate-600 text-sm">
                اللون في الواقع أجمل من الصور، والخامات ملمسها فاخر وأنيق جداً في الصالة. أنصح به بشدة.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
