import Cart from "../models/cartModel.js";
import product from "../models/productModel.js";
import mongoose from "mongoose";

export async function getCart(req, res) {
  try {
    const userId = req.user.id;
    // Uses .populate("productId") to replace the productId field in each cart item with the full product document from the Product collection.
    // Result:
    // populatedCart is an array of cart items, each with a productId field containing the full product details (not just the ID).
    const populatedCart = await Cart.find({ userId }).populate("productId");

    if (!populatedCart || populatedCart.length === 0) {
      return res.status(200).json([]); // Return empty cart if nothing found
    }

    const populatedProducts = populatedCart
      .filter((item) => item?.productId)
      .map((item) => ({
        ...item.productId.toObject(),
        quantity: item.quantity,
      }));

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

    // Add to cart with quantity initialized to 1
    const cartItem = await Cart.create({ userId, productId, quantity: 1 });
    return res.status(201).json({ cartItem, message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeFromCart(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    // Check if the item exists in the cart
    const existingItem = await Cart.findOneAndDelete({
      userId,
      productId: productId,
    });
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    return res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function clearCart(req, res) {
  const userId = req.user.id;

  try {
    // const exists = await Cart.findOne({userId, productId});
    const deleteFromCart = await Cart.deleteMany({userId});
    if(deleteFromCart.deletedCount === 0) {
      return res.status(400).json({ message: "No products here." })
    }
    return res.status(200).json({ message: "Cart cleared successfully!" });

  } catch (error) {
    return res.status(500).json({ messsage: "Something went wrong while clearing cart.!" });
  }
}

export async function productDecrement(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const existingItem = await Cart.findOne({ userId, productId }); // FIXED
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      await existingItem.save();
      return res.status(200).json({ message: "Item quantity decremented" });
    } else {
      await Cart.findOneAndDelete({ userId, productId });
      return res.status(200).json({ message: "Item removed from cart" });
    }
  } catch (error) {
    console.error("Error decrementing product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function productIncrement(req, res) {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const existingItem = await Cart.findOne({ userId, productId });
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    existingItem.quantity += 1;
    await existingItem.save();
    return res.status(200).json({ message: "Item quantity incremented" });
  } catch (error) {
    console.error("Error incrementing product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
