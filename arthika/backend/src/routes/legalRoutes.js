const express = require("express");
const router = express.Router();
const legalController = require("../controllers/legalController");

// GET /api/legal/schemes - Get government schemes
router.get("/schemes", legalController.getGovernmentSchemes);

// GET /api/legal/rights - Get legal rights
router.get("/rights", legalController.getLegalRights);

// GET /api/legal/all - Get all legal information
router.get("/all", legalController.getAllLegalInfo);

module.exports = router; 