import { useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import { useMemo } from "react";

const Tasks = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { tasks, pagination, isLoading, isFetching, isError } = useTasks({
    page,
    limit,
  });

  const summary = useMemo(() => {
    return {
      total: pagination.totalTasks ?? 0,

      pending: tasks.filter((task) => task.status === "Pending").length,

      inProgress: tasks.filter((task) => task.status === "In Progress").length,

      completed: tasks.filter((task) => task.status === "Completed").length,

      overdue: tasks.filter((task) => {
        if (!task.dueDate) return false;

        return (
          new Date(task.dueDate) < new Date() && task.status !== "Completed"
        );
      }).length,
    };
  }, [tasks, pagination.totalTasks]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  if (isLoading) {
    return <div className="p-6">Loading tasks...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-[var(--danger)]">Failed to load tasks.</div>
    );
  }

  return (
    <div className="min-h-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6">
      <TaskSummary summary={summary} tasks={tasks}  totalTasks={pagination.totalTasks ?? 0}/>

      <TaskList
        tasks={tasks}
        currentPage={pagination.currentPage ?? page}
        totalPages={pagination.totalPages ?? 1}
        limit={pagination.limit ?? limit}
        totalTasks={pagination.totalTasks ?? 0}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        isFetching={isFetching}
      />
    </div>
  );
};

export default Tasks;
