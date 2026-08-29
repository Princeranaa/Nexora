import { CheckCircle2, Clock3, ListTodo } from "lucide-react";

export const TaskSummary = ({ summary }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: summary.total,
      icon: ListTodo,
      type: "total",
    },
    {
      title: "Pending",
      value: summary.pending,
      icon: Clock3,
      type: "pending",
    },
    {
      title: "In Progress",
      value: summary.inProgress,
      icon: Clock3,
      type: "progress",
    },
    {
      title: "Completed",
      value: summary.completed,
      icon: CheckCircle2,
      type: "completed",
    },
  ];

  return (
    <section className="task-summary-grid">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.title}
            className={`task-summary-card ${card.type}`}
          >
            <div className="task-summary-content">
              <span>{card.title}</span>
              <strong>{card.value}</strong>
            </div>

            <div className="task-summary-icon">
              <Icon size={21} />
            </div>
          </article>
        );
      })}
    </section>
  );
};