import express from "express";
import { registerValidation, loginValidation } from "../Middlewares/Validation.middleware.js";
import { register, login, getMe, logout } from "../controllers/User.controller.js";
import { authMiddleware } from "../Middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", authMiddleware, getMe);
router.post("/logout", logout);

export default router;

