import { getSingleProduct } from "../controllers/singleProductsController.js";
import express from "express";

const router = express.Router();

router.get("/singleproduct/:id", getSingleProduct); // Fetch single product by ID

export default router;