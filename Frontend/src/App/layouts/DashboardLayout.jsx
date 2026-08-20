import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import AsideNav from "../../features/dashboard/components/AsideNav";
import TopNav from "../../features/dashboard/components/TopNav";

const DashboardLayout = () => {
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (mode === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [mode]);

  return (
    <>
      <div className="h-screen grid grid-cols-[1fr_7fr] overflow-hidden">
        <div className="min-h-0 overflow-hidden border-r border-gray-300 dark:border-gray-500">
          <AsideNav />
        </div>

        <div className="min-w-0 min-h-0 flex flex-col  overflow-hidden p-4">
          <div className="shrink-0">
            <TopNav />
          </div>

          <main className="min-h-0 flex-1 overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
