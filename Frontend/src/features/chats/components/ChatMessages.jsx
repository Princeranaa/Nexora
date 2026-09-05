import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, MessageSquare } from "lucide-react";
import ChatMessageItem from "./ChatMessageItem";

const ChatMessages = ({
  messages = [],
  activeUser,
  isTyping,
  onReply,
  onReaction,
  onDelete,
}) => {
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  // Auto-scroll on initial load or new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle scroll detection for the scroll-to-bottom button
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 150;
    setShowScrollBottom(isUp);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, msg) => {
    const dateKey = msg.date || "Today";
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(msg);
    return groups;
  }, {});

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="relative min-h-0 flex-1 overflow-y-auto bg-[var(--bg-main)] px-3 py-4 sm:px-6 thin-scrollbar"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {Object.keys(groupedMessages).length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center text-xs text-[var(--text-muted)]">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-hover)]">
              <MessageSquare size={18} />
            </div>
            <p className="font-semibold text-[var(--text-primary)]">
              No messages found
            </p>
            <p className="mt-1">
              Send a message below to start coordinating with {activeUser?.firstname || "this user"}.
            </p>
          </div>
        ) : (
          Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date} className="flex flex-col gap-3">
              {/* Date Header Badge */}
              <div className="my-2 flex items-center justify-center">
                <span className="rounded-full border border-[var(--border-color)] bg-[var(--bg-card)] px-3 py-1 text-[11px] font-semibold text-[var(--text-muted)] shadow-xs">
                  {date}
                </span>
              </div>

              {/* Messages for this date */}
              {dateMessages.map((msg) => (
                <ChatMessageItem
                  key={msg.id}
                  message={msg}
                  onReply={onReply}
                  onReaction={onReaction}
                  onDelete={onDelete}
                />
              ))}
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isTyping && activeUser && (
          <div className="flex items-center gap-2 py-2 px-2 text-xs text-[var(--text-muted)]">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6063EE]/20 text-[10px] font-bold text-[#6063EE]">
              {activeUser.firstname?.[0]}
              {activeUser.lastname?.[0]}
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-[var(--border-color)] bg-[var(--bg-card)] px-3.5 py-2">
              <span className="text-[11px] font-medium text-[var(--text-secondary)] mr-1">
                {activeUser.firstname} is typing
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#6063EE] animate-bounce" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#6063EE] animate-bounce [animation-delay:0.2s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#6063EE] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-4 right-6 flex h-9 w-9 items-center justify-center rounded-full bg-[#6063EE] text-white shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95 z-10"
          title="Scroll to bottom"
        >
          <ChevronDown size={18} />
        </button>
      )}
    </div>
  );
};

export default ChatMessages;
