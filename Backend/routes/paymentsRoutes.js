import express from "express";
import { createOrder, savePayment, getOrderDetailsByUserId } from "../controllers/paymentController.js";
import { requireSession } from "../middlewares/requireSession.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/save-payment", savePayment);
router.get("/fetch-order-details/user/:userId", getOrderDetailsByUserId);

export default router;