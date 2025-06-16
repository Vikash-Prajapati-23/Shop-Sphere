// models/paymentModel.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String }, // e.g., card, upi, wallet
    gatewayOrderId: { type: String }, // from payment gateway
    gatewayPaymentId: { type: String }, // from payment gateway
    gatewaySignature: { type: String }, // for verification (if applicable)
    transactionDetails: { type: Object }, // store full gateway response
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
