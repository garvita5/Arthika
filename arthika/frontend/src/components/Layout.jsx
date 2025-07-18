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
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Footer from './Footer';

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/all-queries', label: 'All Queries', icon: MessageSquare },
  { path: '/schemes', label: 'Schemes', icon: FileText },
  { path: '/ngos', label: 'NGO Access', icon: Users },
  { path: '/export', label: 'Export', icon: Download },

  { path: '/roadmap', label: 'Roadmap', icon: TrendingUp },
  { path: '/score', label: 'Trust Score', icon: Shield },
  // About removed from sidebar
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
  const sidebarWidthCollapsed = 52; // px (was 65)
  const sidebarWidthExpanded = 170; // px (was 220)

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
        className={`hidden lg:flex fixed mt-24 left-6 z-40 h-[57vh] flex-col items-center bg-gradient-to-b from-white via-blue-50 to-blue-100 border border-blue-200 shadow-2xl rounded-3xl backdrop-blur-lg bg-opacity-80 transition-all duration-300 overflow-hidden ${sidebarHovered ? '' : ''}`}
        style={{
          width: sidebarHovered ? sidebarWidthExpanded : sidebarWidthCollapsed,
          transition: 'width 0.3s cubic-bezier(.4,0,.2,1)',
          height: '57vh',
        }}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        {/* Nav Items */}
        <nav className="flex flex-col gap-1 flex-1 w-full items-center pt-2 pb-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center w-full px-2 py-2 rounded-full transition-all duration-200 my-0.5 ${isActive ? 'bg-white/80 text-primary-700 shadow-lg ring-2 ring-blue-200' : 'text-gray-700 hover:text-primary-700 hover:bg-white/60 hover:shadow-md'} ${!sidebarHovered ? 'justify-center' : ''}`}
                style={{ minWidth: 0 }}
              >
                <span className={`${!sidebarHovered ? 'mx-auto' : ''}`}><Icon size={22} /></span>
                <span
                  className={`ml-3 whitespace-nowrap font-medium text-sm transition-all duration-200 ${!sidebarHovered ? 'opacity-0 ml-0 pointer-events-none' : 'opacity-100 ml-3 pointer-events-auto'}`}
                  style={{ minWidth: !sidebarHovered ? 0 : 70, maxWidth: !sidebarHovered ? 0 : 140 }}
                >
                  <TranslatedText language={language}>{item.label}</TranslatedText>
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
      {/* Sidebar Overlay for md and below (iPad Mini, Air, and smaller) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl rounded-r-3xl flex flex-col items-center transition-transform duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)' }}
      >
        <div className="flex items-center justify-end mt-8 mb-8 px-6 w-full">
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
        </nav>
        {/* Logout button for mobile/tablet sidebar */}
        <button
          onClick={() => {
            localStorage.removeItem('arthikaUser');
            window.location.reload();
          }}
          className="flex items-center space-x-2 px-4 py-3 rounded-lg text-base font-medium bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors w-11/12 mb-8 mt-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
          <span><TranslatedText language={language}>Log Out</TranslatedText></span>
        </button>
      </aside>
      {/* Main Content Area */}
      <div
        className="flex-1 flex flex-col min-h-screen"
        style={{ marginLeft: '0', transition: 'margin-left 0.3s cubic-bezier(.4,0,.2,1)' }}
      >
        {/* Navbar */}
        <header className="flex flex-wrap items-center justify-between bg-white shadow-sm border border-gray-200 rounded-2xl px-4 sm:px-6 md:px-8 py-2 z-30 mx-2 sm:mx-4 mt-7
          max-w-full lg:max-w-[calc(100vw-320px)] lg:ml-[128px] xl:ml-[144px] 2xl:ml-[160px]">
          <div className="flex items-center gap-3 min-w-[56px]">
            <button className="lg:hidden mr-2 p-2" onClick={() => setSidebarOpen(true)}>
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
            {/* Logout button only for lg and up */}
            <button
              onClick={() => {
                localStorage.removeItem('arthikaUser');
                window.location.reload();
              }}
              className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700 transition-colors"
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
        <main className="flex-1 px-2 sm:px-4 md:px-8 py-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 