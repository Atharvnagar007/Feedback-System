import express from "express";
import { analyzeFeedbackController } from "../controllers/feedbackController";

const router = express.Router();

// Define the route correctly
router.post("/analyze-feedback", analyzeFeedbackController);

export default router;
