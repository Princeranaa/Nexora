import React from "react";
import { MessageSquarePlus, ShieldCheck, UserCheck, Sparkles, Send } from "lucide-react";

const ChatEmptyState = ({ onSelectQuickContact, users = [] }) => {
  const quickContacts = users.slice(0, 3);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[var(--bg-main)] p-6 text-center">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#6063EE]/10 text-[#6063EE] shadow-lg shadow-[#6063EE]/10 border border-[#6063EE]/20 transition-transform duration-300 hover:scale-105">
          <MessageSquarePlus size={38} strokeWidth={1.8} />
        </div>
        <div className="absolute -top-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white text-xs shadow-md">
          <Sparkles size={14} />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
        Enterprise Team Communications
      </h2>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
        Select a conversation from the sidebar or start a direct message with an
        admin or employee to coordinate on tasks, sprints, and deliverables.
      </p>

      {/* Quick Role Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
          <ShieldCheck size={14} />
          <span>Admin Direct Support</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <UserCheck size={14} />
          <span>Employee Peer Sync</span>
        </div>
      </div>

      {/* Quick contacts recommendations */}
      {quickContacts.length > 0 && (
        <div className="mt-8 w-full max-w-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            <span>Quick Start</span>
            <span className="text-[var(--text-muted)] lowercase">recent active</span>
          </div>

          <div className="space-y-2">
            {quickContacts.map((contact) => (
              <button
                key={contact._id}
                type="button"
                onClick={() => onSelectQuickContact?.(contact._id)}
                className="group flex w-full items-center justify-between rounded-lg p-2 transition hover:bg-[var(--bg-hover)] text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6063EE]/20 text-xs font-bold text-[#6063EE]">
                    {contact.firstname?.[0]}
                    {contact.lastname?.[0]}
                  </div>
                  <div className="min-w-0 truncate">
                    <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                      {contact.firstname} {contact.lastname}
                    </p>
                    <span className="text-[10px] text-[var(--text-muted)] capitalize">
                      {contact.role} · {contact.department?.split(" ")[0]}
                    </span>
                  </div>
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--text-muted)] transition group-hover:bg-[#6063EE] group-hover:text-white">
                  <Send size={12} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatEmptyState;
