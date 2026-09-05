import React from "react";
import { Shield, User } from "lucide-react";

const ChatUserItem = ({ user, active, onClick }) => {
  const fname = user.fullname?.firstname || user.firstname || "User";
  const lname = user.fullname?.lastname || user.lastname || "";
  const initials = `${fname[0] ?? ""}${lname[0] ?? ""}`.toUpperCase();
  const isAdmin = user.role === "admin";
  const hasUnread = (user.unread || 0) > 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 border ${
        active
          ? "bg-[#6063EE]/10 border-[#6063EE]/30 shadow-sm"
          : "border-transparent hover:bg-[var(--bg-hover)]"
      }`}
    >
      {/* Active Left Indicator Bar */}
      {active && (
        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#6063EE]" />
      )}

      {/* Avatar Container */}
      <div className="relative shrink-0">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold transition-transform duration-200 group-hover:scale-105 ${
            active
              ? "bg-[#6063EE] text-white shadow-md shadow-[#6063EE]/25"
              : isAdmin
              ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          }`}
        >
          {initials}
        </div>

        {/* Online Status Indicator */}
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--bg-card)] ${
            user.online || user.status === "active"
              ? "bg-emerald-500 ring-2 ring-emerald-500/20"
              : "bg-gray-400"
          }`}
          title={user.online || user.status === "active" ? "Active" : "Offline"}
        />
      </div>

      {/* User Details */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <h4
              className={`truncate text-xs sm:text-sm font-semibold transition-colors ${
                active
                  ? "text-[#6063EE]"
                  : hasUnread
                  ? "text-[var(--text-primary)] font-bold"
                  : "text-[var(--text-primary)]"
              }`}
            >
              {fname} {lname}
            </h4>

            {/* Role Icon */}
            <span
              className={`shrink-0 inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase ${
                isAdmin
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "bg-emerald-500/15 text-emerald-400"
              }`}
              title={`Role: ${user.role}`}
            >
              {isAdmin ? "Admin" : "Emp"}
            </span>
          </div>

          <span
            className={`shrink-0 text-[10px] ${
              hasUnread
                ? "font-semibold text-[#6063EE]"
                : "text-[var(--text-muted)]"
            }`}
          >
            {user.lastMessageTime || ""}
          </span>
        </div>

        {/* Message Snippet or email & Unread Pill */}
        <div className="mt-1 flex items-center justify-between gap-2">
          <p
            className={`truncate text-xs leading-relaxed ${
              hasUnread
                ? "font-semibold text-[var(--text-primary)]"
                : "text-[var(--text-muted)]"
            }`}
          >
            {user.lastMessage || user.email || "Click to chat..."}
          </p>

          {hasUnread && (
            <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-[#6063EE] px-1 text-[10px] font-bold text-white shadow-sm">
              {user.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatUserItem;
