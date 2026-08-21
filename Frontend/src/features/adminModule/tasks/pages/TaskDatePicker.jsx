const TaskDatePicker = ({ value, onChange }) => {
  const today = new Date().toISOString().split("T")[0];
  return (
    <input
      type="date"
      name="dueDate"
      value={value || ""}
      min={today}
      onChange={(e) => onChange(e.target.value)}
      required
      className="outline-none input input-bordered w-full bg-base-200 text-base-content cursor-pointer"
    />
  );
};

export default TaskDatePicker;