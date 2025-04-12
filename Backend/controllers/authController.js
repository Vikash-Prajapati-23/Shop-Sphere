import { auth } from '../models/authModels.js';
import bcrypt from "bcryptjs";

export async function handleCreateSignup(req, res) {
  const { userName, email, password } = req.body;

  try {
    const existing = await auth.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Hash password before storing it on Database.
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash( password, salt );

    const newUser = await auth.create({ userName, email, password: hashPassword });
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

    return res.status(200).json({
      message: "Logged in successfully.",
      user: {
        id: user._id,
        email: user.email,
        // Never send password back to the front. It's risky as per security concerns.
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occurred during Login.", error });
  }
}
