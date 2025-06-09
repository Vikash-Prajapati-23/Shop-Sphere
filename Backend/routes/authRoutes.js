import express from "express";
import {
  handleCreateSignup,
  handleCreateLogin,
  verifySessionLogin,
  verifySessionLogout,
  fetchUserDetails,
  updateProfile,
  addAddress,
  showSavedAddresses,
  deleteAddress,
  editAddress,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", handleCreateSignup);
router.post("/login", handleCreateLogin);
router.get("/verify-session-user", verifySessionLogin);
router.get("/logout", verifySessionLogout);
router.get("/me", fetchUserDetails);
router.post("/profile", updateProfile);
router.post("/address", addAddress);
router.get("/savedAddress", showSavedAddresses);
router.delete("/deleteAddress/:id", deleteAddress);
router.put("/address/:id", editAddress);

export default router;
