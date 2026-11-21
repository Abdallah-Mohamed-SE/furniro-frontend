"use client";

import { useState, useMemo } from "react";
import { Search, SearchX, RotateCcw } from "lucide-react";
import type { Product, ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CatalogToolbar } from "@/components/sections/CatalogToolbar";

export interface ProductsCatalogProps {
  products: Product[];
  className?: string;
}

type FilterCategory = ProductCategory | "الكل";

const categories: FilterCategory[] = [
  "الكل",
  "كراسي",
  "طاولات",
  "غرف معيشة",
  "غرف طعام",
  "غرف نوم",
  "إضاءة",
  "تخزين",
  "ديكور",
];

export function ProductsCatalog({
  products,
  className = "",
}: ProductsCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const list = new Set<string>();
    products.forEach((p) => {
      if (p.category && typeof p.category === "string") {
        list.add(p.category);
      }
    });
    return ["الكل", ...Array.from(list)];
  }, [products]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "الكل") {
      result = result.filter(
        (p) =>
          p.category === selectedCategory ||
          p.categorySlug === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price_asc") {
      result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const validPage = Math.min(currentPage, totalPages);

  const startIndex = filteredProducts.length > 0 ? (validPage - 1) * itemsPerPage + 1 : 0;
  const endIndex = Math.min(validPage * itemsPerPage, filteredProducts.length);

  const paginatedProducts = useMemo(() => {
    const start = (validPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, validPage, itemsPerPage]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setCurrentPage(1);
    setSortBy("default");
  };

  return (
    <div className={`space-y-8 ${className}`.trim()}>
      {/* 1. Furniro Filter & Sorting Toolbar */}
      <CatalogToolbar
        totalResults={filteredProducts.length}
        startIndex={startIndex}
        endIndex={endIndex}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortByChange={(sort) => {
          setSortBy(sort);
          setCurrentPage(1);
        }}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen((prev) => !prev)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-8">
        {/* Filter Drawer / Expandable Search & Categories */}
        {isFilterOpen && (
          <div className="rounded-xl border border-border bg-[#FCF8F3] p-5 space-y-4 shadow-2xs">
            <div className="relative w-full max-w-md">
              <Search className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#898989]" aria-hidden="true" />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ابحث باسم المنتج أو الموديل..."
                className="w-full rounded-sm border border-[#E8E8E8] bg-white py-2.5 pr-10 pl-3 text-sm text-heading placeholder:text-[#9F9F9F] focus:border-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xs transition-colors cursor-pointer ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-xs"
                      : "bg-white text-heading border border-[#E8E8E8] hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2. Product Grid */}
        {paginatedProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch"
                : "grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch"
            }
          >
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-slate-300">
            <SearchX className="h-10 w-10 text-slate-400" aria-hidden="true" />
            <h3 className="mt-4 text-lg font-bold text-heading">لم نجد أي منتجات تطابق بحثك</h3>
            <p className="mt-1 text-sm text-muted-foreground">جرب تغيير كلمات البحث أو اختيار تصنيف مختلف.</p>
            <div className="mt-5">
              <Button variant="outline" size="md" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>إعادة ضبط الفلاتر</span>
              </Button>
            </div>
          </Card>
        )}

        {/* 3. Furniro Golden Pagination */}
        {totalPages > 1 && (
          <nav aria-label="ترقيم الصفحات" className="pt-8 pb-4 flex items-center justify-center gap-3">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setCurrentPage(pageNumber)}
                aria-current={validPage === pageNumber ? "page" : undefined}
                className={`flex h-12 w-12 items-center justify-center rounded-md text-base font-bold transition-all cursor-pointer ${
                  validPage === pageNumber
                    ? "bg-primary text-white shadow-xs"
                    : "bg-[#F9F1E7] text-black hover:bg-primary hover:text-white"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {validPage < totalPages && (
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="flex h-12 px-6 items-center justify-center rounded-md bg-[#F9F1E7] text-base font-bold text-black hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                التالي
              </button>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
