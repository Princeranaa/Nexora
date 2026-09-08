import { Users, UserCheck, UserX } from "lucide-react";

import StatCard from "../components/StatCard";
import { RecentActivity } from "../components/RecentActivity";
import { useEmployee } from "../../adminModule/employees/hooks/employeeHook";

const Home = () => {
  const { data } = useEmployee();
  const employeeStats = data?.employeeStats;

  const stats = [
    {
      title: "Total Employees",
      value: employeeStats?.totalEmployees ?? 0,
      icon: Users,
    },
    {
      title: "Active Employees",
      value: employeeStats?.activeEmployees ?? 0,
      icon: UserCheck,
    },
    {
      title: "Inactive Employees",
      value: employeeStats?.inactiveEmployees ?? 0,
      icon: UserX,
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 gap-5">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-[var(--text-muted)]">
          Here's an overview of your CMS.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};

export default Home;
