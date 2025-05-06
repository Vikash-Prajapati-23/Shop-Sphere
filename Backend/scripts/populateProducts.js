import mongoose from "mongoose";
import Product from "../models/productModel.js";
import fetch from "node-fetch";

const populateProducts = async () => {
  try {
    const data = await fetch("https://fakestoreapi.com/products");
    const products = await data.json();

    for (const product of products) {
      await Product.create({
        productId: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {
          rate: product.rating.rate,
          count: product.rating.count,
        },
      });
      console.log(`Product ${product.title} populated successfully.`);
    }
  } catch (error) {
    console.error("Error populating products:", error);
  } finally {
    mongoose.connection.close();
  }
};

mongoose
  .connect("mongodb://127.0.0.1:27017/shop-sphere")
  .then(() => {
    console.log("Connected to MongoDB");
    populateProducts();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
