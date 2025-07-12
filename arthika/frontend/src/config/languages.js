export const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳'
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    flag: '🇧🇩'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    flag: '🇮🇳'
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    flag: '🇮🇳'
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    flag: '🇮🇳'
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    flag: '🇮🇳'
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    flag: '🇮🇳'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    flag: '🇮🇳'
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    flag: '🇮🇳'
  }
];

// Translations for header elements
export const headerTranslations = {
  en: {
    speak: 'Speak',
    analyze: 'Analyze',
    roadmap: 'Roadmap'
  },
  hi: {
    speak: 'बोलें',
    analyze: 'विश्लेषण',
    roadmap: 'योजना'
  },
  bn: {
    speak: 'কথা বলুন',
    analyze: 'বিশ্লেষণ',
    roadmap: 'পরিকল্পনা'
  },
  ta: {
    speak: 'பேசுங்கள்',
    analyze: 'பகுப்பாய்வு',
    roadmap: 'திட்டம்'
  },
  te: {
    speak: 'మాట్లాడండి',
    analyze: 'విశ్లేషణ',
    roadmap: 'ప్రణాళిక'
  },
  mr: {
    speak: 'बोला',
    analyze: 'विश्लेषण',
    roadmap: 'योजना'
  },
  gu: {
    speak: 'બોલો',
    analyze: 'વિશ્લેષણ',
    roadmap: 'યોજના'
  },
  kn: {
    speak: 'ಮಾತನಾಡಿ',
    analyze: 'ವಿಶ್ಲೇಷಣೆ',
    roadmap: 'ಯೋಜನೆ'
  },
  ml: {
    speak: 'സംസാരിക്കുക',
    analyze: 'വിശകലനം',
    roadmap: 'പദ്ധതി'
  },
  pa: {
    speak: 'ਬੋਲੋ',
    analyze: 'ਵਿਸ਼ਲੇਸ਼ਣ',
    roadmap: 'ਯੋਜਨਾ'
  }
};

export const getTranslation = (language, key) => {
  return headerTranslations[language]?.[key] || headerTranslations.en[key];
}; 