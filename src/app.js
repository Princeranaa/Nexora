import express from "express";
import userRoutes from "../src/routes/User.routes.js";
import cookieParser from 'cookie-parser'


const app = express();
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", userRoutes);

export default app;
