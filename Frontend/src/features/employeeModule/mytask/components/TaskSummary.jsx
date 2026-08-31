
import {
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";

export const TaskSummary = ({ summary }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: summary.total,
      icon: ListTodo,
    },
    {
      title: "Pending",
      value: summary.pending,
      icon: Clock3,
    },
    {
      title: "In Progress",
      value: summary.inProgress,
      icon: Clock3,
    },
    {
      title: "Completed",
      value: summary.completed,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-base-100
              border border-base-300
              rounded-xl
              p-4
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  {card.title}
                </p>

                <p className="text-2xl font-bold mt-1">
                  {card.value}
                </p>
              </div>

              <div className="p-2 rounded-lg bg-base-200">
                <Icon
                  size={20}
                  className="text-primary"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskSummary;
 
