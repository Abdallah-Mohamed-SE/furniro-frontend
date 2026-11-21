// ============================================================
// src/types/product.ts
// ============================================================

export type ProductCategory =
  | "أثاث"
  | "غرف معيشة"
  | "غرف طعام"
  | "غرف نوم"
  | "إضاءة"
  | "ديكور"
  | "تخزين"
  | "كراسي"
  | "طاولات"
  | "إلكترونيات"
  | "ملابس"
  | "رياضة"
  | "كتب"
  | "مطبخ"
  | "جمال وعناية"
  | "ألعاب"
  | string;

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  slug: string;
  image?: string;
  _count?: {
    products: number;
  };
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: number | string;
  slug: string;
  title: string;
  name?: string;
  nameAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  description: string;
  descriptionAr?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  discountPercent?: number;
  stock: number;
  category: ProductCategory;
  categorySlug?: string;
  images: string[];
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviewCount: number;
  reviewsCount?: number;
  brand?: string;
  tags?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  relatedProducts?: Product[];
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  perPage?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest" | "default" | string;
  isNew?: boolean;
}
