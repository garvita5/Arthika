import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Home,
  MessageSquare,
  TrendingUp,
  Shield,
  FileText,
  Download,
  Users,
  LogOut,
  Mic
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TranslatedText from './TranslatedText';
import logo from '../assets/arthika-logo.png';

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/query', label: 'Query Result', icon: MessageSquare },
  { path: '/roadmap', label: 'Roadmap', icon: TrendingUp },
  { path: '/score', label: 'Trust Score', icon: Shield },
  { path: '/schemes', label: 'Schemes', icon: FileText },
  { path: '/export', label: 'Export', icon: Download },
  { path: '/ngos', label: 'NGO Access', icon: Users },
];

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
  const [sidebarHovered, setSidebarHovered] = useState(false);

  const handleVoiceQuery = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Floating Sidebar */}
      <aside
        className={`fixed top-8 left-6 z-40 flex flex-col items-center bg-white shadow-xl rounded-3xl py-4 px-2 transition-all duration-300 ${sidebarHovered ? 'w-48' : 'w-16'} group`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
        onFocus={() => setSidebarHovered(true)}
        onBlur={() => setSidebarHovered(false)}
        tabIndex={0}
        aria-label="Main navigation"
      >
        {/* Sidebar Logo (always show logo image) */}
        <div className="flex items-center justify-center mb-4 w-full">
          <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${sidebarHovered ? '' : ''}`}>
            <img src={logo} alt="Arthika Logo" className="w-10 h-10 object-contain" />
          </div>
        </div>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 my-2 px-2 py-3 rounded-xl transition-colors w-full ${
                isActive
                  ? 'bg-cyan-100 text-cyan-700 shadow'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-cyan-50'
              }`}
              tabIndex={0}
            >
              <Icon size={24} />
              <span
                className={`whitespace-nowrap font-medium text-base transition-all duration-200 \
                  ${sidebarHovered ? 'opacity-100 ml-2 pointer-events-auto' : 'opacity-0 ml-0 pointer-events-none'}
                `}
                style={{ minWidth: sidebarHovered ? '80px' : '0', maxWidth: sidebarHovered ? '200px' : '0' }}
              >
                <TranslatedText language={language}>{item.label}</TranslatedText>
              </span>
            </Link>
          );
        })}
      </aside>
      {/* Main Content Area with Top Navbar */}
      <div className="flex-1 flex flex-col min-h-screen ml-0 md:ml-24">
        {/* Top Navbar */}
        <header className="w-full flex items-center justify-between bg-white/80 shadow-md rounded-b-3xl px-4 py-3 mt-4 mb-8 ml-0 md:ml-24 max-w-5xl mx-auto">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-3 min-w-[56px]">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
              <img src={logo} alt="Arthika Logo" className="w-14 h-14 object-contain" />
            </div>
            {/* Remove 'Arthika' text, only show tagline */}
            <span className="text-sm text-cyan-700 font-semibold tracking-wide ml-1">StoriesThatThink. AdviceThatFits</span>
          </div>
          {/* Right side controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Voice Query Button */}
            <button
              onClick={handleVoiceQuery}
              disabled={isProcessing}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-base font-medium transition-colors shadow ${
                isListening
                  ? 'bg-red-100 text-red-700 animate-pulse'
                  : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Mic size={20} />
              <span>
                <TranslatedText language={language}>
                  {isListening ? 'Listening...' : 'Voice Query'}
                </TranslatedText>
              </span>
            </button>
            {/* Language Selector */}
            <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
            {/* Log Out Button */}
            <button
              onClick={() => {
                localStorage.removeItem('arthikaUser');
                window.location.reload();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-base font-medium bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors shadow"
            >
              <LogOut size={20} />
              <span>
                <TranslatedText language={language}>Log Out</TranslatedText>
              </span>
            </button>
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
        <main className="flex-1 px-4 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 