import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    fullname: {
      firstname: {
        type: String,
        require: true,
      },
      lastname: {
        type: String,
        require: true,
      },
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model("User", userSchema);
