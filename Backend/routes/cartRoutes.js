import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/cart', getCart);
router.post('/addcart', addToCart);
router.delete('/removecart/:itemId', removeFromCart);

export default router;