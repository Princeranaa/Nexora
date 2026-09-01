import express from "express";
import { getActivitiesController } from "../controllers/Activity.controller.js";
import { authMiddleware } from "../Middlewares/Auth.middleware.js";
import { adminMiddleware } from "../Middlewares/Admin.middleware.js";

const router = express.Router();

router.get(
  "/activities",
  authMiddleware,
  // adminMiddleware,
  getActivitiesController,
);

export default router;
