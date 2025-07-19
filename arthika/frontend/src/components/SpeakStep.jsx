import React from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import TranslatedText from './TranslatedText';
import { getHomepageTranslation } from '../config/homepageTranslations';

function SpeakStep({ 
  isListening, 
  transcript, 
  interimTranscript,
  startListening, 
  stopListening, 
  language,
  isProcessing
}) {
  const displayText = transcript || interimTranscript;

  return (
    <div className="text-center space-y-8">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-gray-900">
          <TranslatedText language={language}>
            Speak Your Question
          </TranslatedText>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          <TranslatedText language={language}>
            Click the microphone and ask about loans, investments, or financial planning in your preferred language.
          </TranslatedText>
        </p>
      </div>

      <div className="card max-w-2xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              className={`microphone-btn ${isListening ? 'recording' : ''} ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
              {isProcessing ? (
                <Loader2 size={32} className="animate-spin" />
              ) : isListening ? (
                <MicOff size={32} />
              ) : (
                <Mic size={32} />
              )}
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-700">
              {isProcessing ? (
                <TranslatedText language={language}>
                  Processing your question...
                </TranslatedText>
                              ) : isListening ? (
                  getHomepageTranslation(language, 'inputSection', 'listeningSpeak')
                ) : (
                  <TranslatedText language={language}>
                    Click to start speaking
                  </TranslatedText>
              )}
            </p>
            
            {displayText && (
              <div className="bg-gray-50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                <p className="text-gray-700 text-lg">
                  {displayText}
                  {interimTranscript && !transcript && (
                    <span className="text-gray-400">...</span>
                  )}
                </p>
              </div>
            )}

            {isListening && !displayText && (
              <div className="bg-gray-50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="bg-blue-50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
                <div className="flex items-center space-x-3">
                  <Loader2 size={24} className="animate-spin text-blue-600" />
                  <p className="text-blue-700 font-medium">
                    <TranslatedText language={language}>
                      Analyzing your financial question...
                    </TranslatedText>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500">
            <TranslatedText language={language}>
              Try saying: "What if I take a gold loan?" or "How should I invest my money?"
            </TranslatedText>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpeakStep; 