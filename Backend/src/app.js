import express from "express";
import cookieParser from 'cookie-parser'
import UserRoutes from "../src/routes/User.routes.js";
import TaskRoutes from "../src/routes/Task.routes.js";
import AdminRoutes from "../src/routes/Admin.routes.js";
import EmployeeRoutes from "../src/routes/Employees.routes.js";
import ActivityRoutes from "../src/routes/Activity.routes.js";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use("/api/auth", UserRoutes);
app.use("/api/auth", TaskRoutes);
app.use("/api/auth", AdminRoutes);
app.use("/api/auth", EmployeeRoutes);
app.use("/api/auth", ActivityRoutes);

export default app;
