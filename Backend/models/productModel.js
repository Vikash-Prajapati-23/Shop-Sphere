import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
    rate: {
      type: Number,
      default: 0,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const product = mongoose.model("product", productSchema);

export default product;