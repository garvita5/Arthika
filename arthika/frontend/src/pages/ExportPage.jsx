import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, 
  FileText, 
  ArrowLeft,
  CheckCircle,
  Clock,
  Share2,
  Mail,
  Smartphone
} from 'lucide-react';
import { getHomepageTranslation } from '../config/homepageTranslations';

function ExportPage({ language }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

  const exportFormats = [
    { 
      id: 'pdf', 
      label: getHomepageTranslation(language, 'export', 'exportFormats.pdf.label'),
      icon: FileText, 
      description: getHomepageTranslation(language, 'export', 'exportFormats.pdf.description')
    },
    { 
      id: 'json', 
      label: getHomepageTranslation(language, 'export', 'exportFormats.json.label'),
      icon: FileText, 
      description: getHomepageTranslation(language, 'export', 'exportFormats.json.description')
    },
    { 
      id: 'csv', 
      label: getHomepageTranslation(language, 'export', 'exportFormats.csv.label'),
      icon: FileText, 
      description: getHomepageTranslation(language, 'export', 'exportFormats.csv.description')
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      
      // Simulate file download
      const content = {
        title: 'Your Financial Plan',
        date: new Date().toLocaleDateString(),
        summary: {
          totalSavings: 480000,
          totalDebt: -75000,
          netWorth: 405000
        },
        recommendations: [
          'Build emergency fund of 6 months expenses',
          'Pay off high-interest debt first',
          'Start SIP in index funds',
          'Consider government schemes'
        ]
      };

      const blob = new Blob([JSON.stringify(content, null, 2)], {
        type: exportFormat === 'pdf' ? 'application/pdf' : 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `financial-plan.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 3000);
  };

  const shareOptions = [
    {
      icon: Mail,
      label: getHomepageTranslation(language, 'export', 'sharePlan.email.label'),
      description: getHomepageTranslation(language, 'export', 'sharePlan.email.description')
    },
    {
      icon: Share2,
      label: getHomepageTranslation(language, 'export', 'sharePlan.shareLink.label'),
      description: getHomepageTranslation(language, 'export', 'sharePlan.shareLink.description')
    },
    {
      icon: Smartphone,
      label: getHomepageTranslation(language, 'export', 'sharePlan.whatsapp.label'),
      description: getHomepageTranslation(language, 'export', 'sharePlan.whatsapp.description')
    }
  ];

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
            {getHomepageTranslation(language, 'export', 'backToHome')}
          </span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getHomepageTranslation(language, 'export', 'title')}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {getHomepageTranslation(language, 'export', 'subtitle')}
        </p>
      </div>

      {/* Export Options */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {getHomepageTranslation(language, 'export', 'chooseFormat')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {exportFormats.map((format) => {
            const Icon = format.icon;
            return (
              <button
                key={format.id}
                onClick={() => setExportFormat(format.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportFormat === format.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="text-primary-600" size={20} />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">
                      {format.label}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {format.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>
                {getHomepageTranslation(language, 'export', 'exporting')}
              </span>
            </>
          ) : (
            <>
              <Download size={24} />
              <span>
                {getHomepageTranslation(language, 'export', 'downloadButton')}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Export Status */}
      {exportComplete && (
        <div className="card bg-green-50 border-green-200 mb-8">
          <div className="flex items-center space-x-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h3 className="font-semibold text-green-900">
                {getHomepageTranslation(language, 'export', 'exportComplete')}
              </h3>
              <p className="text-green-800 text-sm">
                {getHomepageTranslation(language, 'export', 'exportSuccess')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* What's Included */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {getHomepageTranslation(language, 'export', 'whatsIncluded.title')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-xs font-medium">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.financialSummary.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.financialSummary.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-xs font-medium">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.recommendations.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.recommendations.description')}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-xs font-medium">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.actionPlan.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.actionPlan.description')}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary-600 text-xs font-medium">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.governmentSchemes.title')}
                </h3>
                <p className="text-sm text-gray-600">
                  {getHomepageTranslation(language, 'export', 'whatsIncluded.governmentSchemes.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {getHomepageTranslation(language, 'export', 'sharePlan.title')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.label}
                className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <Icon className="text-gray-600" size={20} />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">
                    {option.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="card mt-8 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              {getHomepageTranslation(language, 'export', 'proTips.title')}
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                {getHomepageTranslation(language, 'export', 'proTips.tip1')}
              </p>
              <p>
                {getHomepageTranslation(language, 'export', 'proTips.tip2')}
              </p>
              <p>
                {getHomepageTranslation(language, 'export', 'proTips.tip3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExportPage; 