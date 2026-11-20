"use client";

import { useState, useMemo } from "react";

export interface ProductGalleryProps {
  images?: string[];
  title: string;
  hasDiscount?: boolean;
}

export function ProductGallery({
  images,
  title,
  hasDiscount = false,
}: ProductGalleryProps) {
  const displayImages = useMemo(() => {
    if (!images || images.length === 0) {
      return ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"];
    }
    if (images.length >= 4) return images.slice(0, 4);
    const padded = [...images];
    while (padded.length < 4) {
      padded.push(images[padded.length % images.length]);
    }
    return padded;
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = displayImages[activeIndex] || displayImages[0];

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 items-start w-full">
      {/* 4 Thumbnails Gallery */}
      <div className="flex sm:flex-col gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 w-full sm:w-auto shrink-0 justify-start">
        {displayImages.map((img, idx) => {
          const isSelected = activeIndex === idx;
          return (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`عرض الصورة ${idx + 1}`}
              className={`h-[76px] w-[76px] sm:h-[80px] sm:w-[76px] rounded-[10px] bg-[#F9F1E7] p-2 flex items-center justify-center overflow-hidden border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#B88E2F] shadow-sm"
                  : "border-transparent opacity-80 hover:opacity-100 hover:border-[#B88E2F]/40"
              }`}
            >
              <img
                src={img}
                alt={`${title} - مصغرة ${idx + 1}`}
                className="h-full w-full object-contain mix-blend-multiply"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>

      {/* Main Image Showcase */}
      <div className="relative flex-1 w-full aspect-square sm:aspect-auto sm:h-[500px] rounded-[10px] bg-[#F9F1E7] p-6 sm:p-10 flex items-center justify-center overflow-hidden">
        <img
          src={activeImage}
          alt={title}
          className="h-full w-full max-h-[420px] object-contain mix-blend-multiply transition-all duration-300"
        />

        {hasDiscount && (
          <span className="absolute top-4 right-4 rounded-full bg-[#E97171] h-12 w-12 flex items-center justify-center text-xs font-bold text-white shadow-sm">
            خصم
          </span>
        )}
      </div>
    </div>
  );
}
