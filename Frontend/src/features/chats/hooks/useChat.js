import { useState, useMemo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { initialUsers, initialConversations } from "../service/chatMockData";

export const useChat = (targetUserId) => {
  const currentAuthUser = useSelector((state) => state.auth?.employee);

  const [users, setUsers] = useState(initialUsers);
  const [conversations, setConversations] = useState(initialConversations);
  const [filterRole, setFilterRole] = useState("all"); // 'all' | 'admin' | 'employee' | 'unread'
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState("");

  const activeUser = useMemo(() => {
    if (!targetUserId) return null;
    return (
      users.find((u) => u._id === targetUserId) || {
        _id: targetUserId,
        firstname: "Team",
        lastname: "Member",
        role: "employee",
        department: "General",
        online: true,
        lastSeen: "Online now",
      }
    );
  }, [targetUserId, users]);

  // Mark messages as read when opening a conversation
  useEffect(() => {
    if (targetUserId) {
      setUsers((prev) =>
        prev.map((u) => (u._id === targetUserId ? { ...u, unread: 0 } : u))
      );
    }
  }, [targetUserId]);

  // Filtered contacts based on search query & active category filter
  const filteredUsers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return users.filter((u) => {
      const fullname = `${u.firstname} ${u.lastname}`.toLowerCase();
      const matchesSearch =
        !q ||
        fullname.includes(q) ||
        u.role.toLowerCase().includes(q) ||
        (u.department && u.department.toLowerCase().includes(q)) ||
        (u.lastMessage && u.lastMessage.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (filterRole === "admin") return u.role === "admin";
      if (filterRole === "employee") return u.role === "employee";
      if (filterRole === "unread") return (u.unread || 0) > 0;

      return true;
    });
  }, [users, searchQuery, filterRole]);

  // Messages for the active conversation
  const activeMessages = useMemo(() => {
    if (!targetUserId) return [];
    const msgs = conversations[targetUserId] || [];
    if (!chatSearchQuery.trim()) return msgs;

    const sq = chatSearchQuery.toLowerCase().trim();
    return msgs.filter(
      (m) => m.text?.toLowerCase().includes(sq) || m.senderName?.toLowerCase().includes(sq)
    );
  }, [conversations, targetUserId, chatSearchQuery]);

  // Send a new message
  const sendMessage = useCallback(
    ({ text, attachments = [], replyTo = null }) => {
      if (!targetUserId || (!text.trim() && attachments.length === 0)) return;

      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMsg = {
        id: `msg_${Date.now()}`,
        senderId: "me",
        senderName: currentAuthUser
          ? `${currentAuthUser.firstname || "You"} ${currentAuthUser.lastname || ""}`.trim()
          : "You",
        senderRole: currentAuthUser?.role || "admin",
        text: text.trim(),
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

      // Optimistically add message
      setConversations((prev) => ({
        ...prev,
        [targetUserId]: [...(prev[targetUserId] || []), newMsg],
      }));

      // Update last message in sidebar
      setUsers((prev) =>
        prev.map((u) =>
          u._id === targetUserId
            ? {
                ...u,
                lastMessage: text.trim() || (attachments.length ? `[${attachments[0].name}]` : ""),
                lastMessageTime: timeString,
              }
            : u
        )
      );

      // Reset reply state
      setReplyingTo(null);

      // Transition status from sent -> delivered -> read
      setTimeout(() => {
        setConversations((prev) => {
          const list = prev[targetUserId] || [];
          return {
            ...prev,
            [targetUserId]: list.map((m) =>
              m.id === newMsg.id ? { ...m, status: "delivered" } : m
            ),
          };
        });
      }, 1000);

      setTimeout(() => {
        setConversations((prev) => {
          const list = prev[targetUserId] || [];
          return {
            ...prev,
            [targetUserId]: list.map((m) =>
              m.id === newMsg.id ? { ...m, status: "read" } : m
            ),
          };
        });
      }, 2000);

      // Simulate reciprocal typing response for realistic interaction
      if (activeUser?.online) {
        setTimeout(() => {
          setIsTyping(true);
        }, 1500);

        setTimeout(() => {
          setIsTyping(false);
          const replyTime = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const autoReplyOptions = [
            "Got it! I will review this and get back to you shortly.",
            "Thanks for the update! Let's align on this in our next standup.",
            "Acknowledged. Making the requested adjustments right away.",
            "Looks great! Proceed with the proposed plan.",
          ];
          const randomReply =
            autoReplyOptions[Math.floor(Math.random() * autoReplyOptions.length)];

          const replyMsg = {
            id: `msg_rep_${Date.now()}`,
            senderId: activeUser._id,
            senderName: `${activeUser.firstname} ${activeUser.lastname}`,
            senderRole: activeUser.role,
            text: randomReply,
            timestamp: replyTime,
            date: "Today",
            status: "read",
            reactions: [],
          };

          setConversations((prev) => ({
            ...prev,
            [targetUserId]: [...(prev[targetUserId] || []), replyMsg],
          }));

          setUsers((prev) =>
            prev.map((u) =>
              u._id === targetUserId
                ? {
                    ...u,
                    lastMessage: randomReply,
                    lastMessageTime: replyTime,
                  }
                : u
            )
          );
        }, 3800);
      }
    },
    [targetUserId, currentAuthUser, activeUser]
  );

  // Toggle emoji reactions on a message
  const toggleReaction = useCallback(
    (messageId, emoji) => {
      if (!targetUserId) return;

      setConversations((prev) => {
        const list = prev[targetUserId] || [];
        const updated = list.map((msg) => {
          if (msg.id !== messageId) return msg;

          const existingReactions = msg.reactions || [];
          const matchIndex = existingReactions.findIndex((r) => r.emoji === emoji);

          if (matchIndex > -1) {
            const currentReaction = existingReactions[matchIndex];
            const hasReacted = currentReaction.users?.includes("me");

            let newReactions;
            if (hasReacted) {
              if (currentReaction.count <= 1) {
                newReactions = existingReactions.filter((_, idx) => idx !== matchIndex);
              } else {
                newReactions = existingReactions.map((r, idx) =>
                  idx === matchIndex
                    ? {
                        ...r,
                        count: r.count - 1,
                        users: r.users.filter((u) => u !== "me"),
                      }
                    : r
                );
              }
            } else {
              newReactions = existingReactions.map((r, idx) =>
                idx === matchIndex
                  ? {
                      ...r,
                      count: r.count + 1,
                      users: [...(r.users || []), "me"],
                    }
                  : r
              );
            }
            return { ...msg, reactions: newReactions };
          } else {
            return {
              ...msg,
              reactions: [
                ...existingReactions,
                { emoji, count: 1, users: ["me"] },
              ],
            };
          }
        });

        return { ...prev, [targetUserId]: updated };
      });
    },
    [targetUserId]
  );

  // Delete message
  const deleteMessage = useCallback(
    (messageId) => {
      if (!targetUserId) return;
      setConversations((prev) => ({
        ...prev,
        [targetUserId]: (prev[targetUserId] || []).filter((m) => m.id !== messageId),
      }));
    },
    [targetUserId]
  );

  return {
    users,
    filteredUsers,
    activeUser,
    activeMessages,
    filterRole,
    setFilterRole,
    searchQuery,
    setSearchQuery,
    isTyping,
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
    toggleReaction,
    deleteMessage,
  };
};
