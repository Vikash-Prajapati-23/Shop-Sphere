import Product from "../models/productModel.js";
import fetch from "node-fetch";

export async function getProducts(req, res) {
  try {
    const products = await Product.find();
    // Map productId or _id to id for each product
    const mappedProducts = products.map((prod) => {
      const obj = prod.toObject();
      obj.id = obj.productId || obj._id;
      return obj;
    });
    return res.status(200).json(mappedProducts);
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
  return res.status(200).json(Product);
}

export async function seedProductsFromFakeStore(req, res) {
  console.log("👉 Seed route hit");

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

    const transformed = data.map((item) => ({
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      rating: item.rating,
      productId: item.id,
    }));

    await Product.deleteMany(); // Optional
    const inserted = await Product.insertMany(transformed);

    res.status(201).json({
      message: "Products seeded from Fake Store API",
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({
      message: "Error seeding products",
      error: error.message,
    });
  }
}
