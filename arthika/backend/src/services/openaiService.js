const OpenAI = require('openai');

class OpenAIService {
  constructor() {
    // Only initialize OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
      this.isAvailable = true;
    } else {
      console.log('OpenAI API key not found. Using mock responses for development.');
      this.isAvailable = false;
    }
  }

  async generateFinancialStory(question, language = 'en') {
    try {
      // If OpenAI is not available, return mock response
      if (!this.isAvailable) {
        return this.getMockResponse(question, language);
      }

      const systemPrompt = `You are Arthika, a compassionate and expert financial advisor for Indian users. 
      Create personalized, story-based financial guidance that helps users understand complex financial concepts.
      
      Guidelines:
      - Use simple, relatable language with Indian context
      - Include real-world scenarios and examples from Indian financial landscape
      - Provide specific, actionable steps and recommendations
      - Consider Indian financial products (PPF, EPF, mutual funds, gold loans, etc.)
      - Be empathetic, supportive, and culturally sensitive
      - Include detailed risk assessment and safer alternatives
      - Provide specific amounts, percentages, and timeframes
      - Consider different income levels and financial situations
      - Include government schemes and benefits where relevant
      
      Response format (JSON):
      {
        "storyResponse": "A compelling story-based explanation with specific examples and amounts...",
        "recommendedSteps": ["Specific actionable step 1", "Specific actionable step 2", "Specific actionable step 3"],
        "tags": ["loan", "investment", "savings", "insurance", "tax"],
        "riskLevel": "low/medium/high",
        "estimatedCost": "₹X,XXX - ₹Y,YYY",
        "saferAlternatives": ["Specific alternative 1 with details", "Specific alternative 2 with details"],
        "timeframe": "Short-term/Long-term",
        "expectedReturns": "X% annually",
        "governmentSchemes": ["Relevant government scheme 1", "Relevant government scheme 2"]
      }`;

      const userPrompt = `User Question: ${question}
      Language: ${language}
      
      Please provide a personalized, story-based financial analysis in ${language === 'en' ? 'English' : 'the requested language'}.
      
      Requirements:
      - Analyze the specific question and provide tailored advice
      - Include real Indian financial products and rates
      - Provide specific amounts, percentages, and calculations
      - Consider different scenarios and risk levels
      - Include government schemes and benefits where applicable
      - Make the response practical and actionable
      - Use cultural context and relatable examples`;

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Using GPT-3.5-turbo which is more widely available
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const response = completion.choices[0].message.content;
      
      // Try to parse JSON response, fallback to text if needed
      try {
        return JSON.parse(response);
      } catch (parseError) {
        // If response is not JSON, create a structured response
        return {
          storyResponse: response,
          recommendedSteps: [
            "Analyze your current financial situation",
            "Consider all available options",
            "Consult with a financial advisor"
          ],
          tags: ["financial-advice"],
          riskLevel: "medium",
          estimatedCost: "Varies",
          saferAlternatives: ["Consult a financial advisor", "Research thoroughly"]
        };
      }
    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Fallback to mock response
      return this.getMockResponse(question, language);
    }
  }

  getMockResponse(question, language) {
    const mockResponses = {
      'gold loan': {
        storyResponse: `Imagine you're planning a journey to a distant city. A gold loan is like taking a shortcut through a risky path. While it gets you there faster, you might lose your precious belongings if you can't repay on time. For a ₹50,000 gold loan, you'd typically pay ₹3,500-7,500 annually in interest. The bank holds your gold as security, so if you miss payments, you could lose your family's precious jewelry.`,
        recommendedSteps: [
          "Calculate your monthly repayment capacity",
          "Compare with other loan options",
          "Keep emergency funds aside",
          "Set up automatic payments",
          "Have a backup repayment plan"
        ],
        tags: ["loan", "gold", "risk"],
        riskLevel: "medium",
        estimatedCost: "₹3,500-7,500 annually",
        saferAlternatives: ["Personal loan", "Credit card", "Emergency fund"]
      },
      'home loan': {
        storyResponse: `Think of buying a home like planting a tree that will grow for generations. A ₹30 lakh home loan for 20 years is like nurturing this tree - it requires consistent care (monthly EMIs of ₹25,000-30,000). While it seems expensive now, this tree will provide shelter and potentially grow in value over time.`,
        recommendedSteps: [
          "Check your credit score first",
          "Save for down payment (20%)",
          "Compare interest rates from multiple banks",
          "Consider government schemes like PMAY",
          "Plan for additional costs (registration, insurance)"
        ],
        tags: ["loan", "housing", "investment"],
        riskLevel: "low",
        estimatedCost: "₹25,000-30,000 monthly EMI",
        saferAlternatives: ["Rent and invest difference", "Smaller property", "Joint ownership"]
      },
      'investment': {
        storyResponse: `Picture your money as seeds that can grow into a forest. A smart investment strategy is like planting different types of trees - some grow fast (equity), some provide steady shade (debt), and some protect against storms (gold). Start with ₹5,000 monthly SIPs and watch your forest grow over time.`,
        recommendedSteps: [
          "Start with emergency fund (6 months expenses)",
          "Invest 40% in equity mutual funds",
          "Allocate 30% to debt instruments",
          "Keep 20% in gold for hedging",
          "Maintain 10% in liquid funds"
        ],
        tags: ["investment", "savings", "planning"],
        riskLevel: "low",
        estimatedCost: "₹5,000 monthly SIP",
        saferAlternatives: ["Fixed deposits", "PPF", "Government bonds"]
      }
    };

    const queryLower = question.toLowerCase();
    let response = mockResponses['investment']; // default response

    if (queryLower.includes('gold') || queryLower.includes('सोना')) {
      response = mockResponses['gold loan'];
    } else if (queryLower.includes('home') || queryLower.includes('house') || queryLower.includes('घर')) {
      response = mockResponses['home loan'];
    }

    return response;
  }

  async translateResponse(response, targetLanguage) {
    if (targetLanguage === 'en') {
      return response;
    }

    // For development, return the original response
    // In production, you would use OpenAI for translation
    console.log(`Translation requested to ${targetLanguage} (mock response)`);
    return response;
  }
}

module.exports = new OpenAIService(); 