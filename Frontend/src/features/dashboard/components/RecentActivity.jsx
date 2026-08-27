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
    <div className="card mt-6 border border-base-300 bg-base-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-base-300 px-5 py-4">
        <div>
          <h2 className="font-semibold text-base-content">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-base-content/60">
            Latest activity across your CMS
          </p>
        </div>

        <Clock3
          size={20}
          className="text-base-content/50"
        />
      </div>

      {/* Activity List */}
      <div>
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <div
              key={activity.id}
              className="flex gap-3 border-b border-base-300 px-5 py-4 last:border-b-0"
            >
              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${config.className}`}
              >
                <Icon size={17} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm text-base-content">
                  {activity.message}
                </p>

                <p className="mt-1 text-xs text-base-content/50">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-base-300 px-5 py-3">
        <button className="btn btn-ghost btn-sm">
          View all activity →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;