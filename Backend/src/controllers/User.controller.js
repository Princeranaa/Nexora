import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { userModel } from "../models/User.model.js";

export const register = async (req, res) => {
  try {
    const {
      email,
      fullname: { firstname, lastname },
      password,
      role,
    } = req.body;

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User Already Exist",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    /* create a user */
    const user = await userModel.create({
      email,
      fullname: { firstname, lastname },
      password: hash,
      role,
    });

    const token = jwt.sign(
      { id: user._id, role: user.role, fullname: user.fullname },
      config.JWT_SECRET,
      { expiresIn: "2d" },
    );
    res.cookie("token", token);

    res.status(201).json({
      message: "User Registered Successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      fullname: user.fullname,
    },
    config.JWT_SECRET,
    { expiresIn: "2d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    },
  });
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { email, fullname: { firstname, lastname }} = req.body;
    const userId = req.user;
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { email, fullname: { firstname, lastname } },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user : updatedUser,
    });
  } catch (error) {
    console.log("update profile error", error)
    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};
