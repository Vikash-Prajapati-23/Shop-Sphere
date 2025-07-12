import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Your route imports
import authRoute from "./routes/authRoutes.js";
import productRoute from "./routes/productRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import wishlistRoute from "./routes/wishlistRoutes.js";
import SingleProductRoute from "./routes/singleProductRoutes.js";
import PaymentRoute from "./routes/paymentsRoutes.js";
import { connectToMongoDB } from "./connectToMongoDB.js";

// Load env variables
dotenv.config();

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URL);

// Initialize app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",            
      "https://shop-sphere-jade.vercel.app"          
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/productcart", cartRoute);
app.use("/api/wishlistproduct", wishlistRoute);
app.use("/api/single", SingleProductRoute);
app.use("/api/payments", PaymentRoute);

// Fallback for unmatched API routes
// app.use((res) => {
//   res.status(404).json({ error: "Route not found" });
// });

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
