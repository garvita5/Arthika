const express = require("express");
const router = express.Router();
const queryController = require("../controllers/queryController");

// POST /api/query - Submit financial query
router.post("/", queryController.handleFinancialQuery);

// GET /api/query/history/:userId - Get query history
router.get("/history/:userId", queryController.getQueryHistory);

module.exports = router; 