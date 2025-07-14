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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Memoize the data to prevent unnecessary re-renders
  const data = useMemo(() => {
    // Handle dynamic roadmap from query response (new structure)
    if (roadmapData && roadmapData.summary && roadmapData.steps) {
      // This is the new dynamic roadmap structure from the backend
      return {
        summary: roadmapData.summary,
        steps: roadmapData.steps.map(step => ({
          ...step,
          // Clean up the title to avoid duplication
          title: step.title || 'Financial Step',
          // Clean up the description to avoid redundancy
          description: step.description || 'Follow the recommended financial strategy',
          status: step.status || 'pending'
        })),
        type: roadmapData.type,
        riskLevel: roadmapData.riskLevel,
        estimatedCost: roadmapData.estimatedCost
      };
    }
    
    // Handle the actual backend response structure
    if (roadmapData && roadmapData.data) {
      // Backend returns { success: true, data: { roadmap, queries, trustScore, totalQueries } }
      const backendData = roadmapData.data;
      
      // Transform backend data to match expected format
      if (backendData.roadmap) {
        return {
          summary: {
            totalSavings: backendData.roadmap.currentStatus?.savings || 0,
            totalDebt: -(backendData.roadmap.currentStatus?.loans || 0),
            netWorth: (backendData.roadmap.currentStatus?.savings || 0) + (backendData.roadmap.currentStatus?.investments || 0) - (backendData.roadmap.currentStatus?.loans || 0),
            timeline: '12 months'
          },
          steps: backendData.roadmap.financialGoals?.map((goal, index) => ({
            id: goal.id || index + 1,
            title: goal.title,
            description: `Target: ${formatCurrency(goal.target)}, Current: ${formatCurrency(goal.current)}`,
            status: goal.current >= goal.target ? 'completed' : goal.current > 0 ? 'in-progress' : 'pending',
            timeline: `Month ${index + 1}-${index + 3}`,
            savings: goal.current,
            debt: 0
          })) || []
        };
      }
    }
    
    // Fallback to mock data if backend data is not available
    return mockRoadmapData;
  }, [roadmapData]);

  // Show "no roadmap" state if no data is available
  if (!roadmapData || (!roadmapData.summary && !roadmapData.data)) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="card text-center space-y-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <TrendingUp className="text-gray-400" size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              <TranslatedText language={language}>
                No Roadmap Available
              </TranslatedText>
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              <TranslatedText language={language}>
                You need to ask a financial question first to generate your personalized roadmap.
              </TranslatedText>
            </p>
          </div>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg"
          >
            <ArrowLeft size={22} />
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

  useEffect(() => {
    // Generate chart data based on selected period
    const generateChartData = () => {
      const months = selectedPeriod === '6months' ? 6 : selectedPeriod === '12months' ? 12 : 24;
      const labels = [];
      const savingsData = [];
      const debtData = [];

      for (let i = 1; i <= months; i++) {
        labels.push(`Month ${i}`);
        
        // Calculate cumulative values based on actual roadmap steps
        let savings = 0;
        let debt = 0;
        
        data.steps.forEach(step => {
          // Parse timeline to get month range
          const timelineMatch = step.timeline.match(/Month (\d+)-(\d+)/);
          if (timelineMatch) {
            const startMonth = parseInt(timelineMatch[1]);
            const endMonth = parseInt(timelineMatch[2]);
            
            // If current month is within the step's timeline, add the values
            if (i >= startMonth && i <= endMonth) {
              // For savings, add the full amount in the first month of the step
              if (i === startMonth) {
                savings += step.savings || 0;
              }
              // For debt, add it in the first month of the step
              if (i === startMonth) {
                debt += step.debt || 0;
              }
            }
          }
        });
        
        // Add to cumulative totals
        if (i > 1) {
          savings += savingsData[i - 2];
          debt += debtData[i - 2];
        }
        
        savingsData.push(Math.round(savings));
        debtData.push(Math.round(debt));
      }

      setChartData({
        labels,
        datasets: [
          {
            label: 'Cumulative Savings',
            data: savingsData,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Cumulative Debt',
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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-gray-600 hover:text-cyan-700 transition-colors text-lg font-medium"
        >
          <ArrowLeft size={22} />
          <span>
            <TranslatedText language={language}>
              Back to Home
            </TranslatedText>
          </span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <button className="btn-secondary flex items-center space-x-2 px-6 py-3 text-base">
            <Share2 size={16} />
            <span>
              <TranslatedText language={language}>
                Share
              </TranslatedText>
            </span>
          </button>
          <button className="btn-primary flex items-center space-x-2 px-6 py-3 text-base">
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
            {formatCurrency(data?.summary?.totalSavings || 0)}
          </div>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Total Savings
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {formatCurrency(Math.abs(data?.summary?.totalDebt || 0))}
          </div>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Total Debt
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">
            {formatCurrency(data?.summary?.netWorth || 0)}
          </div>
          <p className="text-sm text-gray-600">
            <TranslatedText language={language}>
              Net Worth
            </TranslatedText>
          </p>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {data?.summary?.timeline || '12 months'}
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
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            <TranslatedText language={language}>
              Your Financial Journey
            </TranslatedText>
          </h2>
          
          {/* Dynamic Roadmap Indicator */}
          {data?.type && (
            <div className="flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-700 font-medium">
                <TranslatedText language={language}>
                  {data.type === 'debt_management' ? 'Debt Management' :
                   data.type === 'home_purchase' ? 'Home Purchase' :
                   data.type === 'savings' ? 'Savings Plan' :
                   data.type === 'retirement' ? 'Retirement Planning' :
                   'Investment Strategy'}
                </TranslatedText>
              </span>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          {(data?.steps || []).map((step, index) => (
            <div key={step.id || index} className="card">
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
                        {formatCurrency(step.savings || 0)}
                      </span>
                    </div>
                    
                    {(step.debt || 0) < 0 && (
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="text-red-600" size={16} />
                        <span className="text-red-600 font-medium">
                          {formatCurrency(Math.abs(step.debt || 0))}
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