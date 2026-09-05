import React, { useRef, useState } from "react";
import {
  Paperclip,
  Smile,
  Send,
  X,
  FileText,
  Image,
  Reply,
  Sparkles,
} from "lucide-react";

const EMOJI_LIST = [
  "😀",
  "😂",
  "👍",
  "❤️",
  "🚀",
  "🎉",
  "🔥",
  "🙌",
  "✨",
  "💯",
  "🙏",
  "👀",
  "💼",
  "✅",
];

const ChatInput = ({ onSendMessage, replyingTo, onCancelReply }) => {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed && attachments.length === 0) return;

    onSendMessage?.({
      text: trimmed,
      attachments,
      replyTo: replyingTo,
    });

    setText("");
    setAttachments([]);
    setShowEmojiPicker(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newAttachments = files.map((file) => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.startsWith("image/") ? "image" : "document",
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    e.target.value = "";
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="shrink-0 border-t border-[var(--border-color)] bg-[var(--bg-card)] p-3 sm:p-4 transition-all">
      <div className="mx-auto max-w-4xl space-y-2">
        {/* Replying Banner */}
        {replyingTo && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-3 py-2 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <Reply size={14} className="rotate-180 text-[#6063EE] shrink-0" />
              <div className="min-w-0 truncate">
                <span className="font-semibold text-[var(--text-primary)] block">
                  Replying to {replyingTo.senderName}
                </span>
                <p className="truncate text-[var(--text-muted)] text-[11px]">
                  {replyingTo.text}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onCancelReply}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              title="Cancel reply"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Attachment Preview Chips */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 py-1">
            {attachments.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-main)] px-2.5 py-1.5 text-xs text-[var(--text-primary)]"
              >
                {file.type === "image" ? (
                  <Image size={14} className="text-emerald-400 shrink-0" />
                ) : (
                  <FileText size={14} className="text-indigo-400 shrink-0" />
                )}
                <span className="max-w-[150px] truncate text-[11px] font-medium">
                  {file.name}
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">
                  ({file.size})
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(i)}
                  className="text-[var(--text-muted)] hover:text-red-500 transition ml-1"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Input Controls Row */}
        <div className="flex items-end gap-2">
          {/* Attachment Trigger Button */}
          <div className="relative shrink-0">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] transition"
              title="Attach documents or images"
            >
              <Paperclip size={18} />
            </button>
          </div>

          {/* Text Area Input Box */}
          <div className="relative flex min-h-[42px] flex-1 items-end rounded-xl border border-[var(--border-color)] bg-[var(--bg-main)] px-3 py-2 transition focus-within:border-[#6063EE] focus-within:ring-1 focus-within:ring-[#6063EE]/30">
            <textarea
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Type a message or press '/' for commands..."
              className="max-h-[120px] min-h-[24px] flex-1 resize-none border-none bg-transparent pr-8 text-xs sm:text-sm leading-relaxed text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />

            {/* Emoji Button in Input */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="absolute bottom-0 right-0 text-[var(--text-muted)] hover:text-[#6063EE] transition"
                title="Insert emoji"
              >
                <Smile size={18} />
              </button>

              {/* Emoji Menu Popover */}
              {showEmojiPicker && (
                <div className="absolute bottom-8 right-0 mb-2 grid grid-cols-7 gap-1 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-2 shadow-xl z-30 max-w-[280px]">
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleAddEmoji(emoji)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-base hover:bg-[var(--bg-hover)] hover:scale-110 transition cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim() && attachments.length === 0}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold shadow-md transition-all duration-200 ${
              text.trim() || attachments.length > 0
                ? "bg-[#6063EE] text-white hover:bg-[#4F46E5] hover:scale-105 active:scale-95 shadow-[#6063EE]/25 cursor-pointer"
                : "bg-[var(--bg-hover)] text-[var(--text-muted)] opacity-50 cursor-not-allowed"
            }`}
            title="Send message (Enter)"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
