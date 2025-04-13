import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth", // Reference your existing auth model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // Session expires automatically after 7 days
  },
});

export const Session = mongoose.model("Session", sessionSchema);
