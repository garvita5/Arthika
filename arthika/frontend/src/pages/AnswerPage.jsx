import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryContext } from '../contexts/QueryContext';
import apiService from '../services/apiService';
import { CheckCircle, ArrowRight, AlertCircle, Flag } from 'lucide-react';

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
      <div className="flex flex-row items-center w-full overflow-x-auto gap-4 py-4">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id || idx}>
            <div className="flex flex-col items-center min-w-[180px]">
              <div className="bg-blue-100 border-2 border-blue-300 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                <CheckCircle className="text-blue-500" size={28} />
              </div>
              <div className="bg-white rounded-xl shadow px-4 py-2 text-center min-w-[160px]">
                <div className="font-semibold text-blue-800 text-base mb-1">{step.title}</div>
                <div className="text-gray-600 text-sm mb-1">{step.description}</div>
                <div className="text-xs text-green-600 font-medium">{step.timeline}</div>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className="text-blue-300 mx-2" size={32} />
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
        setError('Failed to fetch answer. Please try again.');
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

  if (loading) return <div className="p-12 text-center text-lg">Loading...</div>;
  if (error) return <div className="p-12 text-center text-red-600">{error}</div>;

  const story = response?.data?.storyResponse;
  const steps = response?.data?.roadmap?.steps;
  const roadmap = response?.data?.roadmap;
  // const tags = response?.data?.tags;
  const showExitPlanner = /exit plan|exit strategy/i.test(question || '');
  const schemes = response?.data?.schemes || response?.data?.governmentSchemes;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
      {/* Answer Card */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl shadow-lg p-8 flex flex-col items-center border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <Flag className="text-blue-400" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Arthika's Answer</h2>
        </div>
        <div className="text-lg md:text-xl text-gray-800 text-center leading-relaxed whitespace-pre-line mb-2">
          {story || <span className="text-gray-400">No answer available.</span>}
        </div>
        {/* Speech Controls */}
        {story && (
          <div className="flex gap-3 mt-4">
            {!isSpeaking && (
              <button onClick={speakAnswer} className="px-4 py-2 rounded-lg bg-cyan-100 text-cyan-700 font-semibold hover:bg-cyan-200 transition">Listen</button>
            )}
            {isSpeaking && (
              <button onClick={stopSpeaking} className="px-4 py-2 rounded-lg bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition">Stop</button>
            )}
            <button onClick={replaySpeaking} className="px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition">Replay</button>
          </div>
        )}
      </div>

      {/* Government Schemes Section */}
      {schemes && schemes.length > 0 && (
        <div className="bg-blue-50 rounded-3xl shadow-lg p-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-4">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h6" /></svg>
            <h3 className="text-xl md:text-2xl font-semibold text-blue-800">Government Schemes for You</h3>
          </div>
          <div className="space-y-4">
            {schemes.map((scheme, idx) => {
              if (typeof scheme === 'string') {
                return (
                  <div key={idx} className="bg-white rounded-xl shadow p-4 border border-blue-100">
                    <div className="font-semibold text-blue-700 text-lg mb-1">{scheme}</div>
                  </div>
                );
              } else if (scheme && (scheme.name || scheme.title || scheme.description)) {
                return (
                  <div key={idx} className="bg-white rounded-xl shadow p-4 border border-blue-100">
                    <div className="font-semibold text-blue-700 text-lg mb-1">{scheme.name || scheme.title}</div>
                    {scheme.description && <div className="text-gray-700 mb-1">{scheme.description}</div>}
                    {scheme.link && (
                      <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline text-sm">Learn more</a>
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
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-100">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUpIcon />
            <h3 className="text-xl md:text-2xl font-semibold text-green-800">Your Financial Roadmap</h3>
          </div>
          {roadmap.summary && (
            <div className="mb-6 text-gray-700 text-base flex flex-wrap gap-4 justify-center">
              <span><b>Net Worth:</b> ₹{roadmap.summary.netWorth}</span>
              <span><b>Total Savings:</b> ₹{roadmap.summary.totalSavings}</span>
              <span><b>Total Debt:</b> ₹{roadmap.summary.totalDebt}</span>
              <span><b>Timeline:</b> {roadmap.summary.timeline}</span>
            </div>
          )}
          <RoadmapFlowchart steps={steps} />
        </div>
      )}

      {/* Exit Planner Section */}
      {showExitPlanner && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-3xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-yellow-500" size={28} />
            <h3 className="text-xl md:text-2xl font-semibold text-yellow-800">Exit Planner</h3>
          </div>
          <ul className="list-decimal pl-6 text-gray-700 space-y-2 text-base">
            <li>Review your current investments and identify assets to liquidate.</li>
            <li>Check for any penalties or lock-in periods before exiting.</li>
            <li>Plan the timing of your exit to minimize taxes and maximize returns.</li>
            <li>Reinvest proceeds in safer instruments or as per your new goals.</li>
            <li>Consult a financial advisor for a personalized exit strategy.</li>
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