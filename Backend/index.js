import dotenv from 'dotenv';
import express from 'express';
import authRoute from './routes/authRoutes.js';
import cartRoute from './routes/cartRoutes.js';
import wishlistRoute from './routes/wishlistRoutes.js';
import { connectToMongoDB } from './connectToMongoDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectToMongoDB(process.env.MONGO_URL);

const app = express();
const PORT = 3001;

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // frontend's origin
    credentials: true  // only needed if sending cookies
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/productcart', cartRoute);
app.use('/api/wishlistproduct', wishlistRoute);

app.use('/', (req, res) => res.send("Hey from server."));

app.use((req, res, next) => {
  console.log("Page not found.");
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));