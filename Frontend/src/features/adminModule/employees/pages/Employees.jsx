import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDebounce, useUpdateEmployeeStatus } from "../hooks/employeeHook";
import { useEmployee } from "../hooks/employeeHook";

import EmployeeHeader from "../components/EmployeeHeader";
import EmployeeTable from "../components/EmployeeTable";
import EmployeePagination from "../components/EmployeePagination";

const Employees = () => {
  const navigate = useNavigate();

  // -----------------------------
  // State
  // -----------------------------
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // -----------------------------
  // Search
  // -----------------------------
  const debouncedSearch = useDebounce(search, 400);

  // -----------------------------
  // API
  // -----------------------------
  const { data, isPending, isFetching } = useEmployee(page, debouncedSearch);

  // active and inactive
  const { mutate: updateStatus, isPending: updateStatusPending } =
    useUpdateEmployeeStatus();

  const handleStatusChange = (employeeId, status) => {
    updateStatus({
      employeeId,
      status,
    });
  };

  // -----------------------------
  // Loading
  // -----------------------------
  if (isPending) {
    return (
      <div className="p-4 text-sm text-[var(--text-muted)]">
        Loading employees...
      </div>
    );
  }

  // -----------------------------
  // API Data
  // -----------------------------
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

  // -----------------------------
  // Pagination Information
  // -----------------------------
  const start = totalEmployees === 0 ? 0 : (currentPage - 1) * limit + 1;

  const end = Math.min(currentPage * limit, totalEmployees);

  return (
    <div className="h-full min-h-0 p-4 flex flex-col gap-4 ">
      {/* Header */}
      <EmployeeHeader onAddEmployee={() => navigate("/home/employee/add")} />

      {/* Employee Table */}
      <div
        className=" flex-1 min-h-0 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)]  shadow-[var(--shadow-md)] flex flex-col relative 
        "
      >
        <EmployeeTable
          employees={employees}
          search={search}
          setSearch={setSearch}
          setPage={setPage}
          totalEmployees={totalEmployees}
          onStatusChange={handleStatusChange}
          isStatusUpdating={updateStatusPending}
        />

        {/* Pagination */}
        <EmployeePagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
          start={start}
          end={end}
          totalEmployees={totalEmployees}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default Employees;
