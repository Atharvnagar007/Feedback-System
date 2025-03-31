import { Request, Response } from "express";
import { analyzeFeedback } from "../services/ai/analyzeFeedback";

export const analyzeFeedbackController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { feedback } = req.body;

        if (!feedback) {
            res.status(400).json({ error: "Feedback is required" });
            return;
        }

        const analysis = await analyzeFeedback(feedback);
        res.json({ analysis });
    } catch (error) {
        console.error("Error analyzing feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// C:\Users\athar\OneDrive\Desktop\product-feedback-backend\src\services\ai\analyzeFeedback.ts