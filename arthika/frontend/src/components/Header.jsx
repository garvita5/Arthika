import React from 'react';
import { ArrowRight, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import TranslatedText from './TranslatedText';
import { useTranslationContext } from '../contexts/TranslationContext';
import rupeeLogo from '../assets/rupee1.png';

function Header({ currentStep, language, onLanguageChange }) {
  const { translationError } = useTranslationContext();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img src={rupeeLogo} alt="Arthika Logo" className="w-16 h-16 object-contain" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 leading-tight">Arthika</span>
              <span className="text-xs font-semibold text-cyan-600 tracking-wide mt-0.5" style={{ letterSpacing: '0.04em' }}>Financial Clarity. Indian Simplicity.</span>
            </div>
            {/* Translation Status Indicator */}
            {language !== 'en' && (
              <div className="flex items-center space-x-1 ml-2">
                {translationError ? (
                  <WifiOff size={14} className="text-orange-500" />
                ) : (
                  <Wifi size={14} className="text-green-500" />
                )}
                <span className="text-xs text-gray-500">
                  {translationError ? 'Offline' : 'Online'}
                </span>
              </div>
            )}
          </div>

          {/* 3-Step Process Indicator */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 1 ? <CheckCircle size={16} /> : '1'}
              </div>
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText language={language}>
                  Speak
                </TranslatedText>
              </span>
            </div>
            <ArrowRight size={16} className="text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > 2 ? <CheckCircle size={16} /> : '2'}
              </div>
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText language={language}>
                  Analyze
                </TranslatedText>
              </span>
            </div>
            <ArrowRight size={16} className="text-gray-400" />
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep >= 3 ? <CheckCircle size={16} /> : '3'}
              </div>
              <span className="text-sm font-medium text-gray-700">
                <TranslatedText language={language}>
                  Roadmap
                </TranslatedText>
              </span>
            </div>
          </div>

          <LanguageSelector 
            currentLanguage={language} 
            onLanguageChange={onLanguageChange} 
          />
        </div>
      </div>
    </header>
  );
}

export default Header; 