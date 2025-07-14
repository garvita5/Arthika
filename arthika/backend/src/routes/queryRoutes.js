const express = require("express");
const router = express.Router();
const queryController = require("../controllers/queryController");

// POST /api/query - Submit financial query
router.post("/", queryController.handleFinancialQuery);

// GET /api/query/history/:userId - Get query history
router.get("/history/:userId", queryController.getQueryHistory);

// GET /api/query/status - Get API status
router.get("/status", queryController.getApiStatus);

// GET /api/user-queries?userId=abc123
router.get("/user-queries", queryController.getUserQueries);

module.exports = router; 