import Wishlist from "../models/wishlistModel.js";
import mongoose from "mongoose";

export async function getWishlist(req, res) {
  try {
    const userId = req.user.id;

    // Populate productId to get full product details
    const wishlist = await Wishlist.find({ userId }).populate("productId");

    // Return just the populated product objects
    const populatedProducts = wishlist.map((item) => item.productId);

    return res.status(200).json(populatedProducts);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function addToWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Check if productId exists
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    // Check for duplicates
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(409).json({ message: "Product already in wishlist" });
    }

    // Add to wishlist
    const wishlistItem = await Wishlist.create({ userId, productId });
    return res.status(201).json(wishlistItem);

  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const result = await Wishlist.findOneAndDelete({ userId, productId: itemId });
    if (!result) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    return res.status(200).json({ message: "Item removed from wishlist" });

  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
