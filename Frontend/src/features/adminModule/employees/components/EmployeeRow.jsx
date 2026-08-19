import { MoreVertical } from "lucide-react";

const EmployeeRow = ({ employee }) => {
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
        {new Date(employee.createdAt).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )}
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
  );
};

export default EmployeeRow;