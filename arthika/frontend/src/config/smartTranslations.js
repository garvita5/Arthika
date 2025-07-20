import { translateText } from '../services/translationService';
import { getHomepageTranslation } from './homepageTranslations';

// Cache for API translations to avoid repeated calls
const translationCache = new Map();

/**
 * Smart translation function that tries API first, then falls back to manual translations
 * @param {string} text - Text to translate
 * @param {string} language - Target language
 * @param {string} section - Translation section (for manual fallback)
 * @param {string} key - Translation key (for manual fallback)
 * @param {number} index - Index for array translations (optional)
 * @returns {Promise<string>} - Translated text
 */
export const smartTranslate = async (text, language, section = null, key = null, index = null) => {
  // If English, return original text
  if (language === 'en') {
    return text;
  }

  // Check if we have a manual translation available
  let manualTranslation = null;
  if (section && key) {
    try {
      manualTranslation = getHomepageTranslation(language, section, key, index);
    } catch (error) {
      console.warn('Manual translation not found:', section, key);
    }
  }

  // Create cache key
  const cacheKey = `${text}_${language}`;
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // Try API translation first
  try {
    const apiTranslation = await translateText(text, language, 'en');
    
    // If API translation is different from original, use it
    if (apiTranslation && apiTranslation !== text) {
      translationCache.set(cacheKey, apiTranslation);
      return apiTranslation;
    }
  } catch (error) {
    console.warn('API translation failed, falling back to manual:', error);
  }

  // Fallback to manual translation
  if (manualTranslation) {
    translationCache.set(cacheKey, manualTranslation);
    return manualTranslation;
  }

  // If no manual translation available, return original text
  translationCache.set(cacheKey, text);
  return text;
};

/**
 * Smart translation hook for React components
 * @param {string} text - Text to translate
 * @param {string} language - Target language
 * @param {string} section - Translation section (for manual fallback)
 * @param {string} key - Translation key (for manual fallback)
 * @param {number} index - Index for array translations (optional)
 * @returns {Object} - { translatedText, isLoading, isFallback }
 */
export const useSmartTranslation = (text, language, section = null, key = null, index = null) => {
  const [translatedText, setTranslatedText] = React.useState(text);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFallback, setIsFallback] = React.useState(false);

  React.useEffect(() => {
    const translate = async () => {
      if (!text || language === 'en') {
        setTranslatedText(text);
        setIsFallback(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const result = await smartTranslate(text, language, section, key, index);
        setTranslatedText(result);
        
        // Check if this is a fallback (same as manual translation)
        if (section && key) {
          const manual = getHomepageTranslation(language, section, key, index);
          setIsFallback(result === manual);
        } else {
          setIsFallback(result === text);
        }
      } catch (error) {
        console.error('Smart translation failed:', error);
        setTranslatedText(text);
        setIsFallback(true);
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [text, language, section, key, index]);

  return { translatedText, isLoading, isFallback };
};

/**
 * Enhanced getHomepageTranslation with API fallback
 * @param {string} language - Target language
 * @param {string} section - Translation section
 * @param {string} key - Translation key
 * @param {number} index - Index for array translations (optional)
 * @returns {string} - Translated text
 */
export const getSmartTranslation = (language, section, key, index = null) => {
  // First try manual translation
  const manualTranslation = getHomepageTranslation(language, section, key, index);
  
  // If it's English or we have a manual translation, return it
  if (language === 'en' || manualTranslation) {
    return manualTranslation;
  }
  
  // For dynamic content, return the key as fallback
  return key;
};

/**
 * Clear translation cache
 */
export const clearTranslationCache = () => {
  translationCache.clear();
}; 