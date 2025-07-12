import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import TranslatedText from './TranslatedText';

const TranslatedAlert = ({ message, language, onClose }) => {
  const { translate } = useTranslation(language);
  const [translatedMessage, setTranslatedMessage] = React.useState(message);

  React.useEffect(() => {
    const translateMessage = async () => {
      if (language !== 'en') {
        try {
          const translated = await translate(message);
          setTranslatedMessage(translated);
        } catch (error) {
          console.error('Failed to translate alert message:', error);
          setTranslatedMessage(message);
        }
      } else {
        setTranslatedMessage(message);
      }
    };

    translateMessage();
  }, [message, language, translate]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <p className="text-gray-800 mb-4">{translatedMessage}</p>
        <button
          onClick={onClose}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700"
        >
          <TranslatedText language={language}>OK</TranslatedText>
        </button>
      </div>
    </div>
  );
};

export default TranslatedAlert; 