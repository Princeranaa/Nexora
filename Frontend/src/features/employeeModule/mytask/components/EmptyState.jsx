import { ListTodo } from "lucide-react";

export const EmptyState = ({ filter }) => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-[300px] border border-dashed border-base-300 rounded-xl bg-base-100">
      <div className="p-3 rounded-full bg-base-200">
        <ListTodo size={28} />
      </div>

      <h3 className="font-semibold text-lg mt-4">No tasks found</h3>

      <p className="text-sm text-base-content/60 mt-1">
        {filter === "All"
          ? "You don't have any tasks assigned yet."
          : `You don't have any ${filter.toLowerCase()} tasks.`}
      </p>
    </div>
  );
};

export default EmptyState;
