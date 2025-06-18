import dotenv from 'dotenv';
import express from 'express';
import authRoute from './routes/authRoutes.js';
import productRoute from './routes/productRoutes.js';
import cartRoute from './routes/cartRoutes.js';
import wishlistRoute from './routes/wishlistRoutes.js';
import SingleProductRoute from './routes/singleProductRoutes.js';
import PaymentRoute from "./routes/paymentsRoutes.js";
import { connectToMongoDB } from './connectToMongoDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from "path";
import { fileURLToPath } from "url";

// Required for __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URL);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // ⚠️ Replace with your domain when deployed
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/productcart', cartRoute);
app.use('/api/wishlistproduct', wishlistRoute);
app.use('/api/single', SingleProductRoute);
app.use('/api/payments', PaymentRoute);

// Serve static React files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Fallback route for React (after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Catch-all for unmatched API routes (optional)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => console.log(`✅ Server started on http://localhost:${PORT}`));
