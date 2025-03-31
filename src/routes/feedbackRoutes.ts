import express from "express";
import { submitFeedback, getFeedback, getAdminSummary } from "../controllers/feedbackController";
import { authenticateUser } from "../middleware/authMiddleware";
import { authorizeRole } from "../middleware/roleMiddleware";

const router = express.Router();

router.post("/", authenticateUser, submitFeedback);
router.get("/", authenticateUser, getFeedback);
router.get("/admin/summary", authenticateUser, authorizeRole("admin"), getAdminSummary);

export default router;
