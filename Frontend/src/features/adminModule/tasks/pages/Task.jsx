import { useState, useMemo } from "react";
import useTasks from "../hooks/useTasks";
import TaskList from "./TaskList";
import TaskSummary from "./TaskSummary";
import TaskModal from "./TaskModal";
import { useDeleteTaskMutation } from "../service/Tasks.service";
import Swal from "sweetalert2";

const Tasks = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTask] = useDeleteTaskMutation();

  const {
    tasks,
    pagination,
    isLoading,
    isFetching,
    isError,
    createTask,
    createTaskState,
    updateTask,
    updateTaskState,
  } = useTasks({
    page,
    limit,
  });

  const summary = {
    total: pagination.totalTasks ?? 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0,
  };

  const now = new Date();

  tasks.forEach((task) => {
    switch (task.status) {
      case "Pending":
        summary.pending++;
        break;

      case "In Progress":
        summary.inProgress++;
        break;

      case "Completed":
        summary.completed++;
        break;
    }

    if (
      task.dueDate &&
      new Date(task.dueDate) < now &&
      task.status !== "Completed"
    ) {
      summary.overdue++;
    }
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(false);
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
        onEdit={handleEditTask}
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
          // tasks={tasks}
          // createTask={createTask}
          // createTaskState={createTaskState}
          // onCreateTask={handleCreateTask}
          // onClose={() => setIsTaskModalOpen(false)}
          task={selectedTask}
          tasks={tasks}
          createTask={createTask}
          createTaskState={createTaskState}
          updateTask={updateTask}
          updateTaskState={updateTaskState}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Tasks;
