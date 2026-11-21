import { api } from "@/lib/api";
import { MOCK_PRODUCTS } from "@/data/products";
import type { Product, ProductFilters, Category } from "@/types/product";

interface ProductsBackendResponse {
  data: any[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function normalizeProduct(raw: any): Product {
  if (!raw) return raw;

  const categoryStr =
    typeof raw.category === "object" && raw.category !== null
      ? raw.category.nameAr || raw.category.name || ""
      : String(raw.category || "");

  const categorySlug =
    typeof raw.category === "object" && raw.category !== null
      ? raw.category.slug || ""
      : "";

  const title = raw.nameAr || raw.name || raw.title || "";
  const subtitle = raw.subtitleAr || raw.subtitle || "";
  const description = raw.descriptionAr || raw.description || "";
  const reviewCount = raw.reviewsCount ?? raw.reviewCount ?? 0;

  let price = raw.price;
  let discountPrice = raw.discountPrice;

  if (raw.originalPrice && raw.price && raw.price < raw.originalPrice) {
    discountPrice = raw.price;
    price = raw.originalPrice;
  } else if (raw.discountPercent && raw.price && !discountPrice) {
    discountPrice = Math.round(raw.price * (1 - raw.discountPercent / 100));
  }

  // Normalize image URLs
  const images = Array.isArray(raw.images) && raw.images.length > 0
    ? raw.images.map((img: string) => {
        if (typeof img !== "string") return "/images/products/syltherine-1.jpg";
        let clean = img.replace(/^https?:\/\/[^/]+/i, "");
        if (!clean.startsWith("/")) {
          clean = `/${clean}`;
        }
        return clean;
      })
    : ["/images/products/syltherine-1.jpg"];

  const relatedProducts = Array.isArray(raw.relatedProducts)
    ? raw.relatedProducts.map(normalizeProduct)
    : undefined;

  return {
    ...raw,
    id: raw.id,
    slug: raw.slug,
    title,
    name: raw.name,
    nameAr: raw.nameAr,
    subtitle,
    subtitleAr: raw.subtitleAr,
    description,
    descriptionAr: raw.descriptionAr,
    category: categoryStr,
    categorySlug,
    price,
    originalPrice: raw.originalPrice,
    discountPrice,
    discountPercent: raw.discountPercent,
    stock: raw.stock ?? 10,
    images,
    sizes: Array.isArray(raw.sizes) ? raw.sizes : undefined,
    colors: Array.isArray(raw.colors) ? raw.colors : undefined,
    rating: raw.rating ?? 5,
    reviewCount,
    reviewsCount: reviewCount,
    brand: raw.brand || "Furniro",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    isFeatured: Boolean(raw.isFeatured),
    isNew: Boolean(raw.isNew),
    relatedProducts,
  };
}

/**
 * Filter and sort local mock products
 */
function filterMockProducts(filters?: ProductFilters): Product[] {
  let results = [...MOCK_PRODUCTS].map(normalizeProduct);

  if (filters?.category) {
    results = results.filter(
      (p) =>
        p.category === filters.category ||
        p.categorySlug === filters.category
    );
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
    } else if (filters.sortBy === "newest") {
      results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
  }

  return results;
}

/**
 * جلب قائمة المنتجات من خادم NestJS مع دعم الفلترة والبحث والترتيب.
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams();
    if (filters?.category && filters.category !== "الكل") {
      queryParams.set("category", filters.category);
    }
    if (filters?.search) queryParams.set("search", filters.search);
    if (filters?.minPrice !== undefined) queryParams.set("minPrice", String(filters.minPrice));
    if (filters?.maxPrice !== undefined) queryParams.set("maxPrice", String(filters.maxPrice));
    if (filters?.sortBy && filters.sortBy !== "default") {
      queryParams.set("sort", filters.sortBy);
    }
    if (filters?.page) queryParams.set("page", String(filters.page));
    const limit = filters?.limit || filters?.perPage || 100;
    queryParams.set("limit", String(limit));

    const query = queryParams.toString();
    const endpoint = query ? `/products?${query}` : "/products";

    const response = await api.get<ProductsBackendResponse | any[]>(endpoint);

    let rawList: any[] = [];
    if (response && "data" in response && Array.isArray(response.data)) {
      rawList = response.data;
    } else if (Array.isArray(response)) {
      rawList = response;
    } else {
      rawList = MOCK_PRODUCTS;
    }

    return rawList.map(normalizeProduct);
  } catch (err) {
    console.warn("تعذر الاتصال بـ Backend API، يتم استخدام البيانات المحلية:", err);
    return filterMockProducts(filters);
  }
}

/**
 * جلب تفاصيل منتج معين عبر الـ slug من خادم NestJS مع المنتجات ذات الصلة.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await api.get<any>(`/products/${slug}`);

    if (response) {
      // Backend may return { product, relatedProducts } or { ...product, relatedProducts }
      if (response.product) {
        const prod = normalizeProduct(response.product);
        if (Array.isArray(response.relatedProducts)) {
          prod.relatedProducts = response.relatedProducts.map(normalizeProduct);
        }
        return prod;
      }
      return normalizeProduct(response);
    }

    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ? normalizeProduct(found) : null;
  } catch {
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ? normalizeProduct(found) : null;
  }
}

/**
 * جلب التصنيفات من خادم NestJS.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await api.get<Category[]>("/categories");
    if (Array.isArray(response)) {
      return response;
    }
    return [];
  } catch {
    return [
      { id: "1", name: "Dining", nameAr: "غرفة الطعام", slug: "dining" },
      { id: "2", name: "Living", nameAr: "غرفة المعيشة", slug: "living" },
      { id: "3", name: "Bedroom", nameAr: "غرفة النوم", slug: "bedroom" },
      { id: "4", name: "Office", nameAr: "المكتب", slug: "office" },
    ];
  }
}
