import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/cart', getCart);
router.post('/cart', addToCart);
router.delete('/cart/:itemId', removeFromCart);

export default router;