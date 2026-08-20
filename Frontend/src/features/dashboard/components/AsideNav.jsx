import { NavLink } from "react-router-dom";
import NavigationTab from "./NavigationTab";
import { useSelector } from "react-redux";
import { adminNavigation, employeeNavigation } from "../../../App/constance/navigation";

const AsideNav = () => {

  let { employee } = useSelector((state) => state.auth)

  let navigation = employee.role === "admin" ? adminNavigation : employeeNavigation

  return (
    <aside className="flex h-screen w-64 flex-col   border-[var(--border)]">
      {/* Logo */}
      <div className="flex flex-col gap-1 border-b border-[var(--border)] p-5">
        <h1 className="text-3xl font-semibold text-[#6063EE]">
          Team Sync
        </h1>

        <p className="text-sm font-semibold text-[var(--text-secondary)]">
          Enterprise WorkSpace
        </p>
      </div>

    {
      navigation.map((route)=>(
        <NavigationTab
         
        path={route.path}
        title={route.title}
        Icon={route.icon}
      />
      ))
    }

      {/*  */}

      {/* <div className="border-t border-[var(--border)] p-3">
        <p className="px-3 text-xs text-[var(--text-secondary)]">
          © 2026 Team Sync
        </p>
      </div> */}
    </aside>
  );
};

export default AsideNav;
