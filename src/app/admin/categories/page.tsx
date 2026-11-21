"use client";

import { useEffect, useState } from "react";
import {
  Layers,
  Plus,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";
import type { AdminCategory } from "@/types/admin";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    nameAr: "",
    slug: "",
    image: "/images/categories/dining.jpg",
  });

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await api.get<AdminCategory[]>("/categories");
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch {
      setFeedback({ type: "error", text: "تعذر جلب التصنيفات من السيرفر" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    try {
      await api.post("/categories", formData);
      setFeedback({ type: "success", text: "تمت إضافة التصنيف بنجاح" });
      setFormData({
        name: "",
        nameAr: "",
        slug: "",
        image: "/images/categories/dining.jpg",
      });
      fetchCategories();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "فشل إنشاء التصنيف الجديد";
      setFeedback({ type: "error", text: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف تصنيف "${name}"؟`)) return;
    setDeletingId(id);
    setFeedback(null);
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setFeedback({ type: "success", text: "تم حذف التصنيف بنجاح" });
    } catch {
      setFeedback({ type: "error", text: "فشل حذف التصنيف" });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-heading">إدارة التصنيفات</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            إضافة وتعديل تصنيفات المنتجات والأقسام الرئيسية
          </p>
        </div>
        <button
          type="button"
          onClick={fetchCategories}
          className="inline-flex items-center gap-1.5 self-start rounded-md border border-border bg-white px-3 py-2 text-xs font-semibold text-heading hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>تحديث</span>
        </button>
      </div>

      {/* Notifications */}
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
            <AlertCircle className="h-4 w-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Create Category Form */}
        <div className="lg:col-span-4 rounded-xl border border-border bg-white p-5 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-heading flex items-center gap-2">
            <Plus className="h-4 w-4 text-primary" />
            <span>إضافة تصنيف جديد</span>
          </h2>

          <form onSubmit={handleCreate} className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-heading mb-1">الاسم بالعربية *</label>
              <input
                required
                type="text"
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                placeholder="غرف المعيشة"
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
                placeholder="Living Room"
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
                placeholder="living-room"
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-heading mb-1">مسار الصورة</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/images/categories/living.jpg"
                className="w-full rounded-md border border-border px-3 py-2 text-heading focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary py-2.5 font-bold text-white hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>حفظ التصنيف</span>
            </button>
          </form>
        </div>

        {/* Categories Table */}
        <div className="lg:col-span-8 overflow-hidden rounded-xl border border-border bg-white shadow-2xs">
          <div className="border-b border-border p-4">
            <h2 className="text-base font-bold text-heading flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>قائمة التصنيفات ({categories.length})</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead className="bg-[#FCF8F3] text-xs font-bold text-heading">
                <tr>
                  <th className="px-5 py-3.5">التصنيف</th>
                  <th className="px-5 py-3.5">الرابط (Slug)</th>
                  <th className="px-5 py-3.5">عدد المنتجات</th>
                  <th className="px-5 py-3.5">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-xs text-muted-foreground">
                      جاري تحميل التصنيفات...
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-xs text-muted-foreground">
                      لا توجد تصنيفات بعد.
                    </td>
                  </tr>
                ) : (
                  categories.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-bold text-heading text-xs sm:text-sm">
                          {c.nameAr || c.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground" dir="ltr">
                          {c.name}
                        </p>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                        {c.slug}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                          {c._count?.products ?? 0} منتج
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          disabled={deletingId === c.id}
                          onClick={() => handleDelete(c.id, c.nameAr || c.name)}
                          className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-50"
                          aria-label={`حذف تصنيف ${c.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
