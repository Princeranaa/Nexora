import Home from "../../features/dashboard/pages/Home";
import Chats from "../../features/chats/pages/Chats.jsx";
import Settings from "../../features/settings/pages/Settings.jsx";

export let commonRoutes = [
  {
    path: "/home/dashboard",
    element: <Home />,
  },
  {
    path: "/home/chats",
    element: <Chats />,
  },
  {
    path: "/home/chats/:targetUserId",
    element: <Chats />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
];
