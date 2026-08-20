import TaskPagination from "./TaskPagination";

const getStatusClass = (status) => {
  const statusClasses = {
    Completed:
      "bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-[var(--success)]",

    "In Progress":
      "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]",

    Pending:
      "bg-[color-mix(in_srgb,var(--text-muted)_14%,transparent)] text-[var(--text-secondary)]",
  };

  return (
    statusClasses[status] ?? "bg-[var(--bg-hover)] text-[var(--text-secondary)]"
  );
};

const getPriorityClass = (priority) => {
  const priorityClasses = {
    High: "bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-[var(--danger)]",

    Medium:
      "bg-[color-mix(in_srgb,var(--warning)_14%,transparent)] text-[var(--warning)]",

    Low: "bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]",
  };

  return (
    priorityClasses[priority] ??
    "bg-[var(--bg-hover)] text-[var(--text-secondary)]"
  );
};

const TaskList = ({
  tasks = [],
  currentPage,
  totalPages,
  limit,
  totalTasks,
  onPageChange,
  onLimitChange,
}) => {
  return (
    <div
      className="
        mt-7
        overflow-hidden
        rounded-[var(--radius-md)]
        border
        border-[var(--border-color)]
        bg-[var(--bg-surface)]
        shadow-[var(--shadow-md)]
      "
    >
      <ul className="list bg-[var(--bg-surface)]">
        {/* Header */}
        <li className="p-4 pb-3">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Tasks
          </h2>

          <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
            Manage and track your assigned tasks
          </p>
        </li>

        {/* Table Header */}
        <li
          className="
            hidden
            border-t
            border-[var(--border-color)]
            bg-[var(--bg-card)]
            px-4
            py-3
            md:grid
            md:grid-cols-[40px_minmax(220px,1fr)_110px_100px_160px_120px_40px]
            md:items-center
            md:gap-3
          "
        >
          <div>
            <input
              type="checkbox"
              className="
                checkbox
                checkbox-xs
                border-[var(--border-color)]
                bg-[var(--bg-surface)]
                checked:border-[var(--primary)]
                checked:bg-[var(--primary)]
                checked:text-white
              "
            />
          </div>

          <Header label="Task" />
          <Header label="Status" />
          <Header label="Priority" />
          <Header label="Assignee" />
          <Header label="Due Date" />

          <div />
        </li>

        {/* Task Rows */}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskRow
              key={task._id}
              task={task}
              getStatusClass={getStatusClass}
              getPriorityClass={getPriorityClass}
            />
          ))
        ) : (
          <EmptyTasks />
        )}
      </ul>

      <TaskPagination
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        totalTasks={totalTasks}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};

const Header = ({ label }) => (
  <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
    {label}
  </div>
);

const TaskRow = ({ task, getStatusClass, getPriorityClass }) => {
  return (
    <li
      className="
        list-row
        border-t
        border-[var(--border-color)]
        bg-[var(--bg-surface)]
        transition-colors
        hover:bg-[var(--bg-hover)]
        md:grid
        md:grid-cols-[40px_minmax(220px,1fr)_110px_100px_160px_120px_40px]
        md:items-center
        md:gap-3
      "
    >
      {/* Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          className="
            checkbox
            checkbox-sm
            border-[var(--border-color)]
            bg-[var(--bg-surface)]
            checked:border-[var(--primary)]
            checked:bg-[var(--primary)]
            checked:text-white
          "
        />
      </div>

      {/* Task */}
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-[var(--text-primary)]">
          {task.title}
        </p>

        <p className="mt-1 truncate text-[11px] text-[var(--text-muted)]">
          {task.description}
        </p>
      </div>

      {/* Status */}
      <div>
        <span
          className={`
            inline-flex
            rounded
            px-2
            py-1
            text-[10px]
            font-medium
            ${getStatusClass(task.status)}
          `}
        >
          {task.status}
        </span>
      </div>

      {/* Priority */}
      <div>
        <span
          className={`
            inline-flex
            rounded
            px-2
            py-1
            text-[10px]
            font-medium
            ${getPriorityClass(task.priority)}
          `}
        >
          {task.priority}
        </span>
      </div>

      {/* Assignee */}
      <div className="flex min-w-0 items-center gap-2">
        <div
          className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[var(--bg-card)]
            text-[10px]
            font-semibold
            text-[var(--text-secondary)]
            
          "
        >
          {task.assignedTo?.fullname?.firstname?.[0]}
          {task.assignedTo?.fullname?.lastname?.[0]}
        </div>

        <span className="truncate text-xs text-[var(--text-secondary)]">
          {task.assignedTo
            ? `${task.assignedTo.fullname?.firstname?.toUpperCase()} ${task.assignedTo.fullname?.lastname?.toUpperCase()}`
            : "Unassigned"}
        </span>
      </div>

       
      {/* Due Date */}
      <div>
        <span
          className={`text-xs ${
            task.isOverdue
              ? "font-medium text-[var(--danger)]"
              : "text-[var(--text-secondary)]"
          }`}
        >
          {new Date(task.dueDate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Actions */}
      <div>
        <button
          type="button"
          className="
            btn
            btn-square
            btn-ghost
            btn-sm
            text-[var(--text-secondary)]
            hover:bg-[var(--bg-hover)]
            hover:text-[var(--text-primary)]
          "
          aria-label="Task actions"
        >
          ⋮
        </button>
      </div>
    </li>
  );
};

const EmptyTasks = () => (
  <li
    className="
      border-t
      border-[var(--border-color)]
      bg-[var(--bg-surface)]
      px-4
      py-12
      text-center
    "
  >
    <p className="text-sm font-medium text-[var(--text-secondary)]">
      No tasks found
    </p>

    <p className="mt-1 text-xs text-[var(--text-muted)]">
      There are no tasks available for the selected page.
    </p>
  </li>
);

export default TaskList;
