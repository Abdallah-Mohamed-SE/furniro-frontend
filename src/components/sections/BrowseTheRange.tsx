import Link from "next/link";

interface RangeCategory {
  title: string;
  image: string;
  href: string;
}

const categories: RangeCategory[] = [
  {
    title: "غرف المعيشة",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "غرف الطعام",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
  {
    title: "غرف النوم",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    href: "/products",
  },
];

export function BrowseTheRange() {
  return (
    <section aria-labelledby="range-heading" className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 text-center">
        {/* Section Header */}
        <div className="space-y-2 mb-10 sm:mb-14">
          <h2 id="range-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#333333]">
            تصفح الفئات
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
            مجموعات منتقاة بعناية لكل ركن من أركان منزلك العصري
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-100 shadow-xs">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-5 text-lg sm:text-xl font-bold text-[#333333] group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
