import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import TranslatedText from './TranslatedText';

function SpeakStep({ 
  isListening, 
  transcript, 
  startListening, 
  stopListening, 
  language 
}) {
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
              className={`microphone-btn ${isListening ? 'recording' : ''}`}
            >
              {isListening ? <MicOff size={32} /> : <Mic size={32} />}
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg font-medium text-gray-700">
              {isListening 
                ? (
                  <TranslatedText language={language}>
                    Listening... Speak now!
                  </TranslatedText>
                )
                : (
                  <TranslatedText language={language}>
                    Click to start speaking
                  </TranslatedText>
                )
              }
            </p>
            
            {transcript && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{transcript}</p>
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