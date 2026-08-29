import express from "express";
import { createEmployee, getAllEmployees } from "../controllers/Admin.controller.js";
import { adminMiddleware } from "../Middlewares/Admin.middleware.js";
import { updateEmployeeStatus } from "../controllers/Admin.controller.js";

const router = express.Router();

router.post("/employees", adminMiddleware, createEmployee);
router.get("/employees",  getAllEmployees);
router.patch("/employees/:employeeId/status",  adminMiddleware, updateEmployeeStatus)

export default router;
