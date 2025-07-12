export const handleFinancialQuery = (query, language) => {
  // Simulate GPT-4 response
  const responses = {
    'gold loan': {
      en: "Based on your query about gold loans, here's your personalized financial roadmap: Gold loans typically offer 60-80% of your gold's value at 7-15% interest rates. For a ₹50,000 gold loan, you'd pay ₹3,500-7,500 annually in interest. Consider this if you need quick funds with lower documentation.",
      hi: "सोने के लोन के बारे में आपके प्रश्न के आधार पर, यहाँ आपकी व्यक्तिगत वित्तीय योजना है: सोने के लोन आमतौर पर 7-15% ब्याज दर पर आपके सोने के मूल्य का 60-80% प्रदान करते हैं। ₹50,000 के सोने के लोन के लिए, आपको वार्षिक रूप से ₹3,500-7,500 ब्याज देना होगा। यदि आपको कम दस्तावेजों के साथ त्वरित धन की आवश्यकता है तो इसे विचार करें।"
    },
    'home loan': {
      en: "For home loans, current rates are 8.5-10.5% for salaried individuals. A ₹30 lakh loan for 20 years would cost ₹25,000-30,000 monthly EMI. Consider government schemes like PMAY for additional benefits. Your credit score of 750+ qualifies you for better rates.",
      hi: "होम लोन के लिए, वेतनभोगी व्यक्तियों के लिए वर्तमान दरें 8.5-10.5% हैं। 20 वर्षों के लिए ₹30 लाख के लोन की मासिक EMI ₹25,000-30,000 होगी। अतिरिक्त लाभों के लिए PMAY जैसी सरकारी योजनाओं पर विचार करें। आपका 750+ क्रेडिट स्कोर आपको बेहतर दरों के लिए योग्य बनाता है।"
    },
    'investment': {
      en: "Your investment strategy should include: 40% in equity mutual funds for growth, 30% in debt instruments for stability, 20% in gold for hedging, and 10% in emergency funds. Start with SIPs of ₹5,000 monthly for long-term wealth creation.",
      hi: "आपकी निवेश रणनीति में शामिल होना चाहिए: विकास के लिए इक्विटी म्यूचुअल फंड में 40%, स्थिरता के लिए डेट इंस्ट्रूमेंट्स में 30%, हेजिंग के लिए सोने में 20%, और आपातकालीन फंड में 10%। दीर्घकालिक धन सृजन के लिए ₹5,000 मासिक SIP से शुरू करें।"
    }
  };

  const queryLower = query.toLowerCase();
  let response = responses['investment']; // default response

  if (queryLower.includes('gold') || queryLower.includes('सोना')) {
    response = responses['gold loan'];
  } else if (queryLower.includes('home') || queryLower.includes('house') || queryLower.includes('घर')) {
    response = responses['home loan'];
  }

  return language === 'en' ? response.en : response.hi;
};

export const generateFinancialData = () => {
  // Generate sample financial roadmap data
  const roadmapData = {
    labels: ['Month 1', 'Month 3', 'Month 6', 'Month 12', 'Year 2', 'Year 5'],
    datasets: [{
      label: 'Investment Growth',
      data: [10000, 32000, 65000, 135000, 280000, 650000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  const trustData = {
    labels: ['Credit Score', 'Income Stability', 'Savings Rate', 'Investment Knowledge'],
    datasets: [{
      data: [85, 90, 70, 65],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(251, 191, 36, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  return { roadmap: roadmapData, trust: trustData };
}; 