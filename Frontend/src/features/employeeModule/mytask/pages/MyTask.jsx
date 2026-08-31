 
import React, { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { TaskSummary } from "../components/TaskSummary";
import { TaskFilters } from "../components/TaskFilters";
import { TaskCard } from "../components/TaskCard";
import EmptyState from "../components/EmptyState";
import { useGetEmployeeTasksQuery, useUpdateEmployeeTaskStatusMutation } from "../../../adminModule/tasks/service/Tasks.service";

 

// import {
//   useGetEmployeeTasksQuery,
//   useUpdateEmployeeTaskStatusMutation,
// } from "../../service/taskApi";

const MyTask = () => {
  const [filter, setFilter] = useState("All");

  // API
  const {
    data,
    isLoading,
    isError,
  } = useGetEmployeeTasksQuery();

  const [updateTaskStatus, { isLoading: isUpdating }] =
    useUpdateEmployeeTaskStatusMutation();

  const tasks = data?.tasks || [];


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
    if (filter === "All") {
      return tasks;
    }

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

      console.log("Update:", taskId, status);
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
              isUpdating={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTask;
 
