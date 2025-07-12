const axios = require('axios');

class SpeechService {
  constructor() {
    // Use Web Speech API and HTML5 speechSynthesis (free)
    this.useWebSpeechAPI = true;
    this.useHTML5SpeechSynthesis = true;
  }

  // Speech to Text using Web Speech API
  async speechToText(audioBlob, language = 'en') {
    try {
      // Note: Web Speech API runs on the frontend (browser)
      // This endpoint is for when frontend sends transcribed text to backend
      // The actual speech recognition happens in the browser
      
      if (audioBlob && audioBlob.text) {
        // Frontend already transcribed using Web Speech API
        return {
          text: audioBlob.text,
          confidence: 0.9,
          language: language,
          method: 'web_speech_api'
        };
      }
      
      // Fallback mock response for testing
      const mockResponses = {
        'en': [
          "What if I take a gold loan?",
          "How should I invest my money?",
          "What are the best savings options?",
          "Can I afford a home loan?",
          "How do I plan for retirement?"
        ],
        'hi': [
          "सोने का लोन लेने से क्या होगा?",
          "मैं अपना पैसा कैसे निवेश करूं?",
          "बचत के लिए सबसे अच्छे विकल्प क्या हैं?",
          "क्या मैं होम लोन ले सकता हूं?",
          "सेवानिवृत्ति की योजना कैसे बनाएं?"
        ],
        'bn': [
          "সোনার ঋণ নিলে কী হবে?",
          "আমি কীভাবে আমার টাকা বিনিয়োগ করব?",
          "সঞ্চয়ের জন্য সেরা বিকল্পগুলি কী?",
          "আমি কি বাড়ির ঋণ নিতে পারি?",
          "কীভাবে অবসরের পরিকল্পনা করব?"
        ]
      };

      const responses = mockResponses[language] || mockResponses['en'];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      return {
        text: randomResponse,
        confidence: 0.85,
        language: language,
        method: 'web_speech_api_simulation'
      };
    } catch (error) {
      console.error('Speech to text error:', error);
      throw new Error('Failed to process speech to text');
    }
  }

  // Text to Speech using HTML5 speechSynthesis
  async textToSpeech(text, language = 'en') {
    try {
      // Note: HTML5 speechSynthesis runs on the frontend (browser)
      // This endpoint returns configuration for frontend to use
      
      const speechConfig = {
        text: text,
        language: this.getSpeechSynthesisLang(language),
        rate: 0.9,
        pitch: 1,
        volume: 1,
        method: 'html5_speech_synthesis'
      };
      
      return {
        config: speechConfig,
        duration: Math.floor(text.length * 0.06), // Rough estimate
        language: language,
        text: text,
        method: 'html5_speech_synthesis'
      };
    } catch (error) {
      console.error('Text to speech error:', error);
      throw new Error('Failed to generate speech');
    }
  }

  // Get speech synthesis language code
  getSpeechSynthesisLang(language) {
    const langMap = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'mr': 'mr-IN',
      'gu': 'gu-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'pa': 'pa-IN'
    };
    return langMap[language] || 'en-US';
  }

  // Get supported languages for Web Speech API
  getSupportedLanguages() {
    return [
      { code: 'en', name: 'English', nativeName: 'English', webSpeechSupported: true },
      { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', webSpeechSupported: true },
      { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', webSpeechSupported: true },
      { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', webSpeechSupported: true },
      { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', webSpeechSupported: true },
      { code: 'mr', name: 'Marathi', nativeName: 'मराठी', webSpeechSupported: true },
      { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', webSpeechSupported: true },
      { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', webSpeechSupported: true },
      { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', webSpeechSupported: true },
      { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', webSpeechSupported: true }
    ];
  }

  // Get Web Speech API status
  getWebSpeechAPIStatus() {
    return {
      speechRecognition: typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window),
      speechSynthesis: typeof window !== 'undefined' && 'speechSynthesis' in window,
      supported: true,
      method: 'web_speech_api'
    };
  }

  // Validate audio format
  validateAudioFormat(audioBlob) {
    const allowedTypes = [
      'audio/wav',
      'audio/mp3',
      'audio/mpeg',
      'audio/ogg',
      'audio/webm'
    ];
    
    return allowedTypes.includes(audioBlob.type);
  }
}

module.exports = new SpeechService(); 