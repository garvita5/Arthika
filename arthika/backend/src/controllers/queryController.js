const openaiService = require('../services/openaiService');
const databaseService = require('../services/databaseService');

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

      // Save query to database if userId is provided
      if (userId) {
        try {
          await databaseService.saveQuery(userId, {
            question,
            language,
            response: aiResponse,
            timestamp: new Date().toISOString()
          });

          // Update trust score
          await databaseService.calculateTrustScore(userId);
        } catch (dbError) {
          console.error('Database error:', dbError);
          // Continue even if database save fails
        }
      }

      res.json({
        success: true,
        data: {
          storyResponse: aiResponse.storyResponse,
          recommendedSteps: aiResponse.recommendedSteps || [],
          tags: aiResponse.tags || [],
          riskLevel: aiResponse.riskLevel || 'medium',
          estimatedCost: aiResponse.estimatedCost || 'Varies',
          saferAlternatives: aiResponse.saferAlternatives || [],
          timeframe: aiResponse.timeframe || 'Varies',
          expectedReturns: aiResponse.expectedReturns || 'Varies',
          governmentSchemes: aiResponse.governmentSchemes || [],
          language: language
        }
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
}

module.exports = new QueryController(); 