import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface SentimentResponse {
  sentiment: "positive" | "neutral" | "negative";
  tags?: string[];
  confidenceScore?: number;
}

export const analyzeSentiment = async (text: string) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API Key is missing! Check your .env file.");
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an AI that analyzes feedback sentiment." },
          { role: "user", content: `Analyze the sentiment of this feedback: "${text}". 
          Return JSON format: { "sentiment": "positive" | "neutral" | "negative", "tags": ["tag1", "tag2"], "confidenceScore": 0.95 }` }
        ],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const parsedResponse: SentimentResponse = JSON.parse(response.data.choices[0].message.content.trim());

    const sentimentMap: Record<SentimentResponse["sentiment"], string> = {
      positive: "Positive",
      neutral: "Neutral",
      negative: "Negative",
    };

    const validModuleTags = ["form_builder", "ai_scoring", "ui_ux", "dashboard", "other"];

    return {
      sentiment: sentimentMap[parsedResponse.sentiment] || "Neutral",
      themes: parsedResponse.tags || [],
      moduleTags: parsedResponse.tags?.filter((tag: string) => validModuleTags.includes(tag)) || ["other"],
      confidence: parsedResponse.confidenceScore || 50,
    };
  } catch (error: unknown) {
    const err = error as any; // Fix unknown error
    console.error("OpenAI API Error:", err.response?.data || err.message);
    return {
      sentiment: "Neutral",
      themes: [],
      moduleTags: ["other"],
      confidence: 50,
    };
  }
};
