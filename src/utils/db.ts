import mongoose from "mongoose";
import { config } from "../config/env";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1);
  }
};
