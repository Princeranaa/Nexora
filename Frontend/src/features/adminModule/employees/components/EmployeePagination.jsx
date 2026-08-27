import { ChevronLeft, ChevronRight } from "lucide-react";

const EmployeePagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  start,
  end,
  totalEmployees,
  setPage,
}) => {
  return (
    <div
      className=" flex items-center justify-between px-4 py-2.5 shrink-0 bg-[var(--bg-main)] rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)]"
    >
      <p className="text-[11px] text-[var(--text-muted)]">
        Showing{" "}
        <span className="text-[var(--text-secondary)]">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="text-[var(--text-secondary)]">{totalEmployees}</span>
      </p>

      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          disabled={!hasPreviousPage}
          onClick={() => setPage((prev) => prev - 1)}
          className="
            p-1.5
            rounded-lg
            border border-[var(--border-color)]
            text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)]
            disabled:opacity-40
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          <ChevronLeft size={15} />
        </button>

        {/* Pages */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`
              w-7 h-7
              rounded-lg
              text-[11px]
              cursor-pointer

              ${
                currentPage === pageNumber
                  ? "bg-[var(--primary)] text-white font-semibold"
                  : "text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              }
            `}
            >
              {pageNumber}
            </button>
          ),
        )}

        {/* Next */}
        <button
          disabled={!hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="
            p-1.5
            rounded-lg
            border border-[var(--border-color)]
            text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)]
            disabled:opacity-40
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default EmployeePagination;
