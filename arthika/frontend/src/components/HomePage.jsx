import React, { useState } from 'react';
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
  error
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Arthika</h1>
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

        {/* Use Case Tiles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <div key={index} className="card hover:shadow-xl transition-shadow cursor-pointer">
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
                  className={`microphone-btn ${isListening ? 'recording' : ''}`}
                >
                  {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                </button>
                <p className="text-lg font-medium text-gray-700">
                  {isListening 
                    ? (
                      <TranslatedText language={language}>
                        Listening... Speak now!
                      </TranslatedText>
                    )
                    : (
                      <TranslatedText language={language}>
                        Click to start speaking
                      </TranslatedText>
                    )
                  }
                </p>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-medium">Error:</p>
                    <p className="text-red-700 mt-2">{error}</p>
                  </div>
                )}
                
                {transcript && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 font-medium">You said:</p>
                    <p className="text-gray-700 mt-2">{transcript}</p>
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

export default HomePage; 