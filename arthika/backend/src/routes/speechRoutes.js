const express = require("express");
const router = express.Router();
const { SpeechController, upload } = require("../controllers/speechController");

// POST /api/speech-to-text - Convert speech to text
router.post("/", upload.single('audio'), SpeechController.speechToText);

// POST /api/text-to-speech - Convert text to speech
router.post("/", SpeechController.textToSpeech);

// GET /api/speech-to-text/languages - Get supported languages
router.get("/languages", SpeechController.getSupportedLanguages);

module.exports = router; 