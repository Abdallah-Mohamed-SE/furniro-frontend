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
  | "ألعاب";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: ProductCategory;
  images: string[];
  rating: number;
  reviewCount: number;
  brand?: string;
  tags?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface PaginatedProducts {
  data: Product[];
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  perPage?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest";
}
