const express = require('express');
const authRoute = require('./routes/authRoutes');
const {connectToMongoDB} = require('./connectToMongoDB');
const cors = require('cors');

connectToMongoDB('mongodb://127.0.0.1:27017/shop-sphere');

const app = express();
const PORT = 3001;

// CORS setup
app.use(cors({
    origin: 'http://localhost:3000', // frontend's origin
    // credentials: true               // only needed if sending cookies
  }));

app.use(express.json());

app.use('/api/auth', authRoute);

app.use('/', (req, res) => res.send("Hey from server."));

app.listen(PORT, console.log(`Server is running on port ${PORT}`));