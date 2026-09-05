import React, { useState } from "react";
import {
  Check,
  CheckCheck,
  FileText,
  Download,
  Smile,
  Reply,
  Copy,
  Trash2,
  Shield,
  User,
} from "lucide-react";

const QUICK_EMOJIS = ["👍", "❤️", "🚀", "🎉", "🔥", "🙌"];

const ChatMessageItem = ({
  message,
  onReply,
  onReaction,
  onDelete,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copied, setCopied] = useState(false);

  const isMe = message.senderId === "me";
  const isAdmin = message.senderRole === "admin";

  const handleCopy = () => {
    if (message.text) {
      navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`group relative flex w-full flex-col ${
        isMe ? "items-end" : "items-start"
      } my-1 px-1 transition-all duration-150`}
    >
      {/* Sender Header for Incoming Messages */}
      {!isMe && (
        <div className="mb-1 flex items-center gap-1.5 px-1 text-xs">
          <span className="font-semibold text-[var(--text-primary)]">
            {message.senderName}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium tracking-wide ${
              isAdmin
                ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            {isAdmin ? <Shield size={10} /> : <User size={10} />}
            {isAdmin ? "Admin" : "Employee"}
          </span>
        </div>
      )}

      {/* Message Bubble + Action Overlay Container */}
      <div className="relative max-w-[85%] sm:max-w-[72%] md:max-w-[65%]">
        {/* Reply Quoted Preview */}
        {message.replyTo && (
          <div
            className={`mb-1 flex items-center gap-2 rounded-lg border-l-2 p-2 text-xs backdrop-blur-sm ${
              isMe
                ? "border-[#6063EE] bg-black/20 text-white/90"
                : "border-indigo-400 bg-[var(--bg-hover)] text-[var(--text-secondary)]"
            }`}
          >
            <Reply size={12} className="shrink-0 rotate-180 opacity-70" />
            <div className="min-w-0 truncate">
              <span className="font-semibold block text-[11px]">
                {message.replyTo.senderName}
              </span>
              <p className="truncate text-[11px] opacity-80">
                {message.replyTo.text}
              </p>
            </div>
          </div>
        )}

        {/* Bubble */}
        <div
          className={`relative rounded-2xl px-4 py-2.5 shadow-sm transition-all duration-200 ${
            isMe
              ? "rounded-br-sm bg-gradient-to-br from-[#6063EE] to-[#4F46E5] text-white"
              : "rounded-bl-sm border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)]"
          }`}
        >
          {/* Text content */}
          {message.text && (
            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed select-text font-normal">
              {message.text}
            </p>
          )}

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-1.5">
              {message.attachments.map((file, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between gap-3 rounded-xl p-2.5 transition ${
                    isMe
                      ? "bg-black/20 hover:bg-black/30 border border-white/10"
                      : "bg-[var(--bg-hover)] hover:bg-[var(--bg-main)] border border-[var(--border-color)]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0 truncate">
                      <p className="text-xs font-semibold truncate leading-tight">
                        {file.name}
                      </p>
                      <span className="text-[10px] opacity-75">
                        {file.size}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition opacity-80 hover:opacity-100 hover:scale-105"
                    title="Download Attachment"
                    onClick={() => alert(`Downloading: ${file.name}`)}
                  >
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Timestamp & Read Receipts */}
          <div
            className={`mt-1.5 flex items-center justify-end gap-1.5 text-[10px] font-medium tracking-tight ${
              isMe ? "text-white/75" : "text-[var(--text-muted)]"
            }`}
          >
            <span>{message.timestamp}</span>

            {isMe && (
              <span className="inline-flex items-center" title={`Status: ${message.status}`}>
                {message.status === "sent" && <Check size={13} className="opacity-80" />}
                {message.status === "delivered" && (
                  <CheckCheck size={13} className="opacity-80" />
                )}
                {message.status === "read" && (
                  <CheckCheck size={13} className="text-sky-300 font-bold" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Emoji Reactions List */}
        {message.reactions && message.reactions.length > 0 && (
          <div
            className={`mt-1 flex flex-wrap items-center gap-1 ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            {message.reactions.map((r, i) => {
              const hasReacted = r.users?.includes("me");
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => onReaction?.(message.id, r.emoji)}
                  className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition duration-150 ${
                    hasReacted
                      ? "border-[#6063EE] bg-[#6063EE]/15 text-[#6063EE]"
                      : "border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                  }`}
                  title={hasReacted ? "Click to remove reaction" : "Click to react"}
                >
                  <span>{r.emoji}</span>
                  <span className="text-[10px] font-semibold">{r.count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Hover Quick Action Bar */}
        <div
          className={`absolute top-0 -translate-y-1/2 flex items-center gap-0.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-0.5 shadow-md opacity-0 transition-opacity duration-150 group-hover:opacity-100 ${
            isMe ? "right-2" : "left-2"
          }`}
        >
          {/* Reaction Picker Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition"
              title="React with emoji"
            >
              <Smile size={13} />
            </button>

            {/* Quick Emoji Popover */}
            {showEmojiPicker && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] p-1 shadow-lg z-20">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onReaction?.(message.id, emoji);
                      setShowEmojiPicker(false);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-sm hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reply */}
          <button
            type="button"
            onClick={() => onReply?.(message)}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition"
            title="Reply"
          >
            <Reply size={13} />
          </button>

          {/* Copy */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition"
            title={copied ? "Copied!" : "Copy text"}
          >
            {copied ? (
              <Check size={12} className="text-emerald-500" />
            ) : (
              <Copy size={12} />
            )}
          </button>

          {/* Delete (if sender is me) */}
          {isMe && (
            <button
              type="button"
              onClick={() => onDelete?.(message.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-500 transition"
              title="Delete message"
            >
              <Trash2 size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageItem;
