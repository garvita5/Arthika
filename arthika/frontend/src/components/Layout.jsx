import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  FileText, 
  Download, 
  Users,
  Phone,
  Info
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TranslatedText from './TranslatedText';

const Layout = ({ 
  children, 
  language, 
  onLanguageChange,
  isListening,
  startListening,
  stopListening,
  transcript,
  interimTranscript,
  isProcessing,
  processQuery
}) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/query', label: 'Query Result', icon: MessageSquare },
    { path: '/roadmap', label: 'Roadmap', icon: TrendingUp },
    { path: '/score', label: 'Trust Score', icon: Shield },
    { path: '/schemes', label: 'Schemes', icon: FileText },
    { path: '/export', label: 'Export', icon: Download },
    { path: '/ngos', label: 'NGO Access', icon: Users },
  ];

  const handleVoiceQuery = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">₹</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Arthika</h1>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>
                      <TranslatedText language={language}>
                        {item.label}
                      </TranslatedText>
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Voice Query Button */}
              <button
                onClick={handleVoiceQuery}
                disabled={isProcessing}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isListening
                    ? 'bg-red-100 text-red-700 animate-pulse'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <MessageSquare size={16} />
                <span>
                  <TranslatedText language={language}>
                    {isListening ? 'Listening...' : 'Voice Query'}
                  </TranslatedText>
                </span>
              </button>

              {/* Language Selector */}
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden py-2 border-t">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1 overflow-x-auto">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={12} />
                      <span>
                        <TranslatedText language={language}>
                          {item.label}
                        </TranslatedText>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Voice Status Bar */}
      {(isListening || transcript || interimTranscript) && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-sm text-gray-700">
                <TranslatedText language={language}>
                  {isListening ? 'Listening...' : 'Processing...'}
                </TranslatedText>
              </span>
            </div>
            
            {transcript && (
              <div className="text-sm text-gray-600 max-w-md truncate">
                "{transcript}"
              </div>
            )}
            
            {interimTranscript && !transcript && (
              <div className="text-sm text-gray-500 max-w-md truncate italic">
                "{interimTranscript}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
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
                <Link to="/schemes" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <FileText size={16} />
                  <span>
                    <TranslatedText language={language}>
                      Schemes
                    </TranslatedText>
                  </span>
                </Link>
                <Link to="/score" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Shield size={16} />
                  <span>
                    <TranslatedText language={language}>
                      Trust Score
                    </TranslatedText>
                  </span>
                </Link>
                <Link to="/ngos" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Users size={16} />
                  <span>
                    <TranslatedText language={language}>
                      NGO Access
                    </TranslatedText>
                  </span>
                </Link>
                <Link to="/about" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <Info size={16} />
                  <span>
                    <TranslatedText language={language}>
                      About
                    </TranslatedText>
                  </span>
                </Link>
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
};

export default Layout; 