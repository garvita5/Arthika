const express = require("express");
const router = express.Router();

// Import route modules
const queryRoutes = require("./queryRoutes");
const speechRoutes = require("./speechRoutes");
const roadmapRoutes = require("./roadmapRoutes");
const trustScoreRoutes = require("./trustScoreRoutes");
const legalRoutes = require("./legalRoutes");
const feedbackRoutes = require("./feedbackRoutes");

// Mount routes
router.use("/query", queryRoutes);
router.use("/speech-to-text", speechRoutes);
router.use("/text-to-speech", speechRoutes);
router.use("/user", roadmapRoutes);
router.use("/score", trustScoreRoutes);
router.use("/legal", legalRoutes);
router.use("/feedback", feedbackRoutes);

// API info endpoint
router.get("/", (req, res) => {
  res.json({
    message: "Arthika API v1.0",
    endpoints: {
      query: {
        POST: "/api/query - Submit financial query",
        GET: "/api/query/history/:userId - Get query history"
      },
      speech: {
        POST: "/api/speech-to-text - Convert speech to text",
        POST: "/api/text-to-speech - Convert text to speech",
        GET: "/api/speech-to-text/languages - Get supported languages"
      },
      roadmap: {
        GET: "/api/user/:userId/roadmap - Get user roadmap",
        POST: "/api/user/:userId/roadmap - Save user roadmap",
        PUT: "/api/user/:userId/roadmap - Update roadmap progress"
      },
      trustScore: {
        GET: "/api/score/:userId - Get trust score",
        PUT: "/api/score/:userId - Update trust score",
        POST: "/api/score/:userId/recalculate - Recalculate trust score"
      },
      legal: {
        GET: "/api/legal/schemes - Get government schemes",
        GET: "/api/legal/rights - Get legal rights",
        GET: "/api/legal/all - Get all legal information"
      },
      feedback: {
        POST: "/api/feedback - Submit feedback",
        GET: "/api/feedback/analytics - Get feedback analytics",
        GET: "/api/feedback/user/:userId - Get user feedback"
      }
    }
  });
});

module.exports = router;
