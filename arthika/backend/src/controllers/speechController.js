const speechService = require('../services/speechService');
const multer = require('multer');

// Configure multer for audio file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
    }
  }
});

class SpeechController {
  async speechToText(req, res) {
    try {
      const { language = 'en' } = req.body;
      const audioFile = req.file;

      if (!audioFile) {
        return res.status(400).json({
          success: false,
          error: 'Audio file is required'
        });
      }

      console.log(`Processing speech to text in ${language}`);

      // Convert file buffer to blob-like object
      const audioBlob = {
        type: audioFile.mimetype,
        size: audioFile.size,
        buffer: audioFile.buffer
      };

      const result = await speechService.speechToText(audioBlob, language);

      res.json({
        success: true,
        data: {
          text: result.text,
          confidence: result.confidence,
          language: result.language
        }
      });
    } catch (error) {
      console.error('Speech to text error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process speech to text',
        message: error.message
      });
    }
  }

  async textToSpeech(req, res) {
    try {
      const { text, language = 'en' } = req.body;

      if (!text) {
        return res.status(400).json({
          success: false,
          error: 'Text is required'
        });
      }

      console.log(`Processing text to speech: "${text.substring(0, 50)}..." in ${language}`);

      const result = await speechService.textToSpeech(text, language);

      res.json({
        success: true,
        data: {
          audioUrl: result.audioUrl,
          duration: result.duration,
          language: result.language,
          text: result.text
        }
      });
    } catch (error) {
      console.error('Text to speech error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate speech',
        message: error.message
      });
    }
  }

  async getSupportedLanguages(req, res) {
    try {
      const languages = speechService.getSupportedLanguages();

      res.json({
        success: true,
        data: {
          languages
        }
      });
    } catch (error) {
      console.error('Get languages error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to get supported languages',
        message: error.message
      });
    }
  }
}

module.exports = {
  SpeechController: new SpeechController(),
  upload
}; 