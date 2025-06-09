import express from "express";
import {
  handleCreateSignup,
  handleCreateLogin,
  verifySessionLogin,
  verifySessionLogout,
  fetchUserDetails,
  updateProfile,
  updateAddress,
  showSavedAddresses,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", handleCreateSignup);
router.post("/login", handleCreateLogin);
router.get("/verify-session-user", verifySessionLogin);
router.get("/logout", verifySessionLogout);
router.get("/me", fetchUserDetails);
router.put("/profile", updateProfile);
router.put("/address", updateAddress);
router.get("/savedAddress", showSavedAddresses);

export default router;
