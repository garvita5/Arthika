import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, MessageSquare, ChevronDown, Play, Volume2, Phone, Users, Shield, Info, TrendingUp, FileText, Download, Loader2 } from 'lucide-react';
import TranslatedText from '../components/TranslatedText';
import apiService from '../services/apiService';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryContext } from '../contexts/QueryContext';
import { getHomepageTranslation } from '../config/homepageTranslations';
import { getSmartTranslation } from '../config/smartTranslations';

function HomePage({
  language,
  isListening,
  startListening,
  stopListening,
  transcript,
  interimTranscript,
  isProcessing,
  processQuery,
  setTranscript // <-- add this prop if not already present
}) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [inputMethod, setInputMethod] = useState('voice');
  const [textInput, setTextInput] = useState('');
  const micSectionRef = useRef(null);
  const navigate = useNavigate();
  const [loadingPreset, setLoadingPreset] = useState(false);
  const { setQueryResult, resetQueryResult, userEmail } = useQueryContext();

  const useCases = [
    {
      icon: '💍',
      title: getHomepageTranslation(language, 'useCases', 'title', 0),
      description: getHomepageTranslation(language, 'useCases', 'description', 0)
    },
    {
      icon: '🏥',
      title: getHomepageTranslation(language, 'useCases', 'title', 1),
      description: getHomepageTranslation(language, 'useCases', 'description', 1)
    },
    {
      icon: '🎓',
      title: getHomepageTranslation(language, 'useCases', 'title', 2),
      description: getHomepageTranslation(language, 'useCases', 'description', 2)
    },
    {
      icon: '👩‍⚖️',
      title: getHomepageTranslation(language, 'useCases', 'title', 3),
      description: getHomepageTranslation(language, 'useCases', 'description', 3)
    }
  ];

  const quickActions = [
    {
      icon: TrendingUp,
      title: getHomepageTranslation(language, 'quickActions', 'viewRoadmap.title'),
      description: getHomepageTranslation(language, 'quickActions', 'viewRoadmap.description'),
      path: '/roadmap'
    },
    {
      icon: Shield,
      title: getHomepageTranslation(language, 'quickActions', 'trustScore.title'),
      description: getHomepageTranslation(language, 'quickActions', 'trustScore.description'),
      path: '/score'
    },
    {
      icon: FileText,
      title: getHomepageTranslation(language, 'quickActions', 'governmentSchemes.title'),
      description: getHomepageTranslation(language, 'quickActions', 'governmentSchemes.description'),
      path: '/schemes'
    },
    {
      icon: Download,
      title: getHomepageTranslation(language, 'quickActions', 'exportPlan.title'),
      description: getHomepageTranslation(language, 'quickActions', 'exportPlan.description'),
      path: '/export'
    }
  ];

  const handleStartQuery = () => {
    if (isProcessing) return;

    if (inputMethod === 'voice') {
      if (isListening) {
        stopListening();
      } else {
        startListening();
        // Smooth scroll to mic section
        micSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    } else {
      if (textInput.trim()) {
        navigate(`/answer?question=${encodeURIComponent(textInput)}`);
      }
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      resetQueryResult();
      const response = await apiService.submitFinancialQuery(textInput, language, userEmail);
      if (response) {
        setQueryResult({ question: textInput, ...response });
        if (typeof setTranscript === 'function') setTranscript(); // Clear transcript
        navigate(`/answer?question=${encodeURIComponent(textInput.trim())}`);
      } else {
        alert('No data received from backend.');
      }
    }
  };

  const displayText = transcript || interimTranscript;

  // Handler for preset command tiles
  const handlePresetCommand = async (presetText) => {
    setLoadingPreset(true);
    try {
      resetQueryResult(); // Clear previous result
      const response = await apiService.submitFinancialQuery(presetText, language, userEmail);
      if (response) {
        setQueryResult({ question: presetText, ...response }); // Store question + answer
        if (typeof setTranscript === 'function') setTranscript(); // Clear transcript
        navigate(`/answer?question=${encodeURIComponent(presetText.trim())}`);
      } else {
        alert('No data received from backend.');
      }
    } catch (error) {
      alert('Failed to get response. Please try again.');
      console.error('API error:', error);
    } finally {
      setLoadingPreset(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className=" text-center space-y-8 mb-12">
        <div className="relative space-y-8 bg-gradient-to-br from-blue-100/80 via-cyan-50 to-blue-200/80 rounded-[2.5rem] shadow-2xl px-8 py-14 mx-auto max-w-4xl border-2 border-blue-200/60 ring-4 ring-cyan-100/40 backdrop-blur-md">
          <div className="flex flex-col items-center">
            <div className="w-30 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 mb-6 animate-fade-in flex items-center justify-center" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight drop-shadow-lg tracking-tight mb-4 animate-fade-in">
              {getSmartTranslation(language, 'hero', 'title')}
            </h1>
            <p className="text-xl md:text-2xl text-cyan-900/90 max-w-2xl mx-auto leading-relaxed font-medium animate-fade-in">
              {getHomepageTranslation(language, 'hero', 'subtitle')}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button
            onClick={() => {
              setInputMethod('voice');
              startListening();
              micSectionRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
              });
            }}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg px-8 py-4 flex items-center justify-center space-x-2 rounded-full shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-200"
          >
            <Mic size={24} />
            <span>
              {getHomepageTranslation(language, 'hero', 'startButton')}
            </span>
          </button>
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="bg-white/80 border border-blue-200 text-blue-700 text-lg px-8 py-4 rounded-full shadow hover:bg-blue-50 transition-all duration-200"
          >
            {getHomepageTranslation(language, 'hero', 'howItWorksButton')}
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      {showHowItWorks && (
        <div className="bg-white/80 rounded-2xl shadow-xl p-8 mb-12 animate-fade-in border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {getHomepageTranslation(language, 'howItWorks', 'title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Mic className="text-cyan-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {getHomepageTranslation(language, 'howItWorks', 'step1.title')}
              </h3>
              <p className="text-gray-600">
                {getHomepageTranslation(language, 'howItWorks', 'step1.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Play className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {getHomepageTranslation(language, 'howItWorks', 'step2.title')}
              </h3>
              <p className="text-gray-600">
                {getHomepageTranslation(language, 'howItWorks', 'step2.description')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Volume2 className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {getHomepageTranslation(language, 'howItWorks', 'step3.title')}
              </h3>
              <p className="text-gray-600">
                {getHomepageTranslation(language, 'howItWorks', 'step3.description')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="flex flex-wrap justify-center gap-12 mb-16">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.path}
              className="bg-gradient-to-br from-cyan-50 to-blue-100/70 backdrop-blur-md border border-blue-100 rounded-3xl p-10 flex flex-col items-center justify-between shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 group cursor-pointer min-w-[280px] max-w-[380px] min-h-[220px]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-2xl flex items-center justify-center mb-6 shadow group-hover:from-cyan-300 group-hover:to-blue-300">
                <Icon className="text-cyan-600" size={36} />
              </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2 text-center leading-tight">
                {action.title}
              </h3>
              <p className="text-gray-600 text-base text-center leading-relaxed">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Use Case Tiles */}
      <div className="flex flex-wrap justify-center gap-12 mb-12">
        {useCases.map((useCase, index) => (
          <div key={index} className="bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-md border border-blue-100 rounded-3xl p-10 flex flex-col items-center justify-between shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer min-w-[280px] max-w-[380px] min-h-[220px]"
            onClick={() => handlePresetCommand(useCase.title + (useCase.description ? (': ' + useCase.description) : ''))}
            style={{ opacity: loadingPreset ? 0.6 : 1, pointerEvents: loadingPreset ? 'none' : 'auto' }}
          >
            <div className="text-6xl mb-6 drop-shadow-sm">{useCase.icon}</div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2 text-center leading-tight">
              {useCase.title}
            </h3>
            <p className="text-gray-600 text-base text-center leading-relaxed">
              {useCase.description}
            </p>
          </div>
        ))}
      </div>

      {/* Voice Input Section */}
      <div ref={micSectionRef} className="bg-white/80 border border-blue-100 card max-w-2xl mx-auto mb-12 rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {getHomepageTranslation(language, 'inputSection', 'title')}
            </h2>
            <p className="text-gray-600">
              {getHomepageTranslation(language, 'inputSection', 'subtitle')}
            </p>
          </div>

          {/* Input Method Toggle */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setInputMethod('voice')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${inputMethod === 'voice'
                ? 'bg-cyan-100 text-cyan-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <Mic size={20} />
              <span>
                {getHomepageTranslation(language, 'inputSection', 'voiceButton')}
              </span>
            </button>
            <button
              onClick={() => setInputMethod('text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${inputMethod === 'text'
                ? 'bg-cyan-100 text-cyan-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              <MessageSquare size={20} />
              <span>
                {getHomepageTranslation(language, 'inputSection', 'textButton')}
              </span>
            </button>
          </div>

          {/* Input Field */}
          {inputMethod === 'voice' ? (
            <div className="text-center space-y-4">
              <button
                onClick={handleStartQuery}
                disabled={isProcessing}
                className={`microphone-btn ${isListening ? 'recording' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300 hover:scale-105 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-lg`}
              >
                {isProcessing ? <Loader2 className="animate-spin" size={32} /> : (isListening ? <MicOff size={32} /> : <Mic size={32} />)}
              </button>
              <p className="text-lg font-medium text-gray-700">
                {isProcessing ? (
                  getHomepageTranslation(language, 'voiceInput', 'processing')
                ) : isListening ? (
                  getHomepageTranslation(language, 'inputSection', 'listeningSpeak')
                ) : (
                  getHomepageTranslation(language, 'voiceInput', 'clickToStart')
                )}
              </p>
              {/* Real-time transcript display */}
              {(transcript || interimTranscript) && (
                <div className="bg-gray-50 rounded-lg p-4 min-h-[80px] animate-fade-in">
                  {transcript && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-500 mb-1">
                        {getHomepageTranslation(language, 'voiceInput', 'finalTranscript')}
                      </p>
                      <p className="text-gray-700 font-medium">{transcript}</p>
                    </div>
                  )}
                  {interimTranscript && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        {getHomepageTranslation(language, 'inputSection', 'listening')}
                      </p>
                      <p className="text-gray-600 italic">{interimTranscript}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={getHomepageTranslation(language, 'inputSection', 'textPlaceholder')}
                className="input-field h-32 resize-none bg-white/80 border border-blue-200 rounded-xl shadow focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white btn-primary w-full rounded-full py-3 text-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="animate-spin" size={20} />
                    <span>
                      {getHomepageTranslation(language, 'voiceInput', 'processingQuery')}
                    </span>
                  </div>
                ) : (
                  getHomepageTranslation(language, 'voiceInput', 'askQuestion')
                )}
              </button>
            </form>
          )}

          <div className="text-sm text-gray-500 text-center mt-2">
            {getHomepageTranslation(language, 'voiceInput', 'tryAsking')}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 