import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, X } from "lucide-react";

import SegmentButton from "../../Components/SegmentButton";
import TaskDatePicker from "./TaskDatePicker";

const STATUS_OPTIONS = ["Pending", "In Progress", "Completed"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const TaskModal = ({
  onClose,
  createTask,
  createTaskState,
  updateTask,
  updateTaskState,
  tasks,
  task,
}) => {
  const isEditMode = Boolean(task);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title ?? "",
        description: task.description ?? "",
        assignedTo: task.assignedTo?._id ?? "",
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        priority: task.priority ?? "Medium",
        status: task.status ?? "Pending",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
      });
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      assignedTo: formData.assignedTo,
      dueDate: formData.dueDate,
      priority: formData.priority,
      status: formData.status,
    };

    try {
      if (isEditMode) {
        await updateTask({
          taskId: task._id,
          data: payload,
        }).unwrap();
      } else {
        await createTask(payload).unwrap();
      }

      onClose();
    } catch (error) {
      console.error(
        isEditMode ? "Failed to update task:" : "Failed to create task:",
        error,
      );
    }
  };

  const uniqueUsers = Array.from(
    new Map(
      tasks.map((taskItem) => [taskItem.assignedTo?._id, taskItem.assignedTo]),
    ).values(),
  );

  const isSubmitting = createTaskState.isLoading || updateTaskState.isLoading;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 px-6 py-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-primary" />

            <h2 className="text-lg font-semibold text-base-content">
              {isEditMode ? "Edit Task" : "Create Task"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md text-base-content/60 transition hover:text-base-content"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[calc(90vh-145px)] flex-col"
        >
          <div className="custom-scrollbar space-y-5 overflow-y-auto p-6">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-base-content/70">
                Task Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Optimize training pipeline"
                required
                className="input input-bordered w-full bg-base-200 outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-base-content/70">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the task scope and deliverables..."
                rows={3}
                required
                className="textarea textarea-bordered w-full resize-none bg-base-200 outline-none"
              />
            </div>

            {/* Assignee + Due Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Assignee */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-base-content/70">
                  Assignee
                </label>

                <div className="relative">
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    className="select select-bordered w-full bg-base-200 text-base-content outline-none"
                  >
                    <option value="" disabled>
                      Select User
                    </option>

                    {uniqueUsers.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.fullname.firstname} {user.fullname.lastname}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-base-content/70">
                  Due Date
                </label>

                <TaskDatePicker
                  value={formData.dueDate}
                  onChange={(date) => {
                    setFormData((previous) => ({
                      ...previous,
                      dueDate: date,
                    }));
                  }}
                />
              </div>
            </div>

            {/* Status + Priority */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-base-content/70">
                  Status
                </label>

                <div className="flex rounded-lg border border-base-300 bg-base-200 p-1">
                  {STATUS_OPTIONS.map((status) => (
                    <SegmentButton
                      key={status}
                      value={status}
                      selected={formData.status === status}
                      onClick={() =>
                        setFormData((previous) => ({
                          ...previous,
                          status,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-base-content/70">
                  Priority
                </label>

                <div className="flex rounded-lg border border-base-300 bg-base-200 p-1">
                  {PRIORITY_OPTIONS.map((priority) => (
                    <SegmentButton
                      key={priority}
                      value={priority}
                      selected={formData.priority === priority}
                      onClick={() =>
                        setFormData((previous) => ({
                          ...previous,
                          priority,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 border-t border-base-300 bg-base-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm"
            >
              Discard
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-sm px-6"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Task"
                  : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
