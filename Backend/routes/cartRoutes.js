import express from 'express';
import { addToCart, getCart, removeFromCart, productDecrement, productIncrement, clearCart } from '../controllers/cartController.js';
import { requireSession } from '../middlewares/requireSession.js';

const router = express.Router();

router.get('/cart', requireSession, getCart);
router.post('/addcart', requireSession, addToCart);
router.patch('/incrementcart/:productId', requireSession, productIncrement);
router.patch('/decrementcart/:productId', requireSession, productDecrement);
router.delete('/removecart/:productId', requireSession, removeFromCart);
router.delete('/deletecart', requireSession, clearCart);

export default router;