import Home from "../../features/dashboard/pages/Home";
import Chats from "../../features/chats/pages/Chats.jsx";
import Settings from "../../features/settings/pages/Settings.jsx";

export let commonRoutes = [
  {
    path: "/home/dashboard",
    element: <Home />,
  },
  {
    path: "chats",
    element: <Chats />,
  },
  {
    path: "settings",
    element: <Settings />,
  },
];
