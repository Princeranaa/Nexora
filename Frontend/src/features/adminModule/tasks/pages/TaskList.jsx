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
  onCreateTask,
  onDelete
}) => {
  return (
    <div className="mt-7 flex max-h-[500px] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)]">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">
            Tasks
          </h2>

          <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
            Manage and track your assigned tasks
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateTask}
          className="btn btn-sm bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
        >
          Create Task
        </button>
      </div>

      {/* Table Header */}
      <div className="hidden border-t border-[var(--border-color)] bg-[var(--bg-card)] px-4 py-3 md:grid md:grid-cols-[40px_minmax(220px,1fr)_110px_100px_160px_120px_40px] md:items-center md:gap-3">
        <div>
          <input
            type="checkbox"
            className="checkbox  checkbox-xs  border-[var(--border-color)]  bg-[var(--bg-surface)]  checked:border-[var(--primary)]  checked:bg-[var(--primary)]  checked:text-white"
          />
        </div>

        <Header label="Task" />
        <Header label="Status" />
        <Header label="Priority" />
        <Header label="Assignee" />
        <Header label="Due Date" />

        <div />
      </div>

      {/* Scrollable Task Area */}
      <div className="w-full overflow-x-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskRow
            onDelete={onDelete}
              key={task._id}
              task={task}
              getStatusClass={getStatusClass}
              getPriorityClass={getPriorityClass}
            />
          ))
        ) : (
          <EmptyTasks />
        )}
      </div>

      {/* Pagination */}
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

const TaskRow = ({ task, getStatusClass, getPriorityClass,onDelete }) => {
  return (
    <div className=" min-h-[68px] border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-3 transition-colors hover:bg-[var(--bg-hover)] md:grid md:grid-cols-[40px_minmax(220px,1fr)_110px_100px_160px_120px_40px] md:items-center md:gap-3">
      {/* Checkbox */}
      <div className="flex items-center">
        <input
          type="checkbox"
          className="checkbox checkbox-sm border-(--border-color) bg-[var(--bg-surface)] checked:border-[var(--primary)] checked:bg-[var(--primary)] checked:text-white"
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
          className={`inline-flex rounded px-2 py-1 text-[10px] font-medium ${getStatusClass(task.status)}`}
        >
          {task.status}
        </span>
      </div>

      {/* Priority */}
      <div>
        <span
          className={`inline-flex rounded px-2 py-1 text-[10px] font-medium ${getPriorityClass(task.priority)}`}
        >
          {task.priority}
        </span>
      </div>

      {/* Assignee */}
      <div className="flex min-w-0 items-center gap-2">
        <div className=" flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--bg-card)] text-[10px] font-semibold text-[var(--text-secondary)]">
          {task.assignedTo?.fullname?.firstname?.[0]?.toUpperCase() ?? "U"}
          {task.assignedTo?.fullname?.lastname?.[0]?.toUpperCase() ?? ""}
        </div>

        <span className="truncate text-xs text-[var(--text-secondary)]">
          {task.assignedTo
            ? `${task.assignedTo.fullname?.firstname ?? ""} ${
                task.assignedTo.fullname?.lastname ?? ""
              }`
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
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "No date"}
        </span>
      </div>

      {/* Actions */}
      <div className="dropdown dropdown-end">
        <button
          type="button"
          tabIndex={0}
          className="btn btn-square btn-ghost btn-sm text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          aria-label="Task actions"
        >
          ⋮
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content menu z-10 mt-2 w-32 rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] p-1 shadow-[var(--shadow-md)]"
        >
          <li>
            <button type="button">Edit</button>
          </li>

          <li>
            <button 
            onClick={() => onDelete(task._id)}
            type="button" className="text-[var(--danger)]">
              Delete
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const EmptyTasks = () => (
  <div className=" border-t border-[var(--border-color)] bg-[var(--bg-surface)] px-4 py-12 text-center">
    <p className="text-sm font-medium text-[var(--text-secondary)]">
      No tasks found
    </p>

    <p className="mt-1 text-xs text-[var(--text-muted)]">
      There are no tasks available for the selected page.
    </p>
  </div>
);

export default TaskList;
