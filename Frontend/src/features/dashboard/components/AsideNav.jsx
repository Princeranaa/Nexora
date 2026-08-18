import {
  LayoutDashboard,
  ListTodo,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Task",
    path: "/tasks",
    icon: ListTodo,
  },
  {
    label: "Team",
    path: "/team",
    icon: Users,
  },
  {
    label: "Chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const AsideNav = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[var(--border)]">
      {/* Logo */}
      <div className="flex flex-col gap-1 border-b border-[var(--border)] p-5">
        <h1 className="text-3xl font-semibold text-[var(--primary)]">
          Team Sync
        </h1>

        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Enterprise WorkSpace
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
              ${
                isActive
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
              }`
            }
          >
            <Icon size={19} strokeWidth={2} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-[var(--border)] p-3">
        <p className="px-3 text-xs text-[var(--text-secondary)]">
          © 2026 Team Sync
        </p>
      </div>
    </aside>
  );
};

export default AsideNav;