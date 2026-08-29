const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-card)] shadow-[var(--shadow-md)]">
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-[var(--text-muted)]">{title}</p>

            <h2 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              {value}
            </h2>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-hover)] text-[var(--text-primary)]">
            <Icon size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
