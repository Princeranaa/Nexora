import { Search } from "lucide-react";
import EmployeeRow from "./EmployeeRow";

const EmployeeTable = ({
  employees,
  search,
  setSearch,
  setPage,
  totalEmployees,
  onStatusChange,
  isStatusUpdating,
}) => {
  return (
    <>
      {/* Search */}
      <div className=" flex items-center justify-between px-4 py-3 border-b rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)] shrink-0">
        <div className="relative w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
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
      <div className="flex-1 min-h-0 overflow-auto bg-[var(--bg-surface)]">
        <table className="w-full ">
          <thead className="sticky top-0 z-10">
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
              <EmployeeRow
                key={employee._id}
                employee={employee}
                onStatusChange={onStatusChange}
                isStatusUpdating={isStatusUpdating}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeeTable;
