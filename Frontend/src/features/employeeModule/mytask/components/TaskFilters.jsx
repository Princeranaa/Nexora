export const TaskFilters = ({ activeFilter, onFilterChange }) => {
  const filters = ["All", "Pending", "In Progress", "Completed"];
  return (
    <section className="task-filters">
      {" "}
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          className={
            activeFilter === item ? "task-filter active" : "task-filter"
          }
          onClick={() => onFilterChange(item)}
        >
          {" "}
          {item}{" "}
        </button>
      ))}{" "}
    </section>
  );
};
