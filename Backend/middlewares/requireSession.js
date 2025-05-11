import { getUser } from "../services/auth.js";

export async function requireSession(req, res, next) {
  const sessionUid = req.cookies.sessionUid;

  if (!sessionUid) {
    return res.status(401).json({ message: "No session cookie found" });
  }

  const user = await getUser(sessionUid);

  if (!user) {
    return res.status(401).json({ message: "Invalid or expired session" });
  }

  req.user = user; // Attach user to request
  next();
}
