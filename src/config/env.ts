import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/product-feedback",
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
};
