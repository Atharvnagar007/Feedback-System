import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface SentimentResponse {
    sentiment: "positive" | "neutral" | "negative";
    tags?: string[]; // Original field returned by OpenAI
    moduleTags?: string[]; // New explicit field
    themes?: string[]; // New explicit field
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
            { 
              role: "user", 
              content: `Analyze the sentiment of this feedback: "${text}". 
              - Extract general themes (e.g., "great", "helpful", "slow", "confusing").
              - Identify the related module(s) from ["form_builder", "ai_scoring", "ui_ux", "dashboard", "other"]. 
              - Return JSON format: 
              {
                "sentiment": "positive" | "neutral" | "negative",
                "themes": ["theme1", "theme2"],
                "moduleTags": ["form_builder", "ui_ux"],
                "confidenceScore": 0.95
              }`
            }
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
  
      console.log("OpenAI API Raw Response:", response.data.choices[0].message.content);
  
      const parsedResponse: SentimentResponse = JSON.parse(response.data.choices[0].message.content.trim());
  
      const sentimentMap: Record<SentimentResponse["sentiment"], string> = {
        positive: "Positive",
        neutral: "Neutral",
        negative: "Negative",
      };
  
      const validModuleTags = ["form_builder", "ai_scoring", "ui_ux", "dashboard", "other"];
      
      // Separate themes & moduleTags
      const themes = parsedResponse.themes ?? parsedResponse.tags ?? []; 
    const moduleTags = parsedResponse.moduleTags?.filter(tag => validModuleTags.includes(tag)) || ["other"];

  
      console.log("Extracted Themes:", themes);
      console.log("Filtered Module Tags:", moduleTags);
  
      return {
        sentiment: sentimentMap[parsedResponse.sentiment] || "Neutral",
        themes,
        moduleTags,  
        confidence: parsedResponse.confidenceScore || 50,
      };
    } catch (error: unknown) {
      const err = error as any;
      console.error("OpenAI API Error:", err.response?.data || err.message);
      return {
        sentiment: "Neutral",
        themes: [],
        moduleTags: ["other"],
        confidence: 50,
      };
    }
  };
  
