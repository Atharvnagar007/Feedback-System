"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFeedback = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY, // Ensure you have this in your .env file
});
const analyzeFeedback = (feedback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield openai.completions.create({
            model: "gpt-4",
            prompt: `Analyze the sentiment of this feedback: "${feedback}"`,
            max_tokens: 100,
        });
        return response.choices[0].text.trim();
    }
    catch (error) {
        console.error("Error with AI analysis:", error);
        throw new Error("AI analysis failed");
    }
});
exports.analyzeFeedback = analyzeFeedback;
//# sourceMappingURL=analyzeFeedback.js.map