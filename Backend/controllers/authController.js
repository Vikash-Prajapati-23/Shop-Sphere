import { auth } from "../models/authModels.js";
import { addressModel } from "../models/manageAddressModel.js";
import jwt from "jsonwebtoken";
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
        name: user.userName,
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
    const sessionUid = req.cookies.sessionUid;

    if (!sessionUid) {
      return res.status(401).json({ message: "No session found." });
    }

    const user = await getUser(sessionUid);
    if (!user) {
      return res.status(401).json({ message: "Invalid session." });
    }

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

export async function fetchUserDetails(req, res) {
  const userDetails = await getUser(req.cookies.sessionUid);

  if (userDetails) {
    return res.status(200).json({
      message: "User details feched succesfully.. !",
      user: {
        id: userDetails._id,
        userName: userDetails.userName,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        contact: userDetails.contact,
        email: userDetails.email,
        gender: userDetails.gender,
      },
    });
  } else {
    return res.status(500).json({ message: "Not logged in" });
  }
}

export async function updateProfile(req, res) {
  const sessionUid = req.cookies.sessionUid;
  const { firstName, lastName, gender, email, contact } = req.body;

  try {
    const user = await getUser(sessionUid);
    if (!user) {
      return res.status(401).json({ message: "Invalid session." });
    }
    
    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName;
    if (lastName !== undefined) updateFields.lastName = lastName;
    if (gender !== undefined) updateFields.gender = gender;
    if (contact !== undefined) updateFields.contact = contact;
    if (email && email.trim() !== "") updateFields.email = email;

    try {
      const updatedUser = await auth
        .findByIdAndUpdate(user._id, { $set: updateFields }, { new: true })
        .select("-password");

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
      });
    } catch (mongoError) {
      // Handle duplicate key error for email
      if (
        mongoError.code === 11000 &&
        mongoError.keyPattern &&
        mongoError.keyPattern.email
      ) {
        return res.status(400).json({ message: "Email already exists." });
      }
      throw mongoError;
    }
  } catch (error) {
    console.error("Internal server error.", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function addAddress(req, res) {
  const sessionUid = req.cookies.sessionUid;
  const addressDetails = req.body;

  try {
    const user = await getUser(sessionUid);
    if (!user) {
      return res.status(401).json({ message: "Invalid session." });
    }

    // Create a new address document for this user
    const newAddress = await addressModel.create({
      ...addressDetails,
      userId: user._id,
    });

    return res
      .status(200)
      .json({ message: "Address saved successfully!", data: newAddress });
  } catch (error) {
    console.error("Error saving address:", error);
    return res.status(500).json({
      message:
        "Something went wrong while saving the address. Please try again later.",
    });
  }
}

export async function showSavedAddresses(req, res) {
  try {
    const user = await getUser(req.cookies.sessionUid);
    if (!user) {
      return res.status(401).json({ message: "Invalid session." });
    }

    // Fetch all addresses for this user from addressModel
    const addresses = await addressModel.find({ userId: user._id });

    return res.status(200).json({
      message: "Address details fetched successfully.",
      addresses, // send as array
    });
  } catch (error) {
    console.error("Error while sending address details to the client.", error);
    return res.status(500).json({ message: "Something went wrong.", error });
  }
}

export async function deleteAddress(req, res) {
  const sessionUid = req.cookies.sessionUid; //  It represents the currently logged-in user.
  const addressId = req.params.id;
  // addressId is the MongoDB ObjectId of the address to delete

  try {
    const userAddress = await getUser(sessionUid);
    // userAddress._id is the user's unique MongoDB ID.
    // It comes from the URL parameter: req.params.id.
    // It is the _id of a document in your addressModel collection (not the user).

    if (!userAddress) {
      return res.status(401).json({ message: "Invalid session." });
    }

    await addressModel.findOneAndDelete({
      _id: addressId,
      userId: userAddress._id,
    });
    return res.status(200).json({ message: "Address deleted successfully." });
  } catch (error) {
    console.error("Error while deleting address.");
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again later.", error });
  }
}

export async function editAddress(req, res) {
  const sessionUid = req.cookies.sessionUid;
  const data = req.body;
  const addressId = req.params.id;

  try {
    const user = await getUser(sessionUid);
    if (!user) {
      return res.status(401).json({ message: "Invalid session." });
    }

    // Filter out undefined or empty string fields to avoid overwriting existing values
    const updateFields = {};
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== "") {
        updateFields[key] = data[key];
      }
    }

    // This ensures the address belongs to the user and update only provided fields
    const editedAddress = await addressModel.findOneAndUpdate(
      { _id: addressId, userId: user._id },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!editedAddress) {
      return res
        .status(404)
        .json({ message: "Address not found or not authorized." });
    }

    return res.status(200).json({
      message: "Address updated successfully.",
      data: editedAddress,
    });
  } catch (error) {
    console.error("Error while editing address.", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Try again later.", error });
  }
}
