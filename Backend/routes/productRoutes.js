import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// Route to get all products
router.get('/allproductd', getProducts);

router.get('/product/:id', getProductById);
// router.post('/api/product', addProduct);
// router.put('/api/product/:id', updateProduct);
// router.delete('/api/product/:id', deleteProduct);

export default router;
