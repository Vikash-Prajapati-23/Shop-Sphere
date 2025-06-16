import express from "express";
import { createOrder, savePayment } from "../controllers/paymentController.js";
import { requireSession } from "../middlewares/requireSession.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/save-payment", savePayment);  

export default router;