import mongoose from "mongoose";

const mongo_url = process.env.Monogo_Uri as string;

export async function connectDB() {
  try {
    await mongoose.connect(mongo_url);
    console.log(" MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
