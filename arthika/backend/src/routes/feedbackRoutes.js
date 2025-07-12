const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// POST /api/feedback - Submit feedback
router.post("/", feedbackController.submitFeedback);

// GET /api/feedback/analytics - Get feedback analytics
router.get("/analytics", feedbackController.getFeedbackAnalytics);

// GET /api/feedback/user/:userId - Get user feedback
router.get("/user/:userId", feedbackController.getFeedbackByUser);

// PUT /api/feedback/:feedbackId - Update feedback
router.put("/:feedbackId", feedbackController.updateFeedback);

// DELETE /api/feedback/:feedbackId - Delete feedback
router.delete("/:feedbackId", feedbackController.deleteFeedback);

module.exports = router; 