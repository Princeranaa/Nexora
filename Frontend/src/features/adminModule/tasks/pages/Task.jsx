import React, { useState } from "react";
import {
  Calendar,
  CircleEllipsis,
  Plus,
  UserRound,
} from "lucide-react";


import TaskModal from "../pages/TaskModal.jsx";

const Task = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const tasks = [
    {
      id: 1,
      title: "Optimize training pipeline",
      description:
        "Improve the training pipeline performance and reduce processing time.",
      employee: "John Doe",
      status: "Todo",
      priority: "High",
      date: "10/24/2026",
    },
    {
      id: 2,
      title: "Quarterly Security Patching",
      description:
        "Apply the latest security patches and verify the application after deployment.",
      employee: "Sarah Wilson",
      status: "In Progress",
      priority: "Low",
      date: "11/02/2026",
    },
    {
      id: 3,
      title: "Update Authentication Flow",
      description:
        "Update the authentication flow and improve session handling.",
      employee: "Michael Smith",
      status: "Done",
      priority: "High",
      date: "09/15/2026",
    },
    {
      id: 4,
      title: "Database Optimization",
      description:
        "Analyze slow queries and optimize the existing MongoDB collections.",
      employee: "David Miller",
      status: "In Progress",
      priority: "Medium",
      date: "10/30/2026",
    },
  ];

  const priorityStyles = {
    High: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  const statusStyles = {
    Todo: "bg-white/5 text-gray-300 border-white/10",
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Done: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <>
      <div className="w-full h-full min-h-0 flex flex-col overflow-hidden p-4 sm:p-6 lg:p-8">

        {/* Header */}
        <div className="shrink-0 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-wide mb-2">
              Tasks
            </h2>

            <p className="text-sm text-gray-400">
              Manage and track tasks assigned to your employees.
            </p>
          </div>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="
              w-full sm:w-auto
              inline-flex items-center justify-center gap-2
              px-5 py-2.5
              rounded-lg
              bg-[#d4b4f5]
              text-[#181222]
              font-semibold
              text-sm
              shadow-[0_0_10px_rgba(212,180,245,0.15)]
              hover:shadow-[0_0_20px_rgba(212,180,245,0.35)]
              hover:scale-[1.01]
              active:scale-[0.98]
              transition-all
            "
          >
            <Plus size={18} />
            Assign Task
          </button>
        </div>

        {/* Task List */}
        <div className="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">

            {tasks.map((task) => (
              <div
                key={task.id}
                className="
                  group
                  relative
                  flex flex-col
                  min-h-[250px]
                  rounded-xl
                  bg-white/[0.03]
                  backdrop-blur-md
                  border border-white/10
                  p-5
                  hover:bg-white/[0.055]
                  hover:border-[#d4b4f5]/30
                  hover:shadow-[0_0_20px_rgba(212,180,245,0.08)]
                  transition-all
                "
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`
                        w-2 h-2 rounded-full
                        ${
                          task.priority === "High"
                            ? "bg-rose-400 shadow-[0_0_8px_#fb7185]"
                            : task.priority === "Medium"
                            ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                            : "bg-slate-400"
                        }
                      `}
                    />

                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      Task #{task.id}
                    </span>
                  </div>

                  <button className="text-gray-500 hover:text-white transition-colors">
                    <CircleEllipsis size={19} />
                  </button>
                </div>

                {/* Title */}
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#d4b4f5] transition-colors">
                    {task.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-400 leading-5 line-clamp-2">
                    {task.description}
                  </p>
                </div>

                {/* Employee */}
                <div className="mt-5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#d4b4f5]/10 border border-[#d4b4f5]/20 flex items-center justify-center">
                    <UserRound size={15} className="text-[#d4b4f5]" />
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500">
                      Assigned To
                    </p>

                    <p className="text-sm text-gray-200">
                      {task.employee}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mt-5 pt-4" />

                {/* Bottom */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={15} />
                    <span className="text-xs">{task.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-full border ${priorityStyles[task.priority]}`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-full border ${statusStyles[task.status]}`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

     {isDrawerOpen && (
        <TaskModal onClose={() => setIsDrawerOpen(false)} />
      )}

    </>
  );
};

export default Task;