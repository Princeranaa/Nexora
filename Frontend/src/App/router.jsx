// import { createBrowserRouter } from "react-router";
// import AuthLayout from "../App/layouts/AuthLayout.jsx";
// import DashboardLayout from "./layouts/DashboardLayout.jsx";
// import Login from "../features/auth/pages/Login.jsx";
// import Register from "../features/auth/pages/Register.jsx";
// import Home from "../features/dashboard/pages/Home.jsx";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthLayout />,
//     children: [
//       {
//          index: true,
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: <DashboardLayout />,
//     children: [
//       {
//         path: "",
//         element: <Home />,
//       },
//     ],
//   },
// ]);

// export default routes;


import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "../features/auth/pages/Login.jsx";
import Register from "../features/auth/pages/Register.jsx";
import Home from "../features/dashboard/pages/Home.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path:"login" ,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default routes;