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

function SchemesPage({ language }) {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Schemes' },
    { id: 'agriculture', label: 'Agriculture' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'housing', label: 'Housing' },
    { id: 'employment', label: 'Employment' },
    { id: 'women', label: 'Women Empowerment' },
    { id: 'senior', label: 'Senior Citizens' }
  ];

  // Mock schemes data
  const mockSchemes = [
    {
      id: 1,
      title: 'PM Kisan Samman Nidhi',
      description: 'Direct income support of ₹6,000 per year to eligible farmer families.',
      category: 'agriculture',
      eligibility: 'Small and marginal farmers with landholding up to 2 hectares',
      benefits: '₹6,000 per year in 3 installments',
      deadline: 'Ongoing',
      status: 'active',
      icon: '🌾'
    },
    {
      id: 2,
      title: 'PM Awas Yojana',
      description: 'Housing for All by 2022 - affordable housing for urban poor.',
      category: 'housing',
      eligibility: 'Economically weaker sections, low-income groups',
      benefits: 'Subsidy up to ₹2.5 lakhs for home construction',
      deadline: '2024',
      status: 'active',
      icon: '🏠'
    },
    {
      id: 3,
      title: 'Ayushman Bharat',
      description: 'Health insurance coverage up to ₹5 lakhs per family per year.',
      category: 'healthcare',
      eligibility: 'Families identified in SECC database',
      benefits: 'Health coverage up to ₹5 lakhs per family',
      deadline: 'Ongoing',
      status: 'active',
      icon: '🏥'
    },
    {
      id: 4,
      title: 'Beti Bachao Beti Padhao',
      description: 'Save the Girl Child, Educate the Girl Child campaign.',
      category: 'women',
      eligibility: 'Families with girl children',
      benefits: 'Education and healthcare support for girls',
      deadline: 'Ongoing',
      status: 'active',
      icon: '👧'
    },
    {
      id: 5,
      title: 'PM Fasal Bima Yojana',
      description: 'Crop insurance scheme for farmers against natural calamities.',
      category: 'agriculture',
      eligibility: 'All farmers growing notified crops',
      benefits: 'Insurance coverage for crop damage',
      deadline: 'Ongoing',
      status: 'active',
      icon: '🌱'
    },
    {
      id: 6,
      title: 'PM Ujjwala Yojana',
      description: 'Free LPG connections to women from BPL households.',
      category: 'women',
      eligibility: 'Women from BPL households',
      benefits: 'Free LPG connection and first refill',
      deadline: 'Ongoing',
      status: 'active',
      icon: '🔥'
    },
    {
      id: 7,
      title: 'PM Kisan Maan Dhan Yojana',
      description: 'Pension scheme for small and marginal farmers.',
      category: 'agriculture',
      eligibility: 'Small and marginal farmers aged 18-40 years',
      benefits: 'Monthly pension of ₹3,000 after 60 years',
      deadline: 'Ongoing',
      status: 'active',
      icon: '👴'
    },
    {
      id: 8,
      title: 'PM Shram Yogi Maan Dhan',
      description: 'Pension scheme for unorganized sector workers.',
      category: 'employment',
      eligibility: 'Unorganized sector workers aged 18-40 years',
      benefits: 'Monthly pension of ₹3,000 after 60 years',
      deadline: 'Ongoing',
      status: 'active',
      icon: '👷'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSchemes(mockSchemes);
      setFilteredSchemes(mockSchemes);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter schemes based on search and category
    let filtered = schemes;
    
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
      senior: 'text-gray-600 bg-gray-100'
    };
    return colors[category] || 'text-gray-600 bg-gray-100';
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-gray-600">
            <TranslatedText language={language}>
              Loading government schemes...
            </TranslatedText>
          </p>
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
            <TranslatedText language={language}>
              Back to Home
            </TranslatedText>
          </span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <TranslatedText language={language}>
            Government Schemes
          </TranslatedText>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          <TranslatedText language={language}>
            Find government schemes and benefits available for you. Apply online and track your applications.
          </TranslatedText>
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
              placeholder="Search schemes..."
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <TranslatedText language={language}>
                  {category.label}
                </TranslatedText>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          <TranslatedText language={language}>
            {`Showing ${filteredSchemes.length} of ${schemes.length} schemes`}
          </TranslatedText>
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
                      {scheme.title}
                    </h3>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                      <TranslatedText language={language}>
                        {categories.find(c => c.id === scheme.category)?.label}
                      </TranslatedText>
                    </span>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full ${scheme.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {scheme.description}
              </p>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Users className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      <TranslatedText language={language}>
                        Eligibility:
                      </TranslatedText>
                    </p>
                    <p className="text-sm text-gray-700">{scheme.eligibility}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <DollarSign className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      <TranslatedText language={language}>
                        Benefits:
                      </TranslatedText>
                    </p>
                    <p className="text-sm text-gray-700">{scheme.benefits}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Calendar className="text-gray-400 mt-0.5" size={16} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">
                      <TranslatedText language={language}>
                        Deadline:
                      </TranslatedText>
                    </p>
                    <p className="text-sm text-gray-700">{scheme.deadline}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm">
                  <ExternalLink size={14} />
                  <span>
                    <TranslatedText language={language}>
                      Apply Now
                    </TranslatedText>
                  </span>
                </button>
                <button className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <FileText size={14} />
                </button>
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
            <TranslatedText language={language}>
              No schemes found
            </TranslatedText>
          </h3>
          <p className="text-gray-500">
            <TranslatedText language={language}>
              Try adjusting your search or filter criteria.
            </TranslatedText>
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
              <TranslatedText language={language}>
                Need Help?
              </TranslatedText>
            </h3>
            <p className="text-blue-800 text-sm mb-3">
              <TranslatedText language={language}>
                Visit your nearest Common Service Center (CSC) or contact the helpline for assistance with scheme applications.
              </TranslatedText>
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-blue-700">
                <TranslatedText language={language}>
                  Helpline: 1800-XXX-XXXX
                </TranslatedText>
              </span>
              <span className="text-blue-700">
                <TranslatedText language={language}>
                  Email: schemes@arthika.gov.in
                </TranslatedText>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchemesPage; 