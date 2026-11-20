interface GalleryImage {
  url: string;
  alt: string;
  className?: string;
}

const galleryImages: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
    alt: "ركن عمل منزلي أنيق",
    className: "h-64 sm:h-80 w-full object-cover rounded-sm",
  },
  {
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    alt: "كرسي استرخاء أصفر عصري",
    className: "h-64 sm:h-72 w-full object-cover rounded-sm",
  },
  {
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    alt: "ديكور حائط أنيق لغرفة المعيشة",
    className: "h-64 sm:h-96 w-full object-cover rounded-sm",
  },
  {
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    alt: "سرير مريح مع إضاءة دافئة",
    className: "h-64 sm:h-72 w-full object-cover rounded-sm",
  },
];

export function ShareSetup() {
  return (
    <section aria-labelledby="share-heading" className="py-16 sm:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 text-center">
        {/* Title */}
        <div className="space-y-1 mb-10 sm:mb-14">
          <p className="text-sm sm:text-base font-semibold text-muted-foreground">
            شاركنا ركنك المفضل وتنسيقك مع
          </p>
          <h2
            id="share-heading"
            dir="ltr"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-heading inline-block"
          >
            #FuniroFurniture
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-sm shadow-xs transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src={img.url}
                alt={img.alt}
                className={img.className}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
