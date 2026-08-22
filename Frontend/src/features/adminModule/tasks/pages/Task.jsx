import { useState } from "react";
import useTasks from "../hooks/useTasks";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import { useMemo } from "react";
import TaskModal from "./TaskModal";
import { useDeleteTaskMutation } from "../service/Tasks.service";
import Swal from "sweetalert2";

const Tasks = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const { tasks, pagination, isLoading, isFetching, isError } = useTasks({
    page,
    limit,
  });
  const { createTask, createTaskState } = useTasks();
  const [deleteTask] = useDeleteTaskMutation();

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

  const handleDelete = async (taskId) => {
    const result = await Swal.fire({
      title: "Delete task?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) {
      return;
    }

    // Step 3: Delete only after confirmation
    try {
      await deleteTask(taskId).unwrap();

      await Swal.fire({
        title: "Deleted!",
        text: "Task has been deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      // Step 5: Show error if API fails
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to delete task.",
        icon: "error",
      });
    }
  };

  // if (isLoading) {
  //   return <div className="p-6">Loading tasks...</div>;
  // }

  if (isError) {
    return (
      <div className="p-6 text-[var(--danger)]">Failed to load tasks.</div>
    );
  }

  return (
    <div className="h-full w-full bg-[var(--bg-main)] p-5 text-[var(--text-primary)] sm:p-6">
      <TaskSummary
        summary={summary}
        tasks={tasks}
        totalTasks={pagination.totalTasks ?? 0}
      />

      <TaskList
        tasks={tasks}
        onDelete={handleDelete}
        currentPage={pagination.currentPage ?? page}
        totalPages={pagination.totalPages ?? 1}
        limit={pagination.limit ?? limit}
        totalTasks={pagination.totalTasks ?? 0}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
        isFetching={isFetching}
        onCreateTask={() => setIsTaskModalOpen(true)}
      />

      {isTaskModalOpen && (
        <TaskModal
          tasks={tasks}
          createTask={createTask}
          createTaskState={createTaskState}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Tasks;
