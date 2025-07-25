import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.PROD 
    ? 'https://arthika-backend.onrender.com/api'  // Replace with your actual backend URL
    : 'http://localhost:5000/api'
  );

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response received from: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// FIREBASE QUERY STORAGE
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

export async function saveUserQuery({ email, question, answer, language }) {
  try {
    const docRef = await addDoc(collection(db, 'queries'), {
      userEmail: email,
      question,
      answer,
      language,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving user query:', error);
    throw error;
  }
}

export async function getQueriesByEmail(email) {
  try {
    const q = query(collection(db, 'queries'), where('userEmail', '==', email));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    return results;
  } catch (error) {
    console.error('Error fetching queries by email:', error);
    throw error;
  }
}

export async function getQueriesByUserId(userId) {
  try {
    console.log('FIRESTORE QUERY: userId ==', userId);
    const q = query(collection(db, 'queries'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    console.log('FIRESTORE RESULTS:', results);
    return results;
  } catch (error) {
    console.error('Error fetching queries by userId:', error);
    throw error;
  }
}

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Financial Query API
  async submitFinancialQuery(question, language = 'en', userId = null) {
    const payload = {
      question,
      language,
      ...(userId && { userId })
    };

    const response = await apiClient.post('/query', payload);
    return response.data;
  }

  // Get API status
  async getApiStatus() {
    const response = await apiClient.get('/query/status');
    return response.data;
  }

  // Get query history
  async getQueryHistory(userId) {
    const response = await apiClient.get(`/query/history/${userId}`);
    return response.data;
  }

  // Speech-to-Text API
  async speechToText(audioBlob, language = 'en') {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', language);

    const response = await apiClient.post('/speech-to-text', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  // Get supported languages for speech
  async getSupportedLanguages() {
    const response = await apiClient.get('/speech-to-text/languages');
    return response.data;
  }

  // Text-to-Speech API
  async textToSpeech(text, language = 'en') {
    const response = await apiClient.post('/text-to-speech', { text, language });
    return response.data;
  }

  // User Roadmap API
  async getUserRoadmap(userId) {
    const response = await apiClient.get(`/user/${userId}/roadmap`);
    return response.data;
  }

  async saveUserRoadmap(userId, roadmapData) {
    const response = await apiClient.post(`/user/${userId}/roadmap`, roadmapData);
    return response.data;
  }

  async updateRoadmapProgress(userId, progressData) {
    const response = await apiClient.put(`/user/${userId}/roadmap`, progressData);
    return response.data;
  }

  // Trust Score API
  async getTrustScore(userId) {
    const response = await apiClient.get(`/score/${userId}`);
    return response.data;
  }

  async updateTrustScore(userId, scoreData) {
    const response = await apiClient.put(`/score/${userId}`, scoreData);
    return response.data;
  }

  async recalculateTrustScore(userId) {
    const response = await apiClient.post(`/score/${userId}/recalculate`);
    return response.data;
  }

  // Legal Information API
  async getGovernmentSchemes(category = null, language = 'en') {
    const params = { language };
    if (category) params.category = category;
    
    const response = await apiClient.get('/schemes', { params });
    return response.data;
  }

  async getLegalRights(category = null, language = 'en') {
    const params = { language };
    if (category) params.category = category;
    
    const response = await apiClient.get('/legal/rights', { params });
    return response.data;
  }

  async getAllLegalInfo(language = 'en') {
    const response = await apiClient.get('/legal/all', { 
      params: { language } 
    });
    return response.data;
  }

  // Feedback API
  async submitFeedback(feedbackData) {
    const response = await apiClient.post('/feedback', feedbackData);
    return response.data;
  }

  async getFeedbackAnalytics() {
    const response = await apiClient.get('/feedback/analytics');
    return response.data;
  }

  async getUserFeedback(userId) {
    const response = await apiClient.get(`/feedback/user/${userId}`);
    return response.data;
  }

  // Health Check
  async healthCheck() {
    try {
      const response = await axios.get('http://localhost:5000/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  // API Info
  async getApiInfo() {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      console.error('Failed to get API info:', error);
      return null;
    }
  }
}

export default new ApiService(); 