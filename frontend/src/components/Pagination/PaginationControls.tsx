import type { Pagination } from "../../types/api"

type PaginationControlsProps = {
  meta: Pagination
  onPageChange: (pageNum: number) => void
}

function PaginationControls({
  meta,
  onPageChange,
}: PaginationControlsProps) {
  const {
    currentPage,
    nextPage,
    prevPage,
    totalPages,
    totalCount,
    perPage,
  } = meta

  const start = (currentPage - 1) * perPage + 1
  const end = Math.min(currentPage * perPage, totalCount)

  const getPageNumbers = () => {
    if (totalPages <= 4) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      )
    }

    if (currentPage <= 2) {
      return [1, 2, 3]
    }

    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages]
    }

    return [currentPage - 1, currentPage, currentPage + 1]
  }

  const pageNumbers = getPageNumbers()

  const buttonClasses =
    "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150"

  const inactiveButtonClasses =
    `${buttonClasses} cursor-pointer text-gray-600 hover:bg-gray-200 hover:text-gray-900`

  const showFirstPage =
    totalPages > 4 && currentPage >= totalPages - 2

  const showLastPage =
    totalPages > 4 && currentPage <= 2

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-2 py-4">
      <p className="text-sm text-gray-500">
        {start}–{end} of {totalCount}
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          type="button"
          disabled={!prevPage}
          onClick={() => prevPage && onPageChange(prevPage)}
          className={`${buttonClasses} cursor-pointer text-gray-600 hover:bg-gray-200 
            hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 
            disabled:hover:bg-transparent`}
        >
          ←
        </button>

        {/* First page */}
        {showFirstPage && (
          <>
            <button
              type="button"
              onClick={() => onPageChange(1)}
              className={inactiveButtonClasses}
            >
              1
            </button>

            <span className="px-2 text-sm text-gray-400">
              ...
            </span>
          </>
        )}

        {/* Page numbers */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={
              pageNum === currentPage
                ? `${buttonClasses} cursor-pointer bg-gray-900 text-white hover:bg-gray-700`
                : inactiveButtonClasses
            }
          >
            {pageNum}
          </button>
        ))}

        {/* Last page */}
        {showLastPage && (
          <>
            <span className="px-2 text-sm text-gray-400">
              ...
            </span>

            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              className={inactiveButtonClasses}
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          type="button"
          disabled={!nextPage}
          onClick={() => nextPage && onPageChange(nextPage)}
          className={`${buttonClasses} cursor-pointer text-gray-600 hover:bg-gray-200 
            hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 
            disabled:hover:bg-transparent`}
        >
          →
        </button>
      </div>
    </div>
  )
}

export default PaginationControls
