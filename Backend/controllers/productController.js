import Product from "../models/productModel.js";

export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching products" });
  }
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching product" });
  }
  return res.status(200).json(product);
}

