import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { authenticateUser } from "./middleware/authMiddleware";
import { authorizeRole } from "./middleware/roleMiddleware";
import feedbackRoutes from "./routes/feedbackRoutes";
import authRoutes from "./routes/authRoutes"; 

import { config } from "./config/env";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes); 
app.use("/api", feedbackRoutes);

mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = config.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
