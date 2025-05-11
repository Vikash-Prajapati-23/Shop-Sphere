import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlistController.js";
import { requireSession } from "../middlewares/requireSession.js";

const router = express.Router();

router.get("/wishlist", requireSession, getWishlist);
router.post("/addwishlist", requireSession, addToWishlist);
router.delete("/removewishlist/:itemId", requireSession, removeFromWishlist);

export default router;
