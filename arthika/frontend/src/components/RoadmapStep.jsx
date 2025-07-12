import React from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import TranslatedText from './TranslatedText';

function RoadmapStep({ 
  trustScore, 
  financialData, 
  language, 
  onReset 
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          <TranslatedText language={language}>
            View Your Roadmap
          </TranslatedText>
        </h2>
        <p className="text-lg text-gray-600">
          <TranslatedText language={language}>
            See your financial roadmap with charts, trust scores, and actionable recommendations.
          </TranslatedText>
        </p>
      </div>

      {/* Trust Score */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          <TranslatedText language={language}>
            Your Financial Trust Score
          </TranslatedText>
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">{trustScore}</div>
            <div className="text-sm text-gray-600">
              <TranslatedText language={language}>
                out of 100
              </TranslatedText>
            </div>
          </div>
          {financialData && (
            <div className="h-48">
              <Doughnut 
                data={financialData.trust} 
                options={{ responsive: true, maintainAspectRatio: false }} 
              />
            </div>
          )}
        </div>
      </div>

      {/* Financial Roadmap */}
      {financialData && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            <TranslatedText language={language}>
              Your Financial Roadmap
            </TranslatedText>
          </h3>
          <div className="h-64">
            <Line 
              data={financialData.roadmap} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `₹${context.parsed.y.toLocaleString()}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return '₹' + value.toLocaleString();
                      }
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="btn-primary">
          <TranslatedText language={language}>
            Share Plan
          </TranslatedText>
        </button>
        <button className="btn-secondary">
          <TranslatedText language={language}>
            View Schemes
          </TranslatedText>
        </button>
        <button onClick={onReset} className="btn-secondary">
          <TranslatedText language={language}>
            Start Over
          </TranslatedText>
        </button>
      </div>
    </div>
  );
}

export default RoadmapStep; 