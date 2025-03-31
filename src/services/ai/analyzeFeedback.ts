import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure you have this in your .env file
});

export const analyzeFeedback = async (feedback: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful AI that analyzes sentiment." },
                { role: "user", content: `Analyze the sentiment of this feedback: "${feedback}"` },
            ],
            max_tokens: 100,
        });

        // Ensure response and choices exist before accessing
        if (!response || !response.choices || response.choices.length === 0 || !response.choices[0].message.content) {
            throw new Error("Invalid AI response");
        }

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error with AI analysis:", error);
        throw new Error("AI analysis failed");
    }
};
