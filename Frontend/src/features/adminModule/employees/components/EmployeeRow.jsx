import { MoreVertical } from "lucide-react";
import { useState } from "react";

const EmployeeRow = ({ employee }) => {
  const [open, setOpen] = useState(false);

  return (
    <tr
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
              {employee.fullname.firstname} {employee.fullname.lastname}
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
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="
        p-1.5
        text-[var(--text-muted)]
        hover:bg-[var(--bg-hover)]
        rounded-lg
        cursor-pointer
        transition
      "
          >
            <MoreVertical size={16} />
          </button>

          {open && (
            <div
              className="absolute right-0 top-8 z-50 w-32 rounded-lg border border-white/10 bg-[var(--bg-card)] shadow-lg p-1"
            >
              <button
                type="button"
                onClick={() => {
                setOpen(false);
                }}
                className=" w-full px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--bg-hover)] rounded-md transition"
              >
                Active
              </button>

              <button
                type="button"
                onClick={() => {
                setOpen(false);
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 rounded-md transition"
              >
                Deactivate
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default EmployeeRow;
