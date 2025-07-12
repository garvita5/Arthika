import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../hooks/useTranslation';

const TranslationContext = createContext();

export const useTranslationContext = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};

export const TranslationProvider = ({ children, language }) => {
  const { translate, loading } = useTranslation(language);
  const [translatedContent, setTranslatedContent] = useState({});
  const [translationError, setTranslationError] = useState(false);

  // Common error messages and alerts
  const commonMessages = {
    'error.processing': 'Sorry, I encountered an error processing your query. Please try again.',
    'error.network': 'Network error. Please check your connection and try again.',
    'success.export': 'Financial plan exported successfully! Check your downloads.',
    'success.saved': 'Your plan has been saved successfully.',
    'loading.processing': 'Processing your request...',
    'loading.translating': 'Translating...',
    'button.ok': 'OK',
    'button.cancel': 'Cancel',
    'button.retry': 'Retry',
    'button.close': 'Close'
  };

  // Translate common messages when language changes
  useEffect(() => {
    const translateCommonMessages = async () => {
      if (language === 'en') {
        setTranslatedContent(commonMessages);
        setTranslationError(false);
        return;
      }

      const translated = {};
      let hasErrors = false;
      
      for (const [key, message] of Object.entries(commonMessages)) {
        try {
          translated[key] = await translate(message);
        } catch (error) {
          console.error(`Failed to translate ${key}:`, error);
          translated[key] = message; // Fallback to original
          hasErrors = true;
        }
      }
      
      setTranslatedContent(translated);
      setTranslationError(hasErrors);
    };

    translateCommonMessages();
  }, [language, translate]);

  const getMessage = useCallback((key) => {
    return translatedContent[key] || commonMessages[key] || key;
  }, [translatedContent]);

  const translateText = useCallback(async (text) => {
    if (language === 'en') {
      return text;
    }
    
    try {
      return await translate(text);
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // Return original text on error
    }
  }, [language, translate]);

  const value = {
    language,
    loading,
    translationError,
    getMessage,
    translateText,
    translatedContent
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}; 