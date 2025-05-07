import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/wishlist', getWishlist);
router.post('/addwishlist', addToWishlist);     
router.delete('/removewishlist/:itemId', removeFromWishlist);

export default router;