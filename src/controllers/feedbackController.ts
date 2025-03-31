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

export const getAdminSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (req.user?.role !== "admin") {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
  
      const totalFeedback = await Feedback.countDocuments();
      const sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 };
      const feedbackPerModule = { form_builder: 0, ai_scoring: 0, ui_ux: 0, dashboard: 0, other: 0 };
      const themeCount: Record<string, number> = {};
      const feedbackOverTime: Record<string, number> = {};
      let totalConfidence = 0;
  
      const feedbackData = await Feedback.find();
  
      feedbackData.forEach((fb) => {
        // Sentiment Breakdown
        if (fb.sentiment) {
          sentimentBreakdown[fb.sentiment as "positive" | "neutral" | "negative"]++;
        }
  
        // Feedback Per Module
        if (fb.moduleTags) {
            fb.moduleTags.forEach((tag) => {
              if (Object.keys(feedbackPerModule).includes(tag)) {
                feedbackPerModule[tag as keyof typeof feedbackPerModule]++;
              }
            });
          }
          
  
        // Common Themes
        if (fb.themes) {
          fb.themes.forEach((theme: string) => {
            themeCount[theme] = (themeCount[theme] || 0) + 1;
          });
        }
  
        // Average Confidence
        if (fb.confidence) {
          totalConfidence += fb.confidence;
        }
  
        // Feedback Over Time (date-wise count)
        const date = new Date(fb.createdAt).toISOString().split("T")[0]; // Extract YYYY-MM-DD
        feedbackOverTime[date] = (feedbackOverTime[date] || 0) + 1;
      });
  
      const averageConfidence = totalFeedback > 0 ? totalConfidence / totalFeedback : 0;
  
      // Sort common themes by frequency
      const commonThemes = Object.entries(themeCount)
        .sort((a, b) => b[1] - a[1])
        .map(([theme]) => theme)
        .slice(0, 5); // Get top 5 themes
  
      res.json({
        totalFeedback,
        sentimentBreakdown,
        commonThemes,
        feedbackPerModule,
        averageConfidence: parseFloat(averageConfidence.toFixed(2)), // Keep 2 decimal places
        feedbackOverTime,
      });
    } catch (error) {
      next(error);
    }
  };
