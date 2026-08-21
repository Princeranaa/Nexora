import React, { useState } from "react";
import { CheckCircle2, ChevronDown, X } from "lucide-react";
import SegmentButton from "../../Components/SegmentButton";
import TaskDatePicker from "./TaskDatePicker";

const STATUS_OPTIONS = ["Pending", "In Progress"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

const TaskModal = ({ onClose, createTask, createTaskState, tasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "",
    status: "",
  });

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
      await createTask(payload).unwrap();
      console.log("Task created successfully");
      onClose();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        onClick={onClose}
        className=" absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-2xl">
        {/* Header */}
        <div className=" flex items-center justify-between border-b border-base-300 px-6 py-5">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-base-content">
              Create Task
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className=" rounded-md text-base-content/60 transition hover:text-base-content"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className=" flex max-h-[calc(90vh-145px)] flex-col"
        >
          {/* Body */}
          <div className=" space-y-5 overflow-y-auto p-6 custom-scrollbar">
            {/* Task Title */}
            <div className="space-y-1.5">
              <label className=" text-xs font-medium text-base-content/70">
                Task Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Optimize training pipeline"
                required
                className=" outline-none input input-bordered w-full bg-base-200"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className=" text-xs font-medium text-base-content/70">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the task scope and deliverables..."
                rows={3}
                required
                className="outline-none textarea textarea-bordered w-full resize-none bg-base-200"
              />
            </div>

            {/* Assignee + Due Date */}
            <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Assignee */}
              <div className="space-y-1.5">
                <label className=" text-xs font-medium text-base-content/70">
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

                    {tasks.map((task) => (
                      <option
                        key={task.assignedTo._id}
                        value={task.assignedTo._id}
                      >
                        {task.assignedTo.fullname.firstname}{" "}
                        {task.assignedTo.fullname.lastname}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={16}
                    className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60"
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className=" text-xs font-medium text-base-content/70">
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
            <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Status */}
              <div className="space-y-1.5">
                <label className=" text-xs font-medium text-base-content/70">
                  Initial Status
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
                <label className=" text-xs font-medium text-base-content/70">
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

            <button type="submit" className="btn btn-primary btn-sm px-6">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
