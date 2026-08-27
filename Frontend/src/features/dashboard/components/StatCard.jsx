import React from "react";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-base-content/60">
              {title}
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-base-content">
              {value}
            </h2>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-base-200 text-base-content">
            <Icon size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;