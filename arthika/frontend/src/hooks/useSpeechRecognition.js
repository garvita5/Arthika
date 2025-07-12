import { useState, useEffect, useCallback } from 'react';

export const useSpeechRecognition = (language = 'en') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  // Check if Web Speech API is supported
  const isSupported = () => {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  };

  // Get speech recognition instance
  const getSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      throw new Error('Speech recognition not supported');
    }
    return new SpeechRecognition();
  };

  // Language mapping for Web Speech API
  const getSpeechRecognitionLang = (language) => {
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
  };

  const startListening = useCallback(() => {
    if (!isSupported()) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    try {
      const recognition = getSpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = getSpeechRecognitionLang(language);

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        console.log('Speech recognition started');
        
        // Auto-stop after 3 seconds of no speech
        setTimeout(() => {
          if (isListening) {
            console.log('Auto-stopping speech recognition after 3 seconds');
            recognition.stop();
          }
        }, 3000);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Update transcript with both final and interim results
        const currentTranscript = finalTranscript || interimTranscript;
        if (currentTranscript) {
          setTranscript(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        // Handle specific error types
        let errorMessage = 'Speech recognition error';
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            break;
          case 'audio-capture':
            errorMessage = 'Microphone access denied. Please allow microphone access.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone access.';
            break;
          case 'network':
            errorMessage = 'Network error. Please check your connection.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }
        
        setError(errorMessage);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        console.log('Speech recognition ended');
        
        // If we have transcript, keep it visible
        if (transcript) {
          console.log('Final transcript:', transcript);
        }
      };

      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setError('Failed to start speech recognition');
    }
  }, [language]);

  const stopListening = useCallback(() => {
    if (isSupported()) {
      try {
        const recognition = getSpeechRecognition();
        recognition.stop();
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
    }
  }, []);

  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    setTranscript: resetTranscript,
    isSupported: isSupported()
  };
}; 