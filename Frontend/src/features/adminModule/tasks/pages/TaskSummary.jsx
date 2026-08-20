import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  List,
  Timer,
} from "lucide-react";

const SUMMARY_CONFIG = [
  {
    key: "total",
    label: "Total Tasks",
    icon: List,
    color: "var(--primary)",
  },
  {
    key: "pending",
    label: "Pending",
    icon: Timer,
    color: "var(--warning)",
  },
  {
    key: "inProgress",
    label: "In Progress",
    icon: Clock3,
    color: "var(--primary)",
  },
  {
    key: "completed",
    label: "Completed",
    icon: CheckCircle2,
    color: "var(--success)",
  },
  {
    key: "overdue",
    label: "Overdue",
    icon: AlertTriangle,
    color: "var(--danger)",
  },
];

const TaskSummary = ({ summary = {}, tasks = [], totalTasks = 0 }) => {
  const taskSummary = {
    total: totalTasks,

    pending: tasks.filter(
      (task) => task.status === "Pending"
    ).length,

    inProgress: tasks.filter(
      (task) => task.status === "In Progress"
    ).length,

    completed: tasks.filter(
      (task) => task.status === "Completed"
    ).length,

    overdue: tasks.filter(
      (task) =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== "Completed"
    ).length,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {SUMMARY_CONFIG.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.key}
            className="
              rounded-[var(--radius-md)]
              border
              border-[var(--border-color)]
              bg-[var(--bg-surface)]
              px-4
              py-4
              shadow-[var(--shadow-md)]
            "
          >
            <div className="flex items-center gap-2">
              <Icon
                size={15}
                strokeWidth={2}
                style={{ color: item.color }}
              />

              <span className="text-xs font-medium text-[var(--text-secondary)]">
                {item.label}
              </span>
            </div>

            <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              {taskSummary[item.key] ?? 0}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TaskSummary;