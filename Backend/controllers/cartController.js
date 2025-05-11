import Cart from "../models/cartModel.js";

export async function getCart(req, res) {
  const userId = req.user.id; // Assuming `req.user` contains the logged-in user's data
  const cart = await Cart.find({ userId });
  return res.status(200).json(cart);
}

export async function addToCart(req, res) {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const cartItem = await Cart.create({ userId, productId, quantity });
  return res.status(201).json(cartItem);
}

export async function removeFromCart(req, res) {
  const userId = req.user.id;
  const { itemId } = req.params;
  await Cart.deleteOne({ _id: itemId, userId });
  return res.status(200).json({ message: "Item removed from cart" });
}
