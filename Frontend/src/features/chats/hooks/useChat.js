import { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  useGetChatUsersQuery,
  useGetOrCreateChatQuery,
  useSendMessageMutation,
} from "../service/chat.api";

export const useChat = (targetUserId) => {
  const currentAuthUser = useSelector((state) => state.auth?.employee);
  const currentUserId = currentAuthUser?._id || currentAuthUser?.id;

  // 1. Fetch all users from backend API
  const {
    data: fetchedUsers = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
    refetch: refetchUsers,
  } = useGetChatUsersQuery();

  // 2. Fetch or create chat conversation when targetUserId is selected
  const {
    data: currentChat,
    isLoading: isChatLoading,
    isError: isChatError,
    error: chatError,
    refetch: refetchChat,
  } = useGetOrCreateChatQuery(targetUserId, {
    skip: !targetUserId,
  });

  // 3. Send message mutation
  const [sendMsgMutation, { isLoading: isSending }] = useSendMessageMutation();

  // Local state for UI controls
  const [filterRole, setFilterRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [localOptimisticMessages, setLocalOptimisticMessages] = useState([]);

  // Normalize user list (excluding current logged-in user)
  const users = useMemo(() => {
    return (fetchedUsers || [])
      .filter((u) => u._id !== currentUserId)
      .map((u) => ({
        ...u,
        firstname: u.fullname?.firstname || u.firstname || "User",
        lastname: u.fullname?.lastname || u.lastname || "",
        online: u.status === "active",
      }));
  }, [fetchedUsers, currentUserId]);

  // Identify active selected user
  const activeUser = useMemo(() => {
    if (!targetUserId) return null;

    // Look in users list
    const found = users.find((u) => u._id === targetUserId);
    if (found) return found;

    // Look in chat participants
    if (currentChat?.participants) {
      const participant = currentChat.participants.find(
        (p) => (p._id || p) === targetUserId
      );
      if (participant && typeof participant === "object") {
        return {
          ...participant,
          firstname: participant.fullname?.firstname || participant.firstname || "User",
          lastname: participant.fullname?.lastname || participant.lastname || "",
          online: participant.status === "active",
        };
      }
    }

    return {
      _id: targetUserId,
      firstname: "Team",
      lastname: "Member",
      role: "employee",
      online: true,
    };
  }, [targetUserId, users, currentChat]);

  // Filtered contacts based on search query & role category filter
  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return users.filter((u) => {
      const fullname = `${u.firstname} ${u.lastname}`.toLowerCase();
      const matchesSearch =
        !q ||
        fullname.includes(q) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.role && u.role.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (filterRole === "admin") return u.role === "admin";
      if (filterRole === "employee") return u.role === "employee";

      return true;
    });
  }, [users, searchQuery, filterRole]);

  // Combine backend messages + local optimistic messages for active chat
  const activeMessages = useMemo(() => {
    if (!targetUserId) return [];

    const serverMessages = (currentChat?.messages || []).map((m) => {
      const senderIdStr = typeof m.senderId === "object" ? m.senderId?._id : m.senderId;
      const isMe = senderIdStr === currentUserId;

      const createdDate = m.createdAt ? new Date(m.createdAt) : new Date();
      const timeString = createdDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        id: m._id || m.id,
        _id: m._id,
        senderId: isMe ? "me" : senderIdStr,
        rawSenderId: senderIdStr,
        senderName: isMe
          ? "You"
          : `${activeUser?.firstname || "Team"} ${activeUser?.lastname || "Member"}`,
        senderRole: isMe ? currentAuthUser?.role || "employee" : activeUser?.role || "employee",
        text: m.text,
        timestamp: timeString,
        date: "Today",
        status: "read",
        attachments: m.attachments || [],
        reactions: m.reactions || [],
        replyTo: m.replyTo || null,
      };
    });

    // Merge server messages with pending optimistic messages
    const allMessages = [...serverMessages, ...localOptimisticMessages];

    if (!chatSearchQuery.trim()) return allMessages;

    const sq = chatSearchQuery.toLowerCase().trim();
    return allMessages.filter(
      (m) =>
        m.text?.toLowerCase().includes(sq) ||
        m.senderName?.toLowerCase().includes(sq)
    );
  }, [
    currentChat,
    targetUserId,
    currentUserId,
    activeUser,
    currentAuthUser,
    localOptimisticMessages,
    chatSearchQuery,
  ]);

  // Send message handler
  const sendMessage = useCallback(
    async ({ text, attachments = [], replyTo = null }) => {
      if (!targetUserId || !text.trim()) return;

      const trimmedText = text.trim();
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const tempId = `temp_${Date.now()}`;
      const optimisticMsg = {
        id: tempId,
        senderId: "me",
        senderName: "You",
        senderRole: currentAuthUser?.role || "employee",
        text: trimmedText,
        timestamp: timeString,
        date: "Today",
        status: "sent",
        attachments,
        replyTo: replyTo
          ? {
              id: replyTo.id,
              senderName: replyTo.senderName,
              text: replyTo.text,
            }
          : null,
        reactions: [],
      };

      // Optimistically show message immediately
      setLocalOptimisticMessages((prev) => [...prev, optimisticMsg]);
      setReplyingTo(null);

      try {
        if (currentChat?._id) {
          await sendMsgMutation({
            chatId: currentChat._id,
            text: trimmedText,
            targetUserId,
          }).unwrap();
        }
      } catch (err) {
        console.error("Failed to send message:", err);
      } finally {
        // Clear optimistic message once refetched
        setLocalOptimisticMessages((prev) =>
          prev.filter((m) => m.id !== tempId)
        );
      }
    },
    [targetUserId, currentChat, currentAuthUser, sendMsgMutation]
  );

  return {
    users,
    filteredUsers,
    activeUser,
    chatId: currentChat?._id,
    activeMessages,
    isUsersLoading,
    isUsersError,
    usersError,
    refetchUsers,
    isChatLoading,
    isChatError,
    chatError,
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
    toggleInfoDrawer: () => setInfoDrawerOpen((prev) => !prev),
    chatSearchOpen,
    setChatSearchOpen,
    chatSearchQuery,
    setChatSearchQuery,
    sendMessage,
  };
};
