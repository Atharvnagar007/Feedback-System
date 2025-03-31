import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  feedbackText: { type: String, required: true },
  sentiment: { type: String, enum: ["Positive", "Neutral", "Negative"], default: "Neutral" },
  themes: { type: [String], default: [] },
  moduleTags: {
    type: [String],
    enum: ["form_builder", "ai_scoring", "ui_ux", "dashboard", "other"],
    default: ["other"],
  },
  confidence: { type: Number, min: 0, max: 100, default: 50 }, // Default confidence in case AI fails
  createdAt: { type: Date, default: Date.now, index: true }, // Indexed for faster queries
});

export default mongoose.model("Feedback", FeedbackSchema);

