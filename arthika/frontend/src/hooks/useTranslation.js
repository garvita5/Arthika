import { useState, useEffect, useCallback } from 'react';
import { translateText, getLibreTranslateCode } from '../services/translationService';

export const useTranslation = (language) => {
  const [translations, setTranslations] = useState(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const translate = useCallback(async (text, targetLang = language) => {
    if (!text || targetLang === 'en') {
      return text;
    }

    // Check if we already have this translation
    const cacheKey = `${text}_${targetLang}`;
    if (translations.has(cacheKey)) {
      return translations.get(cacheKey);
    }

    try {
      setLoading(true);
      setError(false);
      const translatedText = await translateText(text, getLibreTranslateCode(targetLang));
      
      // Cache the translation
      setTranslations(prev => new Map(prev).set(cacheKey, translatedText));
      
      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      setError(true);
      return text; // Return original text on error
    } finally {
      setLoading(false);
    }
  }, [language, translations]);

  const translateBatch = useCallback(async (texts, targetLang = language) => {
    if (targetLang === 'en') {
      return texts;
    }

    const results = {};
    setLoading(true);
    setError(false);

    try {
      for (const [key, text] of Object.entries(texts)) {
        try {
          results[key] = await translate(text, targetLang);
        } catch (error) {
          console.error(`Failed to translate ${key}:`, error);
          results[key] = text; // Fallback to original
        }
      }
    } finally {
      setLoading(false);
    }

    return results;
  }, [language, translate]);

  // Reset error state when language changes
  useEffect(() => {
    setError(false);
  }, [language]);

  return {
    translate,
    translateBatch,
    loading,
    error,
    translations
  };
}; 