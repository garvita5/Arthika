// Translation service with CORS proxy and fallback options
const LIBRE_TRANSLATE_API = 'https://libretranslate.de/translate';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const BACKUP_API = 'https://api.mymemory.translated.net/get';

// Cache for translations to avoid repeated API calls
const translationCache = new Map();

// Simple translation fallback for common phrases
const fallbackTranslations = {
  'hi': {
    'Welcome to Arthika': 'अर्थिका में आपका स्वागत है',
    'Your AI Financial Advisor': 'आपका AI वित्तीय सलाहकार',
    'Speak your financial goals': 'अपने वित्तीय लक्ष्य बताएं',
    'Analyze with AI': 'AI के साथ विश्लेषण करें',
    'Get your roadmap': 'अपना रोडमैप प्राप्त करें',
    'Start Speaking': 'बोलना शुरू करें',
    'Analyze': 'विश्लेषण करें',
    'Get Roadmap': 'रोडमैप प्राप्त करें',
    'Export Plan': 'योजना निर्यात करें',
    'Save Plan': 'योजना सहेजें',
    'Sorry, I encountered an error processing your query. Please try again.': 'क्षमा करें, आपके प्रश्न को संसाधित करने में त्रुटि आई। कृपया पुनः प्रयास करें।',
    'Network error. Please check your connection and try again.': 'नेटवर्क त्रुटि। कृपया अपना कनेक्शन जांचें और पुनः प्रयास करें।',
    'Financial plan exported successfully! Check your downloads.': 'वित्तीय योजना सफलतापूर्वक निर्यात की गई! अपने डाउनलोड जांचें।',
    'Your plan has been saved successfully.': 'आपकी योजना सफलतापूर्वक सहेजी गई है।',
    'Processing your request...': 'आपका अनुरोध संसाधित हो रहा है...',
    'Translating...': 'अनुवाद हो रहा है...',
    'OK': 'ठीक है',
    'Cancel': 'रद्द करें',
    'Retry': 'पुनः प्रयास करें',
    'Close': 'बंद करें',
    'Choose Language': 'भाषा चुनें',
    'English': 'अंग्रेजी',
    'Hindi': 'हिंदी',
    'Bengali': 'बंगाली',
    'Tamil': 'तमिल',
    'Telugu': 'तेलुगु',
    'Marathi': 'मराठी',
    'Gujarati': 'गुजराती',
    'Kannada': 'कन्नड़',
    'Malayalam': 'मलयालम',
    'Punjabi': 'पंजाबी'
  },
  'bn': {
    'Welcome to Arthika': 'আর্থিকায় স্বাগতম',
    'Your AI Financial Advisor': 'আপনার AI আর্থিক উপদেষ্টা',
    'Speak your financial goals': 'আপনার আর্থিক লক্ষ্যগুলি বলুন',
    'Analyze with AI': 'AI দিয়ে বিশ্লেষণ করুন',
    'Get your roadmap': 'আপনার রোডম্যাপ পান',
    'Start Speaking': 'কথা বলা শুরু করুন',
    'Analyze': 'বিশ্লেষণ করুন',
    'Get Roadmap': 'রোডম্যাপ পান',
    'Export Plan': 'পরিকল্পনা রপ্তানি করুন',
    'Save Plan': 'পরিকল্পনা সংরক্ষণ করুন',
    'Choose Language': 'ভাষা নির্বাচন করুন',
    'English': 'ইংরেজি',
    'Hindi': 'হিন্দি',
    'Bengali': 'বাংলা',
    'Tamil': 'তামিল',
    'Telugu': 'তেলুগু',
    'Marathi': 'মারাঠি',
    'Gujarati': 'গুজরাটি',
    'Kannada': 'কন্নড়',
    'Malayalam': 'মালয়ালম',
    'Punjabi': 'পাঞ্জাবি'
  },
  'ta': {
    'Welcome to Arthika': 'அர்த்திகாவிற்கு வரவேற்கிறோம்',
    'Your AI Financial Advisor': 'உங்கள் AI நிதி ஆலோசகர்',
    'Speak your financial goals': 'உங்கள் நிதி இலக்குகளை பேசுங்கள்',
    'Analyze with AI': 'AI உடன் பகுப்பாய்வு செய்யுங்கள்',
    'Get your roadmap': 'உங்கள் வழிகாட்டியைப் பெறுங்கள்',
    'Start Speaking': 'பேசத் தொடங்குங்கள்',
    'Analyze': 'பகுப்பாய்வு செய்யுங்கள்',
    'Get Roadmap': 'வழிகாட்டியைப் பெறுங்கள்',
    'Export Plan': 'திட்டத்தை ஏற்றுமதி செய்யுங்கள்',
    'Save Plan': 'திட்டத்தை சேமிக்கவும்',
    'Choose Language': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'English': 'ஆங்கிலம்',
    'Hindi': 'ஹிந்தி',
    'Bengali': 'வங்காளம்',
    'Tamil': 'தமிழ்',
    'Telugu': 'தெலுங்கு',
    'Marathi': 'மராத்தி',
    'Gujarati': 'குஜராத்தி',
    'Kannada': 'கன்னடம்',
    'Malayalam': 'மலையாளம்',
    'Punjabi': 'பஞ்சாபி'
  },
  'te': {
    'Welcome to Arthika': 'అర్థికకి స్వాగతం',
    'Your AI Financial Advisor': 'మీ AI ఆర్థిక సలహాదారుడు',
    'Speak your financial goals': 'మీ ఆర్థిక లక్ష్యాలను చెప్పండి',
    'Analyze with AI': 'AI తో విశ్లేషించండి',
    'Get your roadmap': 'మీ రోడ్మ్యాప్ పొందండి',
    'Start Speaking': 'మాట్లాడటం ప్రారంభించండి',
    'Analyze': 'విశ్లేషించండి',
    'Get Roadmap': 'రోడ్మ్యాప్ పొందండి',
    'Export Plan': 'ప్లాన్ ఎగుమతి చేయండి',
    'Save Plan': 'ప్లాన్ సేవ్ చేయండి',
    'Choose Language': 'భాషను ఎంచుకోండి',
    'English': 'ఆంగ్లం',
    'Hindi': 'హిందీ',
    'Bengali': 'బెంగాలీ',
    'Tamil': 'తమిళం',
    'Telugu': 'తెలుగు',
    'Marathi': 'మరాఠీ',
    'Gujarati': 'గుజరాతీ',
    'Kannada': 'కన్నడ',
    'Malayalam': 'మలయాళం',
    'Punjabi': 'పంజాబీ'
  },
  'mr': {
    'Welcome to Arthika': 'अर्थिकामध्ये आपले स्वागत आहे',
    'Your AI Financial Advisor': 'तुमचा AI आर्थिक सल्लागार',
    'Speak your financial goals': 'तुमचे आर्थिक ध्येय सांगा',
    'Analyze with AI': 'AI सह विश्लेषण करा',
    'Get your roadmap': 'तुमचा रोडमॅप मिळवा',
    'Start Speaking': 'बोलणे सुरू करा',
    'Analyze': 'विश्लेषण करा',
    'Get Roadmap': 'रोडमॅप मिळवा',
    'Export Plan': 'योजना निर्यात करा',
    'Save Plan': 'योजना जतन करा',
    'Choose Language': 'भाषा निवडा',
    'English': 'इंग्रजी',
    'Hindi': 'हिंदी',
    'Bengali': 'बंगाली',
    'Tamil': 'तामिळ',
    'Telugu': 'तेलुगू',
    'Marathi': 'मराठी',
    'Gujarati': 'गुजराती',
    'Kannada': 'कन्नड',
    'Malayalam': 'मल्याळम',
    'Punjabi': 'पंजाबी'
  }
};

export const translateText = async (text, targetLanguage, sourceLanguage = 'en') => {
  if (!text || targetLanguage === sourceLanguage) {
    return text;
  }

  // Create cache key
  const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`;
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  // Try fallback translations first for common phrases
  if (fallbackTranslations[targetLanguage] && fallbackTranslations[targetLanguage][text]) {
    const fallbackResult = fallbackTranslations[targetLanguage][text];
    translationCache.set(cacheKey, fallbackResult);
    return fallbackResult;
  }

  // Try multiple translation approaches
  const translationAttempts = [
    // Attempt 1: Direct LibreTranslate with CORS proxy
    async () => {
      try {
        const response = await fetch(`${CORS_PROXY}${LIBRE_TRANSLATE_API}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:5175'
          },
          body: JSON.stringify({
            q: text,
            source: sourceLanguage,
            target: targetLanguage,
            format: 'text'
          })
        });

        if (!response.ok) {
          throw new Error('LibreTranslate failed');
        }

        const data = await response.json();
        return data.translatedText || text;
      } catch (error) {
        throw new Error('LibreTranslate failed');
      }
    },
    
    // Attempt 2: MyMemory API (no CORS issues)
    async () => {
      try {
        const url = `${BACKUP_API}?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('MyMemory failed');
        }

        const data = await response.json();
        return data.responseData?.translatedText || text;
      } catch (error) {
        throw new Error('MyMemory failed');
      }
    }
  ];

  // Try each translation method
  for (let i = 0; i < translationAttempts.length; i++) {
    try {
      const result = await translationAttempts[i]();
      translationCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.warn(`Translation attempt ${i + 1} failed:`, error.message);
      
      // If this is the last attempt, return original text
      if (i === translationAttempts.length - 1) {
        console.warn('All translation methods failed, returning original text');
        translationCache.set(cacheKey, text);
        return text;
      }
    }
  }
};

// Batch translate multiple texts
export const translateBatch = async (texts, targetLanguage, sourceLanguage = 'en') => {
  const results = {};
  
  for (const [key, text] of Object.entries(texts)) {
    results[key] = await translateText(text, targetLanguage, sourceLanguage);
  }
  
  return results;
};

// Translate UI text automatically
export const translateUI = async (text, language) => {
  if (language === 'en') {
    return text;
  }
  
  return await translateText(text, language, 'en');
};

// Language code mapping for translation APIs
export const getLibreTranslateCode = (language) => {
  const languageMap = {
    'en': 'en',
    'hi': 'hi',
    'bn': 'bn',
    'ta': 'ta',
    'te': 'te',
    'mr': 'mr',
    'gu': 'gu',
    'kn': 'kn',
    'ml': 'ml',
    'pa': 'pa'
  };
  return languageMap[language] || 'en';
}; 