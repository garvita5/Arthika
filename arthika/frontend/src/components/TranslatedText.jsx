import React, { useState, useEffect, useMemo } from 'react';
import { translateText } from '../services/translationService';

const TranslatedText = ({ children, language, className = '', showFallbackIndicator = false }) => {
  const [translatedContent, setTranslatedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  // Memoize the text content to prevent unnecessary re-renders
  const textContent = useMemo(() => {
    if (typeof children === 'string') {
      return children;
    } else if (typeof children === 'object' && children !== null) {
      // If it's an object, try to extract meaningful text
      if (children.data && typeof children.data === 'string') {
        return children.data;
      } else if (children.storyResponse && typeof children.storyResponse === 'string') {
        return children.storyResponse;
      } else if (children.message && typeof children.message === 'string') {
        return children.message;
      } else if (children.success !== undefined) {
        // Handle API response objects
        return children.data?.storyResponse || children.data || 'Response received';
      } else {
        // Convert object to string representation
        return JSON.stringify(children);
      }
    } else if (children !== null && children !== undefined) {
      return String(children);
    }
    return '';
  }, [children]);

  useEffect(() => {
    const translateContent = async () => {
      if (!textContent || language === 'en') {
        setTranslatedContent(textContent || '');
        setIsFallback(false);
        return;
      }

      setIsLoading(true);
      try {
        const translated = await translateText(textContent, language, 'en');
        setTranslatedContent(translated);
        // Check if this is a fallback translation (same as original)
        setIsFallback(translated === textContent);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedContent(textContent);
        setIsFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    translateContent();
  }, [textContent, language]);

  if (isLoading) {
    return (
      <span className={`${className} opacity-60`}>
        {textContent}
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