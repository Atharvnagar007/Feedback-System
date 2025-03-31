import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function testAPI() {
    try {
        const response = await openai.completions.create({
            model: "gpt-4",
            prompt: "Hello, how are you?",
            max_tokens: 50,
        });

        console.log(response.choices[0].text);
    } catch (error) {
        console.error("OpenAI API Error:", error);
    }
}

testAPI();
