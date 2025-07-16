import React, { useEffect, useState } from 'react';
import { useQueryContext } from '../contexts/QueryContext';
import { getQueriesByEmail } from '../services/apiService';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AllQueriesPage() {
  const { userEmail } = useQueryContext();
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQueries() {
      setLoading(true);
      setError(null);
      try {
        const results = await getQueriesByEmail(userEmail);
        // Sort by createdAt descending (most recent first)
        const sorted = (results || []).sort((a, b) => {
          const aTime = a.createdAt?.seconds ? a.createdAt.seconds : new Date(a.createdAt).getTime()/1000;
          const bTime = b.createdAt?.seconds ? b.createdAt.seconds : new Date(b.createdAt).getTime()/1000;
          return bTime - aTime;
        });
        setQueries(sorted);
      } catch (err) {
        setError('Could not load past queries');
      } finally {
        setLoading(false);
      }
    }
    if (userEmail) fetchQueries();
  }, [userEmail]);

  const handleShowPreview = (question) => {
    navigate(`/answer?question=${encodeURIComponent(question)}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <MessageSquare className="text-primary-600" size={28} />
        All Queries
      </h1>
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-center py-12 text-red-500">{error}</div>
      ) : queries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No past queries found.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {queries.map((q, idx) => (
            <div key={q.id || idx} className="card flex flex-col justify-between">
              <div>
                <div className="mb-2 text-xs text-gray-400">{q.createdAt ? new Date(q.createdAt.seconds ? q.createdAt.seconds * 1000 : q.createdAt).toLocaleString() : ''}</div>
                <div className="font-semibold text-primary-700 mb-1">{q.question}</div>
                <div className="text-gray-700 whitespace-pre-wrap mb-2">{q.answer || (q.response && q.response.storyResponse)}</div>
              </div>
              <button
                className="mt-4 px-4 py-2 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors w-fit self-end"
                onClick={() => handleShowPreview(q.question)}
              >
                Show Full Preview
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllQueriesPage; 