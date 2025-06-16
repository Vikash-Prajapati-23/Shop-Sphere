// controllers/paymentController.js
import Razorpay from "razorpay";
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
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};
