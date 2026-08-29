import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
  AlertCircle,
} from "lucide-react";

// import {
//   useGetEmployeeTasksQuery,
//   useUpdateEmployeeTaskStatusMutation,
// } from "../../service/taskApi";

const MyTask = () => {
  const [filter, setFilter] = useState("All");

  // const {
  //   data,
  //   isLoading,
  //   isError,
  // } = useGetEmployeeTasksQuery();

  // const [updateTaskStatus, { isLoading: isUpdating }] =
  //   useUpdateEmployeeTaskStatusMutation();

  const tasks =   [];

  /* -----------------------------
     Task Summary
  ----------------------------- */

  const summary = useMemo(() => {
    return {
      total: tasks.length,

      pending: tasks.filter(
        (task) => task.status === "Pending"
      ).length,

      inProgress: tasks.filter(
        (task) => task.status === "In Progress"
      ).length,

      completed: tasks.filter(
        (task) => task.status === "Completed"
      ).length,
    };
  }, [tasks]);

  /* -----------------------------
     Filter Tasks
  ----------------------------- */

  const filteredTasks = useMemo(() => {
    if (filter === "All") return tasks;

    return tasks.filter(
      (task) => task.status === filter
    );
  }, [tasks, filter]);

  /* -----------------------------
     Update Status
  ----------------------------- */

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTaskStatus({
        taskId,
        status,
      }).unwrap();
    } catch (error) {
      console.error(
        "Failed to update task status:",
        error
      );
    }
  };

  /* -----------------------------
     Loading
  ----------------------------- */

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[400px]">
  //       <span className="loading loading-spinner loading-lg" />
  //     </div>
  //   );
  // }

  /* -----------------------------
     Error
  ----------------------------- */

  // if (isError) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[400px]">
  //       <div className="alert alert-error max-w-md">
  //         <AlertCircle size={20} />

  //         <span>
  //           Failed to load your tasks.
  //         </span>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="p-4 md:p-6 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-base-content">
          My Tasks
        </h1>

        <p className="text-sm text-base-content/60 mt-1">
          View and manage the tasks assigned to you.
        </p>
      </div>

      {/* Summary */}
      <TaskSummary summary={summary} />

      {/* Filters */}
      <TaskFilters
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      {/* Tasks */}
      {filteredTasks.length === 0 ? (
        <EmptyState filter={filter} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={handleStatusChange}
              isUpdating={isUpdating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTask;


/* =========================================================
   SUMMARY
========================================================= */

const TaskSummary = ({ summary }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: summary.total,
      icon: ListTodo,
    },
    {
      title: "Pending",
      value: summary.pending,
      icon: Clock3,
    },
    {
      title: "In Progress",
      value: summary.inProgress,
      icon: Clock3,
    },
    {
      title: "Completed",
      value: summary.completed,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-base-100
              border border-base-300
              rounded-xl
              p-4
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  {card.title}
                </p>

                <p className="text-2xl font-bold mt-1">
                  {card.value}
                </p>
              </div>

              <div className="p-2 rounded-lg bg-base-200">
                <Icon
                  size={20}
                  className="text-primary"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


/* =========================================================
   FILTERS
========================================================= */

const TaskFilters = ({
  activeFilter,
  onFilterChange,
}) => {
  const filters = [
    "All",
    "Pending",
    "In Progress",
    "Completed",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onFilterChange(item)}
          className={`
            btn btn-sm
            ${
              activeFilter === item
                ? "btn-primary"
                : "btn-ghost border border-base-300"
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
};


/* =========================================================
   TASK CARD
========================================================= */

const TaskCard = ({
  task,
  onStatusChange,
  isUpdating,
}) => {
  const priorityClass = {
    High: "badge-error",
    Medium: "badge-warning",
    Low: "badge-success",
  };

  const statusClass = {
    Pending: "badge-warning",
    "In Progress": "badge-info",
    Completed: "badge-success",
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const getDueDateState = (date, status) => {
    if (status === "Completed") {
      return "text-base-content/60";
    }

    const today = new Date();
    const dueDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) {
      return "text-error";
    }

    if (dueDate.getTime() === today.getTime()) {
      return "text-warning";
    }

    return "text-base-content/60";
  };

  return (
    <div
      className="
        bg-base-100
        border border-base-300
        rounded-xl
        p-5
        shadow-sm
        hover:shadow-md
        transition-shadow
      "
    >
      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">
          <h2 className="font-semibold text-lg truncate">
            {task.title}
          </h2>

          <p className="text-sm text-base-content/60 mt-2 line-clamp-2">
            {task.description}
          </p>
        </div>

        <span
          className={`badge ${
            priorityClass[task.priority] ||
            "badge-ghost"
          }`}
        >
          {task.priority}
        </span>
      </div>

      <div className="divider my-4" />

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* Due Date */}
        <div className="flex items-center gap-2">
          <CalendarDays
            size={17}
            className={getDueDateState(
              task.dueDate,
              task.status
            )}
          />

          <div>
            <p className="text-xs text-base-content/50">
              Due Date
            </p>

            <p
              className={`text-sm font-medium ${getDueDateState(
                task.dueDate,
                task.status
              )}`}
            >
              {formatDate(task.dueDate)}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span
            className={`badge ${
              statusClass[task.status] ||
              "badge-ghost"
            }`}
          >
            {task.status}
          </span>

          <select
            value={task.status}
            disabled={isUpdating}
            onChange={(e) =>
              onStatusChange(
                task._id,
                e.target.value
              )
            }
            className="select select-sm select-bordered"
          >
            <option value="Pending">
              Pending
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};


/* =========================================================
   EMPTY STATE
========================================================= */

const EmptyState = ({ filter }) => {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        min-h-[300px]
        border
        border-dashed
        border-base-300
        rounded-xl
        bg-base-100
      "
    >
      <div className="p-3 rounded-full bg-base-200">
        <ListTodo size={28} />
      </div>

      <h3 className="font-semibold text-lg mt-4">
        No tasks found
      </h3>

      <p className="text-sm text-base-content/60 mt-1">
        {filter === "All"
          ? "You don't have any tasks assigned yet."
          : `You don't have any ${filter.toLowerCase()} tasks.`}
      </p>
    </div>
  );
};