import { translateText, getLibreTranslateCode } from './translationService';

export const handleFinancialQuery = async (query, language) => {
  // Simulate GPT-4 response in English
  const responses = {
    'gold loan': "Based on your query about gold loans, here's your personalized financial roadmap: Gold loans typically offer 60-80% of your gold's value at 7-15% interest rates. For a ₹50,000 gold loan, you'd pay ₹3,500-7,500 annually in interest. Consider this if you need quick funds with lower documentation.",
    'home loan': "For home loans, current rates are 8.5-10.5% for salaried individuals. A ₹30 lakh loan for 20 years would cost ₹25,000-30,000 monthly EMI. Consider government schemes like PMAY for additional benefits. Your credit score of 750+ qualifies you for better rates.",
    'investment': "Your investment strategy should include: 40% in equity mutual funds for growth, 30% in debt instruments for stability, 20% in gold for hedging, and 10% in emergency funds. Start with SIPs of ₹5,000 monthly for long-term wealth creation."
  };

  const queryLower = query.toLowerCase();
  let response = responses['investment']; // default response

  if (queryLower.includes('gold') || queryLower.includes('सोना')) {
    response = responses['gold loan'];
  } else if (queryLower.includes('home') || queryLower.includes('house') || queryLower.includes('घर')) {
    response = responses['home loan'];
  }

  // Translate the response if not in English
  if (language !== 'en') {
    try {
      response = await translateText(response, getLibreTranslateCode(language), 'en');
    } catch (error) {
      console.error('Failed to translate AI response:', error);
      // Return English response if translation fails
    }
  }

  return response;
};

export const generateFinancialData = () => {
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