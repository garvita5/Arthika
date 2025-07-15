import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Pause, Download, TrendingUp, ArrowLeft, CheckCircle, AlertCircle, Info, MessageSquare } from 'lucide-react';
import TranslatedText from '../components/TranslatedText';
import apiService from '../services/apiService';
import { useQueryContext } from '../contexts/QueryContext';

function useQueryParam(name) {
  const { search } = useLocation();
  return React.useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get(name);
  }, [search, name]);
}

function QueryResultPage({ language, resetFlow }) {
  const { userId } = useQueryContext();
  const question = useQueryParam('question');
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pastQueries, setPastQueries] = useState([]);
  const [loadingPast, setLoadingPast] = useState(true);
  const [errorPast, setErrorPast] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  // Fetch the result for the question from the backend
  useEffect(() => {
    async function fetchResult() {
      setLoading(true);
      setError(null);
      try {
        // Use a fallback userId if none is provided
        const effectiveUserId = userId || 'default-user';
        const resp = await apiService.submitFinancialQuery(question, language, effectiveUserId);
        console.log('API response:', resp); // Debug log
        // Always use the response as-is if it contains storyResponse
        if (resp && resp.storyResponse) {
          setQueryResult(resp);
        } else if (resp && resp.data && resp.data.storyResponse) {
          setQueryResult(resp.data);
        } else {
          setError('No data received from backend.');
        }
      } catch (err) {
        setError('Failed to fetch result.');
      } finally {
        setLoading(false);
      }
    }
    if (question) fetchResult();
  }, [question, userId, language]);

  // Fetch user's past queries
  useEffect(() => {
    async function fetchPast() {
      setLoadingPast(true);
      setErrorPast(null);
      try {
        const resp = await apiService.getUserQueries(userId);
        setPastQueries(resp.data || []);
      } catch (err) {
        setErrorPast('Could not load past queries');
      } finally {
        setLoadingPast(false);
      }
    }
    if (userId) fetchPast();
  }, [userId, queryResult]);

  // Handle click on a past query
  const handlePastQueryClick = (q) => {
    setQueryResult(q.response ? { ...q.response, roadmap: q.roadmap } : q);
  };

  // Text-to-speech logic (same as before)
  useEffect(() => {
    if (queryResult && queryResult.storyResponse && !hasSpoken) {
      const timer = setTimeout(() => {
        speakResponse();
        setHasSpoken(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [queryResult, hasSpoken]);

  const speakResponse = () => {
    if ('speechSynthesis' in window && queryResult && queryResult.storyResponse) {
      window.speechSynthesis.cancel();
      const utterance = new window.SpeechSynthesisUtterance(queryResult.storyResponse);
      utterance.lang = language === 'en' ? 'en-US' : `${language}-IN`;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  const toggleSpeaking = () => {
    if (isSpeaking) stopSpeaking();
    else speakResponse();
  };

  const getTrustScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  const getTrustScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="text-green-600" size={20} />;
    if (score >= 60) return <AlertCircle className="text-orange-600" size={20} />;
    return <AlertCircle className="text-red-600" size={20} />;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="flex flex-col items-center justify-center min-h-[200px]">
          <span className="loader mb-4"></span>
          <p className="text-gray-600">Processing...</p>
        </div>
      </div>
    );
  }

  if (error) {
    // Fallback: if context has a result, show it
    const { queryResult: fallbackResult } = useQueryContext();
    if (fallbackResult) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors" onClick={resetFlow}>
              <ArrowLeft size={20} />
              <span><TranslatedText language={language}>Back to Home</TranslatedText></span>
            </Link>
            <div className="flex items-center space-x-4">
              <button onClick={toggleSpeaking} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isSpeaking ? 'bg-red-100 text-red-700' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}>
                {isSpeaking ? <Pause size={16} /> : <Play size={16} />}
                <span><TranslatedText language={language}>{isSpeaking ? 'Pause' : 'Listen'}</TranslatedText></span>
              </button>
              <Link to="/export" className="flex items-center space-x-2 px-4 py-2 bg-success-100 text-success-700 rounded-lg hover:bg-success-200 transition-colors">
                <Download size={16} />
                <span><TranslatedText language={language}>Export</TranslatedText></span>
              </Link>
            </div>
          </div>
          {/* Main Response */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar: Past Queries */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4"><TranslatedText language={language}>Your Past Queries</TranslatedText></h3>
                {loadingPast ? (
                  <div className="text-gray-500 text-sm">Loading...</div>
                ) : errorPast ? (
                  <div className="text-red-500 text-sm">{errorPast}</div>
                ) : pastQueries.length === 0 ? (
                  <div className="text-gray-500 text-sm">No past queries found.</div>
                ) : (
                  <ul className="space-y-2">
                    {pastQueries.map((q, idx) => (
                      <li key={q.id || idx}>
                        <button className="text-left w-full px-2 py-1 rounded hover:bg-primary-50 transition-colors" onClick={() => handlePastQueryClick(q)}>
                          <span className="font-medium text-primary-700">{q.question}</span>
                          <span className="block text-xs text-gray-500">{q.createdAt ? new Date(q.createdAt).toLocaleString() : ''}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {/* Main Response */}
            <div className="lg:col-span-2 space-y-6">
              {/* AI Response */}
              <div className="card">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">₹</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3"><TranslatedText language={language}>Arthika's Response</TranslatedText></h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{fallbackResult.storyResponse}</p>
                    </div>
                    {/* Show more fields */}
                    <div className="mt-4 space-y-2">
                      {fallbackResult.expectedReturns && (
                        <div className="text-sm text-blue-700"><b>Expected Returns:</b> {fallbackResult.expectedReturns}</div>
                      )}
                      {fallbackResult.estimatedCost && (
                        <div className="text-sm text-blue-700"><b>Estimated Cost:</b> {fallbackResult.estimatedCost}</div>
                      )}
                      {fallbackResult.timeframe && (
                        <div className="text-sm text-blue-700"><b>Timeframe:</b> {fallbackResult.timeframe}</div>
                      )}
                      {fallbackResult.riskLevel && (
                        <div className="text-sm text-blue-700"><b>Risk Level:</b> {fallbackResult.riskLevel}</div>
                      )}
                      {fallbackResult.tags && fallbackResult.tags.length > 0 && (
                        <div className="text-sm text-blue-700"><b>Tags:</b> {fallbackResult.tags.join(', ')}</div>
                      )}
                      {fallbackResult.saferAlternatives && fallbackResult.saferAlternatives.length > 0 && (
                        <div className="text-sm text-blue-700"><b>Safer Alternatives:</b> {fallbackResult.saferAlternatives.join('; ')}</div>
                      )}
                      {fallbackResult.governmentSchemes && fallbackResult.governmentSchemes.length > 0 && (
                        <div className="text-sm text-blue-700"><b>Government Schemes:</b> {fallbackResult.governmentSchemes.join('; ')}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Trust Score */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900"><TranslatedText language={language}>Your Trust Score</TranslatedText></h3>
                  {getTrustScoreIcon(fallbackResult.trustScore || 75)}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTrustScoreColor(fallbackResult.trustScore || 75)}`}>{(fallbackResult.trustScore || 75)}/100</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all duration-500 ${fallbackResult.trustScore >= 80 ? 'bg-green-500' : fallbackResult.trustScore >= 60 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${fallbackResult.trustScore || 75}%` }}></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <TranslatedText language={language}>{fallbackResult.trustScore >= 80 ? 'Excellent financial health! Keep up the good work.' : fallbackResult.trustScore >= 60 ? 'Good financial standing with room for improvement.' : 'Consider reviewing your financial decisions and seeking guidance.'}</TranslatedText>
                  </div>
                </div>
              </div>
              {/* Roadmap Preview */}
              {fallbackResult.roadmap && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4"><TranslatedText language={language}>Roadmap Preview</TranslatedText></h3>
                  <div className="space-y-3">
                    {fallbackResult.roadmap.steps?.slice(0, 3).map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-primary-600 text-xs font-medium">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{step.title}</p>
                          <p className="text-xs text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    ))}
                    <div className="text-center pt-2">
                      <Link to="/roadmap" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                        <TranslatedText language={language}>View Full Roadmap →</TranslatedText>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {/* Tips */}
              <div className="card bg-blue-50 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3"><TranslatedText language={language}>💡 Pro Tips</TranslatedText></h3>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><TranslatedText language={language}>• Always read loan terms carefully</TranslatedText></p>
                  <p><TranslatedText language={language}>• Compare multiple options before deciding</TranslatedText></p>
                  <p><TranslatedText language={language}>• Keep emergency funds for unexpected expenses</TranslatedText></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Otherwise, show the error state
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!queryResult) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="text-gray-400" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              <TranslatedText language={language}>No Query Asked</TranslatedText>
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              <TranslatedText language={language}>You haven't asked a financial question yet. Go back to the home page to start your financial journey.</TranslatedText>
            </p>
          </div>
          <Link to="/" className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            <ArrowLeft size={20} />
            <span><TranslatedText language={language}>Ask a Question</TranslatedText></span>
          </Link>
        </div>
      </div>
    );
  }

  // Trust score fallback
  const trustScore = queryResult.trustScore || 75;
  const roadmapData = queryResult.roadmap;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors" onClick={resetFlow}>
          <ArrowLeft size={20} />
          <span><TranslatedText language={language}>Back to Home</TranslatedText></span>
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={toggleSpeaking} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${isSpeaking ? 'bg-red-100 text-red-700' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}`}>
            {isSpeaking ? <Pause size={16} /> : <Play size={16} />}
            <span><TranslatedText language={language}>{isSpeaking ? 'Pause' : 'Listen'}</TranslatedText></span>
          </button>
          <Link to="/export" className="flex items-center space-x-2 px-4 py-2 bg-success-100 text-success-700 rounded-lg hover:bg-success-200 transition-colors">
            <Download size={16} />
            <span><TranslatedText language={language}>Export</TranslatedText></span>
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar: Past Queries */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4"><TranslatedText language={language}>Your Past Queries</TranslatedText></h3>
            {loadingPast ? (
              <div className="text-gray-500 text-sm">Loading...</div>
            ) : errorPast ? (
              <div className="text-red-500 text-sm">{errorPast}</div>
            ) : pastQueries.length === 0 ? (
              <div className="text-gray-500 text-sm">No past queries found.</div>
            ) : (
              <ul className="space-y-2">
                {pastQueries.map((q, idx) => (
                  <li key={q.id || idx}>
                    <button className="text-left w-full px-2 py-1 rounded hover:bg-primary-50 transition-colors" onClick={() => handlePastQueryClick(q)}>
                      <span className="font-medium text-primary-700">{q.question}</span>
                      <span className="block text-xs text-gray-500">{q.createdAt ? new Date(q.createdAt).toLocaleString() : ''}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/* Main Response */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Response */}
          <div className="card">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">₹</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-3"><TranslatedText language={language}>Arthika's Response</TranslatedText></h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{queryResult.storyResponse}</p>
                </div>
                {/* Show more fields */}
                <div className="mt-4 space-y-2">
                  {queryResult.expectedReturns && (
                    <div className="text-sm text-blue-700"><b>Expected Returns:</b> {queryResult.expectedReturns}</div>
                  )}
                  {queryResult.estimatedCost && (
                    <div className="text-sm text-blue-700"><b>Estimated Cost:</b> {queryResult.estimatedCost}</div>
                  )}
                  {queryResult.timeframe && (
                    <div className="text-sm text-blue-700"><b>Timeframe:</b> {queryResult.timeframe}</div>
                  )}
                  {queryResult.riskLevel && (
                    <div className="text-sm text-blue-700"><b>Risk Level:</b> {queryResult.riskLevel}</div>
                  )}
                  {queryResult.tags && queryResult.tags.length > 0 && (
                    <div className="text-sm text-blue-700"><b>Tags:</b> {queryResult.tags.join(', ')}</div>
                  )}
                  {queryResult.saferAlternatives && queryResult.saferAlternatives.length > 0 && (
                    <div className="text-sm text-blue-700"><b>Safer Alternatives:</b> {queryResult.saferAlternatives.join('; ')}</div>
                  )}
                  {queryResult.governmentSchemes && queryResult.governmentSchemes.length > 0 && (
                    <div className="text-sm text-blue-700"><b>Government Schemes:</b> {queryResult.governmentSchemes.join('; ')}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Trust Score */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900"><TranslatedText language={language}>Your Trust Score</TranslatedText></h3>
              {getTrustScoreIcon(trustScore)}
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTrustScoreColor(trustScore)}`}>{trustScore}/100</div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-500 ${trustScore >= 80 ? 'bg-green-500' : trustScore >= 60 ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${trustScore}%` }}></div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <TranslatedText language={language}>{trustScore >= 80 ? 'Excellent financial health! Keep up the good work.' : trustScore >= 60 ? 'Good financial standing with room for improvement.' : 'Consider reviewing your financial decisions and seeking guidance.'}</TranslatedText>
              </div>
            </div>
          </div>
          {/* Roadmap Preview */}
          {roadmapData && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4"><TranslatedText language={language}>Roadmap Preview</TranslatedText></h3>
              <div className="space-y-3">
                {roadmapData.steps?.slice(0, 3).map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-xs font-medium">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{step.title}</p>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
                  <div className="text-center pt-2">
                  <Link to="/roadmap" className="text-sm text-primary-600 hover:text-primary-700 font-semibold">
                    <TranslatedText language={language}>View Full Roadmap →</TranslatedText>
                    </Link>
                  </div>
              </div>
            </div>
          )}
          {/* Tips */}
          <div className="card bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3"><TranslatedText language={language}>💡 Pro Tips</TranslatedText></h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p><TranslatedText language={language}>• Always read loan terms carefully</TranslatedText></p>
              <p><TranslatedText language={language}>• Compare multiple options before deciding</TranslatedText></p>
              <p><TranslatedText language={language}>• Keep emergency funds for unexpected expenses</TranslatedText></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueryResultPage; 