const express = require("express");
const router = express.Router();
const LegalController = require("../controllers/legalController");

// Instantiate the controller
const legalController = new LegalController();

// GET /api/legal/schemes - Get government schemes
router.get("/schemes", legalController.getGovernmentSchemes.bind(legalController));

// GET /api/legal/rights - Get legal rights
router.get("/rights", legalController.getLegalRights.bind(legalController));

// GET /api/legal/all - Get all legal information
router.get("/all", legalController.getAllLegalInfo.bind(legalController));

module.exports = router; 