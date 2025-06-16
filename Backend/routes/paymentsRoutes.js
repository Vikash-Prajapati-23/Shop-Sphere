import express from "express";
import { createOrder } from "../controllers/paymentController.js";
import { requireSession } from "../middlewares/requireSession.js";

const router = express.Router();

router.post("/create-order", createOrder);

export default router;