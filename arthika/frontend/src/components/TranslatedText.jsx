import React, { useState, useEffect } from 'react';
import { translateText } from '../services/translationService';

const TranslatedText = ({ children, language, className = '', showFallbackIndicator = false }) => {
  const [translatedContent, setTranslatedContent] = useState(children);
  const [isLoading, setIsLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const translateContent = async () => {
      if (language === 'en' || !children) {
        setTranslatedContent(children);
        setIsFallback(false);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translateText(children, language, 'en');
        setTranslatedContent(translated);
        // Check if this is a fallback translation (same as original)
        setIsFallback(translated === children);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedContent(children);
        setIsFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    translateContent();
  }, [children, language]);

  if (isLoading) {
    return (
      <span className={`${className} opacity-60`}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${className} ${isFallback && showFallbackIndicator ? 'opacity-80' : ''}`}>
      {translatedContent}
      {isFallback && showFallbackIndicator && (
        <span className="text-xs text-gray-400 ml-1">(offline)</span>
      )}
    </span>
  );
};

export default TranslatedText; 