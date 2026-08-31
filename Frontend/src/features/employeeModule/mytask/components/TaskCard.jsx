import { CalendarDays } from "lucide-react";

export const TaskCard = ({ task, onStatusChange, isUpdating }) => {
  const priorityClass = {
    High: `
      text-[var(--danger)]
      bg-[color-mix(in_srgb,var(--danger)_12%,transparent)]
      border-[color-mix(in_srgb,var(--danger)_25%,transparent)]
    `,

    Medium: `
      text-[var(--warning)]
      bg-[color-mix(in_srgb,var(--warning)_12%,transparent)]
      border-[color-mix(in_srgb,var(--warning)_25%,transparent)]
    `,

    Low: `
      text-[var(--success)]
      bg-[color-mix(in_srgb,var(--success)_12%,transparent)]
      border-[color-mix(in_srgb,var(--success)_25%,transparent)]
    `,
  };

  const statusClass = {
    Pending: `
      text-[var(--warning)]
      bg-[color-mix(in_srgb,var(--warning)_12%,transparent)]
      border-[color-mix(in_srgb,var(--warning)_25%,transparent)]
    `,

    "In Progress": `
      text-[var(--primary)]
      bg-[color-mix(in_srgb,var(--primary)_12%,transparent)]
      border-[color-mix(in_srgb,var(--primary)_25%,transparent)]
    `,

    Completed: `
      text-[var(--success)]
      bg-[color-mix(in_srgb,var(--success)_12%,transparent)]
      border-[color-mix(in_srgb,var(--success)_25%,transparent)]
    `,
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getDueDateState = (date, status) => {
    if (status === "Completed") {
      return "text-[var(--text-muted)]";
    }

    if (!date) {
      return "text-[var(--text-muted)]";
    }

    const today = new Date();
    const dueDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return "text-[var(--danger)]";
    }

    if (dueDate.getTime() === today.getTime()) {
      return "text-[var(--warning)]";
    }

    return "text-[var(--text-muted)]";
  };

  const dueDateState = getDueDateState(task.dueDate, task.status);

  return (
    <article
      className=" w-full rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-[var(--shadow-md)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--bg-hover)]
      "
    >
      <div className=" flex items-start justify-between gap-4">
        {/* Title + Description */}

        <div className="min-w-0 flex-1">
          <h2 className=" truncate text-lg font-semibold text-[var(--text-primary)]">
            {task.title}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
            {task.description}
          </p>
        </div>

        {/* Priority */}

        <span
          className={` shrink-0 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold ${priorityClass[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="my-4 h-px w-full bg-[var(--border-color)]" />

      <div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between
        "
      >
        <div className="flex items-center gap-2">
          <CalendarDays size={17} className={dueDateState} />

          <div className="flex flex-col gap-0.5">
            <p className="text-[11px] text-[var(--text-muted)]">Due Date</p>

            <p className={`text-sm font-medium ${dueDateState}`}>
              {formatDate(task.dueDate)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">

          <span
            className={`whitespace-nowrap rounded-md  border px-2.5  py-1.5 text-[11px] font-semibold

              ${statusClass[task.status]}
            `}
          >
            {task.status}
          </span>

          {/* Status Select */}

          <select
            value={task.status}
            disabled={isUpdating}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="h-[34px] min-w-[125px] cursor-pointer rounded-md border border-[var(--border-color)] bg-[var(--bg-surface)] px-2.5 text-xs text-[var(--text-primary)] outline-none transition-colors hover:border-[var(--primary)] focus:border-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
