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
import Header from './components/Header';
import VoiceInput from './components/VoiceInput';
import FeatureCards from './components/FeatureCards';
import AIResponse from './components/AIResponse';
import TrustScore from './components/TrustScore';
import FinancialRoadmap from './components/FinancialRoadmap';
import ActionButtons from './components/ActionButtons';

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

function App() {
  const [aiResponse, setAiResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [trustScore, setTrustScore] = useState(85);
  const [currentStep, setCurrentStep] = useState('input');
  const [financialData, setFinancialData] = useState(null);
  
  const synthesisRef = useRef(null);

  // Use custom hook for speech recognition
  const { isListening, transcript, startListening, stopListening, setTranscript } = useSpeechRecognition(language);

  // Handle financial query when transcript changes
  useEffect(() => {
    if (transcript) {
      const response = handleFinancialQuery(transcript, language);
      setAiResponse(response);
      setCurrentStep('response');
      setFinancialData(generateFinancialData());
    }
  }, [transcript, language]);

  const speakResponse = () => {
    if ('speechSynthesis' in window) {
      if (synthesisRef.current) {
        window.speechSynthesis.cancel();
      }
      
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
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
    // Simulate PDF export
    alert('Financial plan exported successfully! Check your downloads.');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header language={language} toggleLanguage={toggleLanguage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'input' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                {language === 'en' ? 'Your AI Financial Advisor' : 'आपका AI वित्तीय सलाहकार'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Ask me anything about loans, investments, or financial planning. I\'ll guide you through your financial journey.'
                  : 'मुझसे लोन, निवेश या वित्तीय योजना के बारे में कुछ भी पूछें। मैं आपकी वित्तीय यात्रा में आपका मार्गदर्शन करूंगा।'
                }
              </p>
            </div>

            {/* Voice Input Section */}
            <VoiceInput 
              isListening={isListening}
              transcript={transcript}
              startListening={startListening}
              stopListening={stopListening}
              language={language}
            />

            {/* Feature Cards */}
            <FeatureCards language={language} />
          </div>
        )}

        {currentStep === 'response' && (
          <div className="space-y-8">
            {/* Back Button */}
            <button
              onClick={() => {
                setCurrentStep('input');
                setTranscript('');
                setAiResponse('');
                setFinancialData(null);
              }}
              className="btn-secondary"
            >
              ← {language === 'en' ? 'Back' : 'वापस'}
            </button>

            {/* AI Response */}
            <AIResponse 
              aiResponse={aiResponse}
              isSpeaking={isSpeaking}
              speakResponse={speakResponse}
              stopSpeaking={stopSpeaking}
              exportPlan={exportPlan}
              language={language}
            />

            {/* Trust Score */}
            <TrustScore 
              trustScore={trustScore}
              financialData={financialData}
              language={language}
            />

            {/* Financial Roadmap */}
            <FinancialRoadmap 
              financialData={financialData}
              language={language}
            />

            {/* Action Buttons */}
            <ActionButtons language={language} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
