import { useState, useEffect, useCallback, useRef } from 'react';

export const useSpeechRecognition = (language = 'en') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const silenceTimerRef = useRef(null);
  const recognitionRef = useRef(null);

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

  // Clear silence timer
  const clearSilenceTimer = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  // Start silence detection timer
  const startSilenceTimer = () => {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      if (isListening) {
        console.log('Silence detected, stopping recognition');
        stopListening();
      }
    }, 3000); // Stop after 3 seconds of silence
  };

  const startListening = useCallback(() => {
    if (!isSupported()) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    try {
      // Stop any existing recognition
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = getSpeechRecognition();
      recognitionRef.current = recognition;
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = getSpeechRecognitionLang(language);

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
        setInterimTranscript('');
        console.log('Speech recognition started');
        startSilenceTimer();
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let currentInterimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            currentInterimTranscript += transcript;
          }
        }

        // Update interim transcript for real-time feedback
        setInterimTranscript(currentInterimTranscript);

        // If we have final results, update the main transcript
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          // Reset silence timer when we get results
          startSilenceTimer();
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        // Don't treat 'no-speech' as an error if we have some transcript
        if (event.error === 'no-speech' && transcript) {
          console.log('No more speech detected, but we have transcript');
          return;
        }
        
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
        clearSilenceTimer();
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
        clearSilenceTimer();
        console.log('Speech recognition ended');
      };

      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setError('Failed to start speech recognition');
    }
  }, [language, transcript, isListening]);

  const stopListening = useCallback(() => {
    clearSilenceTimer();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
    }
    
    setIsListening(false);
    setInterimTranscript('');
  }, []);

  // Reset transcript
  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearSilenceTimer();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    setTranscript: resetTranscript,
    isSupported: isSupported()
  };
}; 