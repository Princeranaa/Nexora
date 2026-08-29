import React from "react";
import {
  CheckCircle2,
  CirclePlay,
  UserPlus,
  UserX,
  Clock3,
} from "lucide-react";

const activityConfig = {
  TASK_COMPLETED: {
    icon: CheckCircle2,
    className: "text-success bg-success/10",
  },

  TASK_STARTED: {
    icon: CirclePlay,
    className: "text-info bg-info/10",
  },

  EMPLOYEE_CREATED: {
    icon: UserPlus,
    className: "text-secondary bg-secondary/10",
  },

  EMPLOYEE_DEACTIVATED: {
    icon: UserX,
    className: "text-error bg-error/10",
  },
};

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "TASK_COMPLETED",
      message: 'Rahul completed "Build Login API"',
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "TASK_STARTED",
      message: 'Amit started "Dashboard UI"',
      time: "20 minutes ago",
    },
    {
      id: 3,
      type: "EMPLOYEE_CREATED",
      message: "John joined the organization",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "EMPLOYEE_DEACTIVATED",
      message: "Amit's account was deactivated",
      time: "2 hours ago",
    },
  ];

  return (
    <div className="mt-6 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--shadow-md)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] px-5 py-4">
        <div>
          <h2 className="font-semibold text-[var(--text-primary)]">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Latest activity across your CMS
          </p>
        </div>

        <Clock3 size={20} className="text-[var(--text-muted)]" />
      </div>

      {/* Activity List */}
      <div>
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex gap-3 border-b border-[var(--border-color)] px-5 py-4 last:border-b-0 hover:bg-[var(--bg-hover)]"
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.className}`}
              >
                <Icon size={17} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[var(--text-primary)]">
                  {activity.message}
                </p>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border-color)] px-5 py-3">
        <button className="rounded-md px-3 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]">
          View all activity →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
