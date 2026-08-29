import express from "express";
import { authMiddleware } from "../Middlewares/Auth.middleware.js";
import { getEmployeeTasks, updateEmployeeTaskStatus } from "../controllers/Employee.controller.js";
 

const router = express.Router();
 

router.get("/employee/tasks", authMiddleware, getEmployeeTasks);
router.patch("/employee/:taskId/status", authMiddleware,updateEmployeeTaskStatus);


export default router;