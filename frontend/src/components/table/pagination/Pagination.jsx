import React from "react";
import "./pagination.css";

const Pagination = ({
    page,
    totalPages,
    totalResults,
    limit,
    onPageChange,
    onLimitChange,
}) => {
    const getPages = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (page > 3) pages.push("...");

            for (
                let i = Math.max(2, page - 1);
                i <= Math.min(totalPages - 1, page + 1);
                i++
            ) {
                pages.push(i);
            }

            if (page < totalPages - 2) pages.push("...");

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination-container">
            {/* Left */}
            <div className="pagination-left">
                <span>Rows per page:</span>
                <select value={limit} onChange={(e) => onLimitChange(+e.target.value)}>
                    {[10, 20, 50, 100].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
            </div>

            {/* Center */}
            <div className="pagination-center">
                Total Results: <strong>{totalResults}</strong>
            </div>

            {/* Right */}
            <div className="pagination-right">
                <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
                    ← Prev
                </button>

                {getPages().map((p, i) =>
                    p === "..." ? (
                        <span key={i} className="dots">…</span>
                    ) : (
                        <button
                            key={p}
                            className={page === p ? "active" : ""}
                            onClick={() => onPageChange(p)}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default Pagination;
