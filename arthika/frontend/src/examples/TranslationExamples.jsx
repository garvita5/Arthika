import React from 'react';
import { getHomepageTranslation } from '../config/homepageTranslations';
import { getSmartTranslation, smartTranslate } from '../config/smartTranslations';
import SmartTranslatedText from '../components/SmartTranslatedText';

/**
 * Example component showing different translation approaches
 */
const TranslationExamples = ({ language }) => {
  const [dynamicText, setDynamicText] = React.useState('This is dynamic content from user input');
  const [apiTranslatedText, setApiTranslatedText] = React.useState('');

  // Example 1: Manual translation (fastest, most reliable)
  const manualTranslation = getHomepageTranslation(language, 'hero', 'title');

  // Example 2: Smart translation (API first, manual fallback)
  const smartTranslation = getSmartTranslation(language, 'hero', 'title');

  // Example 3: Async API translation with manual fallback
  React.useEffect(() => {
    const translateDynamicText = async () => {
      const result = await smartTranslate(
        dynamicText, 
        language, 
        'dynamicContent', 
        'userInput'
      );
      setApiTranslatedText(result);
    };

    if (language !== 'en') {
      translateDynamicText();
    }
  }, [dynamicText, language]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Translation Examples</h2>
      
      {/* Example 1: Manual Translation */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">1. Manual Translation (Fastest)</h3>
        <p className="text-gray-700">
          <strong>Result:</strong> {manualTranslation}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Uses pre-defined translations, instant loading
        </p>
      </div>

      {/* Example 2: Smart Translation */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">2. Smart Translation (Hybrid)</h3>
        <p className="text-gray-700">
          <strong>Result:</strong> {smartTranslation}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          API first, manual fallback, cached results
        </p>
      </div>

      {/* Example 3: Async API Translation */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">3. Async API Translation</h3>
        <p className="text-gray-700">
          <strong>Original:</strong> {dynamicText}
        </p>
        <p className="text-gray-700">
          <strong>Translated:</strong> {apiTranslatedText || 'Loading...'}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          For dynamic content, API first, manual fallback
        </p>
      </div>

      {/* Example 4: SmartTranslatedText Component */}
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">4. SmartTranslatedText Component</h3>
        <div className="space-y-2">
          <p>
            <strong>With fallback:</strong>{' '}
            <SmartTranslatedText 
              language={language}
              section="hero"
              key="title"
              showFallbackIndicator={true}
            >
              Understand your money in your language
            </SmartTranslatedText>
          </p>
          <p>
            <strong>API only:</strong>{' '}
            <SmartTranslatedText 
              language={language}
              fallbackToManual={false}
            >
              This will only use API translation
            </SmartTranslatedText>
          </p>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Usage Guidelines</h3>
        <div className="text-sm space-y-1">
          <p><strong>Manual Translation:</strong> Use for static UI elements, buttons, labels</p>
          <p><strong>Smart Translation:</strong> Use for content that might change, with fallback</p>
          <p><strong>API Translation:</strong> Use for dynamic user-generated content</p>
          <p><strong>SmartTranslatedText:</strong> Use in JSX when you need loading states</p>
        </div>
      </div>
    </div>
  );
};

export default TranslationExamples; 