import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, MessageSquare, ChevronDown, Play, Volume2, Phone, Users, Shield, Info, TrendingUp, FileText, Download, Loader2 } from 'lucide-react';
import TranslatedText from '../components/TranslatedText';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useQueryContext } from '../contexts/QueryContext';

function HomePage({ 
  language,
  isListening, 
  startListening, 
  stopListening,
  transcript,
  interimTranscript,
  isProcessing,
  processQuery
}) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [inputMethod, setInputMethod] = useState('voice');
  const [textInput, setTextInput] = useState('');
  const micSectionRef = useRef(null);
  const navigate = useNavigate();
  const [loadingPreset, setLoadingPreset] = useState(false);
  const { setQueryResult, resetQueryResult, userId } = useQueryContext();

  const useCases = [
    {
      icon: '💍',
      title: 'Gold Loan Decision',
      description: 'Will I lose my jewellery?'
    },
    {
      icon: '🏥',
      title: 'Medical Emergency',
      description: 'How do I pay hospital bills?'
    },
    {
      icon: '🎓',
      title: 'Saving for Education',
      description: 'Plan for child\'s fees'
    },
    {
      icon: '👩‍⚖️',
      title: 'Know Your Rights',
      description: 'What lenders can\'t do legally'
    }
  ];

  const quickActions = [
    {
      icon: TrendingUp,
      title: 'View Roadmap',
      description: 'See your financial journey',
      path: '/roadmap'
    },
    {
      icon: Shield,
      title: 'Trust Score',
      description: 'Check your financial health',
      path: '/score'
    },
    {
      icon: FileText,
      title: 'Government Schemes',
      description: 'Find available benefits',
      path: '/schemes'
    },
    {
      icon: Download,
      title: 'Export Plan',
      description: 'Download your financial plan',
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
      const response = await apiService.submitFinancialQuery(textInput, language, userId);
      if (response) {
        setQueryResult({ question: textInput, ...response });
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
      const response = await apiService.submitFinancialQuery(presetText, language, userId);
      if (response) {
        setQueryResult({ question: presetText, ...response }); // Store question + answer
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
      <div className="text-center space-y-8 mb-12">
        <div className="space-y-6 bg-gradient-to-br from-cyan-50 to-blue-100 rounded-3xl shadow-lg px-6 py-10 mx-auto max-w-3xl border border-blue-100">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight drop-shadow-sm">
            <TranslatedText language={language}>
              Understand your money in your language
            </TranslatedText>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <TranslatedText language={language}>
              Get clear, simple advice on loans, savings, and more — no jargon, just stories.
            </TranslatedText>
          </p>
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
              <TranslatedText language={language}>
                Start Voice Query
              </TranslatedText>
            </span>
          </button>
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="bg-white/80 border border-blue-200 text-blue-700 text-lg px-8 py-4 rounded-full shadow hover:bg-blue-50 transition-all duration-200"
          >
            <TranslatedText language={language}>
              How It Works
            </TranslatedText>
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      {showHowItWorks && (
        <div className="bg-white/80 rounded-2xl shadow-xl p-8 mb-12 animate-fade-in border border-blue-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            <TranslatedText language={language}>
              How Arthika Works
            </TranslatedText>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Mic className="text-cyan-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                <TranslatedText language={language}>
                  1. Ask Your Question
                </TranslatedText>
              </h3>
              <p className="text-gray-600">
                <TranslatedText language={language}>
                  Speak or type your financial question in your preferred language.
                </TranslatedText>
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Play className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                <TranslatedText language={language}>
                  2. Get AI Analysis
                </TranslatedText>
              </h3>
              <p className="text-gray-600">
                <TranslatedText language={language}>
                  Our AI provides personalized financial advice with clear explanations.
                </TranslatedText>
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow">
                <Volume2 className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                <TranslatedText language={language}>
                  3. View Your Roadmap
                </TranslatedText>
              </h3>
              <p className="text-gray-600">
                <TranslatedText language={language}>
                  See your financial roadmap with charts and actionable recommendations.
                </TranslatedText>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <a
              key={index}
              href={action.path}
              className="bg-gradient-to-br from-cyan-50 to-blue-100/70 backdrop-blur-md border border-blue-100 rounded-3xl p-8 flex flex-col items-center justify-between shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 group cursor-pointer min-w-[210px] min-h-[210px]"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-2xl flex items-center justify-center mb-6 shadow group-hover:from-cyan-300 group-hover:to-blue-300">
                <Icon className="text-cyan-600" size={36} />
                </div>
              <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  <TranslatedText language={language}>
                    {action.title}
                  </TranslatedText>
                </h3>
              <p className="text-gray-600 text-base">
                  <TranslatedText language={language}>
                    {action.description}
                  </TranslatedText>
                </p>
            </a>
          );
        })}
      </div>

      {/* Use Case Tiles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {useCases.map((useCase, index) => (
          <div key={index} className="bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-md border border-blue-100 rounded-3xl p-8 flex flex-col items-center justify-between shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 cursor-pointer min-w-[210px] min-h-[210px]"
            onClick={() => handlePresetCommand(useCase.title + (useCase.description ? (': ' + useCase.description) : ''))}
            style={{ opacity: loadingPreset ? 0.6 : 1, pointerEvents: loadingPreset ? 'none' : 'auto' }}
          >
            <div className="text-6xl mb-6 drop-shadow-sm">{useCase.icon}</div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">
                <TranslatedText language={language}>
                  {useCase.title}
                </TranslatedText>
              </h3>
            <p className="text-gray-600 text-base">
                <TranslatedText language={language}>
                  {useCase.description}
                </TranslatedText>
              </p>
          </div>
        ))}
      </div>

      {/* Voice Input Section */}
      <div ref={micSectionRef} className="bg-white/80 border border-blue-100 card max-w-2xl mx-auto mb-12 rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <TranslatedText language={language}>
                Ask Your Question
              </TranslatedText>
            </h2>
            <p className="text-gray-600">
              <TranslatedText language={language}>
                Choose how you want to ask your financial question
              </TranslatedText>
            </p>
          </div>

          {/* Input Method Toggle */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setInputMethod('voice')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                inputMethod === 'voice' 
                  ? 'bg-cyan-100 text-cyan-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mic size={20} />
              <span>
                <TranslatedText language={language}>
                  Voice
                </TranslatedText>
              </span>
            </button>
            <button
              onClick={() => setInputMethod('text')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                inputMethod === 'text' 
                  ? 'bg-cyan-100 text-cyan-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MessageSquare size={20} />
              <span>
                <TranslatedText language={language}>
                  Text
                </TranslatedText>
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
                  <TranslatedText language={language}>
                    Processing your question...
                  </TranslatedText>
                ) : isListening ? (
                  <TranslatedText language={language}>
                    Listening... Speak now!
                  </TranslatedText>
                ) : (
                  <TranslatedText language={language}>
                    Click to start speaking
                  </TranslatedText>
                )}
              </p>
              {/* Real-time transcript display */}
              {(transcript || interimTranscript) && (
                <div className="bg-gray-50 rounded-lg p-4 min-h-[80px] animate-fade-in">
                  {transcript && (
                    <div className="mb-2">
                      <p className="text-sm text-gray-500 mb-1">
                        <TranslatedText language={language}>
                          Final transcript:
                        </TranslatedText>
                      </p>
                      <p className="text-gray-700 font-medium">{transcript}</p>
                    </div>
                  )}
                  {interimTranscript && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        <TranslatedText language={language}>
                          Listening...
                        </TranslatedText>
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
                placeholder="Type your question here..."
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
                      <TranslatedText language={language}>
                        Processing your query...
                      </TranslatedText>
                    </span>
                  </div>
                ) : (
                <TranslatedText language={language}>
                  Ask Question
                </TranslatedText>
                )}
              </button>
            </form>
          )}

          <div className="text-sm text-gray-500 text-center mt-2">
            <TranslatedText language={language}>
              Try asking: "What if I take a gold loan?" or "How should I invest my money?"
            </TranslatedText>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage; 