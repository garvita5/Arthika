import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Import components
import HomePage from './components/HomePage';
import Header from './components/Header';
import SpeakStep from './components/SpeakStep';
import AnalyzeStep from './components/AnalyzeStep';
import RoadmapStep from './components/RoadmapStep';
import TranslatedAlert from './components/TranslatedAlert';
import { TranslationProvider, useTranslationContext } from './contexts/TranslationContext';

// Import hooks and services
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { handleFinancialQuery, generateFinancialData } from './services/financialAI';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AppContent({ language, onLanguageChange }) {
  const { getMessage } = useTranslationContext();
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [trustScore, setTrustScore] = useState(85);
  const [currentStep, setCurrentStep] = useState('home'); // 'home', 1, 2, 3
  const [financialData, setFinancialData] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  
  const synthesisRef = useRef(null);
  
  // Generate a simple user ID for testing
  const userId = 'user-' + Math.random().toString(36).substr(2, 9);

  // Use custom hook for speech recognition
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition(language);

  // Handle financial query when transcript changes
  useEffect(() => {
    if (transcript && currentStep !== 'home') {
      const processQuery = async () => {
        try {
          const response = await handleFinancialQuery(transcript, language, userId);
          setAiResponse(response);
          setCurrentStep(2);
          const data = await generateFinancialData(userId);
          setFinancialData(data);
        } catch (error) {
          console.error('Error processing financial query:', error);
          setAiResponse(getMessage('error.processing'));
          setCurrentStep(2);
          const data = await generateFinancialData(userId);
          setFinancialData(data);
        }
      };
      
      processQuery();
    }
  }, [transcript, language, currentStep, getMessage, userId]);

  // Language code mapping for speech synthesis
  const getSpeechSynthesisLang = (language) => {
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

  const speakResponse = () => {
    if ('speechSynthesis' in window) {
      if (synthesisRef.current) {
        window.speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = getSpeechSynthesisLang(language);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const exportPlan = () => {
    setAlertMessage(getMessage('success.export'));
    setShowAlert(true);
  };

  const resetApp = () => {
    setCurrentStep('home');
    setTranscript('');
    setAiResponse('');
    setFinancialData(null);
  };

  const goToNextStep = () => {
    setCurrentStep(3);
  };

  const startQuery = async (query) => {
    try {
      const response = await handleFinancialQuery(query, language, userId);
      setAiResponse(response);
      setCurrentStep(2);
      const data = await generateFinancialData(userId);
      setFinancialData(data);
    } catch (error) {
      console.error('Error processing query:', error);
      setAiResponse(getMessage('error.processing'));
      setCurrentStep(2);
      const data = await generateFinancialData(userId);
      setFinancialData(data);
    }
  };

  // Memoize startQuery to avoid infinite re-renders
  const memoizedStartQuery = React.useCallback(startQuery, [language, getMessage, userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentStep === 'home' ? (
        <HomePage 
          language={language}
          onLanguageChange={onLanguageChange}
          onStartQuery={memoizedStartQuery}
          isListening={isListening}
          startListening={startListening}
          stopListening={stopListening}
          transcript={transcript}
        />
      ) : (
        <>
          <Header 
            currentStep={parseInt(currentStep)} 
            language={language} 
            onLanguageChange={onLanguageChange} 
          />

          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Step 1: Speak Your Question */}
            {currentStep === 1 && (
              <SpeakStep 
                isListening={isListening}
                transcript={transcript}
                startListening={startListening}
                stopListening={stopListening}
                language={language}
              />
            )}

            {/* Step 2: Get AI Analysis */}
            {currentStep === 2 && (
              <AnalyzeStep 
                aiResponse={aiResponse}
                isSpeaking={isSpeaking}
                speakResponse={speakResponse}
                stopSpeaking={stopSpeaking}
                exportPlan={exportPlan}
                language={language}
                onNextStep={goToNextStep}
              />
            )}

            {/* Step 3: View Your Roadmap */}
            {currentStep === 3 && (
              <RoadmapStep 
                trustScore={trustScore}
                financialData={financialData}
                language={language}
                onReset={resetApp}
              />
            )}
          </main>
        </>
      )}

      {/* Translated Alert */}
      {showAlert && (
        <TranslatedAlert
          message={alertMessage}
          language={language}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <TranslationProvider language={language}>
      <AppContent language={language} onLanguageChange={handleLanguageChange} />
    </TranslationProvider>
  );
}

export default App;
