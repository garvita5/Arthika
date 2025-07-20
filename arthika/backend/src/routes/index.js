const express = require("express");
const router = express.Router();

// Import route modules
const queryRoutes = require("./queryRoutes");
const speechRoutes = require("./speechRoutes");
const roadmapRoutes = require("./roadmapRoutes");
const trustScoreRoutes = require("./trustScoreRoutes");
const legalRoutes = require("./legalRoutes");
const feedbackRoutes = require("./feedbackRoutes");
const LegalController = require("../controllers/legalController");

// Instantiate controllers
const legalController = new LegalController();

// Mount routes
router.use("/query", queryRoutes);
router.use("/speech-to-text", speechRoutes);
router.use("/text-to-speech", speechRoutes);
router.use("/user", roadmapRoutes);
router.use("/score", trustScoreRoutes);
router.use("/legal", legalRoutes);
router.use("/feedback", feedbackRoutes);

// Direct schemes endpoint (alternative to /legal/schemes)
router.get("/schemes", legalController.getGovernmentSchemes.bind(legalController));

// Feedback endpoint
router.post('/feedback', (req, res) => {
  const { message, email } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Feedback message is required.' });
  }
  // Here you would store feedback in a database or send an email
  console.log('Feedback received:', { message, email });
  res.status(200).json({ success: true, message: 'Thank you for your feedback!' });
});

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
