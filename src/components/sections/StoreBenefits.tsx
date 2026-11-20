import { Trophy, ShieldCheck, Truck, Headphones } from "lucide-react";

interface BenefitItem {
  icon: typeof Trophy;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: Trophy,
    title: "جودة فائقة",
    description: "مصنوعة من أرقى الخامات العالمية",
  },
  {
    icon: ShieldCheck,
    title: "ضمان معتمد",
    description: "ضمان حقيقي وشامل لأكثر من سنتين",
  },
  {
    icon: Truck,
    title: "شحن مجاني وسريع",
    description: "لجميع الطلبات الأكثر من 250 ر.س",
  },
  {
    icon: Headphones,
    title: "دعم فني متواصل 24/7",
    description: "فريق متخصص لمساعدتك في أي وقت",
  },
];

export function StoreBenefits() {
  return (
    <section aria-label="مزايا متجر Furniro" className="bg-furniro-sand/50 border-y border-[#f0e6d6] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center text-heading">
                  <Icon className="h-10 w-10 stroke-[1.5]" aria-hidden="true" />
                </span>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-heading">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
