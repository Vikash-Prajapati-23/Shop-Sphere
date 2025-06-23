import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import fetch from "node-fetch";

dotenv.config();

const populateProducts = async () => {
  try {
    const data = await fetch("https://fakestoreapi.com/products");
    const products = await data.json();

    await Product.deleteMany();
    console.log("🗑️ Old data deleted");

    for (const product of products) {
      // Check if the product already exists
      const existingProduct = await Product.findOne({ productId: product.id });
      if (existingProduct) {
        console.log(
          `Product with productId ${product.id} already exists. Skipping.`
        );
        continue; // Skip this product
      }

      // Insert the product if it doesn't exist
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
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    populateProducts();
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
