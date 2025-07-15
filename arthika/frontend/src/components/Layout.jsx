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
  Menu,
  X
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TranslatedText from './TranslatedText';
import rupeeLogo from '../assets/rupee1.png';

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
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile
  const sidebarWidthCollapsed = 80; // px
  const sidebarWidthExpanded = 256; // px (w-64)

  const handleVoiceQuery = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Responsive sidebar: overlay on mobile, fixed on desktop
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Floating Sidebar - Desktop & Tablet */}
      <aside
        className={`hidden md:flex fixed top-6 left-6 z-40 h-[90vh] flex-col items-center bg-white shadow-xl rounded-3xl transition-all duration-300 ${sidebarHovered ? '' : ''}`}
        style={{
          width: sidebarHovered ? sidebarWidthExpanded : sidebarWidthCollapsed,
          transition: 'width 0.3s cubic-bezier(.4,0,.2,1)'
        }}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Logo always visible */}
        <div className={`flex items-center mt-6 mb-8 transition-all duration-300 ${sidebarHovered ? 'justify-start px-6' : 'justify-center'}`} style={{ minHeight: 48 }}>
          <img src={rupeeLogo} alt="Arthika Logo" className="w-16 h-16 object-contain" />
          {sidebarHovered && (
            <span className="ml-3 text-xl font-bold text-gray-900 transition-opacity duration-300 opacity-100">Arthika</span>
          )}
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
          <Link to="/about" className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:text-primary-700 hover:bg-primary-50 mb-4">
            <Info size={24} />
            <span className={`ml-3 whitespace-nowrap font-medium text-base transition-all duration-200 ${!sidebarHovered ? 'opacity-0 ml-0 pointer-events-none' : 'opacity-100 ml-3 pointer-events-auto'}`}>About</span>
          </Link>
            </nav>
      </aside>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl rounded-r-3xl flex flex-col items-center transition-transform duration-300 md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)' }}
      >
        <div className="flex items-center mt-8 mb-8 px-6 w-full">
          <img src={rupeeLogo} alt="Arthika Logo" className="w-16 h-16 object-contain" />
          <span className="ml-3 text-xl font-bold text-gray-900">Arthika</span>
          <button className="ml-auto p-2" onClick={() => setSidebarOpen(false)}>
            <X size={28} />
              </button>
            </div>
        <nav className="flex flex-col gap-2 flex-1 w-full items-center">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 my-1 ${isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'}`}
                onClick={() => setSidebarOpen(false)}
                    >
                <Icon size={24} />
                <span className="ml-3 whitespace-nowrap font-medium text-base">{item.label}</span>
                    </Link>
                  );
                })}
          <Link to="/about" className="flex items-center w-full px-4 py-3 rounded-xl text-gray-700 hover:text-primary-700 hover:bg-primary-50 mb-4" onClick={() => setSidebarOpen(false)}>
            <Info size={24} />
            <span className="ml-3 whitespace-nowrap font-medium text-base">About</span>
          </Link>
        </nav>
      </aside>
      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: '0', transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)' }}
      >
        {/* Navbar */}
        <header className="flex flex-wrap items-center justify-between bg-white shadow-sm border border-gray-200 rounded-2xl px-4 sm:px-6 md:px-8 py-2 sticky top-4 z-30 mx-2 sm:mx-4 mt-2
          max-w-full md:max-w-[calc(100vw-320px)] md:ml-[112px] lg:ml-[128px] xl:ml-[144px] 2xl:ml-[160px]">
          <div className="flex items-center gap-3 min-w-[56px]">
            <button className="md:hidden mr-2 p-2" onClick={() => setSidebarOpen(true)}>
              <Menu size={28} />
            </button>
            <img src={rupeeLogo} alt="Arthika Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
            <div className="flex flex-col ml-2">
              <span className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">Arthika</span>
              <span className="text-xs sm:text-xs font-semibold text-cyan-600 tracking-wide mt-0.5" style={{ letterSpacing: '0.04em' }}>StoriesThatThink. AdviceThatFits.</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 ml-auto flex-shrink-0 mt-4 sm:mt-0">
            <button
              onClick={handleVoiceQuery}
              disabled={isProcessing}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-base font-semibold transition-colors duration-200 shadow-sm ${isListening ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
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
        <main className="flex-1 px-2 sm:px-4 md:px-8 py-8 max-w-4xl mx-auto w-full">
          {children}
        </main>
        </div>
    </div>
  );
};

export default Layout; 