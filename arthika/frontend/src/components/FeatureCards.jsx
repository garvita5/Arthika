import React from 'react';
import { Mic, Smartphone, Users } from 'lucide-react';

function FeatureCards({ language }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      <div className="card text-center">
        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Mic className="text-primary-600" size={24} />
        </div>
        <h3 className="font-semibold text-lg mb-2">
          {language === 'en' ? 'Voice Input' : 'आवाज इनपुट'}
        </h3>
        <p className="text-gray-600 text-sm">
          {language === 'en' 
            ? 'Simply speak your financial questions'
            : 'बस अपने वित्तीय प्रश्न बोलें'
          }
        </p>
      </div>

      <div className="card text-center">
        <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Smartphone className="text-success-600" size={24} />
        </div>
        <h3 className="font-semibold text-lg mb-2">
          {language === 'en' ? 'AI Analysis' : 'AI विश्लेषण'}
        </h3>
        <p className="text-gray-600 text-sm">
          {language === 'en' 
            ? 'Get personalized financial advice'
            : 'व्यक्तिगत वित्तीय सलाह प्राप्त करें'
          }
        </p>
      </div>

      <div className="card text-center">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
          <Users className="text-purple-600" size={24} />
        </div>
        <h3 className="font-semibold text-lg mb-2">
          {language === 'en' ? 'Community Access' : 'समुदाय पहुंच'}
        </h3>
        <p className="text-gray-600 text-sm">
          {language === 'en' 
            ? 'Accessible to everyone, everywhere'
            : 'सभी के लिए, हर जगह उपलब्ध'
          }
        </p>
      </div>
    </div>
  );
}

export default FeatureCards; 