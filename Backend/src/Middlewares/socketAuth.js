import { userModel } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.token;

    if (!token) {
      return next(new Error("Authentication error: token missing"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    if (user.status === "inactive") {
      return next(
        new Error(
          "Your account has been deactivated. Please contact your administrator.",
        ),
      );
    }

    socket.user = user;
    next();
  } catch (error) {
    console.error("Socket authentication error:", error.message);
    next(new Error("Invalid or expired token"));
  }
};
