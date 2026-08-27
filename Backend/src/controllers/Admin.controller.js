import { userModel } from "../models/User.model.js";
import bcrypt from "bcrypt";

export const createEmployee = async (req, res) => {
  try {
    const {
      email,
      fullname: { firstname, lastname },
      password,
    } = req.body;

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const employee = await userModel.create({
      email,
      fullname: {
        firstname,
        lastname,
      },
      password: hash,
      role: "employee",
    });

    return res.status(201).json({
      message: "Employee created successfully",
      employee: {
        _id: employee._id,
        email: employee.email,
        fullname: employee.fullname,
        role: employee.role,
      },
    });
  } catch (error) {
    console.error("Create employee error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.trim() || "";

    const skip = (page - 1) * limit;

    const filter = {
      role: "employee",
    };

    if (search) {
      filter.$or = [
        {
          "fullname.firstname": {
            $regex: search,
            $options: "i",
          },
        },
        {
          "fullname.lastname": {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: {
                $concat: ["$fullname.firstname", " ", "$fullname.lastname"],
              },
              regex: search,
              options: "i",
            },
          },
        },
      ];
    }

    const activeFilter = {
      ...filter,
      status: "active",
    };

    const inactiveFilter = {
      ...filter,
      status: "inactive",
    };

    const [employees, totalEmployees, activeEmployees, inactiveEmployees] =
      await Promise.all([
        userModel
          .find(filter)
          .select("-password")
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),

        userModel.countDocuments(filter),

        userModel.countDocuments(activeFilter),

        userModel.countDocuments(inactiveFilter),
      ]);

    const totalPages = Math.ceil(totalEmployees / limit);

    res.status(200).json({
      employees,

      employeeStats: {
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
      },

      pagination: {
        currentPage: page,
        limit,
        totalEmployees,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
};

export const updateEmployeeStatus = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const employee = await userModel.findOne({
      _id: employeeId,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    employee.status = status;

    await employee.save();

    return res.status(200).json({
      message: `Employee ${status} successfully`,
      employee: employee.status,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
