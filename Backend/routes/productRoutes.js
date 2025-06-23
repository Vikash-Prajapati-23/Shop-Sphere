import express from 'express';
import { getProducts, getProductById, getProductByCategory, seedProductsFromFakeStore } from '../controllers/productController.js';

const router = express.Router();

// Route to get all products
router.get('/allproduct', getProducts);

router.get('/product/:id', getProductById);

router.get('/category/:categorySlug', getProductByCategory);

// router.get("/seed", seedProductsFromFakeStore);


export default router;
