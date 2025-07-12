import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function TrustScore({ trustScore, financialData, language }) {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {language === 'en' ? 'Your Financial Trust Score' : 'आपका वित्तीय विश्वास स्कोर'}
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">{trustScore}</div>
          <div className="text-sm text-gray-600">
            {language === 'en' ? 'out of 100' : '100 में से'}
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
  );
}

export default TrustScore; 