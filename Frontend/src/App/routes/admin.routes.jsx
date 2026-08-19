import Employees from "../../features/adminModule/employees/pages/Employees";
import Department from "../../features/adminModule/departments/pages/Department";
import Task from "../../features/adminModule/tasks/pages/Task";
import Dashboard from "../../features/dashboard/pages/Home.jsx";
import Chats from "../../features/chats/pages/Chats.jsx";
import AddEmployee from "../../features/adminModule/employees/pages/AddEmployee.jsx";

export let adminRoutes = [
  {
    path: "/home/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/home/department",
    element: <Department />,
  },
  {
    path: "/home/employee",
    element: <Employees />,
  },
  {
    path: "/home/task",
    element: <Task />,
  },
  {
    path: "/home/chats",
    element: <Chats />,
  },
  {
    path: "/home/employee/add",
    element: <AddEmployee />,
  },
];
