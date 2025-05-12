import Cart from "../models/cartModel.js";
import mongoose from "mongoose";
import product from "../models/productModel.js";

export async function getCart(req, res) {
  try {
    const userId = req.user.id; // Assuming `req.user`
    // Populate productId to get full product details
    const populatedCart = await Cart.find({ userId }).populate("productId");
    // Return just the populated product objects
    const populatedProducts = populatedCart.map((item) => item.productId);
    // Return the populated products along with the cart items.
    return res.status(200).json(populatedProducts);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addToCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    // Validate productId format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid Product ID" });
    }

    // Check for duplicates
    const existingItem = await Cart.findOne({ userId, productId });
    if (existingItem) {
      return res.status(409).json({ message: "Product already in cart" });
    }

    // Check if the product exists in the product collection
    const productExists = await product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add to cart
    const cartItem = await Cart.create({ userId, productId });
    return res.status(201).json(cartItem);
  } catch (error) {}
}

export async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Check if the item exists in the cart
    const existingItem = await Cart.findOneAndDelete({ userId, productId: itemId });
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    
    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
