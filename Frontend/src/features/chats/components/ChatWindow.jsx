import React from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatEmptyState from "./ChatEmptyState";
import ChatUserProfileDrawer from "./ChatUserProfileDrawer";

const ChatWindow = ({
  activeUser,
  chatId,
  messages,
  isLoading,
  isError,
  onRetry,
  isSending,
  isTyping,
  replyingTo,
  onReply,
  onCancelReply,
  onReaction,
  onDelete,
  onSendMessage,
  onBack,
  users,
  onSelectQuickContact,
  infoDrawerOpen,
  onToggleProfile,
  onCloseProfile,
  chatSearchOpen,
  onToggleChatSearch,
  chatSearchQuery,
  onChatSearchChange,
}) => {
  if (!activeUser) {
    return (
      <ChatEmptyState
        users={users}
        onSelectQuickContact={onSelectQuickContact}
      />
    );
  }

  return (
    <div className="relative flex h-full min-h-0 w-full overflow-hidden bg-[var(--bg-main)]">
      {/* Main Conversation Column */}
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        {/* Header */}
        <ChatHeader
          user={activeUser}
          onBack={onBack}
          onToggleProfile={onToggleProfile}
          isProfileOpen={infoDrawerOpen}
          chatSearchOpen={chatSearchOpen}
          onToggleChatSearch={onToggleChatSearch}
          chatSearchQuery={chatSearchQuery}
          onChatSearchChange={onChatSearchChange}
        />

        {/* Message Stream */}
        <ChatMessages
          messages={messages}
          activeUser={activeUser}
          isLoading={isLoading}
          isTyping={isTyping}
          onReply={onReply}
          onReaction={onReaction}
          onDelete={onDelete}
        />

        {/* Input Footer */}
        <ChatInput
          onSendMessage={onSendMessage}
          replyingTo={replyingTo}
          onCancelReply={onCancelReply}
        />
      </div>

      {/* Slide-in User Details Panel */}
      {infoDrawerOpen && (
        <aside className="w-full sm:w-[320px] md:w-[340px] shrink-0 h-full min-h-0 z-20 shadow-xl transition-all">
          <ChatUserProfileDrawer
            user={activeUser}
            onClose={onCloseProfile}
            messages={messages}
          />
        </aside>
      )}
    </div>
  );
};

export default ChatWindow;
