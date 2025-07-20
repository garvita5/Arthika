import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  ArrowLeft,
  ExternalLink,
  Users,
  DollarSign,
  Calendar,
  MapPin
} from 'lucide-react';
import TranslatedText from '../components/TranslatedText';
import apiService from '../services/apiService';

function SchemesPage({ language }) {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hindi translations for categories
  const categoryTranslations = {
    en: {
      all: 'All Schemes',
      agriculture: 'Agriculture',
      education: 'Education',
      healthcare: 'Healthcare',
      housing: 'Housing',
      employment: 'Employment',
      women: 'Women Empowerment',
      senior: 'Senior Citizens',
      banking: 'Banking',
      savings: 'Savings',
      pension: 'Pension',
      insurance: 'Insurance',
      food: 'Food',
      energy: 'Energy',
      technology: 'Technology'
    },
    hi: {
      all: 'सभी योजनाएं',
      agriculture: 'कृषि',
      education: 'शिक्षा',
      healthcare: 'स्वास्थ्य देखभाल',
      housing: 'आवास',
      employment: 'रोजगार',
      women: 'महिला सशक्तिकरण',
      senior: 'वरिष्ठ नागरिक',
      banking: 'बैंकिंग',
      savings: 'बचत',
      pension: 'पेंशन',
      insurance: 'बीमा',
      food: 'खाद्य',
      energy: 'ऊर्जा',
      technology: 'तकनीक'
    }
  };

  const categories = [
    { id: 'all', label: categoryTranslations[language]?.all || categoryTranslations.en.all },
    { id: 'agriculture', label: categoryTranslations[language]?.agriculture || categoryTranslations.en.agriculture },
    { id: 'education', label: categoryTranslations[language]?.education || categoryTranslations.en.education },
    { id: 'healthcare', label: categoryTranslations[language]?.healthcare || categoryTranslations.en.healthcare },
    { id: 'housing', label: categoryTranslations[language]?.housing || categoryTranslations.en.housing },
    { id: 'employment', label: categoryTranslations[language]?.employment || categoryTranslations.en.employment },
    { id: 'women', label: categoryTranslations[language]?.women || categoryTranslations.en.women },
    { id: 'senior', label: categoryTranslations[language]?.senior || categoryTranslations.en.senior },
    { id: 'banking', label: categoryTranslations[language]?.banking || categoryTranslations.en.banking },
    { id: 'savings', label: categoryTranslations[language]?.savings || categoryTranslations.en.savings },
    { id: 'pension', label: categoryTranslations[language]?.pension || categoryTranslations.en.pension },
    { id: 'insurance', label: categoryTranslations[language]?.insurance || categoryTranslations.en.insurance },
    { id: 'food', label: categoryTranslations[language]?.food || categoryTranslations.en.food },
    { id: 'energy', label: categoryTranslations[language]?.energy || categoryTranslations.en.energy },
    { id: 'technology', label: categoryTranslations[language]?.technology || categoryTranslations.en.technology }
  ];

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch schemes from backend API
        const response = await apiService.getGovernmentSchemes(null, language);

        if (response.success && response.data.schemes) {
          console.log('Backend response:', response.data);
          console.log('Current language:', language);

          // Transform backend data to match frontend format
          const transformedSchemes = response.data.schemes.map((scheme, index) => {
            const transformed = {
              id: index + 1,
              title: language === 'hi' ? scheme.title : scheme.title,
              titleHi: language === 'hi' ? scheme.title : scheme.title,
              description: language === 'hi' ? scheme.description : scheme.description,
              descriptionHi: language === 'hi' ? scheme.description : scheme.description,
              category: scheme.category,
              eligibility: language === 'hi' ? scheme.eligibility : scheme.eligibility,
              eligibilityHi: language === 'hi' ? scheme.eligibility : scheme.eligibility,
              benefits: Array.isArray(scheme.benefits) ? scheme.benefits.join(', ') : scheme.benefits,
              benefitsHi: Array.isArray(scheme.benefits) ? scheme.benefits.join(', ') : scheme.benefits,
              deadline: language === 'hi' ? 'चल रहा है' : 'Ongoing',
              deadlineHi: language === 'hi' ? 'चल रहा है' : 'Ongoing',
              status: 'active',
              icon: getSchemeIcon(scheme.category),
              applyLink: scheme.website,
              detailsLink: scheme.website
            };
            console.log('Transformed scheme:', transformed);
            return transformed;
          });

          setSchemes(transformedSchemes);
          setFilteredSchemes(transformedSchemes);
        } else {
          throw new Error('Failed to fetch schemes');
        }
      } catch (err) {
        console.error('Error fetching schemes:', err);
        setError(language === 'hi' ? 'योजनाएं लोड करने में त्रुटि। कृपया पुनः प्रयास करें।' : 'Error loading schemes. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchemes();
  }, [language]);

  useEffect(() => {
    // Filter schemes based on search and category
    let filtered = schemes;

    if (searchTerm) {
      filtered = filtered.filter(scheme => {
        const searchLower = searchTerm.toLowerCase();
        return (
          scheme.title.toLowerCase().includes(searchLower) ||
          scheme.description.toLowerCase().includes(searchLower) ||
          (scheme.titleHi && scheme.titleHi.toLowerCase().includes(searchLower)) ||
          (scheme.descriptionHi && scheme.descriptionHi.toLowerCase().includes(searchLower))
        );
      });
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    setFilteredSchemes(filtered);
  }, [searchTerm, selectedCategory, schemes]);

  const getCategoryColor = (category) => {
    const colors = {
      agriculture: 'text-green-600 bg-green-100',
      education: 'text-blue-600 bg-blue-100',
      healthcare: 'text-red-600 bg-red-100',
      housing: 'text-purple-600 bg-purple-100',
      employment: 'text-orange-600 bg-orange-100',
      women: 'text-pink-600 bg-pink-100',
      senior: 'text-gray-600 bg-gray-100',
      banking: 'text-indigo-600 bg-indigo-100',
      savings: 'text-teal-600 bg-teal-100',
      pension: 'text-purple-600 bg-purple-100',
      insurance: 'text-red-600 bg-red-100',
      food: 'text-green-600 bg-green-100',
      energy: 'text-yellow-600 bg-yellow-100',
      technology: 'text-blue-600 bg-blue-100'
    };
    return colors[category] || 'text-gray-600 bg-gray-100';
  };

  const getSchemeIcon = (category) => {
    const icons = {
      agriculture: '🌾',
      education: '📚',
      healthcare: '🏥',
      housing: '🏠',
      employment: '💼',
      women: '👩',
      senior: '👴',
      banking: '🏦',
      savings: '💰',
      pension: '📈',
      insurance: '🛡️',
      food: '🍚',
      energy: '⚡',
      technology: '💻'
    };
    return icons[category] || '📋';
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600">
            {language === 'hi' ? 'सरकारी योजनाएं लोड हो रही हैं...' : 'Loading government schemes...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg font-medium">
            {error}
          </div>
        </div>
      </div>
    );
  }

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
            {language === 'hi' ? 'होम पर वापस जाएं' : 'Back to Home'}
          </span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {language === 'hi' ? 'अपने लिए उपलब्ध सरकारी योजनाएं और लाभ खोजें। ऑनलाइन आवेदन करें और अपने आवेदनों को ट्रैक करें।' : 'Find government schemes and benefits available for you. Apply online and track your applications.'}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="card mb-8">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder={language === 'hi' ? "योजनाएं खोजें..." : "Search schemes..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {language === 'hi'
            ? `${schemes.length} में से ${filteredSchemes.length} योजनाएं दिखा रहा है`
            : `Showing ${filteredSchemes.length} of ${schemes.length} schemes`}
        </p>
      </div>

      {/* Schemes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="card hover:shadow-lg transition-shadow min-w-[340px] max-w-[500px] mx-auto">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{scheme.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {language === 'hi' && scheme.titleHi ? scheme.titleHi : scheme.title}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                      {categories.find(c => c.id === scheme.category)?.label}
                    </span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${scheme.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {language === 'hi' && scheme.descriptionHi ? scheme.descriptionHi : scheme.description}
              </p>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Users className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      {language === 'hi' ? 'पात्रता:' : 'Eligibility:'}
                    </p>
                    <p className="text-sm text-gray-700">{language === 'hi' && scheme.eligibilityHi ? scheme.eligibilityHi : scheme.eligibility}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <DollarSign className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      {language === 'hi' ? 'लाभ:' : 'Benefits:'}
                    </p>
                    <p className="text-sm text-gray-700">{language === 'hi' && scheme.benefitsHi ? scheme.benefitsHi : scheme.benefits}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Calendar className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      {language === 'hi' ? 'अंतिम तिथि:' : 'Deadline:'}
                    </p>
                    <p className="text-sm text-gray-700">{language === 'hi' && scheme.deadlineHi ? scheme.deadlineHi : scheme.deadline}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <a
                  href={scheme.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  <span>
                    {language === 'hi' ? 'अभी आवेदन करें' : 'Apply Now'}
                  </span>
                </a>
                <a
                  href={scheme.detailsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  title="View Details"
                >
                  <FileText size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSchemes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="text-gray-400 mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {language === 'hi' ? 'कोई योजना नहीं मिली' : 'No schemes found'}
          </h3>
          <p className="text-gray-500">
            {language === 'hi' ? 'अपनी खोज या फ़िल्टर मानदंड को समायोजित करने का प्रयास करें।' : 'Try adjusting your search or filter criteria.'}
          </p>
        </div>
      )}

      {/* Help Section */}
      <div className="card mt-8 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              {language === 'hi' ? 'सहायता चाहिए?' : 'Need Help?'}
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              {language === 'hi' ? 'योजना आवेदनों में सहायता के लिए अपने निकटतम कॉमन सर्विस सेंटर (CSC) पर जाएं या हेल्पलाइन से संपर्क करें।' : 'Visit your nearest Common Service Center (CSC) or contact the helpline for assistance with scheme applications.'}
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-blue-700">
                {language === 'hi' ? 'हेल्पलाइन: 1800-XXX-XXXX' : 'Helpline: 1800-XXX-XXXX'}
              </span>
              <span className="text-blue-700">
                {language === 'hi' ? 'ईमेल: schemes@arthika.gov.in' : 'Email: schemes@arthika.gov.in'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchemesPage; 