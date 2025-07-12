const databaseService = require('../services/databaseService');

class FeedbackController {
  async submitFeedback(req, res) {
    try {
      const { userId, queryId, rating, comment, category, helpful } = req.body;

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          error: 'Valid rating (1-5) is required'
        });
      }

      console.log(`Submitting feedback from user: ${userId}, rating: ${rating}`);

      const feedbackData = {
        userId,
        queryId,
        rating: parseInt(rating),
        comment: comment || '',
        category: category || 'general',
        helpful: helpful || false,
        submittedAt: new Date().toISOString()
      };

      const savedFeedback = await databaseService.saveFeedback(feedbackData);

      // Update trust score based on feedback
      if (userId) {
        try {
          await databaseService.calculateTrustScore(userId);
        } catch (error) {
          console.error('Error updating trust score:', error);
        }
      }

      res.json({
        success: true,
        data: {
          feedback: savedFeedback,
          message: 'Feedback submitted successfully'
        }
      });
    } catch (error) {
      console.error('Submit feedback error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to submit feedback',
        message: error.message
      });
    }
  }

  async getFeedbackAnalytics(req, res) {
    try {
      const { startDate, endDate, category } = req.query;

      console.log(`Fetching feedback analytics`);

      // In a real implementation, you would aggregate feedback data
      // For now, we'll return mock analytics
      const analytics = {
        totalFeedback: 1250,
        averageRating: 4.2,
        ratingDistribution: {
          '5': 45,
          '4': 30,
          '3': 15,
          '2': 7,
          '1': 3
        },
        categoryBreakdown: {
          'loan': 35,
          'investment': 25,
          'savings': 20,
          'insurance': 15,
          'general': 5
        },
        helpfulResponses: 78,
        improvementAreas: [
          'Response time',
          'Language clarity',
          'Actionable advice'
        ]
      };

      res.json({
        success: true,
        data: {
          analytics,
          period: {
            start: startDate || '30 days ago',
            end: endDate || 'today'
          }
        }
      });
    } catch (error) {
      console.error('Get feedback analytics error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch feedback analytics',
        message: error.message
      });
    }
  }

  async getFeedbackByUser(req, res) {
    try {
      const { userId } = req.params;
      const { limit = 10, offset = 0 } = req.query;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required'
        });
      }

      console.log(`Fetching feedback for user: ${userId}`);

      // In a real implementation, you would fetch from database
      // For now, return mock data
      const mockFeedback = [
        {
          id: 'feedback-1',
          userId,
          queryId: 'query-1',
          rating: 5,
          comment: 'Very helpful advice on gold loans',
          category: 'loan',
          helpful: true,
          submittedAt: new Date().toISOString()
        },
        {
          id: 'feedback-2',
          userId,
          queryId: 'query-2',
          rating: 4,
          comment: 'Good investment suggestions',
          category: 'investment',
          helpful: true,
          submittedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      res.json({
        success: true,
        data: {
          feedback: mockFeedback.slice(offset, offset + parseInt(limit)),
          total: mockFeedback.length,
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      });
    } catch (error) {
      console.error('Get user feedback error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch user feedback',
        message: error.message
      });
    }
  }

  async updateFeedback(req, res) {
    try {
      const { feedbackId } = req.params;
      const { rating, comment, helpful } = req.body;

      if (!feedbackId) {
        return res.status(400).json({
          success: false,
          error: 'Feedback ID is required'
        });
      }

      console.log(`Updating feedback: ${feedbackId}`);

      // In a real implementation, you would update the database
      const updatedFeedback = {
        id: feedbackId,
        rating: rating || 4,
        comment: comment || '',
        helpful: helpful || false,
        updatedAt: new Date().toISOString()
      };

      res.json({
        success: true,
        data: {
          feedback: updatedFeedback,
          message: 'Feedback updated successfully'
        }
      });
    } catch (error) {
      console.error('Update feedback error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update feedback',
        message: error.message
      });
    }
  }

  async deleteFeedback(req, res) {
    try {
      const { feedbackId } = req.params;

      if (!feedbackId) {
        return res.status(400).json({
          success: false,
          error: 'Feedback ID is required'
        });
      }

      console.log(`Deleting feedback: ${feedbackId}`);

      // In a real implementation, you would delete from database
      res.json({
        success: true,
        data: {
          message: 'Feedback deleted successfully'
        }
      });
    } catch (error) {
      console.error('Delete feedback error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete feedback',
        message: error.message
      });
    }
  }
}

module.exports = new FeedbackController(); 