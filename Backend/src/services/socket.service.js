import { Server } from "socket.io";
import { socketAuthMiddleware } from "../Middlewares/socketAuth.js";

export const initliseSocektIO = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      withCredentials: true,
    },
  });

  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("user connection", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};
