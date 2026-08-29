export const TaskCard = ({ task, onStatusChange, isUpdating }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completed";
      case "In Progress":
        return "status-progress";
      case "Pending":
        return "status-pending";
      default:
        return "";
    }
  };
  const getDueDateClass = () => {
    if (task.status === "Completed") {
      return "due-normal";
    }
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    if (dueDate < today) {
      return "due-overdue";
    }
    if (dueDate.getTime() === today.getTime()) {
      return "due-today";
    }
    return "due-normal";
  };
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <article className="employee-task-card">
      {" "}
      {/* Card Header */}{" "}
      <div className="task-card-header">
        {" "}
        <div className="task-card-title-wrapper">
          {" "}
          <h2>{task.title}</h2> <p> {task.description} </p>{" "}
        </div>{" "}
        <span className={`task-priority ${getPriorityClass(task.priority)}`}>
          {" "}
          {task.priority}{" "}
        </span>{" "}
      </div>{" "}
      {/* Divider */} <div className="task-card-divider" /> {/* Card Footer */}{" "}
      <div className="task-card-footer">
        {" "}
        {/* Due Date */}{" "}
        <div className="task-due-date">
          {" "}
          <CalendarDays size={18} className={getDueDateClass()} />{" "}
          <div>
            {" "}
            <span>Due Date</span>{" "}
            <strong className={getDueDateClass()}>
              {" "}
              {formatDate(task.dueDate)}{" "}
            </strong>{" "}
          </div>{" "}
        </div>{" "}
        {/* Status */}{" "}
        <div className="task-status-wrapper">
          {" "}
          <span className={`task-status ${getStatusClass(task.status)}`}>
            {" "}
            {task.status}{" "}
          </span>{" "}
          <select
            value={task.status}
            disabled={isUpdating}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
          >
            {" "}
            <option value="Pending"> Pending </option>{" "}
            <option value="In Progress"> In Progress </option>{" "}
            <option value="Completed"> Completed </option>{" "}
          </select>{" "}
        </div>{" "}
      </div>{" "}
    </article>
  );
};
