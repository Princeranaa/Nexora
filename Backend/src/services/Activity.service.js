import { activityModel } from "../models/Activity.model.js";

/**
 * Logs an activity asynchronously without blocking main flow.
 */
export const logActivity = async ({
  performedBy,
  module,
  action,
  description,
  entity = {},
  metadata = {},
}) => {
  try {
    await activityModel.create({
      performedBy,
      module,
      action,
      description,
      entity,
      metadata,
    });
  } catch (error) {
    // Log error to monitoring/console, never throw to user
    console.error("Failed to record activity log:", error.message);
  }
};
