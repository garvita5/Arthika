import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  ArrowLeft,
  RefreshCw,
  Target,
  Calendar,
  DollarSign
} from 'lucide-react';
import TranslatedText from '../components/TranslatedText';

function TrustScorePage({ language, trustScore = 85 }) {
  const [score, setScore] = useState(trustScore);
  const [isLoading, setIsLoading] = useState(false);
  const [reminders, setReminders] = useState([]);

  // Show "no trust score" state if no score is available
  if (!trustScore && trustScore !== 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Shield className="text-gray-400" size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-900">
              <TranslatedText language={language}>
                No Trust Score Available
              </TranslatedText>
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              <TranslatedText language={language}>
                You need to ask a financial question first to calculate your trust score.
              </TranslatedText>
            </p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>
              <TranslatedText language={language}>
                Ask a Question
              </TranslatedText>
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // Mock reminders data
  const mockReminders = [
    {
      id: 1,
      type: 'positive',
      title: 'Excellent Emergency Fund',
      description: 'You have saved 6 months of expenses. Great job!',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Credit Card Usage',
      description: 'Your credit utilization is 75%. Try to keep it under 30%.',
      icon: AlertTriangle,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      id: 3,
      type: 'info',
      title: 'Investment Opportunity',
      description: 'Consider starting a SIP in index funds for long-term growth.',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 4,
      type: 'positive',
      title: 'Good Debt Management',
      description: 'You\'re making regular payments on your loans. Keep it up!',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    }
  ];

  useEffect(() => {
    setReminders(mockReminders);
  }, []);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-orange-100';
    return 'bg-red-100';
  };

  const getScoreStatus = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return 'Your financial health is excellent! Keep up the good work.';
    if (score >= 60) return 'Your financial standing is good with room for improvement.';
    return 'Consider reviewing your financial decisions and seeking guidance.';
  };

  const recalculateScore = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 40) + 60; // 60-100
      setScore(newScore);
      setIsLoading(false);
    }, 2000);
  };

  const getReminderIcon = (type) => {
    switch (type) {
      case 'positive': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'info': return TrendingUp;
      default: return Target;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>
            <TranslatedText language={language}>
              Back to Home
            </TranslatedText>
          </span>
        </Link>
        
        <button
          onClick={recalculateScore}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          <span>
            <TranslatedText language={language}>
              {isLoading ? 'Recalculating...' : 'Recalculate'}
            </TranslatedText>
          </span>
        </button>
      </div>

      {/* Score Display */}
      <div className="card text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${getScoreBgColor(score)}`}>
            <Shield className={`${getScoreColor(score)}`} size={40} />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {score}/100
        </h1>
        
        <h2 className={`text-xl font-semibold mb-2 ${getScoreColor(score)}`}>
          <TranslatedText language={language}>
            {getScoreStatus(score)}
          </TranslatedText>
        </h2>
        
        <p className="text-gray-600 max-w-md mx-auto">
          <TranslatedText language={language}>
            {getScoreDescription(score)}
          </TranslatedText>
        </p>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>
              <TranslatedText language={language}>
                Poor
              </TranslatedText>
            </span>
            <span>
              <TranslatedText language={language}>
                Excellent
              </TranslatedText>
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                score >= 80 ? 'bg-green-500' : 
                score >= 60 ? 'bg-orange-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <DollarSign className="text-green-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            <TranslatedText language={language}>
              Savings Rate
            </TranslatedText>
          </h3>
          <p className="text-2xl font-bold text-green-600">85%</p>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Excellent
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="text-blue-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            <TranslatedText language={language}>
              Debt Management
            </TranslatedText>
          </h3>
          <p className="text-2xl font-bold text-blue-600">72%</p>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Good
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="text-purple-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            <TranslatedText language={language}>
              Payment History
            </TranslatedText>
          </h3>
          <p className="text-2xl font-bold text-purple-600">95%</p>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Excellent
            </TranslatedText>
          </p>
        </div>
      </div>

      {/* AI Reminders */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            <TranslatedText language={language}>
              AI-Generated Reminders
            </TranslatedText>
          </h2>
          <span className="text-sm text-gray-500">
            <TranslatedText language={language}>
              Updated daily
            </TranslatedText>
          </span>
        </div>
        
        <div className="space-y-4">
          {reminders.map((reminder) => {
            const Icon = reminder.icon;
            return (
              <div key={reminder.id} className="card">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${reminder.color}`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {reminder.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {reminder.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Link 
          to="/roadmap" 
          className="card hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <TrendingUp className="text-primary-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                <TranslatedText language={language}>
                  View Roadmap
                </TranslatedText>
              </h3>
              <p className="text-sm text-gray-600">
                <TranslatedText language={language}>
                  See your financial journey
                </TranslatedText>
              </p>
            </div>
          </div>
        </Link>
        
        <Link 
          to="/schemes" 
          className="card hover:shadow-lg transition-shadow cursor-pointer group"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center group-hover:bg-success-200 transition-colors">
              <Target className="text-success-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                <TranslatedText language={language}>
                  Government Schemes
                </TranslatedText>
              </h3>
              <p className="text-sm text-gray-600">
                <TranslatedText language={language}>
                  Find available benefits
                </TranslatedText>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TrustScorePage; 