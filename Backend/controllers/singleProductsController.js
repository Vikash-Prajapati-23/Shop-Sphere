import product from "../models/productModel.js";
import mongoose from "mongoose";

export async function getSingleProduct(req, res) {
  const { id } = req.params;
  try {
    // Validate if id is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      const foundProduct = await product.findById(id);
      if (foundProduct) {
        const obj = foundProduct.toObject();
        obj.id = obj.productId || obj._id;
        return res.status(200).json(obj);
      }
    }
    // If not found by _id, try to find by productId (number)
    const foundByProductId = await product.findOne({ productId: Number(id) });
    if (foundByProductId) {
      const obj = foundByProductId.toObject();
      obj.id = obj.productId || obj._id;
      return res.status(200).json(obj);
    }
    return res.status(404).json({ message: "Product not found" });
  } catch (error) {
    console.log(error.message, "error in getting single product");
    return res.status(500).json({ message: "Internal server error" });
  }
}
