import { Session } from "../models/sessionModel.js";

export async function setUser(sessionId, user) {
  await Session.create({
    sessionId,
    userId: user._id,
  });
}

export async function getUser(sessionId) {
  const session = await Session.findOne({ sessionId }).populate("userId");
  return session ? session.userId : null;
}

export async function deleteSession(sessionId) {
  const result = await Session.deleteOne({ sessionId });
  console.log("Session delete result:", result);
}