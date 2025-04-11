const auth = require("../models/authModels");

async function handleCreateSignup(req, res) {
  const { userName, email, password } = req.body;

  try {
    const existing = await auth.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newUser = await auth.create({ userName, email, password });
    return res.status(201).json({
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

async function handleCreateLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await auth.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    const userLogin = await auth.findOne({ email, password });
    return res.status(201).json({
      message: "Logged in successfully.",
      user: {
        id: userLogin._id,
        email: userLogin.email,
        // Never send password back to the front. It's riskey as per security conserns.
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured during Login.", error });
  }
}

module.exports = {
  handleCreateSignup,
  handleCreateLogin,
};
