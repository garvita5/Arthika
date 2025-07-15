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

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
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
  isProcessing,
  processQuery
}) => {
  const location = useLocation();
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const sidebarWidthCollapsed = 80; // px
  const sidebarWidthExpanded = 256; // px (w-64)

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
        className="fixed top-6 left-6 z-40 h-[90vh] flex flex-col items-center bg-white shadow-xl rounded-3xl transition-all duration-300"
        style={{
          width: sidebarHovered ? sidebarWidthExpanded : sidebarWidthCollapsed,
          transition: 'width 0.3s cubic-bezier(.4,0,.2,1)'
        }}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Logo always visible */}
        <div className="flex items-center justify-center mt-6 mb-8">
          <img src={logo} alt="Arthika Logo" className="w-12 h-12 object-contain" />
        </div>
        {/* Nav Items */}
        <nav className="flex flex-col gap-2 flex-1 w-full items-center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 my-1 ${isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'}`}
                style={{ minWidth: 0 }}
              >
                <Icon size={24} />
                <span
                  className={`ml-3 whitespace-nowrap font-medium text-base transition-all duration-200 ${!sidebarHovered ? 'opacity-0 ml-0 pointer-events-none' : 'opacity-100 ml-3 pointer-events-auto'}`}
                  style={{ minWidth: !sidebarHovered ? 0 : 80, maxWidth: !sidebarHovered ? 0 : 200 }}
                >
                  <TranslatedText language={language}>{item.label}</TranslatedText>
                </span>
              </Link>
            );
          })}
          <div className="flex-1" />
          <Link to="/about" className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:text-primary-700 hover:bg-primary-50 mb-4">
            <Info size={24} />
            <span className={`ml-3 whitespace-nowrap font-medium text-base transition-all duration-200 ${!sidebarHovered ? 'opacity-0 ml-0 pointer-events-none' : 'opacity-100 ml-3 pointer-events-auto'}`}>About</span>
          </Link>
        </nav>
      </aside>
      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: sidebarHovered ? sidebarWidthExpanded + 32 : sidebarWidthCollapsed + 32, transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)' }}
      >
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow-sm border border-gray-200 rounded-2xl px-8 py-4 sticky top-4 z-30 mx-4 mt-4" style={{ boxShadow: '0 2px 12px 0 rgba(16, 30, 54, 0.06)' }}>
          <div className="flex items-center gap-3 min-w-[56px]">
            {/* Logo in navbar, small */}
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <img src={logo} alt="Arthika Logo" className="w-8 h-8 object-contain" />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-auto flex-shrink-0">
            <button
              onClick={handleVoiceQuery}
              disabled={isProcessing}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-base font-semibold transition-colors duration-200 shadow-sm ${isListening ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <MessageSquare size={20} />
              <span>
                <TranslatedText language={language}>
                  {isListening ? 'Listening...' : 'Voice Query'}
                </TranslatedText>
              </span>
            </button>
            <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />
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
        </header>
        {/* Main Content */}
        <main className="flex-1 px-4 md:px-8 py-8 max-w-4xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 