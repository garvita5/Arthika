import React from 'react';
import { Mic, MicOff } from 'lucide-react';

function VoiceInput({ 
  isListening, 
  transcript, 
  startListening, 
  stopListening, 
  language 
}) {
  return (
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
              ? (language === 'en' ? 'Listening... Speak now!' : 'सुन रहा हूं... अभी बोलें!')
              : (language === 'en' ? 'Click to start speaking' : 'बोलना शुरू करने के लिए क्लिक करें')
            }
          </p>
          
          {transcript && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{transcript}</p>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-500">
          {language === 'en' 
            ? 'Try saying: "What if I take a gold loan?" or "How should I invest my money?"'
            : 'कहने का प्रयास करें: "अगर मैं सोने का लोन लूं तो क्या होगा?" या "मुझे अपना पैसा कैसे निवेश करना चाहिए?"'
          }
        </div>
      </div>
    </div>
  );
}

export default VoiceInput; 