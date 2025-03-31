import express from "express";
import feedbackRoutes from "./routes/feedback";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", feedbackRoutes);  



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
