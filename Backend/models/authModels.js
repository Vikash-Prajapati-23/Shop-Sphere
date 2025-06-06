import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    contact: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const auth = mongoose.model("auth", authSchema);
