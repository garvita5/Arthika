const openaiService = require('../services/openaiService');
const databaseService = require('../services/databaseService');

// Generate dynamic roadmap based on query response
function generateDynamicRoadmap(queryResponse, question) {
  // Add error handling for undefined parameters
  if (!queryResponse) {
    console.error('queryResponse is undefined in generateDynamicRoadmap');
    queryResponse = {};
  }
  if (!question) {
    console.error('question is undefined in generateDynamicRoadmap');
    question = '';
  }
  
  // Extract information from the AI response
  const { 
    tags = [], 
    riskLevel = 'medium', 
    estimatedCost = 'Varies', 
    timeframe = 'Varies', 
    recommendedSteps = [],
    storyResponse = '',
    saferAlternatives = [],
    expectedReturns = 'Varies',
    governmentSchemes = []
  } = queryResponse;
  
  // Parse estimated cost to get numeric values from AI response
  const costMatch = estimatedCost.match(/₹?([\d,]+)/);
  let baseAmount = costMatch ? parseInt(costMatch[1].replace(/,/g, '')) : 50000;
  
  // Also try to extract amount from the question itself - improved regex
  const questionAmountMatch = question.match(/(\d{1,3}(?:,\d{3})*(?:,\d{3})*)/);
  const questionAmount = questionAmountMatch ? parseInt(questionAmountMatch[1].replace(/,/g, '')) : null;
  
  // Use the amount from the question if it's larger than the estimated cost
  let finalBaseAmount = questionAmount && questionAmount > baseAmount ? questionAmount : baseAmount;
  
  // For investment queries, prioritize the amount mentioned in the question
  const queryLower = question.toLowerCase();
  if (queryLower.includes('invest') && questionAmount) {
    finalBaseAmount = questionAmount;
  }
  
  console.log(`Amount detected: Question=${questionAmount}, Estimated=${baseAmount}, Final=${finalBaseAmount}`);
  
  // Determine roadmap type based on AI response tags and content
  const responseLower = storyResponse.toLowerCase();
  let roadmapType = 'investment';
  
  // Use AI response content to determine roadmap type - prioritize investment over debt
  if (responseLower.includes('invest') || responseLower.includes('mutual fund') || responseLower.includes('stock') || responseLower.includes('equity') || queryLower.includes('invest') || tags.includes('investment')) {
    roadmapType = 'investment';
  } else if (responseLower.includes('home') || responseLower.includes('house') || responseLower.includes('property') || queryLower.includes('home') || queryLower.includes('house') || tags.includes('housing')) {
    roadmapType = 'home_purchase';
  } else if (responseLower.includes('save') || responseLower.includes('emergency') || queryLower.includes('save') || queryLower.includes('emergency') || tags.includes('savings')) {
    roadmapType = 'savings';
  } else if (responseLower.includes('retirement') || responseLower.includes('pension') || queryLower.includes('retirement') || queryLower.includes('pension') || tags.includes('retirement')) {
    roadmapType = 'retirement';
  } else if (responseLower.includes('loan') || responseLower.includes('debt') || queryLower.includes('loan') || queryLower.includes('debt') || tags.includes('loan')) {
    roadmapType = 'debt_management';
  }
  
  // Generate roadmap steps based on AI recommended steps
  const roadmapSteps = generateRoadmapStepsFromAI(roadmapType, finalBaseAmount, recommendedSteps, storyResponse, saferAlternatives, timeframe);
  
  // Calculate summary based on steps
  const totalSavings = roadmapSteps.reduce((sum, step) => sum + (step.savings || 0), 0);
  const totalDebt = roadmapSteps.reduce((sum, step) => sum + (step.debt || 0), 0);
  const netWorth = totalSavings + totalDebt;

  return {
    summary: {
      totalSavings,
      totalDebt,
      netWorth,
      timeline: timeframe
    },
    steps: roadmapSteps,
    type: roadmapType,
    riskLevel,
    estimatedCost,
    expectedReturns,
    governmentSchemes
  };
}

function generateRoadmapStepsFromAI(type, baseAmount, recommendedSteps, storyResponse, saferAlternatives, timeframe) {
  const steps = [];
  
  // Use AI recommended steps if available, otherwise generate based on type
  if (recommendedSteps && recommendedSteps.length > 0) {
    // Create steps from AI recommendations
    const usedTitles = new Set(); // Track used titles to avoid duplicates
    
    recommendedSteps.forEach((step, index) => {
              // Calculate appropriate amounts based on step content
        let stepAmount = Math.round(baseAmount * (0.2 + index * 0.15));
        let stepDebt = 0;
        
        // Adjust amounts based on step content
        const stepLower = step.toLowerCase();
        if (stepLower.includes('emergency') || stepLower.includes('fund')) {
          stepAmount = Math.round(baseAmount * 0.3);
        } else if (stepLower.includes('equity') || stepLower.includes('mutual fund')) {
          stepAmount = Math.round(baseAmount * 0.4);
        } else if (stepLower.includes('debt') || stepLower.includes('loan')) {
          stepAmount = Math.round(baseAmount * 0.2);
          stepDebt = -Math.round(baseAmount * 0.5);
        } else if (stepLower.includes('gold') || stepLower.includes('diversification')) {
          stepAmount = Math.round(baseAmount * 0.1);
        } else if (stepLower.includes('savings') || stepLower.includes('deposit')) {
          stepAmount = Math.round(baseAmount * 0.25);
        } else if (stepLower.includes('nps') || stepLower.includes('retirement')) {
          stepAmount = Math.round(baseAmount * 0.3);
        } else if (stepLower.includes('liquid') || stepLower.includes('maintain')) {
          stepAmount = Math.round(baseAmount * 0.1);
        }
      
      // Create clean title from step content
      let title = step;
      if (stepLower.includes('emergency')) {
        title = 'Emergency Fund';
      } else if (stepLower.includes('equity') || stepLower.includes('mutual fund')) {
        title = 'Equity Investment';
      } else if (stepLower.includes('debt')) {
        title = 'Debt Management';
      } else if (stepLower.includes('gold')) {
        title = 'Gold Investment';
      } else if (stepLower.includes('savings')) {
        title = 'Savings Plan';
      } else if (stepLower.includes('nps')) {
        title = 'NPS Contribution';
      } else if (stepLower.includes('liquid') || stepLower.includes('maintain')) {
        title = 'Liquid Funds';
      } else {
        // Take first few words as title
        title = step.split(' ').slice(0, 3).join(' ');
      }
      
      // Avoid duplicate titles
      if (usedTitles.has(title)) {
        title = `${title} ${index + 1}`;
      }
      usedTitles.add(title);
      
      steps.push({
        id: index + 1,
        title: title,
        description: step,
        status: 'pending',
        timeline: `Month ${index * 3 + 1}-${index * 3 + 3}`,
        savings: stepAmount,
        debt: stepDebt
      });
    });
  } else {
    // Generate steps based on type and AI response content
    const responseLower = storyResponse.toLowerCase();
    
    // Calculate dynamic amounts based on AI response context
    const emergencyFundAmount = Math.round(baseAmount * 0.3);
    const investmentAmount = Math.round(baseAmount * 0.4);
    const debtAmount = Math.round(baseAmount * 0.5);
    
    switch (type) {
      case 'debt_management':
        steps.push(
          {
            id: 1,
            title: 'Emergency Fund',
            description: responseLower.includes('emergency') ? 
              'Build emergency fund as recommended' : 
              `Build ₹${emergencyFundAmount.toLocaleString()} emergency fund before taking any loans`,
            status: 'pending',
            timeline: 'Month 1-3',
            savings: emergencyFundAmount,
            debt: 0
          },
          {
            id: 2,
            title: 'Debt Assessment',
            description: responseLower.includes('debt') ? 
              'Analyze current debt as suggested' : 
              'Analyze current debt and create repayment plan',
            status: 'pending',
            timeline: 'Month 4-6',
            savings: 0,
            debt: -debtAmount
          },
          {
            id: 3,
            title: 'Alternative Options',
            description: saferAlternatives.length > 0 ? 
              `Consider: ${saferAlternatives.slice(0, 2).join(', ')}` : 
              'Explore safer alternatives with lower interest rates',
            status: 'pending',
            timeline: 'Month 7-9',
            savings: Math.round(baseAmount * 0.2),
            debt: 0
          },
          {
            id: 4,
            title: 'Debt Repayment',
            description: responseLower.includes('repayment') ? 
              'Follow the repayment strategy suggested' : 
              'Systematic debt repayment with priority to high-interest loans',
            status: 'pending',
            timeline: 'Month 10-12',
            savings: 0,
            debt: -Math.round(baseAmount * 0.8)
          }
        );
        break;

      case 'investment':
        steps.push(
          {
            id: 1,
            title: 'Emergency Fund',
            description: responseLower.includes('emergency') ? 
              'Build emergency fund as recommended' : 
              `Build ₹${emergencyFundAmount.toLocaleString()} emergency fund first (6 months expenses)`,
            status: 'pending',
            timeline: 'Month 1-3',
            savings: emergencyFundAmount,
            debt: 0
          },
          {
            id: 2,
            title: 'Equity Investment',
            description: responseLower.includes('equity') || responseLower.includes('mutual fund') ? 
              'Start equity investments as suggested' : 
              `Start ₹${investmentAmount.toLocaleString()} SIP in equity mutual funds for growth`,
            status: 'pending',
            timeline: 'Month 4-9',
            savings: investmentAmount,
            debt: 0
          },
          {
            id: 3,
            title: 'Debt Instruments',
            description: responseLower.includes('debt instrument') ? 
              'Allocate to debt instruments as recommended' : 
              `Allocate ₹${Math.round(baseAmount * 0.3).toLocaleString()} to debt instruments for stability`,
            status: 'pending',
            timeline: 'Month 10-15',
            savings: Math.round(baseAmount * 0.3),
            debt: 0
          },
          {
            id: 4,
            title: 'Portfolio Diversification',
            description: responseLower.includes('diversification') || responseLower.includes('gold') ? 
              'Diversify portfolio as suggested' : 
              `Invest ₹${Math.round(baseAmount * 0.1).toLocaleString()} in gold for portfolio diversification`,
            status: 'pending',
            timeline: 'Month 16-21',
            savings: Math.round(baseAmount * 0.1),
            debt: 0
          }
        );
        break;

      case 'savings':
        steps.push(
          {
            id: 1,
            title: 'Emergency Fund',
            description: responseLower.includes('emergency') ? 
              'Build emergency fund as recommended' : 
              `Build ₹${emergencyFundAmount.toLocaleString()} emergency fund (6 months expenses)`,
            status: 'pending',
            timeline: 'Month 1-6',
            savings: emergencyFundAmount,
            debt: 0
          },
          {
            id: 2,
            title: 'High-Yield Savings',
            description: responseLower.includes('high-yield') ? 
              'Move to high-yield accounts as suggested' : 
              'Move savings to high-yield accounts (4-6% interest)',
            status: 'pending',
            timeline: 'Month 7-12',
            savings: Math.round(baseAmount * 0.3),
            debt: 0
          },
          {
            id: 3,
            title: 'Recurring Deposits',
            description: responseLower.includes('recurring') ? 
              'Start recurring deposits as recommended' : 
              'Start systematic investment plans',
            status: 'pending',
            timeline: 'Month 13-18',
            savings: Math.round(baseAmount * 0.2),
            debt: 0
          },
          {
            id: 4,
            title: 'Long-term Savings',
            description: responseLower.includes('long-term') ? 
              'Invest in long-term instruments as suggested' : 
              'Invest in long-term savings instruments',
            status: 'pending',
            timeline: 'Month 19-24',
            savings: Math.round(baseAmount * 0.1),
            debt: 0
          }
        );
        break;

      case 'retirement':
        steps.push(
          {
            id: 1,
            title: 'NPS Contribution',
            description: responseLower.includes('nps') ? 
              'Start NPS contributions as recommended' : 
              `Start ₹${Math.round(baseAmount * 0.3).toLocaleString()} NPS contributions for retirement`,
            status: 'pending',
            timeline: 'Month 1-12',
            savings: Math.round(baseAmount * 0.3),
            debt: 0
          },
          {
            id: 2,
            title: 'Equity Investment',
            description: responseLower.includes('equity') ? 
              'Invest in equity as recommended' : 
              `Invest ₹${investmentAmount.toLocaleString()} in equity mutual funds for growth`,
            status: 'pending',
            timeline: 'Month 13-24',
            savings: investmentAmount,
            debt: 0
          },
          {
            id: 3,
            title: 'Real Estate',
            description: responseLower.includes('real estate') ? 
              'Consider real estate as suggested' : 
              'Consider real estate for rental income',
            status: 'pending',
            timeline: 'Month 25-36',
            savings: Math.round(baseAmount * 0.2),
            debt: 0
          },
          {
            id: 4,
            title: 'Healthcare Planning',
            description: responseLower.includes('healthcare') ? 
              'Plan for healthcare as recommended' : 
              'Plan for healthcare costs in retirement',
            status: 'pending',
            timeline: 'Month 37-48',
            savings: Math.round(baseAmount * 0.1),
            debt: 0
          }
        );
        break;

      default:
        // Generic steps based on AI response
        steps.push(
          {
            id: 1,
            title: 'Initial Assessment',
            description: 'Assess current financial situation',
            status: 'pending',
            timeline: 'Month 1-2',
            savings: Math.round(baseAmount * 0.2),
            debt: 0
          },
          {
            id: 2,
            title: 'Goal Setting',
            description: 'Define clear financial goals',
            status: 'pending',
            timeline: 'Month 3-4',
            savings: Math.round(baseAmount * 0.3),
            debt: 0
          },
          {
            id: 3,
            title: 'Implementation',
            description: 'Start implementing the recommended strategy',
            status: 'pending',
            timeline: 'Month 5-8',
            savings: Math.round(baseAmount * 0.4),
            debt: 0
          },
          {
            id: 4,
            title: 'Review & Adjust',
            description: 'Regular review and adjustment of the plan',
            status: 'pending',
            timeline: 'Month 9-12',
            savings: Math.round(baseAmount * 0.1),
            debt: 0
          }
        );
    }
  }

  return steps;
}

class QueryController {
  async handleFinancialQuery(req, res) {
    try {
      const { question, language = 'en', userId } = req.body;

      if (!question) {
        return res.status(400).json({
          success: false,
          error: 'Question is required'
        });
      }

      console.log(`Processing query: "${question}" in ${language} for user: ${userId}`);

      // Generate AI response
      const aiResponse = await openaiService.generateFinancialStory(question, language);

      // Add debugging and error handling
      console.log('AI Response:', JSON.stringify(aiResponse, null, 2));
      
      if (!aiResponse) {
        throw new Error('AI response is undefined');
      }

      // Generate dynamic roadmap based on the response
      const dynamicRoadmap = generateDynamicRoadmap(aiResponse, question);

      // Save query to database if userId is provided
      if (userId) {
        try {
          await databaseService.saveQuery(userId, {
            question,
            language,
            response: aiResponse,
            roadmap: dynamicRoadmap,
            timestamp: new Date().toISOString()
          });

          // Update trust score
          await databaseService.calculateTrustScore(userId);
        } catch (dbError) {
          console.error('Database error:', dbError);
          // Continue even if database save fails
        }
      }

      // Ensure consistent response format
      const formattedResponse = {
        storyResponse: aiResponse.storyResponse || aiResponse.response || 'No response available',
        recommendedSteps: aiResponse.recommendedSteps || [],
        tags: aiResponse.tags || [],
        riskLevel: aiResponse.riskLevel || 'medium',
        estimatedCost: aiResponse.estimatedCost || 'Varies',
        saferAlternatives: aiResponse.saferAlternatives || [],
        timeframe: aiResponse.timeframe || 'Varies',
        expectedReturns: aiResponse.expectedReturns || 'Varies',
        governmentSchemes: aiResponse.governmentSchemes || [],
        language: language,
        roadmap: dynamicRoadmap
      };

      res.json({
        success: true,
        data: formattedResponse
      });
    } catch (error) {
      console.error('Query controller error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to process financial query',
        message: error.message
      });
    }
  }

  async getQueryHistory(req, res) {
    try {
      const { userId } = req.params;
      const { limit = 10, offset = 0 } = req.query;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      const queries = await databaseService.getUserQueries(userId);
      const paginatedQueries = queries.slice(offset, offset + parseInt(limit));

      res.json({
        success: true,
        data: {
          queries: paginatedQueries,
          total: queries.length,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } catch (error) {
      console.error('Query history error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch query history',
        message: error.message
      });
    }
  }

  async getApiStatus(req, res) {
    try {
      const openaiService = require('../services/openaiService');
      const isOpenAIAvailable = openaiService.isAvailable;
      
      res.json({
        success: true,
        data: {
          openaiAvailable: isOpenAIAvailable,
          message: isOpenAIAvailable 
            ? 'OpenAI API is available and configured' 
            : 'OpenAI API not configured - using mock responses'
        }
      });
    } catch (error) {
      console.error('API status error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to check API status',
        message: error.message
      });
    }
  }
}

module.exports = new QueryController(); 