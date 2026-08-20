import React, { useState } from "react";
import { Calendar, CheckCircle2, ChevronDown, X } from "lucide-react";

const TaskModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    priority: "High",
    status: "Todo",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Task payload:", formData);

    /*
      Backend payload:

      {
        title,
        description,
        assignedTo,
        dueDate,
        priority
      }
    */
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#121016]/80 backdrop-blur-sm"
      />

      {/* Modal */}
      <div
        className="
          relative
          w-full
          max-w-xl
          max-h-[90vh]
          overflow-hidden
          rounded-xl
          border
          border-[#3b3449]
          bg-[#211d2a]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#3b3449] px-6 py-5">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={20}
              className="text-[#d0bcff]"
            />

            <h2 className="text-lg font-semibold text-gray-100">
              Create Task
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-md
              text-gray-400
              transition-colors
              hover:text-gray-200
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[calc(90vh-145px)] flex-col"
        >
          {/* Form Body */}
          <div className="space-y-5 overflow-y-auto p-6 custom-scrollbar">

            {/* Task Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">
                Task Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Optimize training pipeline"
                required
                className="
                  w-full
                  rounded-lg
                  border border-[#3b3449]
                  bg-[#18151f]
                  px-3
                  py-2.5
                  text-sm
                  text-gray-200
                  placeholder-gray-500
                  outline-none
                  transition-colors
                  focus:border-[#d0bcff]
                "
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-400">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the task scope and deliverables..."
                rows={3}
                required
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border border-[#3b3449]
                  bg-[#18151f]
                  px-3
                  py-2.5
                  text-sm
                  text-gray-200
                  placeholder-gray-500
                  outline-none
                  transition-colors
                  focus:border-[#d0bcff]
                "
              />
            </div>

            {/* Assignee + Due Date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Assignee */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">
                  Assignee
                </label>

                <div className="relative">
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      appearance-none
                      rounded-lg
                      border border-[#3b3449]
                      bg-[#18151f]
                      px-3
                      py-2.5
                      pr-9
                      text-sm
                      text-gray-200
                      outline-none
                      transition-colors
                      focus:border-[#d0bcff]
                    "
                  >
                    <option value="" disabled>
                      Select User
                    </option>

                    <option value="employee-id-1">
                      Alice Smith
                    </option>

                    <option value="employee-id-2">
                      Bob Jones
                    </option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />
                </div>
              </div>

              {/* Due Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">
                  Due Date
                </label>

                <div className="relative">
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      rounded-lg
                      border border-[#3b3449]
                      bg-[#18151f]
                      px-3
                      py-2.5
                      pr-9
                      text-sm
                      text-gray-200
                      outline-none
                      transition-colors
                      focus:border-[#d0bcff]
                    "
                  />

                  <Calendar
                    size={16}
                    className="
                      pointer-events-none
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />
                </div>
              </div>
            </div>

            {/* Status + Priority */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Status */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">
                  Initial Status
                </label>

                <div className="flex rounded-lg border border-[#3b3449] bg-[#18151f] p-1">

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        status: "Todo",
                      }))
                    }
                    className={`
                      flex-1
                      rounded-md
                      py-1.5
                      text-sm
                      font-medium
                      transition-colors
                      ${
                        formData.status === "Todo"
                          ? "bg-[#d0bcff] text-[#211d2a] font-semibold"
                          : "text-gray-400 hover:text-gray-200"
                      }
                    `}
                  >
                    Todo
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        status: "In Progress",
                      }))
                    }
                    className={`
                      flex-1
                      rounded-md
                      py-1.5
                      text-sm
                      font-medium
                      transition-colors
                      ${
                        formData.status === "In Progress"
                          ? "bg-[#d0bcff] text-[#211d2a] font-semibold"
                          : "text-gray-400 hover:text-gray-200"
                      }
                    `}
                  >
                    In Progress
                  </button>

                </div>
              </div>

              {/* Priority */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-400">
                  Priority
                </label>

                <div className="flex rounded-lg border border-[#3b3449] bg-[#18151f] p-1">

                  {["Low", "Medium", "High"].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          priority,
                        }))
                      }
                      className={`
                        flex-1
                        rounded-md
                        py-1.5
                        text-xs
                        font-medium
                        transition-colors
                        ${
                          formData.priority === priority
                            ? priority === "High"
                              ? "border border-[#7f1d1d]/40 bg-[#4a1c24] text-[#f87171]"
                              : "bg-[#d0bcff] text-[#211d2a] font-semibold"
                            : "text-gray-400 hover:text-gray-200"
                        }
                      `}
                    >
                      {priority}
                    </button>
                  ))}

                </div>
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-4 border-t border-[#3b3449] bg-[#211d2a] px-6 py-4">

            <button
              type="button"
              onClick={onClose}
              className="
                text-sm
                font-medium
                text-gray-300
                transition-colors
                hover:text-white
              "
            >
              Discard
            </button>

            <button
              type="submit"
              className="
                rounded-lg
                bg-[#d0bcff]
                px-6
                py-2.5
                text-sm
                font-bold
                text-[#211d2a]
                transition-colors
                hover:bg-[#bfa5ff]
              "
            >
              Create Task
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;