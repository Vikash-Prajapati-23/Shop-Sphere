require('dotenv').config();
const express = require('express');
const authRoute = require('./routes/authRoutes');
const { connectToMongoDB } = require('./connectToMongoDB');
const cors = require('cors');

connectToMongoDB(process.env.MONGO_URL);

const app = express();
const PORT = 3001;

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // frontend's origin
    // credentials: true  // only needed if sending cookies
  }));

app.use(express.json());

app.use('/api/auth', authRoute);

app.use('/', (req, res) => res.send("Hey from server."));

app.use((req, res, next) => {
  console.log("Page not found.")
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));