import React from 'react';
import { Play, Pause, Download } from 'lucide-react';

function AIResponse({ 
  aiResponse, 
  isSpeaking, 
  speakResponse, 
  stopSpeaking, 
  exportPlan, 
  language 
}) {
  return (
    <div className="card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">
            {language === 'en' ? 'Your Financial Analysis' : 'आपका वित्तीय विश्लेषण'}
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={isSpeaking ? stopSpeaking : speakResponse}
              className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200"
            >
              {isSpeaking ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button
              onClick={exportPlan}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              <Download size={20} />
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
        </div>
      </div>
    </div>
  );
}

export default AIResponse; 