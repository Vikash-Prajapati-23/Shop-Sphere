// models/orderModel.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: String,
        quantity: Number,
        price: Number,
      },
    ],
    shippingAddressRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "manageAddress",
    },
    totalAmount: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    paymentId: String,
    paymentMethod: String,
    orderDate: { type: Date, default: Date.now },
    expectedDelivery: Date,
    notes: String,
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("Order", orderSchema);
