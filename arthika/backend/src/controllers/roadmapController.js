const databaseService = require('../services/databaseService');

class RoadmapController {
  async getUserRoadmap(req, res) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      console.log(`Fetching roadmap for user: ${userId}`);

      // Return mock data for now to avoid database issues
      const mockRoadmap = {
        userId,
        createdAt: new Date().toISOString(),
        financialGoals: [
          { id: 1, title: 'Emergency Fund', target: 50000, current: 15000, priority: 'high' },
          { id: 2, title: 'Home Down Payment', target: 500000, current: 75000, priority: 'medium' },
          { id: 3, title: 'Investment Portfolio', target: 1000000, current: 250000, priority: 'low' }
        ],
        currentStatus: {
          savings: 15000,
          investments: 250000,
          loans: 0
        },
        recommendations: [
          {
            type: 'emergency_fund',
            title: 'Build Emergency Fund',
            description: 'Aim to save 6 months of expenses',
            priority: 'high',
            targetAmount: '₹50,000'
          },
          {
            type: 'investment',
            title: 'Start SIP',
            description: 'Begin with ₹5,000 monthly SIP',
            priority: 'medium',
            estimatedReturns: '12-15% annually'
          }
        ],
        progress: {
          completed: 2,
          total: 5
        }
      };

      res.json({
        success: true,
        data: mockRoadmap
      });
    } catch (error) {
      console.error('Get roadmap error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user roadmap',
        message: error.message
      });
    }
  }

  async saveUserRoadmap(req, res) {
    try {
      const { userId } = req.params;
      const roadmapData = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      if (!roadmapData) {
        return res.status(400).json({
          success: false,
          error: 'Roadmap data is required'
        });
      }

      console.log(`Saving roadmap for user: ${userId}`);

      const savedRoadmap = await databaseService.saveRoadmap(userId, roadmapData);

      res.json({
        success: true,
        data: {
          roadmap: savedRoadmap,
          message: 'Roadmap saved successfully'
        }
      });
    } catch (error) {
      console.error('Save roadmap error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to save roadmap',
        message: error.message
      });
    }
  }

  async updateRoadmapProgress(req, res) {
    try {
      const { userId } = req.params;
      const { progress, goals, recommendations } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      console.log(`Updating roadmap progress for user: ${userId}`);

      const currentRoadmap = await databaseService.getRoadmap(userId) || {};
      
      const updatedRoadmap = {
        ...currentRoadmap,
        progress: progress || currentRoadmap.progress,
        financialGoals: goals || currentRoadmap.financialGoals,
        recommendations: recommendations || currentRoadmap.recommendations,
        updatedAt: new Date().toISOString()
      };

      const savedRoadmap = await databaseService.saveRoadmap(userId, updatedRoadmap);

      res.json({
        success: true,
        data: {
          roadmap: savedRoadmap,
          message: 'Roadmap progress updated successfully'
        }
      });
    } catch (error) {
      console.error('Update roadmap error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update roadmap progress',
        message: error.message
      });
    }
  }

  async generateRoadmapRecommendations(req, res) {
    try {
      const { userId } = req.params;
      const { currentSituation, goals } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      console.log(`Generating recommendations for user: ${userId}`);

      // Get user's query history to personalize recommendations
      const queries = await databaseService.getUserQueries(userId);
      
      // Generate personalized recommendations based on query history
      const recommendations = this.generatePersonalizedRecommendations(queries, currentSituation, goals);

      res.json({
        success: true,
        data: {
          recommendations,
          basedOn: queries.length > 0 ? `${queries.length} previous queries` : 'default recommendations'
        }
      });
    } catch (error) {
      console.error('Generate recommendations error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to generate recommendations',
        message: error.message
      });
    }
  }

  generatePersonalizedRecommendations(queries, currentSituation, goals) {
    const recommendations = [];

    // Analyze query patterns
    const queryTexts = queries.map(q => q.question?.toLowerCase() || '');
    
    if (queryTexts.some(text => text.includes('loan') || text.includes('लोन'))) {
      recommendations.push({
        type: 'loan_management',
        title: 'Loan Management Strategy',
        description: 'Based on your loan-related queries, consider consolidating high-interest loans',
        priority: 'high',
        estimatedSavings: '₹15,000-25,000 annually'
      });
    }

    if (queryTexts.some(text => text.includes('investment') || text.includes('निवेश'))) {
      recommendations.push({
        type: 'investment',
        title: 'Diversified Investment Portfolio',
        description: 'Consider SIPs in mutual funds for long-term wealth creation',
        priority: 'medium',
        estimatedReturns: '12-15% annually'
      });
    }

    if (queryTexts.some(text => text.includes('savings') || text.includes('बचत'))) {
      recommendations.push({
        type: 'savings',
        title: 'Emergency Fund Building',
        description: 'Aim to save 6 months of expenses in liquid funds',
        priority: 'high',
        targetAmount: '₹50,000-100,000'
      });
    }

    // Add default recommendations if none generated
    if (recommendations.length === 0) {
      recommendations.push(
        {
          type: 'emergency_fund',
          title: 'Build Emergency Fund',
          description: 'Start with ₹10,000 emergency fund',
          priority: 'high',
          targetAmount: '₹10,000'
        },
        {
          type: 'insurance',
          title: 'Health Insurance',
          description: 'Consider health insurance for family protection',
          priority: 'medium',
          estimatedCost: '₹5,000-10,000 annually'
        }
      );
    }

    return recommendations;
  }
}

module.exports = new RoadmapController(); 