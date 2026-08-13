import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { userModel } from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    const User = await userModel.findById(decoded.id).select("-password");
    console.log("User", User);
    if (!User) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = User;
    next();
  } catch (error) {
    console.log("error", error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
