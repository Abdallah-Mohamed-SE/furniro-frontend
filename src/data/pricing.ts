export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "الأساسية (Starter)",
    price: "$29",
    period: "/ شهرياً",
    description: "مثالية للمطورين والشركات الناشئة في مراحل الإطلاق الأولى.",
    badge: "بداية سريعة",
    features: [
      "حتى 3 مشاريع نشطة",
      "لوحة تحليلات مبسطة",
      "تحديثات مجانية مستمرة",
      "دعم فني عبر البريد الإلكتروني",
    ],
    ctaText: "ابدأ مجاناً",
  },
  {
    id: "pro",
    name: "الاحترافية (Pro)",
    price: "$79",
    period: "/ شهرياً",
    description: "الباقة الأكثر اختياراً للفرق والشركات سريعة التوسع والنمو.",
    badge: "الأكثر شعبية",
    isPopular: true,
    features: [
      "مشاريع ونطاقات غير محدودة",
      "تحليلات فورية ومتقدمة",
      "محرك أتمتة كامل",
      "صلاحيات وأدوار مخصصة للفرق",
      "دعم فني ذو أولوية 24/7",
    ],
    ctaText: "اشترك الآن",
  },
  {
    id: "enterprise",
    name: "المؤسسات (Enterprise)",
    price: "$199",
    period: "/ شهرياً",
    description:
      "حلول مخصصة للمؤسسات الكبرى التي تتطلب أماناً فائقاً وتحكماً شاملاً.",
    badge: "مؤسسات",
    features: [
      "بنية تحتية سحابية مخصصة",
      "شهادات أمان وتوافق متقدمة",
      "اتفاقية مستوى الخدمة (SLA 99.9%)",
      "مدير حساب تقني مخصص",
      "تدريب مخصص لأعضاء الفريق",
    ],
    ctaText: "تواصل مع المبيعات",
  },
];
