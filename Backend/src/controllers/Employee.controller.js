import { taskModel } from "../models/Task.model.js";

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

    task.status = status;
    await task.save();

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
