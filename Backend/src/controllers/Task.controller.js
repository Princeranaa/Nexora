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

export const viewTask = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // Get total number of tasks
    const totalTasks = await taskModel.countDocuments();

    // Get tasks
    const tasks = await taskModel
      .find()
      .populate("assignedTo")
      .populate("createdBy", "role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalTasks / limit);

    return res.status(200).json({
      message: "Tasks fetched successfully",

      pagination: {
        currentPage: page,
        limit,
        totalTasks,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },

      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, assignedTo, dueDate, priority, status } = req.body;

    // Build update object only from provided fields
    const updates = Object.fromEntries(
      Object.entries({ title, description, dueDate, priority, status }).filter(
        ([, value]) => value !== undefined,
      ),
    );

    if (assignedTo) {
      const isEmployee = await userModel.exists({
        _id: assignedTo,
        role: "employee",
      });

      if (!isEmployee) {
        return res
          .status(404)
          .json({ message: "Employee not found or not an employee" });
      }
      updates.assignedTo = assignedTo;
    }

    const task = await taskModel.findByIdAndUpdate(taskId, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
