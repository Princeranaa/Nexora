import { Server } from "socket.io";
import { socketAuthMiddleware } from "../Middlewares/socketAuth.js";
import crypto from "crypto";
import { chatModel } from "../models/Chat.model.js";

export const initliseSocektIO = (server) => {
  const getSecretRoomId = (userId, targetUserId) => {
    console.log("userId", userId);
    console.log("targetUserId", targetUserId);
    return crypto
      .createHash("sha256")
      .update([userId, targetUserId].sort().join("$"))
      .digest("hex");
  };

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      withCredentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    // console.log("user connection", socket.id);

    socket.on("joinRoom", async (targetUserId) => {
      try {
        const userId = socket.user._id;
        const roomId = getSecretRoomId(userId, targetUserId);

        console.log("userId:", userId);
        console.log("targetUserId:", targetUserId);
        console.log("roomId:", roomId);

        socket.join(roomId);

        socket.emit("room-joined", {
          roomId,
          message: "Joined room successfully",
        });
      } catch (error) {
        console.error("joinRoom error:", error);
      }
    });

    socket.on(
      "sendMessage", async ({ userId, targetUserId, text }) => {
        if (!userId || !targetUserId) {
          console.error("Invalid Payload: Missing userId or targetUserId");
          return;
        }

        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          let chat = await chatModel.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new chatModel({
              participants: [userId, targetUserId],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", {text });
        } catch (error) {
          console.error("sendMessage Error:", error.message, error);
        }
      },
    );

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
