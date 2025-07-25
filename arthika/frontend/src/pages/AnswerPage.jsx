import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryContext } from '../contexts/QueryContext';
import apiService from '../services/apiService';
import { CheckCircle, ArrowRight, AlertCircle, Flag } from 'lucide-react';
import { getHomepageTranslation } from '../config/homepageTranslations';

function useQueryParam(name) {
  const { search } = useLocation();
  return React.useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get(name);
  }, [search, name]);
}

function RoadmapFlowchart({ steps }) {
  if (!steps || steps.length === 0) return null;
  return (
    <div className="flex flex-col items-center w-full mb-8">

      <div className="flex flex-col sm:flex-row items-center w-full gap-4 py-4 overflow-x-auto">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id || idx}>
            <div className="flex flex-col items-center w-full sm:min-w-[180px]">
              <div className="bg-blue-100 border-2 border-blue-300 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-2">
                <CheckCircle className="text-blue-500" size={24} />
              </div>
              <div className="bg-white rounded-xl shadow px-2 py-2 sm:px-4 text-center w-full">
                <div className="font-semibold text-blue-800 text-sm sm:text-base mb-1">{step.title}</div>
                <div className="text-gray-600 text-xs sm:text-sm mb-1">{step.description}</div>
                <div className="text-xs text-green-600 font-medium">{step.timeline}</div>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className="text-blue-300 mx-2 hidden sm:inline" size={32} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function AnswerPage({ language = 'en' }) {
  const question = useQueryParam('question');
  const { queryResult } = useQueryContext();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  const utteranceRef = useRef(null);

  useEffect(() => {
    setHasSpoken(false);
  }, [question]);

  useEffect(() => {
    async function fetchAnswer() {
      setLoading(true);
      setError(null);
      try {
        if (queryResult && queryResult.question === question) {
          setResponse(queryResult);
        } else {
          const resp = await apiService.submitFinancialQuery(question, language, 'debug-user');
          setResponse({ question, ...resp });
        }
      } catch (err) {
        setError(getHomepageTranslation(language, 'answerPage', 'error'));
        console.error('Error fetching answer:', err);
      } finally {
        setLoading(false);
      }
    }
    if (question) fetchAnswer();
  }, [question, language, queryResult]);

  // Auto-speak answer after it loads
  useEffect(() => {
    if (response?.data?.storyResponse && !hasSpoken) {
      speakAnswer();
      setHasSpoken(true);
    }
    // Stop speech on unmount
    return () => {
      stopSpeaking();
    };
    // eslint-disable-next-line
  }, [response?.data?.storyResponse]);

  const speakAnswer = () => {
    if ('speechSynthesis' in window && response?.data?.storyResponse) {
      stopSpeaking();
      const utterance = new window.SpeechSynthesisUtterance(response.data.storyResponse);
      utterance.lang = language === 'en' ? 'en-US' : `${language}-IN`;
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };
  const replaySpeaking = () => {
    setHasSpoken(false);
    speakAnswer();
  };

  if (loading) return <div className="p-12 text-center text-lg">{getHomepageTranslation(language, 'answerPage', 'loading')}</div>;
  if (error) return <div className="p-12 text-center text-red-600">{error}</div>;

  const story = response?.data?.storyResponse;
  const steps = response?.data?.roadmap?.steps;
  const roadmap = response?.data?.roadmap;
  // const tags = response?.data?.tags;
  // Expanded keywords for distress/negative situations
  const distressKeywords = [
    // English keywords
    'exit plan', 'exit strategy', 'abuse', 'abusive', 'harassed', 'harassment', 'debt trap',
    'depression', 'suicide', 'distress', 'help', 'trouble', 'threat', 'violence', 'unsafe',
    'danger', 'blackmail', 'coercion', 'pressure', 'mental health', 'crisis', 'overwhelmed',
    'hopeless', 'helpless', 'lost', 'fear', 'scared', 'panic', 'anxiety', 'stress', 'emergency',
    // Hindi keywords
    'मुसीबत', 'तंगी', 'कर्ज', 'ऋण', 'दबाव', 'धमकी', 'हिंसा', 'खतरा', 'डर', 'चिंता',
    'तनाव', 'आपातकाल', 'बेबस', 'निराश', 'भय', 'दहशत', 'अत्याचार', 'शोषण', 'ब्लैकमेल',
    'जबरदस्ती', 'मानसिक स्वास्थ्य', 'संकट', 'परेशानी', 'मदद', 'बाहर निकलना', 'छोड़ना'
  ];
  const showExitPlanner = distressKeywords.some(word => (question || '').toLowerCase().includes(word));
  const schemes = response?.data?.schemes || response?.data?.governmentSchemes;
  const riskLevel = response?.data?.riskLevel;
  const estimatedCost = response?.data?.estimatedCost;
  const saferAlternatives = response?.data?.saferAlternatives;
  const timeframe = response?.data?.timeframe;
  const expectedReturns = response?.data?.expectedReturns;

  return (
    <div className="max-w-3xl w-full mx-auto px-2 sm:px-4 py-6 sm:py-10 space-y-6 sm:space-y-10">
      {/* Answer Card */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl shadow-lg p-4 sm:p-8 flex flex-col items-center border border-blue-100 w-full">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4 text-center sm:text-left">
          <Flag className="text-blue-400" size={28} />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{getHomepageTranslation(language, 'answerPage', 'arthikaAnswer')}</h2>
        </div>
        <div className="text-base sm:text-lg md:text-xl text-gray-800 text-center leading-relaxed whitespace-pre-line mb-2">
          {story || <span className="text-gray-400">{getHomepageTranslation(language, 'answerPage', 'noAnswerAvailable')}</span>}
        </div>
        {/* Speech Controls */}
        {story && (
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 justify-center">
            {!isSpeaking && (
              <button onClick={speakAnswer} className="px-4 py-2 rounded-lg bg-cyan-100 text-cyan-700 font-semibold hover:bg-cyan-200 transition">{getHomepageTranslation(language, 'answerPage', 'listen')}</button>
            )}
            {isSpeaking && (
              <button onClick={stopSpeaking} className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition">{getHomepageTranslation(language, 'answerPage', 'stop')}</button>
            )}
            <button onClick={replaySpeaking} className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition">{getHomepageTranslation(language, 'answerPage', 'replay')}</button>
          </div>
        )}
      </div>

      {/* Government Schemes Section */}
      {schemes && schemes.length > 0 && (
        <div className="bg-blue-50 rounded-3xl shadow-lg p-4 sm:p-8 border border-blue-100 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4 text-center sm:text-left">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h6" /></svg>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800">{getHomepageTranslation(language, 'answerPage', 'governmentSchemes')}</h3>
          </div>
          <div className="space-y-4">
            {schemes.map((scheme, idx) => {
              if (typeof scheme === 'string') {
                return (
                  <div key={idx} className="bg-white rounded-xl shadow p-4 border border-blue-100 w-full">
                    <div className="font-semibold text-blue-700 text-base sm:text-lg mb-1">{scheme}</div>
                  </div>
                );
              } else if (scheme && (scheme.name || scheme.title || scheme.description)) {
                return (
                  <div key={idx} className="bg-white rounded-xl shadow p-4 border border-blue-100 w-full">
                    <div className="font-semibold text-blue-700 text-base sm:text-lg mb-1">{scheme.name || scheme.title}</div>
                    {scheme.description && <div className="text-gray-700 mb-1">{scheme.description}</div>}
                    {scheme.link && (
                      <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline text-sm">{getHomepageTranslation(language, 'answerPage', 'learnMore')}</a>
                    )}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      )}

      {/* Roadmap Flowchart */}
      {roadmap && steps && steps.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-8 border border-green-100 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4 text-center sm:text-left">
            <TrendingUpIcon />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-800">{getHomepageTranslation(language, 'answerPage', 'financialRoadmap')}</h3>
          </div>
          {roadmap.summary && (
            <div className="mb-6 text-gray-700 text-base flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 justify-center items-center">
              <span><b>{getHomepageTranslation(language, 'answerPage', 'netWorth')}:</b> ₹{roadmap.summary.netWorth}</span>
              <span><b>{getHomepageTranslation(language, 'answerPage', 'totalSavings')}:</b> ₹{roadmap.summary.totalSavings}</span>
              <span><b>{getHomepageTranslation(language, 'answerPage', 'totalDebt')}:</b> ₹{roadmap.summary.totalDebt}</span>
              <span><b>{getHomepageTranslation(language, 'answerPage', 'timeline')}:</b> {roadmap.summary.timeline}</span>
            </div>
          )}
          <RoadmapFlowchart steps={steps} />
        </div>
      )}

      {/* Summary Card for Additional Info */}
      {(saferAlternatives && saferAlternatives.length > 0) && (
        <div className="bg-yellow-50 rounded-3xl shadow-lg p-4 sm:p-8 border border-yellow-200 w-full">
          <h3 className="text-base sm:text-lg font-semibold text-yellow-900 mb-4 flex items-center gap-2">🛡️ {getHomepageTranslation(language, 'answerPage', 'saferAlternatives')}</h3>
          <div className="space-y-2 text-yellow-900 text-sm sm:text-base">
            <div>{saferAlternatives.join('; ')}</div>
          </div>
        </div>
      )}

      {/* Exit Planner Section */}
      {showExitPlanner && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl shadow-lg p-4 sm:p-8 w-full">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4 text-center sm:text-left">
            <AlertCircle className="text-yellow-500" size={28} />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-yellow-800">{getHomepageTranslation(language, 'answerPage', 'exitPlanner')}</h3>
          </div>
          <ul className="list-decimal pl-4 sm:pl-6 text-gray-700 space-y-2 text-sm sm:text-base">
            {getHomepageTranslation(language, 'answerPage', 'exitPlannerSteps').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function TrendingUpIcon() {
  return (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-500">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
    </svg>
  );
}

export default AnswerPage; 