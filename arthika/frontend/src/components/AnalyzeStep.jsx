import React from 'react';
import { Play, Pause, Download, Loader2 } from 'lucide-react';
import TranslatedText from './TranslatedText';

function AnalyzeStep({ 
  aiResponse, 
  isSpeaking, 
  speakResponse, 
  stopSpeaking, 
  exportPlan, 
  language, 
  onNextStep,
  isProcessing
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
                disabled={isProcessing || !aiResponse}
                className={`p-2 rounded-lg ${
                  isProcessing || !aiResponse 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                }`}
              >
                {isSpeaking ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
          </div>
          
          {isProcessing ? (
            <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Loader2 size={48} className="animate-spin text-blue-600 mx-auto" />
                <p className="text-gray-700 font-medium">
                  <TranslatedText language={language}>
                    Analyzing your financial question...
                  </TranslatedText>
                </p>
                <p className="text-sm text-gray-500">
                  <TranslatedText language={language}>
                    This may take a few moments
                  </TranslatedText>
                </p>
              </div>
            </div>
          ) : aiResponse ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-medium">₹</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-600 font-medium mb-2">
              <TranslatedText language={language}>
                        AI Financial Analysis:
                      </TranslatedText>
                    </p>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {aiResponse}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Voice controls */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🔊</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        <TranslatedText language={language}>
                          Listen to Analysis
                        </TranslatedText>
                      </p>
                      <p className="text-sm text-gray-600">
                        <TranslatedText language={language}>
                          Click play to hear the analysis in your language
              </TranslatedText>
            </p>
          </div>
                  </div>
                  <button
                    onClick={isSpeaking ? stopSpeaking : speakResponse}
                    disabled={isProcessing}
                    className={`p-3 rounded-full transition-all ${
                      isProcessing 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : isSpeaking
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    {isSpeaking ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-center">
                <TranslatedText language={language}>
                  No analysis available yet
                </TranslatedText>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNextStep}
          disabled={isProcessing || !aiResponse}
          className={`btn-primary ${isProcessing || !aiResponse ? 'opacity-50 cursor-not-allowed' : ''}`}
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