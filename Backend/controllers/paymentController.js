// controllers/paymentController.js
import Razorpay from "razorpay";
import { Payment } from "../models/paymentModel.js";
import { orderModel } from "../models/orderModel.js";
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
  };

  try {
    const order = await razorpay.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

// Save payment + order after successful payment
export const savePayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      userId,
      amount,
      cart,
      address,
      paymentType,
    } = req.body;

    // Signature verification
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_TEST_API_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Step 1: Save Payment
    const payment = new Payment({
      userId,
      amount,
      currency: "INR",
      paymentStatus: "success",
      gatewayOrderId: razorpay_order_id,
      gatewayPaymentId: razorpay_payment_id,
      gatewaySignature: razorpay_signature,
      transactionDetails: req.body,
    });
    await payment.save();

    // Step 2: Save Order
    const order = new orderModel({
      userId,
      products: cart.map((item) => ({
        productId: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        rating: item.rating,
      })),
      shippingAddressRef: address._id,
      totalAmount: amount,
      paymentStatus: "Paid",
      paymentId: razorpay_payment_id,
      paymentMethod: paymentType,
    });
    await order.save();

    return res.status(200).json({
      message: "Payment and order saved successfully",
      payment,
      order,
    });
  } catch (err) {
    console.error("Payment saving error:", err);
    return res.status(500).json({ message: "Failed to save payment or order", error: err.message });
  }
};

// Get all orders for a user
export const getOrderDetailsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    console.log(orders)
    return res.status(200).json({orders});
  } catch (err) {
    console.error("Error fetching orders by userId:", err);
    return res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};
