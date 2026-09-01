import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    // The user/admin who triggered the action
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Category / Domain module
    module: {
      type: String,
      required: true,
      enum: ["TASK", "EMPLOYEE", "AUTH", "SETTINGS", "SYSTEM"],
      index: true,
    },

    // Standardized action identifier
    action: {
      type: String,
      required: true,
      enum: [
        // Auth
        "USER_LOGIN",
        "USER_LOGOUT",
        // Tasks
        "TASK_CREATED",
        "TASK_UPDATED",
        "TASK_STATUS_CHANGED",
        "TASK_DELETED",
        // Employees
        "EMPLOYEE_CREATED",
        "EMPLOYEE_UPDATED",
        "EMPLOYEE_DEACTIVATED",
        "EMPLOYEE_ACTIVATED",
      ],
      index: true,
    },

    // Human-readable summary for quick UI display
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Target entity details (Polymorphic reference)
    entity: {
      entityType: {
        type: String,
        enum: ["Task", "User", "System"],
        required: true,
      },
      entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
      },
      entityTitle: {
        type: String, // e.g., Task title or Employee full name for historical reference
        default: "",
      },
    },

    // Optional snapshot or diff data (e.g., status changed from 'Pending' to 'Completed')
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true, // provides createdAt & updatedAt
  },
);

// Compound Index: Optimizes chronological feed & filtered feed queries
activitySchema.index({ createdAt: -1 });
activitySchema.index({ module: 1, createdAt: -1 });
activitySchema.index({ performedBy: 1, createdAt: -1 });

export const activityModel = mongoose.model("Activity", activitySchema);
