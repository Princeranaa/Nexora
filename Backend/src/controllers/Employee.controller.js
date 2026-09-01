import { taskModel } from "../models/Task.model.js";
import { logActivity } from "../services/Activity.service.js";

export const getEmployeeTasks = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const tasks = await taskModel
      .find({
        assignedTo: employeeId,
      })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Employee tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    console.error("Get employee tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee tasks",
    });
  }
};

export const updateEmployeeTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const employeeId = req.user._id;

    const allowedStatuses = ["Pending", "In Progress", "Completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
      });
    }

    const task = await taskModel.findOne({
      _id: taskId,
      assignedTo: employeeId,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not assigned to you",
      });
    }

    // Store previous status before updating
    const previousStatus = task.status;

    // Prevent redundant update
    if (previousStatus === status) {
      return res.status(200).json({
        success: true,
        message: `Task is already ${status}`,
        task,
      });
    }

    task.status = status;
    await task.save();

    logActivity({
      performedBy: req.user._id,
      module: "TASK",
      action: "TASK_STATUS_CHANGED",
      description: `Changed status of task "${task.title}" from ${previousStatus} to ${status}`,
      entity: {
        entityType: "Task",
        entityId: task._id,
        entityTitle: task.title,
      },
      metadata: { from: previousStatus, to: status },
    });

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update employee task status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task status",
    });
  }
};
