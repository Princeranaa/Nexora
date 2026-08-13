import express from "express";
import cookieParser from 'cookie-parser'
import UserRoutes from "../src/routes/User.routes.js";
import TaskRoutes from "../src/routes/Task.routes.js";


const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", UserRoutes);
app.use("/api/auth", TaskRoutes);

export default app;
