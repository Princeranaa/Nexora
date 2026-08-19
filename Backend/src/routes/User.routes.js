import express from "express";
import { registerValidation,loginValidation } from "../Middlewares/Validation.middleware.js";
import { register,login, getMe } from "../controllers/User.controller.js";
import { adminMiddleware } from "../Middlewares/Admin.middleware.js";
import { authMiddleware } from "../Middlewares/Auth.middleware.js";
import {getAllEmployees} from "../controllers/User.controller.js"
const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.get("/profile", authMiddleware, getMe);
router.get("/employees", adminMiddleware, getAllEmployees)

export default router;
