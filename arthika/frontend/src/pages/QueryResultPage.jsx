import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Download, 
  TrendingUp, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
  MessageSquare
} from 'lucide-react';
import TranslatedText from '../components/TranslatedText';

function QueryResultPage({ 
  language, 
  aiResponse, 
  roadmapData, 
  trustScore, 
  resetFlow 
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  const [isOpenAIAvailable, setIsOpenAIAvailable] = useState(true); // Default to true to avoid showing indicator initially

  // Check API status on component mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const apiService = (await import('../services/apiService')).default;
        const status = await apiService.getApiStatus();
        setIsOpenAIAvailable(status.data?.openaiAvailable ?? false);
      } catch (error) {
        console.error('Failed to check API status:', error);
        setIsOpenAIAvailable(false);
      }
    };
    
    checkApiStatus();
  }, []);

  // Auto-speak when response is ready
  useEffect(() => {
    if (aiResponse && !hasSpoken) {
      const timer = setTimeout(() => {
        speakResponse();
        setHasSpoken(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [aiResponse, hasSpoken]);

  const speakResponse = () => {
    if ('speechSynthesis' in window && aiResponse) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = language === 'en' ? 'en-US' : `${language}-IN`;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakResponse();
    }
  };

  const getTrustScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrustScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="text-green-600" size={20} />;
    if (score >= 60) return <AlertCircle className="text-orange-600" size={20} />;
    return <AlertCircle className="text-red-600" size={20} />;
  };

  if (!aiResponse) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="text-gray-400" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              <TranslatedText language={language}>
                No Query Asked
              </TranslatedText>
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              <TranslatedText language={language}>
                You haven't asked a financial question yet. Go back to the home page to start your financial journey.
              </TranslatedText>
            </p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>
              <TranslatedText language={language}>
                Ask a Question
              </TranslatedText>
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={resetFlow}
        >
          <ArrowLeft size={20} />
          <span>
            <TranslatedText language={language}>
              Back to Home
            </TranslatedText>
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSpeaking}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isSpeaking 
                ? 'bg-red-100 text-red-700' 
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            {isSpeaking ? <Pause size={16} /> : <Play size={16} />}
            <span>
              <TranslatedText language={language}>
                {isSpeaking ? 'Pause' : 'Listen'}
              </TranslatedText>
            </span>
          </button>
          
          <Link 
            to="/export" 
            className="flex items-center space-x-2 px-4 py-2 bg-success-100 text-success-700 rounded-lg hover:bg-success-200 transition-colors"
          >
            <Download size={16} />
            <span>
              <TranslatedText language={language}>
                Export
              </TranslatedText>
            </span>
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Mock Data Indicator */}
        {!isOpenAIAvailable && (
          <div className="lg:col-span-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <Info className="text-yellow-600" size={20} />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-yellow-800">
                    <TranslatedText language={language}>
                      Demo Mode Active
                    </TranslatedText>
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    <TranslatedText language={language}>
                      This response uses sample data for demonstration. Real AI responses will be available when the API key is configured.
                    </TranslatedText>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Response */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Response */}
          <div className="card">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">₹</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                  <TranslatedText language={language}>
                    Arthika's Response
                  </TranslatedText>
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {aiResponse}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Score */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                <TranslatedText language={language}>
                  Your Trust Score
                </TranslatedText>
              </h3>
              {getTrustScoreIcon(trustScore)}
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTrustScoreColor(trustScore)}`}>
                  {trustScore}/100
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      trustScore >= 80 ? 'bg-green-500' : 
                      trustScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${trustScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <TranslatedText language={language}>
                  {trustScore >= 80 ? 'Excellent financial health! Keep up the good work.' :
                   trustScore >= 60 ? 'Good financial standing with room for improvement.' :
                   'Consider reviewing your financial decisions and seeking guidance.'}
                </TranslatedText>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              <TranslatedText language={language}>
                Quick Actions
              </TranslatedText>
            </h3>
            <div className="space-y-3">
              <Link 
                to="/roadmap" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <TrendingUp className="text-primary-600" size={20} />
                <span className="text-gray-700">
                  <TranslatedText language={language}>
                    View Roadmap
                  </TranslatedText>
                </span>
              </Link>
              <Link 
                to="/schemes" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Info className="text-success-600" size={20} />
                <span className="text-gray-700">
                  <TranslatedText language={language}>
                    Government Schemes
                  </TranslatedText>
                </span>
              </Link>
              <Link 
                to="/score" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle className="text-purple-600" size={20} />
                <span className="text-gray-700">
                  <TranslatedText language={language}>
                    Trust Score Details
                  </TranslatedText>
                </span>
              </Link>
            </div>
          </div>

          {/* Roadmap Preview */}
          {roadmapData && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <TranslatedText language={language}>
                  Roadmap Preview
                </TranslatedText>
              </h3>
              <div className="space-y-3">
                {roadmapData.steps?.slice(0, 3).map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{step.title}</p>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
                {roadmapData.steps?.length > 3 && (
                  <div className="text-center pt-2">
                    <Link 
                      to="/roadmap" 
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      <TranslatedText language={language}>
                        View all {roadmapData.steps.length} steps →
                      </TranslatedText>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              <TranslatedText language={language}>
                💡 Pro Tips
              </TranslatedText>
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <TranslatedText language={language}>
                  • Always read loan terms carefully
                </TranslatedText>
              </p>
              <p>
                <TranslatedText language={language}>
                  • Compare multiple options before deciding
                </TranslatedText>
              </p>
              <p>
                <TranslatedText language={language}>
                  • Keep emergency funds for unexpected expenses
                </TranslatedText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueryResultPage; 