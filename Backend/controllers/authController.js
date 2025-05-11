import { auth } from "../models/authModels.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { setUser, getUser, deleteSession } from "../services/auth.js";

export async function handleCreateSignup(req, res) {
  const { userName, email, password } = req.body;

  try {
    const existing = await auth.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash password before storing it on Database.
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await auth.create({
      userName,
      email,
      password: hashPassword,
    });
    return res.status(200).json({
      message: "Sign Up successfully.. !",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating signup", error });
  }
}

export async function handleCreateLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await auth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare input password with the hashed one stored on Database.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);

    // Set the session cookie
    res.cookie("sessionUid", sessionId, {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: "lax",
      path: "/",
    });

    // Return a JSON response with user data
    return res.status(200).json({
      message: "Logged in successfully.",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred during Login.", error });
  }
}

export async function verifySessionLogin(req, res) {
  try {
    console.log("verifySessionLogin called");
    const sessionUid = req.cookies.sessionUid;

    if (!sessionUid) {
      return res.status(401).json({ message: "No session found." });
    }

    const user = await getUser(sessionUid);
    if (!user) {
      return res.status(401).json({ message: "Invalid session." });
    }

    // res.cookie("sessionUid", sessionUid, {
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   path: "/",
    // });

    return res.status(200).json({
      message: "Session is valid.",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error verifying session:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}


export async function verifySessionLogout(req, res) {
  try {
    const sessionUid = req.cookies.sessionUid;
    if (!sessionUid) {
      return res.status(401).json({ message: "No session found." });
    }

    await deleteSession(sessionUid);

    res.clearCookie("sessionUid", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error during logout", error });
  }
}
