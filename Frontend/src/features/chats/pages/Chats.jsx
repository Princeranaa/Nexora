import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChat } from "../hooks/useChat";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

const Chats = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();

  const {
    users,
    filteredUsers,
    activeUser,
    chatId,
    activeMessages,
    isUsersLoading,
    isUsersError,
    refetchUsers,
    isChatLoading,
    isChatError,
    refetchChat,
    isSending,
    filterRole,
    setFilterRole,
    searchQuery,
    setSearchQuery,
    replyingTo,
    setReplyingTo,
    infoDrawerOpen,
    setInfoDrawerOpen,
    toggleInfoDrawer,
    chatSearchOpen,
    setChatSearchOpen,
    chatSearchQuery,
    setChatSearchQuery,
    sendMessage,
  } = useChat(targetUserId);

  const handleSelectUser = (userId) => {
    navigate(`/home/chats/${userId}`);
  };

  const handleBack = () => {
    navigate("/home/chats");
  };

  return (
    <div className="h-full w-full overflow-hidden bg-[var(--bg-main)] p-2 sm:p-3 lg:p-4">
      <div className="flex h-full min-h-0 w-full overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-lg">
        {/* Sidebar (List of conversations) */}
        <aside
          className={`
            h-full w-full shrink-0
            border-r border-[var(--border-color)]
            md:w-[320px] lg:w-[360px] xl:w-[380px]
            ${targetUserId ? "hidden md:block" : "block"}
          `}
        >
          <ChatSidebar
            users={filteredUsers}
            activeUserId={targetUserId}
            onSelectUser={handleSelectUser}
            filterRole={filterRole}
            onFilterChange={setFilterRole}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isLoading={isUsersLoading}
            isError={isUsersError}
            onRetry={refetchUsers}
          />
        </aside>

        {/* Main Chat Area */}
        <main
          className={`
            min-w-0 flex-1 h-full
            ${targetUserId ? "block" : "hidden md:block"}
          `}
        >
          <ChatWindow
            activeUser={activeUser}
            chatId={chatId}
            messages={activeMessages}
            isLoading={isChatLoading}
            isError={isChatError}
            onRetry={refetchChat}
            isSending={isSending}
            replyingTo={replyingTo}
            onReply={(msg) => setReplyingTo(msg)}
            onCancelReply={() => setReplyingTo(null)}
            onSendMessage={sendMessage}
            onBack={handleBack}
            users={users}
            onSelectQuickContact={handleSelectUser}
            infoDrawerOpen={infoDrawerOpen}
            onToggleProfile={toggleInfoDrawer}
            onCloseProfile={() => setInfoDrawerOpen(false)}
            chatSearchOpen={chatSearchOpen}
            onToggleChatSearch={() => {
              setChatSearchOpen((prev) => !prev);
              if (chatSearchOpen) setChatSearchQuery("");
            }}
            chatSearchQuery={chatSearchQuery}
            onChatSearchChange={setChatSearchQuery}
          />
        </main>
      </div>
    </div>
  );
};

export default Chats;
