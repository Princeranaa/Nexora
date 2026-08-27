import { Plus } from "lucide-react";

const EmployeeHeader = ({ onAddEmployee }) => {
  return (
    <div className="flex items-center justify-between shrink-0 ">
      <div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Employees
        </h1>

        <p className="mt-0.5 text-xs text-[var(--text-muted)]">
          Manage employees in your organization.
        </p>
      </div>

      <button
        onClick={onAddEmployee}
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
  );
};

export default EmployeeHeader;