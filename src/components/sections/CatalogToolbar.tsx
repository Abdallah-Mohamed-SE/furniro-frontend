"use client";

import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";

export interface CatalogToolbarProps {
  totalResults: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage: number;
  onItemsPerPageChange: (count: number) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export function CatalogToolbar({
  totalResults,
  startIndex,
  endIndex,
  itemsPerPage,
  onItemsPerPageChange,
  sortBy,
  onSortByChange,
  isFilterOpen,
  onToggleFilter,
  viewMode,
  onViewModeChange,
}: CatalogToolbarProps) {
  return (
    <div className="w-full bg-[#f9f1e7] py-6 px-4 sm:px-6 lg:px-12 border-y border-[#eddcc7]">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        {/* Right Section: Filter, Views & Results Count */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={onToggleFilter}
            className={`flex items-center gap-2 text-base font-semibold text-black hover:text-primary transition-colors cursor-pointer px-3 py-1.5 rounded-sm ${
              isFilterOpen ? "bg-white/80 text-primary shadow-xs" : ""
            }`}
          >
            <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
            <span>تصفية</span>
          </button>

          {/* View Toggles */}
          <div className="flex items-center gap-2 text-black">
            <button
              type="button"
              onClick={() => onViewModeChange("grid")}
              aria-label="عرض شبكي"
              className={`p-1.5 rounded-sm hover:text-primary transition-colors ${
                viewMode === "grid" ? "text-primary bg-white/70" : "text-black"
              }`}
            >
              <LayoutGrid className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange("list")}
              aria-label="عرض قائمة"
              className={`p-1.5 rounded-sm hover:text-primary transition-colors ${
                viewMode === "list" ? "text-primary bg-white/70" : "text-black"
              }`}
            >
              <List className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Vertical Divider */}
          <div className="hidden sm:block h-7 w-px bg-[#9f9f9f]/60" aria-hidden="true" />

          {/* Results Count Text */}
          <span className="text-sm font-medium text-black">
            {totalResults > 0
              ? `عرض ${startIndex}–${endIndex} من ${totalResults} نتيجة`
              : "لا توجد نتائج"}
          </span>
        </div>

        {/* Left Section: Show & Sort By Controls */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Show Count */}
          <div className="flex items-center gap-3">
            <label htmlFor="items-per-page" className="text-sm sm:text-base font-medium text-black">
              عرض
            </label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="h-11 w-14 rounded-xs border border-transparent bg-white text-center text-sm font-semibold text-[#898989] shadow-xs focus:border-primary focus:outline-none"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort-by-select" className="text-sm sm:text-base font-medium text-black">
              ترتيب حسب
            </label>
            <select
              id="sort-by-select"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
              className="h-11 min-w-[140px] sm:min-w-[170px] rounded-xs border border-transparent bg-white px-3 text-sm font-semibold text-[#898989] shadow-xs focus:border-primary focus:outline-none"
            >
              <option value="default">الافتراضي</option>
              <option value="price_asc">السعر: من الأقل للأعلى</option>
              <option value="price_desc">السعر: من الأعلى للأقل</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="newest">الأحدث</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
