import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, MessageSquare, ChevronDown, Play, Volume2, Phone, Users, Shield, Info, TrendingUp, FileText, Download } from 'lucide-react';
import TranslatedText from '../components/TranslatedText';

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
        processQuery(textInput);
      }
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      processQuery(textInput);
    }
  };

  const displayText = transcript || interimTranscript;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-8 mb-12">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            <TranslatedText language={language}>
              Understand your money in your language
            </TranslatedText>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <TranslatedText language={language}>
              Get clear, simple advice on loans, savings, and more — no jargon, just stories.
            </TranslatedText>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setInputMethod('voice');
              startListening();
              micSectionRef.current?.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              });
            }}
            className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
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
            className="btn-secondary text-lg px-8 py-4"
          >
            <TranslatedText language={language}>
              How It Works
            </TranslatedText>
          </button>
        </div>
      </div>

      {/* How It Works Section */}
      {showHowItWorks && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            <TranslatedText language={language}>
              How Arthika Works
            </TranslatedText>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="text-primary-600" size={24} />
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
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="text-success-600" size={24} />
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
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <a
              key={index}
              href={action.path}
              className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <Icon className="text-primary-600" size={24} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  <TranslatedText language={language}>
                    {action.title}
                  </TranslatedText>
                </h3>
                <p className="text-gray-600 text-sm">
                  <TranslatedText language={language}>
                    {action.description}
                  </TranslatedText>
                </p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Use Case Tiles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {useCases.map((useCase, index) => (
          <div key={index} className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900">
                <TranslatedText language={language}>
                  {useCase.title}
                </TranslatedText>
              </h3>
              <p className="text-gray-600 text-sm">
                <TranslatedText language={language}>
                  {useCase.description}
                </TranslatedText>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Voice Input Section */}
      <div ref={micSectionRef} className="card max-w-2xl mx-auto mb-12">
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
                  ? 'bg-primary-100 text-primary-700' 
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
                  ? 'bg-primary-100 text-primary-700' 
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
                className={`microphone-btn ${isListening ? 'recording' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300 hover:scale-105`}
              >
                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
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
              
              {/* Voice tips */}
              {!transcript && !isListening && (
                <div className="text-sm text-gray-500 space-y-1">
                  <p>
                    <TranslatedText language={language}>
                      💡 Try saying:
                    </TranslatedText>
                  </p>
                  <p className="text-gray-600">
                    "What if I take a gold loan?"
                  </p>
                  <p className="text-gray-600">
                    "How should I invest my money?"
                  </p>
                  <p className="text-gray-600">
                    "Best savings account for high returns?"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleTextSubmit} className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your question here..."
                className="input-field h-32 resize-none"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TranslatedText language={language}>
                  Ask Question
                </TranslatedText>
              </button>
            </form>
          )}

          <div className="text-sm text-gray-500 text-center">
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