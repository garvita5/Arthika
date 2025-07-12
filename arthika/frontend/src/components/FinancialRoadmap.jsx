import React from 'react';
import { Line } from 'react-chartjs-2';

function FinancialRoadmap({ financialData, language }) {
  if (!financialData) return null;

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {language === 'en' ? 'Your Financial Roadmap' : 'आपकी वित्तीय योजना'}
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
  );
}

export default FinancialRoadmap; 