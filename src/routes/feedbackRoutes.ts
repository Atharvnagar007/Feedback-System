const express = require("express");
const jwt = require("jsonwebtoken");
const { submitFeedback, getFeedback, getAdminSummary } = require("../controllers/feedbackController");
const { authorizeRole } = require("../middleware/roleMiddleware"); // Ensure this exists
const router = express.Router();
import { authenticateUser } from "../middleware/authMiddleware";

// Middleware for verifying JWT


// Routes
router.post("/feedback", authenticateUser, submitFeedback);
router.get("/feedback", authenticateUser, getFeedback);
router.get("/admin/feedback-summary", authenticateUser, authorizeRole("admin"), getAdminSummary);

export default router;    
