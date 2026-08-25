import { useSearchParams } from "react-router-dom";
import {
  UserRound,
  Pencil,
  Monitor,
  Bell,
  Lock,
} from "lucide-react";

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "profile";

  const settingsMenu = [
    {
      id: "profile",
      label: "Profile Settings",
      icon: UserRound,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Monitor,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
    },
  ];

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  return (
    <div className="w-full min-h-full p-6">

      {/* Header */}
      <div className="mb-7">
        <h1 className="text-3xl font-semibold text-[var(--text-primary)]">
          Workspace Settings
        </h1>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your personal profile, preferences, and notification triggers.
        </p>
      </div>

      {/* Settings Layout */}
      <div className="flex gap-7">

        {/* Sidebar */}
        <aside className="w-44 shrink-0">
          <div className="flex flex-col gap-1">

            {settingsMenu.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`
                    flex items-center gap-3
                    w-full
                    px-3 py-2.5
                    rounded-lg
                    text-left
                    text-sm
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-[var(--bg-card)] text-purple-400 font-semibold"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-card)]/60 hover:text-[var(--text-primary)]"
                    }
                  `}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}

          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">

          {activeTab === "profile" && (
            <ProfileSettings />
          )}

          {activeTab === "appearance" && (
            <SettingsPlaceholder title="Appearance" />
          )}

          {activeTab === "notifications" && (
            <SettingsPlaceholder title="Notifications" />
          )}

          {activeTab === "security" && (
            <SettingsPlaceholder title="Security" />
          )}

        </main>
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  return (
    <section className="w-full max-w-3xl rounded-xl bg-[var(--bg-card)] border border-white/5 p-5">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">

        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400">
          <UserRound size={19} />
        </div>

        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Profile Settings
        </h2>

      </div>

      {/* Profile */}
      <div className="flex gap-5">

        {/* Profile Image */}
        <div className="relative shrink-0">

          <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
            <UserRound
              size={42}
              className="text-slate-400"
            />
          </div>

          <button
            type="button"
            className="
              absolute -right-2 -bottom-2
              flex items-center justify-center
              w-8 h-8
              rounded-lg
              bg-purple-500
              text-white
              border-4 border-[var(--bg-card)]
              hover:bg-purple-600
              transition
            "
          >
            <Pencil size={13} />
          </button>

        </div>

        {/* Form */}
        <div className="flex-1">

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                Full Name
              </label>

              <input
                type="text"
                defaultValue="Alexander Wright"
                className="
                  w-full h-10 px-3
                  rounded-lg
                  border border-white/10
                  bg-[var(--bg-main)]
                  text-sm
                  text-[var(--text-primary)]
                  outline-none
                  focus:border-purple-500
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                Email Address
              </label>

              <input
                type="email"
                defaultValue="alexander.wright@synthetix.ai"
                className="
                  w-full h-10 px-3
                  rounded-lg
                  border border-white/10
                  bg-[var(--bg-main)]
                  text-sm
                  text-[var(--text-primary)]
                  outline-none
                  focus:border-purple-500
                "
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                Bio
              </label>

              <textarea
                rows="3"
                defaultValue="Lead Product Designer at Synthetix AI. Focus on intelligent systems and human-centric automation architecture."
                className="
                  w-full px-3 py-2.5
                  rounded-lg
                  border border-white/10
                  bg-[var(--bg-main)]
                  text-sm
                  text-[var(--text-primary)]
                  resize-none
                  outline-none
                  focus:border-purple-500
                "
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const SettingsPlaceholder = ({ title }) => {
  return (
    <section className="w-full max-w-3xl rounded-xl bg-[var(--bg-card)] border border-white/5 p-6">

      <h2 className="text-xl font-semibold text-[var(--text-primary)]">
        {title}
      </h2>

      <p className="mt-2 text-sm text-[var(--text-secondary)]">
        {title} settings will be available here.
      </p>

    </section>
  );
};

export default Settings;