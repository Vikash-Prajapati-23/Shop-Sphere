import express from 'express';
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// Route to get all products
router.get('/allproductd', getProducts);

router.get('/product/:id', getProductById);

export default router;
