import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/express";
import Feedback from "../models/FEEDBACK";
import { analyzeSentiment } from "../utils/sentimentalAnalysis"; // Import sentiment analysis function

export const submitFeedback = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { userId, feedbackText, rating } = req.body;
    
    // Perform AI-based sentiment analysis
    const { sentiment, themes, moduleTags, confidence } = await analyzeSentiment(feedbackText);

    const newFeedback = new Feedback({
      userId: req.user.id,
      feedbackText,
      rating,
      sentiment,
      themes,
      moduleTags,
      confidence,
    });

    await newFeedback.save();
    res.status(201).json({ success: true, message: "Feedback submitted", feedback: newFeedback });
  } catch (error) {
    next(error);
  }
};

export const getFeedback = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const feedback = await Feedback.find({ userId: req.user.id });
    res.json(feedback);
  } catch (error) {
    next(error);
  }
};

export const getAdminSummary = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const totalFeedback = await Feedback.countDocuments();
    const sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 };

    const feedbackData = await Feedback.find();
    feedbackData.forEach((fb) => {
      if (fb.sentiment) {
        sentimentBreakdown[fb.sentiment as "positive" | "neutral" | "negative"]++;
      }
    });

    res.json({
      totalFeedback,
      sentimentBreakdown,
    });
  } catch (error) {
    next(error);
  }
};
