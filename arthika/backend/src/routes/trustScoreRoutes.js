const express = require("express");
const router = express.Router();
const trustScoreController = require("../controllers/trustScoreController");

// GET /api/score/:userId - Get trust score
router.get("/:userId", trustScoreController.getTrustScore);

// PUT /api/score/:userId - Update trust score
router.put("/:userId", trustScoreController.updateTrustScore);

// POST /api/score/:userId/recalculate - Recalculate trust score
router.post("/:userId/recalculate", trustScoreController.recalculateTrustScore);

module.exports = router; 