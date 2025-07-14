const { getFirestore, mockDatabase } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

class DatabaseService {
  constructor() {
    this.db = getFirestore();
    this.useMock = !this.db;
  }

  // User operations
  async createUser(userId, userData = {}) {
    if (this.useMock) {
      mockDatabase.users.set(userId, {
        id: userId,
        createdAt: new Date().toISOString(),
        trustScore: 50,
        ...userData
      });
      return { id: userId, ...userData };
    }

    try {
      await this.db.collection('users').doc(userId).set({
        id: userId,
        createdAt: new Date().toISOString(),
        trustScore: 50,
        ...userData
      });
      return { id: userId, ...userData };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUser(userId) {
    if (this.useMock) {
      return mockDatabase.users.get(userId) || null;
    }

    try {
      const doc = await this.db.collection('users').doc(userId).get();
      return doc.exists ? doc.data() : null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  // Query operations
  async saveQuery(userId, queryData) {
    const queryId = uuidv4();
    const query = {
      id: queryId,
      userId,
      createdAt: new Date().toISOString(),
      ...queryData
    };

    if (this.useMock) {
      mockDatabase.queries.set(queryId, query);
      return query;
    }

    try {
      await this.db.collection('queries').doc(queryId).set(query);
      return query;
    } catch (error) {
      console.error('Error saving query:', error);
      throw error;
    }
  }

  async getUserQueries(userId) {
    if (this.useMock) {
      const queries = Array.from(mockDatabase.queries.values())
        .filter(query => query.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return queries;
    }

    try {
      // Try to get real data from Firebase
      const snapshot = await this.db.collection('queries')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .get();
      
      return snapshot.docs.map(doc => doc.data());
    } catch (indexError) {
      console.error('Firebase index error, trying without orderBy:', indexError.message);
      
      try {
        // Fallback: get all queries for user without ordering
        const snapshot = await this.db.collection('queries')
          .where('userId', '==', userId)
          .limit(20)
          .get();
        
        // Sort in memory to avoid index requirement
        const queries = snapshot.docs.map(doc => doc.data());
        return queries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10);
      } catch (fallbackError) {
        console.error('Firebase fallback also failed, returning empty array:', fallbackError.message);
        return [];
      }
    }
  }

  // Find a query by userId and question (case-insensitive, trimmed)
  async findQueryByUserAndQuestion(userId, question) {
    if (!userId || !question) return null;
    const normalizedQuestion = question.trim().toLowerCase();

    if (this.useMock) {
      const queries = Array.from(mockDatabase.queries.values())
        .filter(q => q.userId === userId && q.question && q.question.trim().toLowerCase() === normalizedQuestion);
      return queries.length > 0 ? queries[0] : null;
    }

    try {
      const snapshot = await this.db.collection('queries')
        .where('userId', '==', userId)
        .get();
      for (const doc of snapshot.docs) {
        const data = doc.data();
        if (data.question && data.question.trim().toLowerCase() === normalizedQuestion) {
          return data;
        }
      }
      return null;
    } catch (error) {
      console.error('Error finding query by user and question:', error);
      return null;
    }
  }

  // Roadmap operations
  async saveRoadmap(userId, roadmapData) {
    if (this.useMock) {
      mockDatabase.roadmaps.set(userId, {
        userId,
        updatedAt: new Date().toISOString(),
        ...roadmapData
      });
      return { userId, ...roadmapData };
    }

    try {
      await this.db.collection('roadmaps').doc(userId).set({
        userId,
        updatedAt: new Date().toISOString(),
        ...roadmapData
      });
      return { userId, ...roadmapData };
    } catch (error) {
      console.error('Error saving roadmap:', error);
      throw error;
    }
  }

  async getRoadmap(userId) {
    if (this.useMock) {
      return mockDatabase.roadmaps.get(userId) || null;
    }

    try {
      const doc = await this.db.collection('roadmaps').doc(userId).get();
      if (doc.exists) {
        return doc.data();
      }
      
      // If no roadmap exists, create a default one
      const defaultRoadmap = {
        userId,
        createdAt: new Date().toISOString(),
        financialGoals: [
          {
            id: 'goal-1',
            title: 'Emergency Fund',
            target: 50000,
            current: 15000,
            priority: 'high'
          },
          {
            id: 'goal-2',
            title: 'Home Down Payment',
            target: 500000,
            current: 75000,
            priority: 'medium'
          }
        ],
        currentStatus: {
          savings: 15000,
          investments: 25000,
          loans: 0
        },
        recommendations: [
          {
            type: 'emergency_fund',
            title: 'Build Emergency Fund',
            description: 'Aim to save 6 months of expenses',
            priority: 'high'
          },
          {
            type: 'investment',
            title: 'Start SIP',
            description: 'Invest ₹5,000 monthly in mutual funds',
            priority: 'medium'
          }
        ],
        progress: {
          completed: 2,
          total: 5
        }
      };

      // Save the default roadmap
      await this.saveRoadmap(userId, defaultRoadmap);
      return defaultRoadmap;
    } catch (error) {
      console.error('Error getting roadmap:', error);
      // Return null if Firebase fails
      return null;
    }
  }

  // Trust score operations
  async updateTrustScore(userId, score) {
    if (this.useMock) {
      const user = mockDatabase.users.get(userId);
      if (user) {
        user.trustScore = score;
        user.updatedAt = new Date().toISOString();
        mockDatabase.users.set(userId, user);
      }
      return { userId, trustScore: score };
    }

    try {
      await this.db.collection('users').doc(userId).update({
        trustScore: score,
        updatedAt: new Date().toISOString()
      });
      return { userId, trustScore: score };
    } catch (error) {
      console.error('Error updating trust score:', error);
      throw error;
    }
  }

  async getTrustScore(userId) {
    if (this.useMock) {
      const user = mockDatabase.users.get(userId);
      return user ? user.trustScore : 50;
    }

    try {
      const doc = await this.db.collection('users').doc(userId).get();
      return doc.exists ? doc.data().trustScore : 50;
    } catch (error) {
      console.error('Error getting trust score:', error);
      return 75; // Default score when Firebase fails
    }
  }

  // Feedback operations
  async saveFeedback(feedbackData) {
    const feedbackId = uuidv4();
    const feedback = {
      id: feedbackId,
      createdAt: new Date().toISOString(),
      ...feedbackData
    };

    if (this.useMock) {
      mockDatabase.feedback.set(feedbackId, feedback);
      return feedback;
    }

    try {
      await this.db.collection('feedback').doc(feedbackId).set(feedback);
      return feedback;
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw error;
    }
  }

  // Calculate trust score based on user behavior
  async calculateTrustScore(userId) {
    try {
      const queries = await this.getUserQueries(userId);
      const user = await this.getUser(userId);
      
      if (!user) {
        return 50; // Default score for new users
      }

      let score = 50; // Base score
      
      // Factors that increase trust score
      if (queries.length > 0) score += 10; // Active user
      if (queries.length > 5) score += 10; // Very active user
      
      // Check for positive feedback patterns
      const recentQueries = queries.slice(0, 5);
      const hasPositivePatterns = recentQueries.some(query => 
        query.tags && query.tags.includes('positive')
      );
      
      if (hasPositivePatterns) score += 15;
      
      // Cap at 100
      score = Math.min(score, 100);
      
      await this.updateTrustScore(userId, score);
      return score;
    } catch (error) {
      console.error('Error calculating trust score:', error);
      return 75; // Default score when calculation fails
    }
  }
}

module.exports = new DatabaseService(); 