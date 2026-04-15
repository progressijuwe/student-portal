
export default function Pagination({ page, total, perPage, onPageChange }) {

    const totalPages = Math.ceil(total / perPage)

    if (totalPages <= 1) return null

    return (
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between px-4 py-3">
            <span className="text-xs lg:text-sm text-label">
                Showing <span className="font-medium text-black">{(page - 1) * perPage + 1}-
                {Math.min(page * perPage, total)}</span> of <span className="font-medium text-black">{total}</span> students
            </span>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="px-2.5 py-1.25 text-xs lg:text-sm font-medium disabled:opacity-50 border border-label rounded-[5px]"
                >
                    Previous
                </button>

                {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1

                    return (
                        <button
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            className={`px-2.5 py-1.25 text-xs lg:text-sm rounded-[5px] ${
                                page === pageNumber
                                    ? "bg-brand-red border border-brand-red text-white"
                                    : "border border-label text-label"
                            }`}
                        >
                            {pageNumber}
                        </button>
                    )
                })}

                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-2.5 py-1.25 text-xs lg:text-sm font-medium disabled:opacity-50 border border-label rounded-[5px]"
                >
                    Next
                </button>

            </div>
        </div>
    )
}