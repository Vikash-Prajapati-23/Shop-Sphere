import mongoose from "mongoose";

export async function connectToMongoDB(url) {
  try {
    await mongoose.connect(url);
    console.log("MongoDb connected Successfully.!");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error.message);
  }
};