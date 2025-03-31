"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackController_1 = require("../controllers/feedbackController");
const router = express_1.default.Router();
// Define the route correctly
router.post("/analyze-feedback", feedbackController_1.analyzeFeedbackController);
exports.default = router;
//# sourceMappingURL=feedback.js.map