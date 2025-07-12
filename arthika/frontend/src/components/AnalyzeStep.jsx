import React from 'react';
import { Play, Pause, Download } from 'lucide-react';
import TranslatedText from './TranslatedText';

function AnalyzeStep({ 
  aiResponse, 
  isSpeaking, 
  speakResponse, 
  stopSpeaking, 
  exportPlan, 
  language, 
  onNextStep 
}) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">
          <TranslatedText language={language}>
            Get AI Analysis
          </TranslatedText>
        </h2>
        <p className="text-lg text-gray-600">
          <TranslatedText language={language}>
            Our AI analyzes your query and provides personalized financial advice with detailed explanations.
          </TranslatedText>
        </p>
      </div>

      <div className="card">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              <TranslatedText language={language}>
                Your Financial Analysis
              </TranslatedText>
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
            <p className="text-gray-700 leading-relaxed">
              <TranslatedText language={language}>
                {aiResponse}
              </TranslatedText>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNextStep}
          className="btn-primary"
        >
          <TranslatedText language={language}>
            View Your Roadmap
          </TranslatedText> →
        </button>
      </div>
    </div>
  );
}

export default AnalyzeStep; 