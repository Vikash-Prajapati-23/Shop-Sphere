import { Session } from "../models/sessionModel.js";
import { auth } from "../models/authModels.js";

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
