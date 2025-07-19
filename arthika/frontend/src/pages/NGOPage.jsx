import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  Shield
} from 'lucide-react';
import TranslatedText from '../components/TranslatedText';
import { getHomepageTranslation } from '../config/homepageTranslations';

function NGOPage({ language }) {
  const ngoPartners = [
    {
      id: 1,
      name: 'Financial Literacy Foundation',
      nameHi: 'वित्तीय साक्षरता फाउंडेशन',
      description: 'Provides financial education and counseling services',
      descriptionHi: 'वित्तीय शिक्षा और परामर्श सेवाएं प्रदान करता है',
      services: ['Financial Counseling', 'Debt Management', 'Savings Programs'],
      servicesHi: ['वित्तीय परामर्श', 'ऋण प्रबंधन', 'बचत कार्यक्रम'],
      contact: '+91-98765-43210',
      email: 'info@flf.org.in',
      website: 'www.flf.org.in',
      location: 'Mumbai, Maharashtra',
      locationHi: 'मुंबई, महाराष्ट्र',
      hours: 'Mon-Fri: 9 AM - 6 PM',
      hoursHi: 'सोम-शुक्र: सुबह 9 बजे - शाम 6 बजे'
    },
    {
      id: 2,
      name: 'Rural Development Trust',
      nameHi: 'ग्रामीण विकास ट्रस्ट',
      description: 'Focuses on rural financial inclusion and microfinance',
      descriptionHi: 'ग्रामीण वित्तीय समावेशन और माइक्रोफाइनेंस पर केंद्रित',
      services: ['Microfinance', 'Rural Banking', 'Agricultural Loans'],
      servicesHi: ['माइक्रोफाइनेंस', 'ग्रामीण बैंकिंग', 'कृषि ऋण'],
      contact: '+91-98765-43211',
      email: 'contact@rdt.org.in',
      website: 'www.rdt.org.in',
      location: 'Bangalore, Karnataka',
      locationHi: 'बेंगलुरु, कर्नाटक',
      hours: 'Mon-Sat: 8 AM - 7 PM',
      hoursHi: 'सोम-शनि: सुबह 8 बजे - शाम 7 बजे'
    },
    {
      id: 3,
      name: 'Women Empowerment Network',
      nameHi: 'महिला सशक्तिकरण नेटवर्क',
      description: 'Empowers women through financial literacy and entrepreneurship',
      descriptionHi: 'वित्तीय साक्षरता और उद्यमिता के माध्यम से महिलाओं को सशक्त बनाता है',
      services: ["Women's Banking", 'Entrepreneurship Training', 'Skill Development'],
      servicesHi: ['महिला बैंकिंग', 'उद्यमिता प्रशिक्षण', 'कौशल विकास'],
      contact: '+91-98765-43212',
      email: 'hello@wen.org.in',
      website: 'www.wen.org.in',
      location: 'Delhi, NCR',
      locationHi: 'दिल्ली, एनसीआर',
      hours: 'Mon-Fri: 10 AM - 5 PM',
      hoursHi: 'सोम-शुक्र: सुबह 10 बजे - शाम 5 बजे'
    },
    {
      id: 4,
      name: 'Senior Citizens Financial Aid',
      nameHi: 'वरिष्ठ नागरिक वित्तीय सहायता',
      description: 'Specialized services for senior citizens and pensioners',
      descriptionHi: 'वरिष्ठ नागरिकों और पेंशनभोगियों के लिए विशेष सेवाएं',
      services: ['Pension Assistance', 'Investment Advice', 'Healthcare Financing'],
      servicesHi: ['पेंशन सहायता', 'निवेश सलाह', 'स्वास्थ्य देखभाल वित्तपोषण'],
      contact: '+91-98765-43213',
      email: 'support@scfa.org.in',
      website: 'www.scfa.org.in',
      location: 'Chennai, Tamil Nadu',
      locationHi: 'चेन्नई, तमिलनाडु',
      hours: 'Mon-Fri: 9 AM - 4 PM',
      hoursHi: 'सोम-शुक्र: सुबह 9 बजे - शाम 4 बजे'
    }
  ];

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
            {getHomepageTranslation(language, 'ngo', 'backToHome')}
          </span>
        </Link>
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getHomepageTranslation(language, 'ngo', 'title')}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {getHomepageTranslation(language, 'ngo', 'subtitle')}
        </p>
      </div>

      {/* Info Section */}
      <div className="card mb-8 bg-blue-50 border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">
              {getHomepageTranslation(language, 'ngo', 'trustedPartners.title')}
            </h3>
            <p className="text-blue-800 text-sm">
              {getHomepageTranslation(language, 'ngo', 'trustedPartners.description')}
            </p>
          </div>
        </div>
      </div>

      {/* NGO Partners Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {ngoPartners.map((ngo) => (
          <div key={ngo.id} className="card hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {language === 'hi' && ngo.nameHi ? ngo.nameHi : ngo.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {language === 'hi' && ngo.descriptionHi ? ngo.descriptionHi : ngo.description}
                </p>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {getHomepageTranslation(language, 'ngo', 'services')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(language === 'hi' && ngo.servicesHi ? ngo.servicesHi : ngo.services).map((service, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="text-gray-400" size={16} />
                  <span className="text-gray-700">{ngo.contact}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-gray-700">{ngo.email}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="text-gray-400" size={16} />
                  <span className="text-gray-700">{ngo.website}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-gray-700">{language === 'hi' && ngo.locationHi ? ngo.locationHi : ngo.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="text-gray-400" size={16} />
                  <span className="text-gray-700">{language === 'hi' && ngo.hoursHi ? ngo.hoursHi : ngo.hours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm">
                  <Phone size={14} />
                  <span>
                    {getHomepageTranslation(language, 'ngo', 'callNow')}
                  </span>
                </button>
                <button className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Mail size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How to Connect */}
      <div className="card mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {getHomepageTranslation(language, 'ngo', 'howToConnect.title')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 font-bold text-lg">1</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              {getHomepageTranslation(language, 'ngo', 'howToConnect.step1.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {getHomepageTranslation(language, 'ngo', 'howToConnect.step1.description')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 font-bold text-lg">2</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              {getHomepageTranslation(language, 'ngo', 'howToConnect.step2.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {getHomepageTranslation(language, 'ngo', 'howToConnect.step2.description')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 font-bold text-lg">3</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              {getHomepageTranslation(language, 'ngo', 'howToConnect.step3.title')}
            </h3>
            <p className="text-sm text-gray-600">
              {getHomepageTranslation(language, 'ngo', 'howToConnect.step3.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="card bg-green-50 border-green-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-green-900 mb-2">
              {getHomepageTranslation(language, 'ngo', 'additionalResources.title')}
            </h3>
            <div className="space-y-2 text-sm text-green-800">
              <p>
                {getHomepageTranslation(language, 'ngo', 'additionalResources.helpline')}
              </p>
              <p>
                {getHomepageTranslation(language, 'ngo', 'additionalResources.workshops')}
              </p>
              <p>
                {getHomepageTranslation(language, 'ngo', 'additionalResources.supportGroups')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGOPage; 