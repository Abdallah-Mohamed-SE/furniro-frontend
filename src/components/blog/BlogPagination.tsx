export interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="ترقيم صفحات المدونة" className="mt-12 sm:mt-16 flex items-center justify-center gap-3 sm:gap-4">
      {/* Previous Button */}
      {currentPage > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          className="h-12 sm:h-14 px-5 sm:px-6 rounded-[10px] bg-[#f9f1e7] text-sm sm:text-base font-medium text-black transition-colors hover:bg-[#b88e2f] hover:text-white cursor-pointer"
        >
          السابق
        </button>
      )}

      {/* Numbered Page Buttons */}
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={isActive ? "page" : undefined}
            className={`h-12 w-12 sm:h-14 sm:w-14 rounded-[10px] text-base sm:text-lg font-medium transition-colors cursor-pointer flex items-center justify-center ${
              isActive
                ? "bg-[#b88e2f] text-white shadow-xs"
                : "bg-[#f9f1e7] text-black hover:bg-[#b88e2f] hover:text-white"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      {currentPage < totalPages && (
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          className="h-12 sm:h-14 px-5 sm:px-6 rounded-[10px] bg-[#f9f1e7] text-sm sm:text-base font-medium text-black transition-colors hover:bg-[#b88e2f] hover:text-white cursor-pointer"
        >
          التالي
        </button>
      )}
    </nav>
  );
}
