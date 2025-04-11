const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDb connected Successfully.!");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error.message);
  }
}

module.exports = { connectToMongoDB };