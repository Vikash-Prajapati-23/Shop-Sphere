import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { requireSession } from '../middlewares/requireSession.js';

const router = express.Router();

router.get('/cart', requireSession, getCart);
router.post('/addcart', requireSession, addToCart);
router.delete('/removecart/:itemId', requireSession, removeFromCart);

export default router;