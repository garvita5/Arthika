import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { TranslationProvider } from './contexts/TranslationContext';
import { QueryProvider } from './contexts/QueryContext';

// Import pages
import HomePage from './pages/HomePage';
import QueryResultPage from './pages/QueryResultPage';
import RoadmapPage from './pages/RoadmapPage';
import TrustScorePage from './pages/TrustScorePage';
import SchemesPage from './pages/SchemesPage';
import ExportPage from './pages/ExportPage';
import NGOPage from './pages/NGOPage';
import AboutPage from './pages/AboutPage';
import AnswerPage from './pages/AnswerPage';
import AllQueriesPage from './pages/AllQueriesPage';

// Import components
import Layout from './components/Layout';
import { useVoiceFlow } from './hooks/useVoiceFlow';
import AuthForm from './components/AuthForm';

function AppContent() {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <TranslationProvider language={language}>
      <AppWithVoiceFlow 
        language={language}
        onLanguageChange={handleLanguageChange}
        navigate={navigate}
      />
    </TranslationProvider>
  );
}

function AppWithVoiceFlow({ language, onLanguageChange, navigate }) {
  const { 
    isListening, 
    transcript, 
    interimTranscript, 
    startListening, 
    stopListening,
    isProcessing,
    processQuery,
    aiResponse,
    roadmapData,
    trustScore,
    resetVoiceFlow,
    shouldNavigate,
    targetRoute,
    setShouldNavigate,
    setTranscript
  } = useVoiceFlow(language);

  // Handle navigation when shouldNavigate is true
  useEffect(() => {
    if (shouldNavigate && targetRoute) {
      if (window.location.pathname === '/answer') {
        navigate(targetRoute, { replace: true });
      } else {
        navigate(targetRoute);
      }
      setShouldNavigate(false);
    }
  }, [shouldNavigate, targetRoute, navigate, setShouldNavigate]);

  return (
    <Layout 
      language={language} 
      onLanguageChange={onLanguageChange}
      isListening={isListening}
      startListening={startListening}
      stopListening={stopListening}
      transcript={transcript}
      interimTranscript={interimTranscript}
      isProcessing={isProcessing}
      processQuery={processQuery}
      setTranscript={setTranscript}
    >
      <Routes>
        <Route 
          path="/" 
          element={
            <HomePage 
              language={language}
              isListening={isListening}
              startListening={startListening}
              stopListening={stopListening}
              transcript={transcript}
              interimTranscript={interimTranscript}
              isProcessing={isProcessing}
              processQuery={processQuery}
            />
          } 
        />
        <Route 
          path="/answer" 
          element={<AnswerPage language={language} />} 
        />
        <Route 
          path="/roadmap" 
          element={
            <RoadmapPage 
              language={language}
              roadmapData={roadmapData}
            />
          } 
        />
        <Route 
          path="/score" 
          element={
            <TrustScorePage 
              language={language}
              trustScore={trustScore}
            />
          } 
        />
        <Route 
          path="/schemes" 
          element={
            <SchemesPage 
              language={language}
            />
          } 
        />
        <Route 
          path="/export" 
          element={
            <ExportPage 
              language={language}
            />
          } 
        />
        <Route 
          path="/ngos" 
          element={
            <NGOPage 
              language={language}
            />
          } 
        />
        <Route 
          path="/about" 
          element={<AboutPage language={language} />} 
        />
        <Route 
          path="/all-queries" 
          element={<AllQueriesPage language={language} />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function App() {
  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem('arthikaUser');
    return stored ? JSON.parse(stored) : null;
  });

  const handleAuthSuccess = (userObj) => {
    setUser(userObj);
  };

  if (!user) {
    return <AuthForm onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <QueryProvider userEmail={user?.email}>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </QueryProvider>
  );
}

export default App;
