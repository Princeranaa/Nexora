const TaskPagination = ({
  currentPage = 1,
  totalPages = 1,
  limit = 10,
  totalTasks = 0,
  onPageChange,
  onLimitChange,
}) => {
  const startItem =
    totalTasks === 0 ? 0 : (currentPage - 1) * limit + 1;

  const endItem = Math.min(
    currentPage * limit,
    totalTasks
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
    }

    const pages = [1];

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(
      totalPages - 1,
      currentPage + 1
    );

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        border-t
        border-[var(--border-color)]
        bg-[var(--bg-surface)]
        px-4
        py-3
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* Result Count */}
      <p className="text-xs text-[var(--text-secondary)]">
        Showing{" "}
        <span className="font-semibold text-[var(--text-primary)]">
          {startItem}-{endItem}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-[var(--text-primary)]">
          {totalTasks}
        </span>{" "}
        tasks
      </p>

      <div className="flex items-center gap-3">

        {/* Limit */}
        <select
          value={limit}
          onChange={(event) =>
            onLimitChange?.(
              Number(event.target.value)
            )
          }
          className="
            select
            select-sm
            w-auto
            border-[var(--border-color)]
            bg-[var(--bg-surface)]
            text-[var(--text-secondary)]
            focus:border-[var(--primary)]
            focus:outline-none
          "
        >
          <option value={10}>10 / page</option>
          <option value={20}>20 / page</option>
          <option value={50}>50 / page</option>
        </select>

        {/* Pagination */}
        <div className="join">

          {/* Previous */}
          <PageButton
            disabled={currentPage === 1}
            onClick={() =>
              onPageChange?.(currentPage - 1)
            }
          >
            «
          </PageButton>

          {/* Pages */}
          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <PageButton
                key={`dots-${index}`}
                disabled
              >
                ...
              </PageButton>
            ) : (
              <PageButton
                key={page}
                active={currentPage === page}
                onClick={() =>
                  onPageChange?.(page)
                }
              >
                {page}
              </PageButton>
            )
          )}

          {/* Next */}
          <PageButton
            disabled={currentPage === totalPages}
            onClick={() =>
              onPageChange?.(currentPage + 1)
            }
          >
            »
          </PageButton>

        </div>
      </div>
    </div>
  );
};

const PageButton = ({
  children,
  active = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        join-item
        btn
        btn-sm
        border-[var(--border-color)]
        ${
          active
            ? "bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
            : "bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
        }
      `}
    >
      {children}
    </button>
  );
};

export default TaskPagination;