import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateUser } from "./middleware/authMiddleware"; // Ensure correct path
import { authorizeRole } from "./middleware/roleMiddleware"; // Ensure correct path
import feedbackRoutes from "./routes/feedbackRoutes";
import { config } from "./config/env";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/feedback", feedbackRoutes);

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
