import { apiClient } from "@/lib/api-client";
import { MOCK_PRODUCTS } from "@/data/products";
import type { Product, ProductFilters } from "@/types/product";

interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * جلب قائمة المنتجات مع دعم الفلترة والبحث.
 * يحاول الجلب أولاً من Laravel API، وعند تعذر الاتصال يعود تلقائياً للبيانات المحلية.
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
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

    if (Array.isArray(response)) {
      return response;
    }
    if (response && Array.isArray((response as ApiResponse<Product[]>).data)) {
      return (response as ApiResponse<Product[]>).data;
    }
    return MOCK_PRODUCTS;
  } catch (error) {
    console.warn("Laravel API غير متاح، يتم استخدام البيانات المحلية (Fallback Mock Data):", error);

    let results = [...MOCK_PRODUCTS];

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
}

/**
 * جلب تفاصيل منتج معين عبر الـ slug.
 * يحاول الجلب أولاً من Laravel API، وعند تعذر الاتصال يعود تلقائياً للبيانات المحلية.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await apiClient<Product | ApiResponse<Product>>(`/products/${slug}`);

    if (response && "id" in response && "slug" in response) {
      return response as Product;
    }
    if (response && (response as ApiResponse<Product>).data) {
      return (response as ApiResponse<Product>).data;
    }
    return null;
  } catch (error) {
    console.warn(
      `Laravel API غير متاح، يتم جلب المنتج '${slug}' من البيانات المحلية:`,
      error
    );
    const found = MOCK_PRODUCTS.find((p) => p.slug === slug);
    return found ?? null;
  }
}
