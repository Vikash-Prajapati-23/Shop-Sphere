import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // Assuming the token is stored in cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
