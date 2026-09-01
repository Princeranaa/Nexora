import {
  Mail,
  User,
  ShieldCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
  Pencil,
} from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { employee } = useSelector((state) => state.auth);
  console.log("employeees", employee);

  const user = {
    fullname: {
      firstname: "Aarav",
      lastname: "Sharma",
    },
    email: "aarav@me.com",
    role: "employee",
    status: "active",
    createdAt: "2026-08-14T09:34:34.385Z",
  };

  const fullName = `${employee.fullname.firstname} ${employee.fullname.lastname}`;

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-full bg-[var(--bg-main)] p-4 md:p-6">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-6">
        <h1 className=" text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
          My Profile
        </h1>

        <p className=" mt-1 text-sm text-[var(--text-muted)]">
          View your personal and account information.
        </p>
      </div>

      {/* =====================================================
          PROFILE HEADER CARD
      ===================================================== */}

      <section className=" overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--shadow-md)]">
        {/* Top accent */}

        <div className=" h-24 bg-[var(--primary)] opacity-90" />

        {/* Profile content */}

        <div className="relative px-5 pb-5 md:px-7 md:pb-7">
          <div className=" -mt-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Avatar + information */}

            <div className=" flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}

              <div className=" flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-[var(--bg-card)] bg-[var(--primary)] text-2xl font-bold text-white shadow-lg">
                {employee.fullname.firstname.charAt(0).toUpperCase()}
              </div>

              {/* Name */}

              <div className="pb-1">
                <h2 className=" text-xl font-bold text-[var(--text-primary)]">
                  {fullName}
                </h2>

                <div className=" mt-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-md px-2.5 py-1 text-xs font-medium capitalize text-[var(--text-primary)]">
                    {employee.role}
                  </span>

                  <span className=" flex items-center gap-1.5 rounded-md bg-[color-mix(in_srgb,var(--success)_12%,transparent)] px-2.5 py-1 text-xs font-medium capitalize text-[var(--success)]">
                    <span className=" h-1.5 w-1.5 rounded-full bg-[var(--success)]" />

                    {employee.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT GRID
      ===================================================== */}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ===================================================
            PERSONAL INFORMATION
        =================================================== */}

        <section className=" rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--shadow-md)] lg:col-span-2">
          {/* Section header */}

          <div className=" flex items-center gap-3 border-b border-[var(--border-color)] px-5 py-4 md:px-6">
            <div className=" flex h-9 w-9 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[var(--primary)]">
              <User size={18} />
            </div>

            <div>
              <h3 className=" font-semibold text-[var(--text-primary)]">
                Personal Information
              </h3>

              <p className=" text-xs text-[var(--text-muted)]">
                Your basic personal details
              </p>
            </div>
          </div>

          {/* Information */}

          <div className=" grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:p-6">
            <ProfileField
              icon={<User size={16} />}
              label="First Name"
              value={employee.fullname.firstname}
            />

            <ProfileField
              icon={<User size={16} />}
              label="Last Name"
              value={employee.fullname.lastname}
            />

            <ProfileField
              icon={<Mail size={16} />}
              label="Email Address"
              value={employee.email}
            />
          </div>
        </section>

        {/* ===================================================
            ACCOUNT INFORMATION
        =================================================== */}

        <section className=" rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--shadow-md)]">
          <div className=" flex items-center gap-3 border-b border-[var(--border-color)] px-5 py-4">
            <div className=" flex h-9 w-9 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-[var(--success)]">
              <ShieldCheck size={18} />
            </div>

            <div>
              <h3 className=" font-semibold text-[var(--text-primary)]">
                Account
              </h3>

              <p className="text-xs text-[var(--text-muted)]">
                Account details
              </p>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <ProfileField
              icon={<ShieldCheck size={16} />}
              label="Role"
              value={employee.role}
              capitalize
            />

            <ProfileField
              icon={<CheckCircle2 size={16} />}
              label="Account Status"
              value={employee.status}
              capitalize
              valueClass="text-[var(--success)]"
            />

            <ProfileField
              icon={<CalendarDays size={16} />}
              label="Joined"
              value={formatDate(employee.createdAt)}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

/* =========================================================
   PROFILE FIELD
========================================================= */

const ProfileField = ({
  icon,
  label,
  value,
  capitalize = false,
  valueClass = "text-[var(--text-primary)]",
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-[var(--text-muted)]">
        {icon}

        <span className="text-xs">{label}</span>
      </div>

      <p
        className={` text-sm font-medium ${valueClass} ${capitalize ? "capitalize" : ""}`}
      >
        {value || "-"}
      </p>
    </div>
  );
};

export default Profile;
