import express from "express";
import { createTask } from "../controllers/Task.controller.js";
import { adminMiddleware } from "../Middlewares/Admin.middleware.js";
import { createTaskValidation } from "../Middlewares/Validation.middleware.js";
const router = express.Router();

router.post("/create-task", adminMiddleware, createTaskValidation, createTask);

export default router;
