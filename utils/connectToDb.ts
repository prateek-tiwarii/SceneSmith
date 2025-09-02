// import mongoose from "mongoose";

// const mongo_url = process.env.MONGO_URI as string;

// export async function connectDB() {
  
//   try {
//     await mongoose.connect(mongo_url);
//     console.log(" MongoDB Connected");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;

//   }
// }



import mongoose from 'mongoose';

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};



