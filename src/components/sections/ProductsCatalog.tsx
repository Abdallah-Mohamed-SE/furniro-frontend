"use client";

import { useState, useMemo } from "react";
import { Search, SearchX, RotateCcw } from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export interface ProductsCatalogProps {
  products: Product[];
  className?: string;
}

type FilterCategory = ProductCategory | "الكل";

const categories: FilterCategory[] = ["الكل", "إدارة", "تحليلات", "أتمتة"];

export function ProductsCatalog({
  products,
  className = "",
}: ProductsCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("الكل");

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "الكل" || product.category === selectedCategory;
      const matchesSearch =
        term === "" ||
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, searchTerm, selectedCategory]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
  };

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      {/* Responsive Toolbar for Mobile (375px+) and Desktop */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-xs sm:flex-row sm:items-center sm:justify-between sm:p-4">
        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs md:max-w-sm">
          <label htmlFor="catalog-search" className="sr-only">
            البحث في المنتجات
          </label>
          <Search
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id="catalog-search"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث بالاسم أو الوصف..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2 pr-9 pl-3 text-sm text-foreground placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Category Filters with safe wrap for 375px */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? "primary" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-xs sm:text-sm px-3 py-1.5"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid with Identical Row Height */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="flex flex-col items-center justify-center p-8 sm:p-12 text-center border-dashed border-slate-300">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <SearchX className="h-7 w-7" aria-hidden="true" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            لم نتمكن من العثور على أي منتج
          </h3>
          <p className="mt-2 max-w-sm text-sm text-slate-500">
            لم نجد أي نتائج تطابق &quot;{searchTerm}&quot; في تصنيف{" "}
            {selectedCategory}. جرّب استخدام كلمات بحث أخرى.
          </p>
          <div className="mt-6">
            <Button variant="outline" size="md" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>إعادة ضبط البحث</span>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
