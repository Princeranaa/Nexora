import { taskModel } from "../models/Task.model.js";
import { userModel } from "../models/User.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, priority } = req.body;

    // Basic validation
    if (!title || !description || !assignedTo || !dueDate) {
      return res.status(400).json({
        message: "Title, description, assignedTo and dueDate are required",
      });
    }

    // Check whether assigned user exists
    const employee = await userModel.findById(assignedTo);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Make sure task is assigned only to an employee
    if (employee.role !== "employee") {
      return res.status(400).json({
        message: "Task can only be assigned to an employee",
      });
    }

    // Create task
    const task = await taskModel.create({
      title,
      description,
      assignedTo,
      dueDate,
      priority,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
