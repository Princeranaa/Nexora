import express from "express";
import { registerValidation, loginValidation } from "../Middlewares/Validation.middleware.js";
import {
  register,
  login,
  getMe,
  logout,
  updateMe,
  getAllUsers,
  getOrCreateChat,
  sendMessage,
} from "../controllers/User.controller.js";
import { authMiddleware } from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", authMiddleware, getMe);
router.patch("/update-profile", authMiddleware, updateMe);
router.get("/logout", logout);

router.get("/users", authMiddleware, getAllUsers);
router.get("/chat/:targetUserId", authMiddleware, getOrCreateChat);
router.post("/chat/:chatId/message", authMiddleware, sendMessage);

export default router;


