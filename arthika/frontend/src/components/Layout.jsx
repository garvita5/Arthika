import React, { useState } from 'react';
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
  Info,
  Menu
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TranslatedText from './TranslatedText';
import logo from '../assets/logo.png';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div>
          <div className="flex items-center justify-between min-h-[8rem] w-full">
            {/* Logo only, large */}
            <div className="flex items-center flex-shrink-0" style={{minWidth: '0'}}>
              <div className="w-36 h-36 flex items-center justify-center" style={{background: 'transparent'}}>
                <img src={logo} alt="Arthika Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            {/* Right side controls */}
            <div className="flex items-center gap-4 ml-auto flex-shrink-0" style={{ alignSelf: 'center' }}>
              <button
                onClick={handleVoiceQuery}
                disabled={isProcessing}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-base font-semibold transition-colors duration-200 shadow-sm
                  ${isListening ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}
                  ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <MessageSquare size={20} />
                <span>
                  <TranslatedText language={language}>
                    {isListening ? 'Listening...' : 'Voice Query'}
                  </TranslatedText>
                </span>
              </button>

              <div className="flex items-center">
                <LanguageSelector 
                  currentLanguage={language} 
                  onLanguageChange={onLanguageChange} 
                />
              </div>


              {/* Language Selector */}
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={onLanguageChange} 
              />

              {/* Log Out Button */}
              <button
                onClick={() => {
                  localStorage.removeItem('arthikaUser');
                  window.location.reload();
                }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
                <span>
                  <TranslatedText language={language}>
                    Log Out
                  </TranslatedText>
                </span>
              </button>

            </div>
          </div>
        </div>
        {/* Sidebar Overlay (unchanged) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black opacity-30" onClick={() => setSidebarOpen(false)}></div>
            <aside className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 flex flex-col p-6">
              <div className="flex items-center justify-between mb-8">
                <img src={logo} alt="Arthika Logo" className="w-20 h-20 object-contain" />
                <button
                  className="p-2 rounded-md hover:bg-gray-100 focus:outline-none"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <nav className="flex flex-col gap-3">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200
                        ${isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon size={22} />
                      <span>
                        <TranslatedText language={language}>
                          {item.label}
                        </TranslatedText>
                      </span>
                    </Link>
                  );
                })}
                <Link to="/about" className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:text-primary-700 hover:bg-primary-50" onClick={() => setSidebarOpen(false)}>
                  <Info size={22} />
                  <span>
                    <TranslatedText language={language}>About</TranslatedText>
                  </span>
                </Link>
              </nav>
            </aside>
          </div>
        )}
      </header>
      {/* Fixed Menu Icon Button (top-left under header, all pages, hidden when sidebar is open) */}
      {!sidebarOpen && (
        <button
          className="fixed left-6 z-50 hover:bg-gray-100 focus:outline-none"
          style={{top: '9rem', background: 'transparent', padding: 0, border: 'none', boxShadow: 'none'}}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={32} />
        </button>
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
              <div className="flex items-center">
                <div className="w-20 h-20 flex items-center justify-center" style={{background: 'transparent'}}>
                  <img src={logo} alt="Arthika Logo" className="w-full h-full object-contain" />
                </div>
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
              © 2025 Arthika. <TranslatedText language={language}>All rights reserved.</TranslatedText>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;