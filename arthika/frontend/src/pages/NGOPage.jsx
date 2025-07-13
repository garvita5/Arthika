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

function NGOPage({ language }) {
  const ngoPartners = [
    {
      id: 1,
      name: 'Financial Literacy Foundation',
      description: 'Provides financial education and counseling services',
      services: ['Financial Counseling', 'Debt Management', 'Savings Programs'],
      contact: '+91-98765-43210',
      email: 'info@flf.org.in',
      website: 'www.flf.org.in',
      location: 'Mumbai, Maharashtra',
      hours: 'Mon-Fri: 9 AM - 6 PM'
    },
    {
      id: 2,
      name: 'Rural Development Trust',
      description: 'Focuses on rural financial inclusion and microfinance',
      services: ['Microfinance', 'Rural Banking', 'Agricultural Loans'],
      contact: '+91-98765-43211',
      email: 'contact@rdt.org.in',
      website: 'www.rdt.org.in',
      location: 'Bangalore, Karnataka',
      hours: 'Mon-Sat: 8 AM - 7 PM'
    },
    {
      id: 3,
      name: 'Women Empowerment Network',
      description: 'Empowers women through financial literacy and entrepreneurship',
      services: ['Women\'s Banking', 'Entrepreneurship Training', 'Skill Development'],
      contact: '+91-98765-43212',
      email: 'hello@wen.org.in',
      website: 'www.wen.org.in',
      location: 'Delhi, NCR',
      hours: 'Mon-Fri: 10 AM - 5 PM'
    },
    {
      id: 4,
      name: 'Senior Citizens Financial Aid',
      description: 'Specialized services for senior citizens and pensioners',
      services: ['Pension Assistance', 'Investment Advice', 'Healthcare Financing'],
      contact: '+91-98765-43213',
      email: 'support@scfa.org.in',
      website: 'www.scfa.org.in',
      location: 'Chennai, Tamil Nadu',
      hours: 'Mon-Fri: 9 AM - 4 PM'
    }
  ];

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
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <TranslatedText language={language}>
            NGO Access
          </TranslatedText>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          <TranslatedText language={language}>
            Connect with trusted NGO partners for personalized financial guidance and support.
          </TranslatedText>
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
              <TranslatedText language={language}>
                Trusted Partners
              </TranslatedText>
            </h3>
            <p className="text-blue-800 text-sm">
              <TranslatedText language={language}>
                All our NGO partners are verified and registered organizations with proven track records in financial literacy and community development.
              </TranslatedText>
            </p>
          </div>
        </div>
      </div>

      {/* NGO Partners Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {ngoPartners.map((ngo) => (
          <div key={ngo.id} className="card hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {ngo.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {ngo.description}
                </p>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  <TranslatedText language={language}>
                    Services:
                  </TranslatedText>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ngo.services.map((service, index) => (
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
                  <span className="text-gray-700">{ngo.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="text-gray-400" size={16} />
                  <span className="text-gray-700">{ngo.hours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm">
                  <Phone size={14} />
                  <span>
                    <TranslatedText language={language}>
                      Call Now
                    </TranslatedText>
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
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          <TranslatedText language={language}>
            How to Connect with NGOs
          </TranslatedText>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 font-bold text-lg">1</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              <TranslatedText language={language}>
                Choose Your Partner
              </TranslatedText>
            </h3>
            <p className="text-sm text-gray-600">
              <TranslatedText language={language}>
                Browse our verified NGO partners and select one that matches your needs.
              </TranslatedText>
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 font-bold text-lg">2</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              <TranslatedText language={language}>
                Contact Directly
              </TranslatedText>
            </h3>
            <p className="text-sm text-gray-600">
              <TranslatedText language={language}>
                Call or email the NGO directly using the provided contact information.
              </TranslatedText>
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <span className="text-primary-600 font-bold text-lg">3</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              <TranslatedText language={language}>
                Get Support
              </TranslatedText>
            </h3>
            <p className="text-sm text-gray-600">
              <TranslatedText language={language}>
                Receive personalized guidance and support for your financial needs.
              </TranslatedText>
            </p>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="card mt-8 bg-green-50 border-green-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Users className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-green-900 mb-2">
              <TranslatedText language={language}>
                Additional Resources
              </TranslatedText>
            </h3>
            <div className="space-y-2 text-sm text-green-800">
              <p>
                <TranslatedText language={language}>
                  • Government helpline: 1800-XXX-XXXX
                </TranslatedText>
              </p>
              <p>
                <TranslatedText language={language}>
                  • Financial literacy workshops (free)
                </TranslatedText>
              </p>
              <p>
                <TranslatedText language={language}>
                  • Community support groups
                </TranslatedText>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGOPage; 