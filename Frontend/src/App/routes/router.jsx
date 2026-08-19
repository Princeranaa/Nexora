import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

import Login from "../../features/auth/pages/Login.jsx";
import Register from "../../features/auth/pages/Register.jsx";
import Home from "../../features/dashboard/pages/Home.jsx";
import PublicRoute from "../protectedRoute/PublicRoute.jsx";
import ProtectedRoute from "../protectedRoute/ProtectedRoute.jsx";
import {commonRoutes} from "../routes/common.routes.jsx"
import RolebasedRoute from "../protectedRoute/RolebasedRoute.jsx";
import { adminRoutes } from "./admin.routes.jsx";
import { employeeRoutes } from "./employee.routes.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          ...commonRoutes,
          {
            element:<RolebasedRoute allowedRole={"admin"}/>,
            children:adminRoutes
          },
          {
            element:<RolebasedRoute allowedRole={"employee"}/>,
            children:employeeRoutes
          }
        ],
      },
    ],
  },
]);

export default routes;
