import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target, 
  CheckCircle, 
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import TranslatedText from '../components/TranslatedText';

// Mock data moved outside component to prevent recreation on every render
const mockRoadmapData = {
  steps: [
    {
      id: 1,
      title: 'Emergency Fund',
      description: 'Save 3-6 months of expenses',
      status: 'completed',
      timeline: 'Month 1-3',
      savings: 50000,
      debt: 0
    },
    {
      id: 2,
      title: 'High-Interest Debt',
      description: 'Pay off credit cards and personal loans',
      status: 'in-progress',
      timeline: 'Month 4-8',
      savings: 30000,
      debt: -75000
    },
    {
      id: 3,
      title: 'Investment Portfolio',
      description: 'Start SIP in mutual funds',
      status: 'pending',
      timeline: 'Month 9-12',
      savings: 100000,
      debt: 0
    },
    {
      id: 4,
      title: 'Home Down Payment',
      description: 'Save for property purchase',
      status: 'pending',
      timeline: 'Month 13-24',
      savings: 300000,
      debt: 0
    }
  ],
  summary: {
    totalSavings: 480000,
    totalDebt: -75000,
    netWorth: 405000,
    timeline: '24 months'
  }
};

function RoadmapPage({ language, roadmapData }) {
  const [selectedPeriod, setSelectedPeriod] = useState('12months');
  const [chartData, setChartData] = useState(null);

  // Memoize the data to prevent unnecessary re-renders
  const data = useMemo(() => {
    return roadmapData || mockRoadmapData;
  }, [roadmapData]);

  useEffect(() => {
    // Generate chart data based on selected period
    const generateChartData = () => {
      const months = selectedPeriod === '6months' ? 6 : selectedPeriod === '12months' ? 12 : 24;
      const labels = [];
      const savingsData = [];
      const debtData = [];

      for (let i = 1; i <= months; i++) {
        labels.push(`Month ${i}`);
        
        // Calculate cumulative values
        let savings = 0;
        let debt = 0;
        
        data.steps.forEach(step => {
          const stepMonth = parseInt(step.timeline.split(' ')[1].split('-')[0]);
          if (i >= stepMonth) {
            if (step.status === 'completed' || (step.status === 'in-progress' && i >= stepMonth)) {
              savings += step.savings / 12; // Distribute over months
              debt += step.debt / 12;
            }
          }
        });
        
        savingsData.push(Math.round(savings));
        debtData.push(Math.round(debt));
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Estimated Savings',
            data: savingsData,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Estimated Debt',
            data: debtData,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      });
    };

    generateChartData();
  }, [selectedPeriod, data]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'in-progress': return <TrendingUp size={16} />;
      case 'pending': return <Calendar size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors">
            <Share2 size={16} />
            <span>
              <TranslatedText language={language}>
                Share
              </TranslatedText>
            </span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-success-100 text-success-700 rounded-lg hover:bg-success-200 transition-colors">
            <Download size={16} />
            <span>
              <TranslatedText language={language}>
                Export
              </TranslatedText>
            </span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {formatCurrency(data.summary.totalSavings)}
          </div>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Total Savings
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {formatCurrency(Math.abs(data.summary.totalDebt))}
          </div>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Total Debt
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {formatCurrency(data.summary.netWorth)}
          </div>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Net Worth
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {data.summary.timeline}
          </div>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Timeline
            </TranslatedText>
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            <TranslatedText language={language}>
              Financial Roadmap
            </TranslatedText>
          </h2>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPeriod('6months')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === '6months'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              6M
            </button>
            <button
              onClick={() => setSelectedPeriod('12months')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === '12months'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              12M
            </button>
            <button
              onClick={() => setSelectedPeriod('24months')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === '24months'
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              24M
            </button>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="space-y-4">
            <TrendingUp className="text-gray-400 mx-auto" size={48} />
            <h3 className="text-lg font-medium text-gray-600">
              <TranslatedText language={language}>
                Chart Visualization
              </TranslatedText>
            </h3>
            <p className="text-sm text-gray-500">
              <TranslatedText language={language}>
                Estimated Savings vs Estimated Debt over {selectedPeriod === '6months' ? '6' : selectedPeriod === '12months' ? '12' : '24'} months
              </TranslatedText>
            </p>
            
            {/* Simple bar representation */}
            <div className="mt-6 space-y-2">
              {chartData?.labels.slice(0, 6).map((label, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500 w-16">{label}</span>
                  <div className="flex-1 flex space-x-1">
                    <div 
                      className="bg-green-500 rounded"
                      style={{ 
                        width: `${Math.max(0, (chartData.datasets[0].data[index] / 50000) * 100)}%`,
                        height: '20px'
                      }}
                    ></div>
                    <div 
                      className="bg-red-500 rounded"
                      style={{ 
                        width: `${Math.max(0, (Math.abs(chartData.datasets[1].data[index]) / 50000) * 100)}%`,
                        height: '20px'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">
          <TranslatedText language={language}>
            Your Financial Journey
          </TranslatedText>
        </h2>
        
        <div className="space-y-4">
          {data.steps.map((step, index) => (
            <div key={step.id} className="card">
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(step.status)}`}>
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <span className="text-sm text-gray-500">{step.timeline}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="text-green-600" size={16} />
                      <span className="text-green-600 font-medium">
                        {formatCurrency(step.savings)}
                      </span>
                    </div>
                    
                    {step.debt < 0 && (
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="text-red-600" size={16} />
                        <span className="text-red-600 font-medium">
                          {formatCurrency(Math.abs(step.debt))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage; 