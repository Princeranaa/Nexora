import express from "express";
import { createTask,deleteTask,updateTask,viewTask } from "../controllers/Task.controller.js";
import { adminMiddleware } from "../Middlewares/Admin.middleware.js";
import { createTaskValidation } from "../Middlewares/Validation.middleware.js";
const router = express.Router();

router.post("/create-task", adminMiddleware, createTaskValidation, createTask);
router.get("/tasks", adminMiddleware, viewTask);
router.put("/tasks/:taskId", adminMiddleware, updateTask);
router.delete("/tasks/:taskId", adminMiddleware, deleteTask);

export default router;
