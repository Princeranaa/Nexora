import {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../service/Tasks.service";

const useTasks = (params) => {
  const tasksQuery = useGetTasksQuery(params);

  const [createTask, createTaskState] =
    useCreateTaskMutation();

  const [updateTask, updateTaskState] =
    useUpdateTaskMutation();

  const [deleteTask, deleteTaskState] =
    useDeleteTaskMutation();

  return {
    // GET
    tasks: tasksQuery.data?.tasks ?? [],
    pagination: tasksQuery.data?.pagination ?? {},

    isLoading: tasksQuery.isLoading,
    isFetching: tasksQuery.isFetching,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    refetch: tasksQuery.refetch,

    // CREATE
    createTask,
    createTaskState,

    // UPDATE
    updateTask,
    updateTaskState,

    // DELETE
    deleteTask,
    deleteTaskState,
  };
};

export default useTasks;
