export async function getWishlist(req, res) {
  const userId = req.user.id;
  const wishlist = await wishlist.find({ userId });
  return res.status(200).json(wishlist);
}

export async function addToWishlist(req, res) {
  const userId = req.user.id;
  const { productId } = req.body;
  const wishlistItem = await Wishlist.create({ userId, productId });
  return res.status(201).json(wishlistItem);
}

export async function removeFromWishlist(req, res) {
  const userId = req.user.id;
  const { itemId } = req.params;
  await Wishlist.deleteOne({ _id: itemId, userId });
  return res.status(200).json({ message: "Item removed from wishlist" });
}
