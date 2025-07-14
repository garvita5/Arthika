import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, MessageSquare, ChevronDown, Play, Volume2, Phone, Users, Shield, Info, TrendingUp, FileText, Download, Loader2 } from 'lucide-react';
import TranslatedText from '../components/TranslatedText';

import logo from '../assets/arthika-logo.png';

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

  // Handler for preset command tiles
  const handlePresetCommand = async (presetText) => {
    setLoadingPreset(true);
    try {
      resetQueryResult(); // Clear previous result
      const response = await apiService.submitFinancialQuery(presetText, language, userId);
      console.log('API response from /api/query:', response);
      if (response && response.data) {
        setQueryResult(response.data); // Set new result in context
        console.log('Set new query result in context:', response.data);
        const normalizedQuestion = presetText.trim().toLowerCase();
        setTimeout(() => navigate(`/query?question=${encodeURIComponent(normalizedQuestion)}`), 50);
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
      <div className="gradient-bg rounded-3xl shadow-xl p-10 md:p-20 text-center space-y-10 mb-16 animate-fade-in">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md mb-2">
            <img src={logo} alt="Arthika Logo" className="w-20 h-20 object-contain" />
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight tracking-tight" style={{letterSpacing: '-0.5px'}}>
            <TranslatedText language={language}>
              Understand your money in your language
            </TranslatedText>
          </h1>
          <p className="teimport React, { useState } from 'react';
import { Mic, MicOff, MessageSquare, ChevronDown, Play, Volume2, Phone, Users, Shield, Info } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TranslatedText from './TranslatedText';

function HomePage({ 
  language, 
  onLanguageChange, 
  onStartQuery, 
  isListening, 
  startListening, 
  stopListening,
  transcript,
  interimTranscript,
  isProcessing
}) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [inputMethod, setInputMethod] = useState('voice'); // 'voice' or 'text'
  const [textInput, setTextInput] = useState('');

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

  // Sample recent query for preview
  const recentQuery = {
    question: 'What if I take a ₹50,000 gold loan?',
    answer: 'You may lose ₹20,000 if you delay repayments. Here\'s a safer option with lower interest rates and flexible terms.',
    riskScore: 65,
    saferOption: 'Personal Loan'
  };

  const handleStartQuery = () => {
    if (isProcessing) return; // Prevent multiple calls while processing
    
    if (inputMethod === 'voice') {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    } else {
      // Handle text input
      if (textInput.trim()) {
        onStartQuery(textInput);
      }
    }
  };

  const displayText = transcript || interimTranscript;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
                <img src={require('../assets/arthika-logo.png')} alt="Arthika Logo" className="w-14 h-14 object-contain" />
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 ml-2">Arthika</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              onClick={handleStartQuery}
              className="btn-primary text-lg px-8 py-4"
            >
              <TranslatedText language={language}>
                Start a Query
              </TranslatedText>
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
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
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

        {/* Top Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            {
              icon: <svg className="w-12 h-12 mx-auto mb-3 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8" /></svg>,
              title: 'View Roadmap',
              desc: 'See your financial journey',
            },
            {
              icon: <svg className="w-12 h-12 mx-auto mb-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>,
              title: 'Trust Score',
              desc: 'Check your financial health',
            },
            {
              icon: <svg className="w-12 h-12 mx-auto mb-3 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4" /><path d="M8 3v4" /></svg>,
              title: 'Government Schemes',
              desc: 'Find available benefits',
            },
            {
              icon: <svg className="w-12 h-12 mx-auto mb-3 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v-6" /><path d="M7 12h10" /><path d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
              title: 'Export Plan',
              desc: 'Download your financial plan',
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-blue-100"
              style={{ minHeight: '220px' }}
            >
              {item.icon}
              <h3 className="text-xl font-bold text-gray-900 mb-1 text-center">{item.title}</h3>
              <p className="text-gray-500 text-base text-center">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Use Case Tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white/80 backdrop-blur-md shadow-xl p-8 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-blue-100"
              style={{ minHeight: '220px' }}
            >
              <div className="text-5xl mb-4 drop-shadow-sm">{useCase.icon}</div>
              <h3 className="font-bold text-lg text-gray-900 mb-1 text-center">
                <TranslatedText language={language}>{useCase.title}</TranslatedText>
              </h3>
              <p className="text-gray-500 text-base text-center">
                <TranslatedText language={language}>{useCase.description}</TranslatedText>
              </p>
            </div>
          ))}
        </div>

        {/* Results Preview Box */}
        <div className="card max-w-4xl mx-auto mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              <TranslatedText language={language}>
                See How It Works
              </TranslatedText>
            </h2>
            <p className="text-gray-600">
              <TranslatedText language={language}>
                Here's what you'll get
              </TranslatedText>
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Question */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">?</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-600 font-medium mb-1">
                    <TranslatedText language={language}>
                      You asked:
                    </TranslatedText>
                  </p>
                  <p className="text-gray-800">
                    <TranslatedText language={language}>
                      {recentQuery.question}
                    </TranslatedText>
                  </p>
                </div>
              </div>
            </div>

            {/* Answer */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">₹</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-green-600 font-medium mb-1">
                    <TranslatedText language={language}>
                      Arthika says:
                    </TranslatedText>
                  </p>
                  <p className="text-gray-800 mb-3">
                    <TranslatedText language={language}>
                      {recentQuery.answer}
                    </TranslatedText>
                  </p>
                  
                  {/* Risk Score */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        <TranslatedText language={language}>
                          Risk Score:
                        </TranslatedText> {recentQuery.riskScore}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">
                        <TranslatedText language={language}>
                          Safer Option:
                        </TranslatedText> {recentQuery.saferOption}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="card max-w-2xl mx-auto mb-12">
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
                  className={`microphone-btn ${isListening ? 'recording' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                  <div className="bg-gray-50 rounded-lg p-4 min-h-[80px]">
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
              <div className="space-y-4">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="input-field h-32 resize-none"
                />
                <button
                  onClick={handleStartQuery}
                  disabled={!textInput.trim()}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TranslatedText language={language}>
                    Ask Question
                  </TranslatedText>
                </button>
              </div>
            )}

            <div className="text-sm text-gray-500 text-center">
              <TranslatedText language={language}>
                Try asking: "What if I take a gold loan?" or "How should I invest my money?"
              </TranslatedText>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₹</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">Arthika</h3>
              </div>
              
              <p className="text-gray-600 text-sm">
                <TranslatedText language={language}>
                  Also available via phone call (IVR) or in local centers
                </TranslatedText>
              </p>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone size={16} />
                  <span>
                    <TranslatedText language={language}>
                      Call: 1800-ARTHIKA
                    </TranslatedText>
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users size={16} />
                  <span>
                    <TranslatedText language={language}>
                      Local Centers
                    </TranslatedText>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Shield size={16} />
                  <span>
                    <TranslatedText language={language}>
                      Privacy
                    </TranslatedText>
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Info size={16} />
                  <span>
                    <TranslatedText language={language}>
                      About
                    </TranslatedText>
                  </span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Users size={16} />
                  <span>
                    <TranslatedText language={language}>
                      NGO Access
                    </TranslatedText>
                  </span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  <TranslatedText language={language}>
                    Language:
                  </TranslatedText>
                </span>
                <LanguageSelector 
                  currentLanguage={language} 
                  onLanguageChange={onLanguageChange} 
                />
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © 2024 Arthika. <TranslatedText language={language}>All rights reserved.</TranslatedText>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage; xt-2xl md:text-3xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <TranslatedText language={language}>
              Get clear, simple advice on loans, savings, and more — no jargon, just stories.
            </TranslatedText>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
          <button
            onClick={handleStartQuery}
            className="btn-primary text-xl px-10 py-5 shadow-lg"
          >
            <TranslatedText language={language}>
              Start a Query
            </TranslatedText>
          </button>
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="btn-secondary text-xl px-10 py-5 shadow"
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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {useCases.map((useCase, index) => (
<<<<<<< nandini-ui/ux
          <div key={index} className="card animate-slide-in cursor-pointer hover:shadow-2xl transition-all duration-300">
            <div className="text-center space-y-6">
              <div className="text-5xl mb-4">{useCase.icon}</div>
              <h3 className="font-semibold text-xl text-gray-800">
=======
          <div key={index} className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => handlePresetCommand(useCase.title + (useCase.description ? (': ' + useCase.description) : ''))}
            style={{ opacity: loadingPreset ? 0.6 : 1, pointerEvents: loadingPreset ? 'none' : 'auto' }}
          >
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">{useCase.icon}</div>
              <h3 className="font-semibold text-lg text-gray-900">
>>>>>>> main
                <TranslatedText language={language}>
                  {useCase.title}
                </TranslatedText>
              </h3>
              <p className="text-gray-500 text-base">
                <TranslatedText language={language}>
                  {useCase.description}
                </TranslatedText>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Voice Input Section */}
      <div ref={micSectionRef} className="card max-w-2xl mx-auto mb-16 animate-fade-in">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight" style={{letterSpacing: '-0.5px'}}>
              <TranslatedText language={language}>
                Ask Your Question
              </TranslatedText>
            </h2>
            <p className="text-gray-500 text-lg">
              <TranslatedText language={language}>
                Choose how you want to ask your financial question
              </TranslatedText>
            </p>
          </div>

          {/* Input Method Toggle */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setInputMethod('voice')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors shadow-sm text-lg font-medium ${
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
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-colors shadow-sm text-lg font-medium ${
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
                className={`microphone-btn ${isListening ? 'recording' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''} transition-all duration-300 hover:scale-105`}
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
              
              {/* Voice tips removed as per user request */}
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your question here..."
                className="input-field h-32 resize-none text-lg"
                disabled={isProcessing}
              />
              <button
                onClick={handleStartQuery}
                disabled={!textInput.trim() || isProcessing}
                className="btn-primary w-full text-xl py-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>
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