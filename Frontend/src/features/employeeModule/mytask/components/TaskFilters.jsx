export const TaskFilters = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Pending", "In Progress", "Completed"];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onFilterChange(item)}
          className={`
            btn btn-sm
            ${
              activeFilter === item
                ? "btn-primary"
                : "btn-ghost border border-base-300"
            }
          `}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;
