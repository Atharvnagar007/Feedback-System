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
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeFeedbackController = void 0;
const analyzeFeedback_1 = require("../services/ai/analyzeFeedback");
const analyzeFeedbackController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedback } = req.body;
        if (!feedback) {
            res.status(400).json({ error: "Feedback is required" });
            return;
        }
        const analysis = yield (0, analyzeFeedback_1.analyzeFeedback)(feedback);
        res.json({ analysis });
    }
    catch (error) {
        console.error("Error analyzing feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.analyzeFeedbackController = analyzeFeedbackController;
//# sourceMappingURL=feedbackController.js.map