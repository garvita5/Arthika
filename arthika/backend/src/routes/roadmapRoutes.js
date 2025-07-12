const express = require("express");
const router = express.Router();
const roadmapController = require("../controllers/roadmapController");

// GET /api/user/:userId/roadmap - Get user roadmap
router.get("/:userId/roadmap", roadmapController.getUserRoadmap);

// POST /api/user/:userId/roadmap - Save user roadmap
router.post("/:userId/roadmap", roadmapController.saveUserRoadmap);

// PUT /api/user/:userId/roadmap - Update roadmap progress
router.put("/:userId/roadmap", roadmapController.updateRoadmapProgress);

// POST /api/user/:userId/roadmap/recommendations - Generate recommendations
router.post("/:userId/roadmap/recommendations", roadmapController.generateRoadmapRecommendations);

module.exports = router; 