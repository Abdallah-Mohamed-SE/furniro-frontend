import { apiClient } from "@/lib/api-client";
import { MOCK_PRODUCTS } from "@/data/products";
import type { Product, ProductFilters } from "@/types/product";

interface ApiResponse<T> {
  data: T;
  message?: string;
}

function normalizeProduct(raw: any): Product {
  if (!raw) return raw;
  const categoryStr =
    typeof raw.category === "object" && raw.category !== null
      ? raw.category.nameAr || raw.category.name || ""
      : String(raw.category || "");

  const title = raw.title || raw.nameAr || raw.name || "";
  const description = raw.descriptionAr || raw.description || "";
  const reviewCount = raw.reviewCount ?? raw.reviewsCount ?? 0;

  let price = raw.price;
  let discountPrice = raw.discountPrice;

  if (raw.originalPrice && raw.price && raw.price < raw.originalPrice) {
    discountPrice = raw.price;
    price = raw.originalPrice;
  } else if (raw.discountPercent && raw.price && !discountPrice) {
    discountPrice = Math.round(raw.price * (1 - raw.discountPercent / 100));
  }

  return {
    ...raw,
    id: raw.id,
    slug: raw.slug,
    title,
    description,
    category: categoryStr as any,
    price,
    discountPrice,
    stock: raw.stock ?? 10,
    images: Array.isArray(raw.images) && raw.images.length > 0
      ? raw.images.map((img: string) => {
          if (typeof img !== "string") return "/images/products/syltherine-1.jpg";
          let clean = img.replace(/^https?:\/\/[^/]+/i, "");
          if (!clean.startsWith("/")) {
            clean = `/${clean}`;
          }
          return clean;
        })
      : ["/images/products/syltherine-1.jpg"],
    rating: raw.rating ?? 5,
    reviewCount,
    brand: raw.brand || "Furniro",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    isFeatured: Boolean(raw.isFeatured),
    isNew: Boolean(raw.isNew),
  };
}

/**
 * فلترة وترتيب البيانات المحلية
 */
function filterMockProducts(filters?: ProductFilters): Product[] {
  let results = [...MOCK_PRODUCTS].map(normalizeProduct);

  if (filters?.category) {
    results = results.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const q = filters.search.trim().toLowerCase();
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q)
    );
  }

  if (filters?.minPrice !== undefined) {
    results = results.filter((p) => (p.discountPrice ?? p.price) >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    results = results.filter((p) => (p.discountPrice ?? p.price) <= filters.maxPrice!);
  }

  if (filters?.sortBy) {
    if (filters.sortBy === "price_asc") {
      results.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    } else if (filters.sortBy === "price_desc") {
      results.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    } else if (filters.sortBy === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    }
  }

  return results;
}

/**
 * جلب قائمة المنتجات مع دعم الفلترة والبحث.
 * تعمل مباشرة من البيانات المحلية، وتدعم الربط التلقائي بسيرفر NestJS عند تفعيل NEXT_PUBLIC_API_URL.
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    return filterMockProducts(filters);
  }

  try {
    const queryParams = new URLSearchParams();
    if (filters?.category) queryParams.set("category", filters.category);
    if (filters?.search) queryParams.set("search", filters.search);
    if (filters?.minPrice !== undefined) queryParams.set("min_price", String(filters.minPrice));
    if (filters?.maxPrice !== undefined) queryParams.set("max_price", String(filters.maxPrice));
    if (filters?.sortBy) queryParams.set("sort_by", filters.sortBy);
    if (filters?.page) queryParams.set("page", String(filters.page));
    if (filters?.perPage) queryParams.set("per_page", String(filters.perPage));

    const query = queryParams.toString();
    const endpoint = query ? `/products?${query}` : "/products";

    const response = await apiClient<Product[] | ApiResponse<Product[]>>(endpoint);

    let rawList: any[] = [];
    if (Array.isArray(response)) {
      rawList = response;
    } else if (response && Array.isArray((response as ApiResponse<Product[]>).data)) {
      rawList = (response as ApiResponse<Product[]>).data;
    } else {
      rawList = MOCK_PRODUCTS;
    }
    return rawList.map(normalizeProduct);
  } catch {
    return filterMockProducts(filters);
  }
}

/**
 * جلب تفاصيل منتج معين عبر الـ slug.
 * تعمل مباشرة من البيانات المحلية، وتدعم الربط التلقائي بسيرفر NestJS عند تفعيل NEXT_PUBLIC_API_URL.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ? normalizeProduct(found) : null;
  }

  try {
    const response = await apiClient<Product | ApiResponse<Product>>(`/products/${slug}`);

    if (response && "id" in response && "slug" in response) {
      return normalizeProduct(response);
    }
    if (response && (response as ApiResponse<Product>).data) {
      return normalizeProduct((response as ApiResponse<Product>).data);
    }
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ? normalizeProduct(found) : null;
  } catch {
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ? normalizeProduct(found) : null;
  }
}
