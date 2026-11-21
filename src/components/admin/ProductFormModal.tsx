"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Plus, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import type { AdminCategory, ProductFormData } from "@/types/admin";
import type { Product } from "@/types/product";

export interface ProductFormModalProps {
  isOpen: boolean;
  product: Product | null;
  categories: AdminCategory[];
  onClose: () => void;
  onSaved: () => void;
}

export function ProductFormModal({
  isOpen,
  product,
  categories,
  onClose,
  onSaved,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    sku: "",
    name: "",
    nameAr: "",
    slug: "",
    subtitle: "",
    subtitleAr: "",
    description: "",
    descriptionAr: "",
    price: 0,
    stock: 10,
    categoryId: "",
    images: ["/images/products/syltherine-1.jpg"],
    isNew: false,
  });
  const [imageInput, setImageInput] = useState("/images/products/syltherine-1.jpg");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      const anyProd = product as any;
      const rawCategory = product.category as any;
      const catId =
        anyProd.categoryId ||
        (typeof rawCategory === "object" && rawCategory?.id
          ? rawCategory.id
          : typeof rawCategory === "string"
            ? rawCategory
            : categories[0]?.id || "");

      const pImages =
        Array.isArray(product.images) && product.images.length > 0
          ? product.images
          : anyProd.image
            ? [anyProd.image]
            : ["/images/products/syltherine-1.jpg"];

      setFormData({
        sku: anyProd.sku || `SKU-${product.id}`,
        name: anyProd.name || product.title || "",
        nameAr: anyProd.nameAr || product.title || anyProd.name || "",
        slug: product.slug || "",
        subtitle: anyProd.subtitle || anyProd.subtitleAr || product.title || "",
        subtitleAr: anyProd.subtitleAr || anyProd.subtitle || product.title || "",
        description: anyProd.description || anyProd.descriptionAr || product.description || "",
        descriptionAr: anyProd.descriptionAr || anyProd.description || product.description || "",
        price: Number(product.price) || 0,
        stock: Number(product.stock ?? anyProd.stock ?? 10),
        categoryId: catId,
        images: pImages,
        isNew: Boolean(product.isNew),
      });
      setImageInput(pImages[0] || "/images/products/syltherine-1.jpg");
    } else {
      setFormData({
        sku: `FRN-${Date.now().toString().slice(-4)}`,
        name: "",
        nameAr: "",
        slug: "",
        subtitle: "",
        subtitleAr: "",
        description: "",
        descriptionAr: "",
        price: 1500,
        stock: 10,
        categoryId: categories[0]?.id || "",
        images: ["/images/products/syltherine-1.jpg"],
        isNew: true,
      });
      setImageInput("/images/products/syltherine-1.jpg");
    }
    setError("");
  }, [product, categories, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const payload = {
      sku: formData.sku.trim(),
      name: formData.name.trim(),
      nameAr: formData.nameAr.trim(),
      slug: formData.slug.trim(),
      subtitle: formData.subtitle.trim(),
      subtitleAr: formData.subtitleAr.trim(),
      description: formData.description.trim(),
      descriptionAr: formData.descriptionAr.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      categoryId: formData.categoryId,
      images: [imageInput.trim()],
      isNew: Boolean(formData.isNew),
    };

    try {
      if (product) {
        await api.patch(`/products/${product.id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      onSaved();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "فشل حفظ بيانات المنتج";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-border">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-lg font-bold text-heading">
            {product ? "تعديل المنتج" : "إضافة منتج جديد"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-slate-100 hover:text-heading cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-heading mb-1">رمز المنتج (SKU) *</label>
              <input
                required
                type="text"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-heading mb-1">الرابط الفريد (Slug) *</label>
              <input
                required
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-heading mb-1">الاسم بالعربية *</label>
              <input
                required
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-heading mb-1">الاسم بالإنجليزية *</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-heading mb-1">الوصف الفرعي (عربي) *</label>
              <input
                required
                type="text"
                value={formData.subtitleAr}
                onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-heading mb-1">الوصف الفرعي (إنجليزي) *</label>
              <input
                required
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-heading mb-1">السعر (ر.س) *</label>
              <input
                required
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-heading mb-1">المخزون *</label>
              <input
                required
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-heading mb-1">التصنيف *</label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nameAr || c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-heading mb-1">رابط الصورة *</label>
            <input
              required
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="/images/products/syltherine-1.jpg"
              className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-heading mb-1">الوصف التفصيلي (عربي) *</label>
            <textarea
              required
              rows={3}
              value={formData.descriptionAr}
              onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isNew"
              checked={formData.isNew}
              onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="isNew" className="text-xs font-bold text-heading cursor-pointer">
              تمييز كمنتج جديد (شارة &quot;جديد&quot;)
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border px-4 py-2 font-semibold text-muted-foreground hover:bg-slate-50 cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2 font-bold text-white hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{product ? "حفظ التعديلات" : "إضافة المنتج"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
