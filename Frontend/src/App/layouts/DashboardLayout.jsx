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
    <div className="h-screen grid grid-cols-[1fr_7fr]">
      <div className="border-r border-gray-300 dark:border-gray-500"><AsideNav/></div>
        <div className="flex flex-col p-4">
          <div><TopNav/></div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>

      {/* <footer className="border-t border-zinc-800/60 bg-[#07060A] py-4 px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">Synthetix AI</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#privacy" className="hover:text-zinc-300 transition">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-zinc-300 transition">
              Terms of Service
            </a>
            <a href="#security" className="hover:text-zinc-300 transition">
              Security
            </a>
            <a href="#status" className="hover:text-zinc-300 transition">
              System Status
            </a>
          </div>

          <div>© 2024 Synthetix AI. Enterprise Intelligence Platforms.</div>
        </div>
      </footer> */}
    </>
  );
};

export default DashboardLayout;
