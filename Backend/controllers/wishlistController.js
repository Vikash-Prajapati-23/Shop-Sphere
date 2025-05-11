import Wishlist from "../models/wishlistModel.js";

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
    const userId = req.user.id; // Get user ID from the authenticated request
    const { productId } = req.body; // Get product ID from the request body
    const wishlistItem = await Wishlist.create({ userId, productId }); // Add item to wishlist
    const wishlist = await Wishlist.find({ userId }).populate('productId');
    return res.status(201).json(wishlistItem); // Return the created item
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const userId = req.user.id; // Get user ID from the authenticated request
    const { itemId } = req.params; // Get item ID from the request parameters
    const result = await Wishlist.deleteOne({ _id: itemId, userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }
    return res.status(200).json({ message: "Item removed from wishlist" }); // Return success message
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}
