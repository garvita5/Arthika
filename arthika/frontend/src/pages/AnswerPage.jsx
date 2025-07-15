import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQueryContext } from '../contexts/QueryContext';
import apiService from '../services/apiService';

function useQueryParam(name) {
  const { search } = useLocation();
  return React.useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get(name);
  }, [search, name]);
}

function AnswerPage({ language = 'en' }) {
  const question = useQueryParam('question');
  const { queryResult } = useQueryContext();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnswer() {
      setLoading(true);
      setError(null);
      try {
        // Use context if available and matches question
        if (queryResult && queryResult.question === question) {
          setResponse(queryResult);
        } else {
          // Fallback: fetch from API
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

  if (loading) return <div style={{ padding: 32 }}>Loading...</div>;
  if (error) return <div style={{ padding: 32, color: 'red' }}>{error}</div>;
  console.log('AnswerPage response:', response);
  console.log('AnswerPage response.data:', response?.data);
  const story = response?.data?.storyResponse;
  const steps = response?.data?.recommendedSteps;
  const tags = response?.data?.tags;
  const roadmap = response?.data?.roadmap;
  // Dummy exit planner if user asks for it
  const showExitPlanner = /exit plan|exit strategy/i.test(question || '');

  return (
    <div style={{ padding: 32 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Answer to: {question}</h2>
      {story && (
        <div style={{ background: '#f5faff', padding: 20, borderRadius: 12, fontSize: 18, marginBottom: 24, boxShadow: '0 2px 8px #e0e7ef' }}>
          {story}
        </div>
      )}
      {steps && steps.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Recommended Steps:</h3>
          <ul style={{ paddingLeft: 24 }}>
            {steps.map((step, idx) => (
              <li key={idx} style={{ marginBottom: 6, fontSize: 16 }}>• {step}</li>
            ))}
          </ul>
        </div>
      )}
      {tags && tags.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: 16, fontWeight: 500, marginBottom: 6 }}>Tags:</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tags.map((tag, idx) => (
              <span key={idx} style={{ background: '#e0f2fe', color: '#0369a1', borderRadius: 16, padding: '4px 12px', fontSize: 14, fontWeight: 500 }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
      {/* Roadmap Section */}
      {roadmap && (
        <div style={{ background: '#f0fdf4', padding: 20, borderRadius: 12, marginBottom: 24, boxShadow: '0 2px 8px #e0e7ef' }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Your Financial Roadmap</h3>
          {roadmap.summary && (
            <div style={{ marginBottom: 12, fontSize: 16 }}>
              <b>Net Worth:</b> ₹{roadmap.summary.netWorth} &nbsp; | &nbsp;
              <b>Total Savings:</b> ₹{roadmap.summary.totalSavings} &nbsp; | &nbsp;
              <b>Total Debt:</b> ₹{roadmap.summary.totalDebt} &nbsp; | &nbsp;
              <b>Timeline:</b> {roadmap.summary.timeline}
            </div>
          )}
          {roadmap.steps && roadmap.steps.length > 0 && (
            <ol style={{ paddingLeft: 24 }}>
              {roadmap.steps.map((step, idx) => (
                <li key={step.id || idx} style={{ marginBottom: 10, fontSize: 16 }}>
                  <b>{step.title}:</b> {step.description} <span style={{ color: '#059669', fontWeight: 500 }}>({step.timeline})</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
      {/* Dummy Exit Planner Section */}
      {showExitPlanner && (
        <div style={{ background: '#fef9c3', padding: 20, borderRadius: 12, marginBottom: 24, boxShadow: '0 2px 8px #e0e7ef' }}>
          <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Exit Planner</h3>
          <ul style={{ paddingLeft: 24, fontSize: 16 }}>
            <li>1. Review your current investments and identify assets to liquidate.</li>
            <li>2. Check for any penalties or lock-in periods before exiting.</li>
            <li>3. Plan the timing of your exit to minimize taxes and maximize returns.</li>
            <li>4. Reinvest proceeds in safer instruments or as per your new goals.</li>
            <li>5. Consult a financial advisor for a personalized exit strategy.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnswerPage; 