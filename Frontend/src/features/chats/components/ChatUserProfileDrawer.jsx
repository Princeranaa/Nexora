import React from "react";
import {
  X,
  Mail,
  Phone,
  Building2,
  Shield,
  User,
  Clock,
  FileText,
  BellOff,
  Star,
  ExternalLink,
} from "lucide-react";

const ChatUserProfileDrawer = ({ user, onClose, messages = [] }) => {
  if (!user) return null;

  const initials = `${user.firstname?.[0] ?? ""}${user.lastname?.[0] ?? ""}`;
  const isAdmin = user.role === "admin";

  // Collect all shared attachments in this conversation
  const sharedFiles = messages.flatMap((m) => m.attachments || []);

  return (
    <div className="flex h-full w-full flex-col bg-[var(--bg-surface)] border-l border-[var(--border-color)] overflow-hidden">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-[var(--border-color)] p-4">
        <h3 className="text-sm font-bold tracking-wide text-[var(--text-primary)] uppercase">
          Contact Details
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition"
          title="Close details"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 space-y-6 thin-scrollbar">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#6063EE] to-[#8B5CF6] text-xl font-bold text-white shadow-md">
              {initials}
            </div>
            <span
              className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[var(--bg-surface)] ${
                user.online ? "bg-emerald-500 ring-2 ring-emerald-500/20" : "bg-gray-400"
              }`}
            />
          </div>

          <h4 className="text-base font-bold text-[var(--text-primary)]">
            {user.firstname} {user.lastname}
          </h4>

          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isAdmin
                  ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                  : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {isAdmin ? <Shield size={12} /> : <User size={12} />}
              {isAdmin ? "Enterprise Admin" : "Team Member"}
            </span>
          </div>

          <p className="mt-2 text-xs text-[var(--text-muted)]">
            {user.online ? "Active Now" : `Last seen: ${user.lastSeen || "Offline"}`}
          </p>
        </div>

        {/* Quick Details List */}
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-3.5 space-y-3">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-hover)] text-[var(--text-muted)]">
              <Building2 size={14} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[var(--text-muted)] block">
                Department
              </span>
              <p className="font-medium text-[var(--text-primary)] truncate">
                {user.department || "Engineering"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-hover)] text-[var(--text-muted)]">
              <Mail size={14} />
            </div>
            <div className="min-w-0 truncate">
              <span className="text-[10px] text-[var(--text-muted)] block">
                Email
              </span>
              <p className="font-medium text-[var(--text-primary)] truncate">
                {user.email || `${user.firstname?.toLowerCase()}@enterprise.com`}
              </p>
            </div>
          </div>

          {user.phone && (
            <div className="flex items-center gap-3 text-xs">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-hover)] text-[var(--text-muted)]">
                <Phone size={14} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-[var(--text-muted)] block">
                  Contact Number
                </span>
                <p className="font-medium text-[var(--text-primary)]">
                  {user.phone}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 text-xs">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-hover)] text-[var(--text-muted)]">
              <Clock size={14} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-[var(--text-muted)] block">
                Work Hours
              </span>
              <p className="font-medium text-[var(--text-primary)]">
                09:30 AM - 06:30 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* Shared Files & Attachments Section */}
        <div>
          <div className="mb-2.5 flex items-center justify-between text-xs">
            <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider text-[11px]">
              Shared Media & Docs
            </span>
            <span className="text-[10px] font-semibold text-[var(--text-muted)]">
              {sharedFiles.length} files
            </span>
          </div>

          {sharedFiles.length > 0 ? (
            <div className="space-y-2">
              {sharedFiles.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2.5 text-xs hover:bg-[var(--bg-hover)] transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                      <FileText size={16} />
                    </div>
                    <div className="min-w-0 truncate">
                      <p className="font-medium text-[var(--text-primary)] truncate text-[11px]">
                        {file.name}
                      </p>
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {file.size}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert(`Opening: ${file.name}`)}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[#6063EE] hover:bg-[var(--bg-main)] transition"
                  >
                    <ExternalLink size={13} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--border-color)] p-4 text-center text-xs text-[var(--text-muted)]">
              No files shared in this chat yet.
            </div>
          )}
        </div>

        {/* Quick Action Shortcuts */}
        <div className="space-y-1 pt-2">
          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-lg p-2.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition text-left"
          >
            <Star size={15} className="text-amber-400" />
            <span>Star Conversation</span>
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2.5 rounded-lg p-2.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition text-left"
          >
            <BellOff size={15} className="text-[var(--text-muted)]" />
            <span>Mute Notifications</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUserProfileDrawer;
