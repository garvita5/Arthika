import { useState, useEffect, useRef, useCallback } from 'react';
import { useSpeechRecognition } from './useSpeechRecognition';
import apiService from '../services/apiService';
import { saveUserQuery } from '../services/apiService';
import { useTranslationContext } from '../contexts/TranslationContext';

export const useVoiceFlow = (language) => {
  const { getMessage } = useTranslationContext();
  
  // State
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [roadmapData, setRoadmapData] = useState(null);
  const [trustScore, setTrustScore] = useState(85);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [targetRoute, setTargetRoute] = useState('');
  
  // Refs
  const synthesisRef = useRef(null);
  const processingRef = useRef(false);
  const lastProcessedTranscriptRef = useRef('');
  
  // Get userEmail from localStorage if available
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('arthikaUser') : null;
  const userEmail = storedUser ? JSON.parse(storedUser).email : '';

  // Speech recognition hook
  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    setTranscript
  } = useSpeechRecognition(language);

  // Language mapping for speech synthesis
  const getSpeechSynthesisLang = useCallback((language) => {
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
  }, []);

  // Process query function
  const processQuery = useCallback(async (query) => {
    if (processingRef.current) return;
    
    processingRef.current = true;
    setIsProcessing(true);
    
    try {
      // Call query API
      const queryResponse = await apiService.submitFinancialQuery(query, language, userEmail);
      
      // Extract the story response from the structured data
      const responseData = queryResponse.data || queryResponse;
      
      // Try multiple possible response formats
      let storyResponse = '';
      if (responseData.storyResponse) {
        storyResponse = responseData.storyResponse;
      } else if (responseData.response) {
        storyResponse = responseData.response;
      } else if (typeof responseData === 'string') {
        storyResponse = responseData;
      } else if (responseData.message) {
        storyResponse = responseData.message;
      } else {
        storyResponse = 'No response received';
      }
      
      setAiResponse(storyResponse);
      
      // Save query and answer to Firestore
      await saveUserQuery({ email: userEmail, question: query, answer: storyResponse, language });
      
      // Use roadmap data from the query response
      const roadmapData = responseData.roadmap || null;
      setRoadmapData(roadmapData);
      
      // Set navigation flag instead of directly navigating
      setTargetRoute(`/answer?question=${encodeURIComponent(query)}`);
      setShouldNavigate(true);
      stopListening();
      
    } catch (error) {
      setAiResponse(getMessage('error.processing'));
      setRoadmapData(null);
      setTargetRoute(`/answer?question=${encodeURIComponent(query)}`);
      setShouldNavigate(true);
      stopListening();
    } finally {
      setIsProcessing(false);
      processingRef.current = false;
    }
  }, [language, userEmail, getMessage, stopListening]);

  // Auto-process transcript when it changes
  useEffect(() => {
    if (transcript && transcript !== lastProcessedTranscriptRef.current) {
      setTranscript(); // Clear transcript before processing new query
      lastProcessedTranscriptRef.current = transcript;
      processQuery(transcript);
    }
  }, [transcript, processQuery]);

  // Speech synthesis functions
  const speakResponse = useCallback(() => {
    if ('speechSynthesis' in window && aiResponse) {
      // Cancel any ongoing speech
      if (synthesisRef.current) {
        window.speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = getSpeechSynthesisLang(language);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, [aiResponse, language, getSpeechSynthesisLang]);

  const stopSpeaking = useCallback(() => {
    if (synthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Reset voice flow
  const resetVoiceFlow = useCallback(() => {
    setAiResponse('');
    setRoadmapData(null);
    setTranscript('');
    setIsProcessing(false);
    setIsSpeaking(false);
    processingRef.current = false;
    lastProcessedTranscriptRef.current = '';
    setShouldNavigate(false);
    setTargetRoute('');
    if (synthesisRef.current) {
      window.speechSynthesis.cancel();
    }
  }, [setTranscript]);

  // Export plan function
  const exportPlan = useCallback(async () => {
    try {
      // Simulate PDF export
      const response = await apiService.submitFeedback({
        email: userEmail,
        type: 'export',
        data: { aiResponse, roadmapData }
      });
      
      setAlertMessage(getMessage('success.export'));
      setShowAlert(true);
      
      // Simulate download
      const blob = new Blob([JSON.stringify({ aiResponse, roadmapData }, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'financial-plan.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      setAlertMessage(getMessage('error.export'));
      setShowAlert(true);
    }
  }, [aiResponse, roadmapData, userEmail, getMessage]);

  // Note: Auto-speak is now handled in individual pages to prevent conflicts
  // and allow better control over when speech starts

  return {
    // Speech recognition
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    isProcessing,
    
    // Processing
    processQuery,
    
    // Results
    aiResponse,
    roadmapData,
    trustScore,
    
    // Speech synthesis
    isSpeaking,
    speakResponse,
    stopSpeaking,
    
    // Alerts
    showAlert,
    alertMessage,
    setShowAlert,
    
    // Navigation
    shouldNavigate,
    targetRoute,
    setShouldNavigate,
    
    // Actions
    resetVoiceFlow,
    exportPlan
  };
}; 