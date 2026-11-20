// ============================================================
// src/data/products.ts  — Fallback mock data for Furniro Storefront
// Used by product.service.ts when the Laravel API is unavailable.
// ============================================================

import type { Product } from "@/types/product";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "syltherine-cafe-chair",
    title: "سيلثرين - كرسي كافيه أنيق",
    description:
      "كرسي مقهى خفيف الوزن بتصميم مريح وعصري، مصنوع من خشب الزان الصلب مع ظهر مقوّس ومقعد مبطن لتجربة جلوس استثنائية.",
    price: 2500,
    discountPrice: 1750,
    stock: 28,
    category: "كراسي",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580481077190-736be56537ca?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 142,
    brand: "Furniro",
    tags: ["كرسي", "كافيه", "خشب زان"],
    isFeatured: true,
  },
  {
    id: 2,
    slug: "leviosa-stylish-chair",
    title: "ليفيوسا - كرسي مخملي عصري",
    description:
      "كرسي طعام واستقبال بقماش مخملي ناعم وأرجل معدنية مذهّبة تضفي لمسة من الفخامة الإيطالية على ركن المعيشة أو غرفة الطعام.",
    price: 2500,
    stock: 19,
    category: "كراسي",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 98,
    brand: "Furniro",
    tags: ["كرسي", "مخمل", "عصري"],
    isFeatured: true,
    isNew: true,
  },
  {
    id: 3,
    slug: "lolito-luxury-sofa",
    title: "لوليتو - أريكة استرخاء رحبة",
    description:
      "أريكة ثلاثية فسيحة ومريحة بقماش كتاني طبيعي مقاوم للبقع وحشوة إسفنجية عالية الكثافة تضمن الراحة التامة لجميع أفراد العائلة.",
    price: 7000,
    discountPrice: 3500,
    stock: 12,
    category: "غرف معيشة",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 320,
    brand: "Furniro Studio",
    tags: ["كنب", "أريكة", "غرف معيشة"],
    isFeatured: true,
  },
  {
    id: 4,
    slug: "respira-bar-table",
    title: "ريسبايرا - طاولة بار خارجية مع مقاعد",
    description:
      "طاولة بار طويلة مع كرسيين مرتفعين، مصنوعة من خشب الساج الطبيعي المقاوم لعوامل الطقس، مثالية للتراسات والشرفات المفتوحة.",
    price: 5000,
    stock: 15,
    category: "طاولات",
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 64,
    brand: "Furniro Outdoor",
    tags: ["طاولة بار", "خارجي", "خشب ساج"],
    isNew: true,
  },
  {
    id: 5,
    slug: "grifo-night-lamp",
    title: "غريفو - مصباح طاولة سراميك دافئ",
    description:
      "مصباح جانبي سيراميكي بقاعدة منحوتة يدوياً وغطاء قماشي ينشر إضاءة دافئة مريحة للعين، ملائم لغرف النوم وقراءة المساء.",
    price: 1500,
    discountPrice: 1200,
    stock: 45,
    category: "إضاءة",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 88,
    brand: "Furniro Light",
    tags: ["إضاءة", "مصباح", "سيراميك"],
    isFeatured: true,
  },
  {
    id: 6,
    slug: "muggo-coffee-table",
    title: "موغو - طاولة قهوة من الخشب الطبيعي",
    description:
      "طاولة قهوة دائرية منخفضة بتصميم مينيماليست أنيق يبرز عروق الخشب الطبيعي وحواف دائرية آمنة للأطفال في غرف المعيشة.",
    price: 1500,
    stock: 22,
    category: "طاولات",
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 110,
    brand: "Furniro",
    tags: ["طاولة قهوة", "خشب طبيعي", "مينيماليست"],
    isNew: true,
  },
  {
    id: 7,
    slug: "pingky-cute-bed-set",
    title: "بينكي - طقم سرير كينغ اسكندنافي",
    description:
      "سرير كينغ مزدوج بهيكل من خشب البلوط الطبيعي وظهر سرير منجد بقماش عالي الجودة يدعم الظهر والرقبة أثناء الاسترخاء والقراءة.",
    price: 7000,
    discountPrice: 3500,
    stock: 10,
    category: "غرف نوم",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 215,
    brand: "Furniro Sleep",
    tags: ["سرير", "غرف نوم", "خشب بلوط"],
    isFeatured: true,
  },
  {
    id: 8,
    slug: "potty-minimalist-flowerpot",
    title: "بوتي - مزهرية خزفية عصرية",
    description:
      "مزهرية سيراميك بتشطيب يدوي غير لامع (Matte) وأشكال هندسية ناعمة، تبرز جمال النباتات الطبيعية وتكمل أناقة ديكور الرفوف والطاولات.",
    price: 500,
    stock: 60,
    category: "ديكور",
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 76,
    brand: "Furniro Deco",
    tags: ["مزهرية", "سيراميك", "ديكور"],
    isNew: true,
  },
  {
    id: 9,
    slug: "kallax-storage-shelf",
    title: "كالاكس - وحدة رفوف وتخزين هندسية",
    description:
      "وحدة تخزين مربعة متعددة الأقسام مناسبة لعرض الكتب والتحف الفنية، يمكن تثبيتها أفقياً أو عمودياً لتناسب أبعاد مساحتك.",
    price: 3400,
    discountPrice: 2800,
    stock: 18,
    category: "تخزين",
    images: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 94,
    brand: "Furniro",
    tags: ["رفوف", "تخزين", "مكتبة"],
  },
  {
    id: 10,
    slug: "asgaard-sofa",
    title: "أزغارد - أريكة زاوية فندقية فاخرة",
    description:
      "كنبة زاوية L-Shape بتصميم اسكندنافي رحب يجمع بين الهيكل الخشبي المتين والوسائد الناعمة لتوفير أعلى درجات الراحة المنزلية.",
    price: 8500,
    discountPrice: 7200,
    stock: 8,
    category: "غرف معيشة",
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 180,
    brand: "Furniro Studio",
    tags: ["كنب زاوية", "أريكة فندقية", "فاخر"],
    isFeatured: true,
  },
  {
    id: 11,
    slug: "nordic-oak-dining-table",
    title: "نورديك - طاولة طعام من خشب البلوط الصلب",
    description:
      "طاولة طعام تتسع لـ 6 إلى 8 أشخاص، مصنوعة بالكامل من خشب البلوط الصلب مع معالجة زيتية طبيعية تحمي الخشب وتبرز جمال عروقه.",
    price: 6200,
    stock: 14,
    category: "غرف طعام",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 130,
    brand: "Furniro Wood",
    tags: ["طاولة طعام", "خشب بلوط", "طبيعي"],
    isFeatured: true,
  },
  {
    id: 12,
    slug: "aura-pendant-light",
    title: "أورا - ثريا سقفية معلقة بتصميم بوهيمي",
    description:
      "إضاءة سقف معلقة منسوجة يدوياً من خيوط الخيزران والروطان الطبيعي، تنشر ظلالاً ساحرة ودافئة على طاولات الطعام وزوايا المعيشة.",
    price: 950,
    discountPrice: 750,
    stock: 35,
    category: "إضاءة",
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 92,
    brand: "Furniro Light",
    tags: ["ثريا", "إضاءة سقف", "روطان"],
    isNew: true,
  },
];

export const PRODUCTS = MOCK_PRODUCTS;
