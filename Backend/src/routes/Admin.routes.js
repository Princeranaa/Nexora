import express from "express";
import { createEmployee, getAllEmployees } from "../controllers/Admin.controller.js";
import { adminMiddleware } from "../Middlewares/Admin.middleware.js";

const router = express.Router();

router.post("/employees", adminMiddleware, createEmployee);
router.get("/employees", adminMiddleware, getAllEmployees)

export default router;
