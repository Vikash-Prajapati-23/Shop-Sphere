// Cart Controller
export async function getCart(req, res) {
    const userId = req.user.id; // Assuming `req.user` contains the logged-in user's data
    const cart = await cart.find({ userId });
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
  
  // Wishlist Controller
  export async function getWishlist(req, res) {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId });
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