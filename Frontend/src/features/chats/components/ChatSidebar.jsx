import React from "react";
import { Search, X, MessageSquare, ShieldCheck, UserCheck, Inbox, RotateCw, AlertCircle } from "lucide-react";
import ChatUserItem from "./ChatUserItem";

const ChatSidebar = ({
  users = [],
  activeUserId,
  onSelectUser,
  filterRole,
  onFilterChange,
  searchQuery,
  onSearchChange,
  isLoading,
  isError,
  onRetry,
}) => {
  const totalUnread = users.reduce((acc, curr) => acc + (curr.unread || 0), 0);

  const tabs = [
    { id: "all", label: "All", icon: MessageSquare },
    { id: "admin", label: "Admins", icon: ShieldCheck },
    { id: "employee", label: "Employees", icon: UserCheck },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--bg-card)] border-r border-[var(--border-color)]">
      {/* Sidebar Top Header */}
      <div className="shrink-0 p-4 border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
              Messages
            </h2>
            {totalUnread > 0 && (
              <span className="flex items-center justify-center rounded-full bg-[#6063EE] px-2 py-0.5 text-[11px] font-bold text-white shadow-sm">
                {totalUnread} new
              </span>
            )}
          </div>
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {users.length} contacts
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          />
          <input
            type="text"
            placeholder="Search by name, role, email..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] py-2 pl-9 pr-8 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#6063EE] focus:outline-none transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mt-3 grid grid-cols-3 gap-1 rounded-xl bg-[var(--bg-main)] p-1">
          {tabs.map((tab) => {
            const isActive = filterRole === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange?.(tab.id)}
                className={`relative flex items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] font-medium transition-all ${
                  isActive
                    ? "bg-[var(--bg-card)] text-[#6063EE] shadow-sm font-semibold"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* User Contact List */}
      <div className="min-h-0 flex-1 overflow-y-auto p-2 space-y-1 thin-scrollbar">
        {isLoading ? (
          <div className="space-y-2 p-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl p-3 animate-pulse bg-[var(--bg-main)]"
              >
                <div className="h-10 w-10 rounded-full bg-[var(--border-color)]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-28 rounded bg-[var(--border-color)]" />
                  <div className="h-2 w-16 rounded bg-[var(--border-color)]" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-xs text-[var(--text-muted)]">
            <AlertCircle size={24} className="mb-2 text-red-400" />
            <p className="font-semibold text-[var(--text-primary)]">Failed to load contacts</p>
            <p className="mt-1">Please check your connection and try again.</p>
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="mt-3 flex items-center gap-1.5 rounded-lg bg-[#6063EE] px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#4F46E5] transition"
              >
                <RotateCw size={13} />
                <span>Retry</span>
              </button>
            )}
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <ChatUserItem
              key={user._id}
              user={user}
              active={activeUserId === user._id}
              onClick={() => onSelectUser?.(user._id)}
            />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center text-xs text-[var(--text-muted)]">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-hover)]">
              <Search size={18} />
            </div>
            <p className="font-semibold text-[var(--text-primary)]">No contacts found</p>
            <p className="mt-1">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
