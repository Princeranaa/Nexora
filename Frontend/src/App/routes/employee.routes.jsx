import MyTask from "../../features/employeeModule/mytask/pages/MyTask.jsx";
import Profile from "../../features/employeeModule/profile/pages/Profile.jsx";
import Attendance from "../../features/employeeModule/attendance/pages/attendance.jsx";
import Chats from "../../features/chats/pages/Chats.jsx";
import Settings from "../../features/settings/pages/Settings.jsx";


export let employeeRoutes = [
  {
    path: "/home/mytask",
    element: <MyTask />,
  },
  {
    path: "/home/profile",
    element: <Profile />,
  },
  {
    path: "/home/attendance",
    element: <Attendance />,
  },
  {
    path: "/home/chats",
    element: <Chats />,
  },
  {
    path: "/home/settings",
    element: <Settings />,
  },
];
