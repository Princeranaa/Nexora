import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react";

import { useDebounce, useEmployee } from "../hooks/employeeHook";


const Employees = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isPending, isFetching } = useEmployee(page, debouncedSearch);

  if (isPending) {
    return (
      <div className="p-4 text-sm text-[var(--text-muted)]">
        Loading employees...
      </div>
    );
  }

  const employees = data?.employees || [];
  const pagination = data?.pagination;

  const {
    currentPage,
    limit,
    totalEmployees,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = pagination;

  const start = totalEmployees === 0 ? 0 : (currentPage - 1) * limit + 1;

  const end = Math.min(currentPage * limit, totalEmployees);

  return (
    <div className="h-full min-h-0 p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Employees
          </h1>

          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            Manage employees in your organization.
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            px-3 py-2
            rounded-[var(--radius-md)]
            bg-[var(--tertiary)]
            text-black
            text-xs font-medium
            cursor-pointer
          "
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      {/* Employee Card */}
      <div
        className="
          flex-1
          min-h-0
          overflow-hidden
          rounded-[var(--radius-md)]
          border border-[var(--border-color)]
          bg-[var(--bg-card)]
          shadow-[var(--shadow-md)]
          flex flex-col
        "
      >
        {/* Search */}
        <div
          className="
            flex items-center justify-between
            px-4 py-3
            border-b border-[var(--border-color)]
            shrink-0
          "
        >
          <div className="relative w-72">
            <Search
              size={16}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-[var(--text-muted)]
                pointer-events-none
              "
            />

            <input
              type="text"
               value={search}
              placeholder="Search employees..."
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                w-full
                pl-9 pr-3 py-2
                rounded-lg
                bg-[var(--bg-surface)]
                border border-[var(--border-color)]
                text-[var(--text-primary)]
                placeholder:text-[var(--text-muted)]
                text-xs
                outline-none
                focus:border-[var(--tertiary)]
              "
            />
          </div>

          <span className="text-xs text-[var(--text-muted)]">
            {totalEmployees} employees
          </span>
        </div>

        {/* Table */}
        <div className="flex-1 min-h-0 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-[var(--bg-card)] z-10">
              <tr className="border-b border-[var(--border-color)]">
                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-muted)]">
                  Employee
                </th>

                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-muted)]">
                  Email
                </th>

                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-muted)]">
                  Role
                </th>

                <th className="px-4 py-2.5 text-left text-[11px] font-medium text-[var(--text-muted)]">
                  Joined
                </th>

                <th className="px-4 py-2.5 text-right text-[11px] font-medium text-[var(--text-muted)]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee) => (
                <tr
                  key={employee._id}
                  className="
                    border-b border-[var(--border-color)]
                    hover:bg-[var(--bg-hover)]
                    transition
                  "
                >
                  {/* Employee */}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="
                          flex items-center justify-center
                          w-8 h-8
                          rounded-full
                          bg-[var(--primary)]
                          text-[var(--tertiary)]
                          font-semibold
                          text-xs
                          shrink-0
                        "
                      >
                        {employee.fullname.firstname[0]}
                        {employee.fullname.lastname[0]}
                      </div>

                      <div>
                        <p className="text-xs font-medium text-[var(--text-primary)]">
                          {employee.fullname.firstname}{" "}
                          {employee.fullname.lastname}
                        </p>

                        <p className="text-[10px] text-[var(--text-muted)]">
                          ID: {employee._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">
                    {employee.email}
                  </td>

                  {/* Role */}
                  <td className="px-4 py-2.5">
                    <span
                      className="
                        inline-flex
                        px-2 py-0.5
                        rounded-full
                        bg-blue-500/10
                        text-blue-400
                        text-[10px]
                        font-medium
                      "
                    >
                      {employee.role}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-2.5 text-xs text-[var(--text-secondary)]">
                    {new Date(employee.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-2.5 text-right">
                    <button
                      className="
                        p-1.5
                        text-[var(--text-muted)]
                        hover:bg-[var(--bg-hover)]
                        rounded-lg
                        cursor-pointer
                      "
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className="
            flex items-center justify-between
            px-4 py-2.5
            border-t border-[var(--border-color)]
            shrink-0
          "
        >
          <p className="text-[11px] text-[var(--text-muted)]">
            Showing{" "}
            <span className="text-[var(--text-secondary)]">
              {start}-{end}
            </span>{" "}
            of{" "}
            <span className="text-[var(--text-secondary)]">
              {totalEmployees}
            </span>
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
                      ? "bg-[var(--tertiary)] text-black font-semibold"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
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

        {/* Fetching indicator */}
        {isFetching && (
          <div
            className="
              absolute
              bottom-2
              right-4
              text-[10px]
              text-[var(--text-muted)]
            "
          >
            Updating...
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
