import React from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  Search,
  PanelRight,
  Shield,
  User,
  X,
} from "lucide-react";

const ChatHeader = ({
  user,
  onBack,
  onToggleProfile,
  isProfileOpen,
  chatSearchOpen,
  onToggleChatSearch,
  chatSearchQuery,
  onChatSearchChange,
}) => {
  if (!user) return null;

  const fname = user.fullname?.firstname || user.firstname || "User";
  const lname = user.fullname?.lastname || user.lastname || "";
  const initials = `${fname[0] ?? ""}${lname[0] ?? ""}`.toUpperCase();
  const isAdmin = user.role === "admin";

  const handleCall = (type) => {
    alert(`Initiating ${type} call with ${fname} ${lname}...`);
  };

  return (
    <header className="flex shrink-0 flex-col border-b border-[var(--border-color)] bg-[var(--bg-card)]">
      {/* Main Header Bar */}
      <div className="flex items-center justify-between px-3 py-2.5 sm:px-5">
        {/* Left Side: Back Button + User Avatar + Info */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          {/* Mobile Back Button */}
          <button
            type="button"
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] md:hidden transition"
            title="Back to conversations"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Avatar with Status Pulse */}
          <div
            onClick={onToggleProfile}
            className="relative shrink-0 cursor-pointer group"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-transform duration-200 group-hover:scale-105 ${
                isAdmin
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {initials}
            </div>
            <span
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--bg-card)] ${
                user.online || user.status === "active"
                  ? "bg-emerald-500 ring-2 ring-emerald-500/20"
                  : "bg-gray-400"
              }`}
            />
          </div>

          {/* User Name, Role & Status */}
          <div
            onClick={onToggleProfile}
            className="min-w-0 cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-bold text-[var(--text-primary)]">
                {fname} {lname}
              </h3>
              <span
                className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${
                  isAdmin
                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                    : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                }`}
              >
                {isAdmin ? <Shield size={10} /> : <User size={10} />}
                {isAdmin ? "Admin" : "Employee"}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  user.online || user.status === "active" ? "bg-emerald-500" : "bg-gray-400"
                }`}
              />
              <span className="truncate">
                {user.online || user.status === "active" ? "Active Now" : user.lastSeen || "Offline"} · {user.email || "Enterprise"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleChatSearch}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              chatSearchOpen
                ? "bg-[#6063EE]/15 text-[#6063EE]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            }`}
            title="Search in conversation"
          >
            <Search size={16} />
          </button>

          <button
            type="button"
            onClick={() => handleCall("voice")}
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition"
            title="Start voice call"
          >
            <Phone size={16} />
          </button>

          <button
            type="button"
            onClick={() => handleCall("video")}
            className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition"
            title="Start video call"
          >
            <Video size={16} />
          </button>

          <button
            type="button"
            onClick={onToggleProfile}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
              isProfileOpen
                ? "bg-[#6063EE]/15 text-[#6063EE]"
                : "text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
            }`}
            title="Toggle user details panel"
          >
            <PanelRight size={16} />
          </button>
        </div>
      </div>

      {/* Expandable Search in Chat Bar */}
      {chatSearchOpen && (
        <div className="flex items-center gap-2 border-t border-[var(--border-color)] bg-[var(--bg-main)] px-4 py-2 transition-all">
          <Search size={14} className="text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search messages in this thread..."
            value={chatSearchQuery}
            onChange={(e) => onChatSearchChange?.(e.target.value)}
            className="w-full bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            autoFocus
          />
          {chatSearchQuery && (
            <button
              type="button"
              onClick={() => onChatSearchChange?.("")}
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default ChatHeader;
