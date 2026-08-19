import {
    ClipboardCheck,
  LayoutDashboard,
  ListTodo,
  MessageCircle,
  MessageSquare,
  Settings,
  Settings2,
  Users,
} from "lucide-react";

export let employeeNavigation = [
  {
    path: "/home/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/home/mytask",
    title: "Task",
    icon: ListTodo,
  },
  {
    path: "/home/chats",
    title: "Chats",
    icon: Users,
  },
  {
    path: "/home/attendance",
    title: "Attendance",
    icon: ClipboardCheck,
  },
  {
    path: "/home/profile",
    title: "Profile",
    icon: ClipboardCheck,
  },
  {
    path: "/home/settings",
    title: "Settings",
    icon: Settings2,
  },
];
export let adminNavigation = [
  {
    path: "/home/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/home/task",
    title: "Task",
    icon: ListTodo,
  },
  {
    path: "/home/chats",
    title: "Chats",
    icon: MessageCircle ,
  },
  {
    path: "/home/employee",
    title: "Employee",
    icon: Users,
  },
  {
    path: "/home/settings",
    title: "Settings",
    icon: Settings2,
  },
];
