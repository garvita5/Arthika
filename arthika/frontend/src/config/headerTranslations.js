export const headerTranslations = {
  en: {
    // Header elements
    speak: 'Speak',
    analyze: 'Analyze',
    roadmap: 'Roadmap',
    logOut: 'Log Out',
    listening: 'Listening...',
    voiceQuery: 'Voice Query',
    
    // Navigation items
    home: 'Home',
    allQueries: 'All Queries',
    schemes: 'Schemes',
    ngoAccess: 'NGO Access',
    export: 'Export',
    trustScore: 'Trust Score',
    
    // Status indicators
    online: 'Online',
    offline: 'Offline',
    
    // Tagline
    tagline: 'StoriesThatThink. AdviceThatFits.',
    
    // Loading states
    loading: 'Loading...',
    processing: 'Processing...'
  },
  hi: {
    // Header elements
    speak: 'बोलें',
    analyze: 'विश्लेषण',
    roadmap: 'मार्गचित्र',
    logOut: 'लॉग आउट',
    listening: 'सुन रहा है...',
    voiceQuery: 'बोलकर प्रश्न पूछें',
    
    // Navigation items
    home: 'मुखपृष्ठ',
    allQueries: 'सभी प्रश्न',
    schemes: 'योजनाएं',
    ngoAccess: 'एनजीओ पहुंच',
    export: 'निर्यात',
    trustScore: 'विश्वास स्कोर',
    
    // Status indicators
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    
    // Tagline
    tagline: 'कहानियां जो सोचती हैं। सलाह जो फिट बैठती है।',
    
    // Loading states
    loading: 'लोड हो रहा है...',
    processing: 'प्रोसेस हो रहा है...'
  }
};

export const getHeaderTranslation = (language, key) => {
  return headerTranslations[language]?.[key] || headerTranslations.en[key] || key;
}; 