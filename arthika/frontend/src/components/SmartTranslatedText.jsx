import React from 'react';
import { useSmartTranslation } from '../config/smartTranslations';

const SmartTranslatedText = ({ 
  children, 
  language, 
  className = '', 
  section = null, 
  key = null, 
  index = null,
  showFallbackIndicator = false,
  fallbackToManual = true 
}) => {
  const { translatedText, isLoading, isFallback } = useSmartTranslation(
    children, 
    language, 
    section, 
    key, 
    index
  );

  // If fallback is disabled and we're using fallback, show original
  if (!fallbackToManual && isFallback) {
    return (
      <span className={className}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${className} ${isLoading ? 'opacity-60' : ''} ${isFallback && showFallbackIndicator ? 'opacity-80' : ''}`}>
      {translatedText}
      {isFallback && showFallbackIndicator && (
        <span className="text-xs text-gray-400 ml-1">(offline)</span>
      )}
    </span>
  );
};

export default SmartTranslatedText; 