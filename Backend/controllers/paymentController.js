// controllers/paymentController.js
import Razorpay from "razorpay";
import { Payment } from "../models/paymentModel.js";
import crypto from "crypto";  
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZOR_PAY_TEST_API_KEY,
  key_secret: process.env.RAZOR_PAY_TEST_API_SECRET_KEY,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid or missing amount" });
  }

  const options = {
    amount: amount * 100, // in paise
    currency: "INR",
    receipt: "order_rcptid_" + Date.now(),
    // Add notes or userId if needed: notes: { userId: req.user?._id }
  };

  try {
    const order = await razorpay.orders.create(options);
    // Optionally save order to DB here
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

// Save payment to DB after success
export const savePayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userId,
      amount,
    } = req.body;

    // Signature verification (IMPORTANT)
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_TEST_API_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Save to MongoDB
    const payment = new Payment({
      userId,
      amount,
      currency: "INR",
      paymentStatus: "success",
      gatewayOrderId: razorpay_order_id,
      gatewayPaymentId: razorpay_payment_id,
      gatewaySignature: razorpay_signature,
      transactionDetails: req.body, // You can include full object here
    });

    await payment.save();
    return res.status(200).json({ message: "Payment saved successfully", payment });
  } catch (err) {
    console.error("Payment saving error:", err);
    return res
      .status(500)
      .json({ message: "Failed to save payment", error: err.message });
  }
};
