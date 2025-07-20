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
import { getHomepageTranslation } from '../config/homepageTranslations';

function TrustScorePage({ language, trustScore = 85 }) {
  const [score, setScore] = useState(trustScore);
  const [isLoading, setIsLoading] = useState(false);
  const [reminders, setReminders] = useState([]);

  // Show "no trust score" state if no score is available
  if (!trustScore && trustScore !== 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="card text-center space-y-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Shield className="text-gray-400" size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {getHomepageTranslation(language, 'trustScore', 'noTrustScoreAvailable')}
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              {getHomepageTranslation(language, 'trustScore', 'noTrustScoreDescription')}
            </p>
          </div>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <ArrowLeft size={22} />
            <span>
              {getHomepageTranslation(language, 'trustScore', 'askQuestion')}
            </span>
          </Link>
        </div>
      </div>
    );
  }

  // Mock reminders data with Hindi translations
  const mockReminders = [
    {
      id: 1,
      type: 'positive',
      title: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.excellentEmergencyFund.title'),
      titleHi: 'उत्कृष्ट आपातकालीन कोष',
      description: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.excellentEmergencyFund.description'),
      descriptionHi: 'आपने 6 महीनों के खर्च बचाए हैं। बहुत अच्छा काम!',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'warning',
      title: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.highCreditCardUsage.title'),
      titleHi: 'उच्च क्रेडिट कार्ड उपयोग',
      description: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.highCreditCardUsage.description'),
      descriptionHi: 'आपका क्रेडिट उपयोग 75% है। इसे 30% से कम रखने का प्रयास करें।',
      icon: AlertTriangle,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      id: 3,
      type: 'info',
      title: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.investmentOpportunity.title'),
      titleHi: 'निवेश का अवसर',
      description: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.investmentOpportunity.description'),
      descriptionHi: 'दीर्घकालिक विकास के लिए इंडेक्स फंड में SIP शुरू करने पर विचार करें।',
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 4,
      type: 'positive',
      title: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.goodDebtManagement.title'),
      titleHi: 'अच्छा ऋण प्रबंधन',
      description: getHomepageTranslation(language, 'trustScore', 'aiReminders.reminders.goodDebtManagement.description'),
      descriptionHi: 'आप अपने ऋणों पर नियमित भुगतान कर रहे हैं। इसे जारी रखें!',
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
    if (score >= 80) return getHomepageTranslation(language, 'trustScore', 'scoreStatus.excellent');
    if (score >= 60) return getHomepageTranslation(language, 'trustScore', 'scoreStatus.good');
    return getHomepageTranslation(language, 'trustScore', 'scoreStatus.needsAttention');
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return getHomepageTranslation(language, 'trustScore', 'scoreDescriptions.excellent');
    if (score >= 60) return getHomepageTranslation(language, 'trustScore', 'scoreDescriptions.good');
    return getHomepageTranslation(language, 'trustScore', 'scoreDescriptions.needsAttention');
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-cyan-700 transition-colors text-lg font-medium"
        >
          <ArrowLeft size={22} />
          <span>
            {getHomepageTranslation(language, 'trustScore', 'backToHome')}
          </span>
        </Link>
        
        <button
          onClick={recalculateScore}
          disabled={isLoading}
          className="btn-secondary flex items-center space-x-2 px-6 py-3 text-base disabled:opacity-50"
        >
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          <span>
            {isLoading ? getHomepageTranslation(language, 'trustScore', 'recalculating') : getHomepageTranslation(language, 'trustScore', 'recalculate')}
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
          {getScoreStatus(score)}
        </h2>
        
        <p className="text-gray-600 max-w-md mx-auto">
          {getScoreDescription(score)}
        </p>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>
              {getHomepageTranslation(language, 'trustScore', 'scoreStatus.poor')}
            </span>
            <span>
              {getHomepageTranslation(language, 'trustScore', 'scoreStatus.excellent')}
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
            {getHomepageTranslation(language, 'trustScore', 'scoreBreakdown.savingsRate')}
          </h3>
          <p className="text-2xl font-bold text-green-600">85%</p>
          <p className="text-sm text-gray-600">
            {getHomepageTranslation(language, 'trustScore', 'scoreStatus.excellent')}
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Target className="text-blue-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {getHomepageTranslation(language, 'trustScore', 'scoreBreakdown.debtManagement')}
          </h3>
          <p className="text-2xl font-bold text-blue-600">72%</p>
          <p className="text-sm text-gray-600">
            {getHomepageTranslation(language, 'trustScore', 'scoreStatus.good')}
          </p>
        </div>
        
        <div className="card text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Calendar className="text-purple-600" size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">
            {getHomepageTranslation(language, 'trustScore', 'scoreBreakdown.paymentHistory')}
          </h3>
          <p className="text-2xl font-bold text-purple-600">95%</p>
          <p className="text-sm text-gray-600">
            {getHomepageTranslation(language, 'trustScore', 'scoreStatus.excellent')}
          </p>
        </div>
      </div>

      {/* AI Reminders */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {getHomepageTranslation(language, 'trustScore', 'aiReminders.title')}
          </h2>
          <span className="text-sm text-gray-500">
            {getHomepageTranslation(language, 'trustScore', 'aiReminders.updatedDaily')}
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
                      {language === 'hi' && reminder.titleHi ? reminder.titleHi : reminder.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'hi' && reminder.descriptionHi ? reminder.descriptionHi : reminder.description}
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
                {getHomepageTranslation(language, 'trustScore', 'actionCards.viewRoadmap.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {getHomepageTranslation(language, 'trustScore', 'actionCards.viewRoadmap.description')}
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
                {getHomepageTranslation(language, 'trustScore', 'actionCards.governmentSchemes.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {getHomepageTranslation(language, 'trustScore', 'actionCards.governmentSchemes.description')}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default TrustScorePage; 