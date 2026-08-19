import { NavLink } from "react-router";

const NavigationTab = ({ path, title, Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `group mx-3 my-1 flex items-center gap-3 rounded-[var(--radius-md)] px-4 py-3
        text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-[var(--tertiary)]/15 text-[var(--tertiary)] shadow-[var(--shadow-md)]"
            : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            strokeWidth={isActive ? 2.5 : 2}
            className="shrink-0 transition-transform duration-200 group-hover:scale-105"
          />

          <span>{title}</span>
        </>
      )}
    </NavLink>
  );
};

export default NavigationTab;