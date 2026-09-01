import React, { useState } from "react";
import {
  CheckCircle,
  UserPlus,
  UserX,
  LogIn,
  Edit,
  Activity as ActivityIcon,
  Clock,
  RefreshCw,
} from "lucide-react";

import { useGetRecentActivitiesQuery } from "../service/api.service";

// Time formatting helper
const formatRelativeTime = (dateString) => {
  const diffInSec = Math.floor((new Date() - new Date(dateString)) / 1000);

  if (diffInSec < 60) return "Just now";

  const diffInMin = Math.floor(diffInSec / 60);

  if (diffInMin < 60) {
    return `${diffInMin}m ago`;
  }

  const diffInHours = Math.floor(diffInMin / 60);

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  return `${diffInDays}d ago`;
};

// Action icon and color mapping
const getActionMeta = (action) => {
  switch (action) {
    case "TASK_CREATED":
      return {
        icon: Edit,
        iconClass: "text-info",
        bg: "bg-info/15",
      };

    case "TASK_STATUS_CHANGED":
      return {
        icon: CheckCircle,
        iconClass: "text-success",
        bg: "bg-success/15",
      };

    case "EMPLOYEE_CREATED":
      return {
        icon: UserPlus,
        iconClass: "text-primary",
        bg: "bg-primary/15",
      };

    case "EMPLOYEE_DEACTIVATED":
      return {
        icon: UserX,
        iconClass: "text-error",
        bg: "bg-error/15",
      };

    case "USER_LOGIN":
      return {
        icon: LogIn,
        iconClass: "text-warning",
        bg: "bg-warning/15",
      };

    default:
      return {
        icon: ActivityIcon,
        iconClass: "text-base-content/60",
        bg: "bg-base-300",
      };
  }
};

export const RecentActivity = () => {
  const [limit, setLimit] = useState(6);
  const [selectedModule, setSelectedModule] = useState("");

  const { data, isLoading, isFetching, isError, refetch } =
    useGetRecentActivitiesQuery({
      page: 1,
      limit,
      module: selectedModule || undefined,
    });

  const activities = data?.data || [];

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300/50">
      <div className="card-body p-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-base-200 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <ActivityIcon className="w-5 h-5" />
            </div>

            <div>
              <h2 className="card-title text-base md:text-lg font-semibold">
                Recent Activity
              </h2>

              <p className="text-xs text-base-content/60">
                Latest activity across your CMS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Module Filter */}
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="select select-bordered select-xs md:select-sm font-normal"
            >
              <option value="">All Modules</option>
              <option value="TASK">Tasks</option>
              <option value="EMPLOYEE">Employees</option>
              <option value="AUTH">Auth</option>
            </select>

            {/* Refresh */}
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              title="Refresh"
              className="btn btn-ghost btn-sm btn-square"
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  isFetching ? "animate-spin text-primary" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="space-y-4 py-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-base-300" />

                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-base-300 rounded w-3/4" />
                  <div className="h-2 bg-base-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          /* Error */
          <div className="alert alert-error text-sm my-4">
            <span>Failed to load recent activities.</span>

            <button
              onClick={() => refetch()}
              className="btn btn-xs btn-outline"
            >
              Retry
            </button>
          </div>
        ) : activities.length === 0 ? (
          /* Empty */
          <div className="text-center py-8 text-base-content/60">
            <ActivityIcon className="w-8 h-8 mx-auto mb-2 opacity-40" />

            <p className="text-sm">No recent activity recorded yet.</p>
          </div>
        ) : (
          /* Activities */
          <ul className="divide-y divide-base-200">
            {activities.map((item) => {
              const { icon: Icon, iconClass, bg } = getActionMeta(item.action);

              const authorName = item.performedBy?.fullname
                ? `${item.performedBy.fullname.firstname} ${item.performedBy.fullname.lastname}`
                : "System / User";

              return (
                <li
                  key={item._id}
                  className="
                    py-3
                    px-2
                    flex
                    items-start
                    gap-3
                    rounded-lg
                    hover:bg-base-200/50
                    transition-colors
                  "
                >
                  {/* Activity Icon */}
                  <div
                    className={`
                      p-2.5
                      rounded-xl
                      ${bg}
                      shrink-0
                      mt-0.5
                    `}
                  >
                    <Icon className={`w-4 h-4 ${iconClass}`} />
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-base-content leading-snug">
                      <span className="font-semibold text-primary">
                        {authorName}
                      </span>{" "}
                      {item.description?.replace(authorName, "").trim()}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-xs text-base-content/60">
                      {/* Module */}
                      <span className="badge badge-sm badge-ghost uppercase tracking-wider text-[10px]">
                        {item.module}
                      </span>

                      {/* Time */}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />

                        {formatRelativeTime(item.createdAt)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Footer */}
        {activities.length > 0 && (
          <div className="card-actions justify-center pt-2 border-t border-base-200">
            {limit <= 6 ? (
              <button
                onClick={() => setLimit(15)}
                className="
                  btn
                  btn-ghost
                  btn-sm
                  text-xs
                  font-semibold
                  text-primary
                "
              >
                View More Activities
              </button>
            ) : (
              <button
                onClick={() => setLimit(6)}
                className="
                  btn
                  btn-ghost
                  btn-sm
                  text-xs
                  text-base-content/60
                "
              >
                Show Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
