"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Package,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { api } from "@/lib/api";
import { ProductFormModal } from "@/components/admin/ProductFormModal";
import type { AdminCategory } from "@/types/admin";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get<{ data?: Product[] } | Product[]>("/products?limit=100"),
        api.get<AdminCategory[]>("/categories"),
      ]);

      if (prodRes && "data" in prodRes && Array.isArray(prodRes.data)) {
        setProducts(prodRes.data);
      } else if (Array.isArray(prodRes)) {
        setProducts(prodRes);
      } else {
        setProducts([]);
      }

      if (Array.isArray(catRes)) {
        setCategories(catRes);
      }
    } catch {
      setFeedback({ type: "error", text: "تعذر جلب بيانات المنتجات" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً؟")) {
      return;
    }
    setDeletingId(id);
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setFeedback({ type: "success", text: "تم حذف المنتج بنجاح" });
    } catch {
      setFeedback({ type: "error", text: "فشل حذف المنتج" });
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p: any) => {
      const title = (p.nameAr || p.name || p.title || "").toLowerCase();
      const desc = (p.descriptionAr || p.description || p.subtitleAr || p.subtitle || "").toLowerCase();
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || title.includes(q) || desc.includes(q);

      const rawCat = p.category as any;
      const catId = typeof rawCat === "object" ? rawCat?.id : p.categoryId || rawCat;
      const matchesCategory =
        selectedCategory === "ALL" ||
        catId === selectedCategory ||
        p.category === selectedCategory ||
        rawCat?.slug === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">إدارة المنتجات</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            عرض وتعديل وإضافة منتجات أثاث Furniro ومتابعة المخزون
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            onClick={fetchData}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>تحديث</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة منتج جديد</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {feedback && (
        <div
          role="alert"
          className={`flex items-center gap-2 rounded-lg p-3 text-xs sm:text-sm font-semibold border ${
            feedback.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4 shadow-2xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم أو الوصف..."
            className="w-full rounded-md border border-border bg-slate-50/50 py-2 pr-9 pl-4 text-xs sm:text-sm text-heading placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-heading focus:border-primary focus:outline-none cursor-pointer"
        >
          <option value="ALL">جميع التصنيفات ({products.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameAr || c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead className="bg-[#FCF8F3] text-xs font-bold text-heading">
              <tr>
                <th className="px-5 py-3.5">المنتج</th>
                <th className="px-5 py-3.5">التصنيف</th>
                <th className="px-5 py-3.5">السعر</th>
                <th className="px-5 py-3.5">المخزون</th>
                <th className="px-5 py-3.5">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-muted-foreground">
                    جاري تحميل قائمة المنتجات...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-muted-foreground">
                    لم يتم العثور على أي منتجات.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p: any) => {
                  const isLowStock = (p.stock ?? 10) < 5;
                  const title = p.nameAr || p.name || p.title || "منتج بدون اسم";
                  const desc = p.descriptionAr || p.description || p.subtitleAr || p.subtitle || "";
                  const image = p.images?.[0] || p.image;
                  const catLabel =
                    typeof p.category === "object" && p.category !== null
                      ? p.category.nameAr || p.category.name
                      : String(p.category || "-");

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-slate-100">
                            {image ? (
                              <img
                                src={image}
                                alt={title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                                بلا صورة
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-heading text-xs sm:text-sm line-clamp-1">
                              {title}
                            </p>
                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                              {desc}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs font-medium text-heading">
                        {catLabel}
                      </td>
                      <td className="px-5 py-4 font-bold text-heading text-xs whitespace-nowrap">
                        {Number(p.price || 0).toLocaleString("ar-SA")} ر.س
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            isLowStock
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {p.stock ?? 10} قطعة
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(p);
                              setIsModalOpen(true);
                            }}
                            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
                            aria-label={`تعديل ${title}`}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            disabled={deletingId === p.id}
                            onClick={() => handleDelete(p.id)}
                            className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
                            aria-label={`حذف ${title}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        product={editingProduct}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchData}
      />
    </div>
  );
}
