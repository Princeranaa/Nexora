import { Bell, LogOut, LogOutIcon, Menu, Moon, Search, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../Shared/State/ThemSlice.jsx";
import { useAuth } from "../hooks/useAuth.hooks.jsx";

const TopNav = () => {
  const { mode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleTheme());
  };

  const {handleLogout} = useAuth();

  return (
    <header className="flex h-16 w-full items-center justify-end px-4 md:px-6">
      {/* Search */}
      {/* <div className="flex w-full max-w-md items-center gap-2 rounded-lg   bg-[var(--bg-card)] px-3 py-2 transition focus-within:border-[var(--primary)]">
        <Search size={18} className="shrink-0 text-[var(--text-muted)]" />

        <input
          type="text"
          placeholder="Search workspace..."
          className="w-full  bg-transparent text-sm outline-none placeholder:text-[var(--text-muted)]"
        />
      </div> */}

      {/* Actions */}
      <div className="ml-4 flex items-center gap-2">
        <button
          type="button"
          onClick={handleClick}
          className="relative rounded-lg p-2 transition hover:bg-[var(--bg-hover)]"
          aria-label="Change Theme"
        >
          {mode === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button
          type="button"
          className="relative rounded-lg p-2 transition hover:bg-[var(--bg-hover)]"
          aria-label="Notifications"
        >
          <Bell size={20} />

          {/* Notification badge */}
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Menu */}
        <button
          type="button"
          className="rounded-lg p-2 transition hover:bg-[var(--bg-hover)]"
          aria-label="Open menu"
          onClick={handleLogout}
        >
          {/* <Menu size={20} /> */}
          <LogOutIcon size={20}/>
        </button>
      </div>
    </header>
  );
};

export default TopNav;
