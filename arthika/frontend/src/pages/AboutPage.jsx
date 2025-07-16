import React from 'react';
import { 
  Users, 
  Shield, 
  Globe, 
  Heart, 
  Award, 
  Target,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import { aboutTranslations } from '../config/aboutTranslations';
import TranslatedText from '../components/TranslatedText';
import rupeeLogo from '../assets/rupee1.png';

const AboutPage = ({ language }) => {
  const translations = aboutTranslations[language] || aboutTranslations.en;

  const features = [
    {
      icon: Shield,
      title: translations.features.security.title,
      description: translations.features.security.description
    },
    {
      icon: Globe,
      title: translations.features.language.title,
      description: translations.features.language.description
    },
    {
      icon: Heart,
      title: translations.features.care.title,
      description: translations.features.care.description
    },
    {
      icon: Award,
      title: translations.features.quality.title,
      description: translations.features.quality.description
    }
  ];

  const team = [
    {
      name: translations.team.founder.name,
      role: translations.team.founder.role,
      description: translations.team.founder.description
    },
    {
      name: translations.team.tech.name,
      role: translations.team.tech.role,
      description: translations.team.tech.description
    },
    {
      name: translations.team.finance.name,
      role: translations.team.finance.role,
      description: translations.team.finance.description
    }
  ];

  const stats = [
    {
      number: '10+',
      label: translations.stats.languages
    },
    {
      number: '50K+',
      label: translations.stats.users
    },
    {
      number: '95%',
      label: translations.stats.satisfaction
    },
    {
      number: '24/7',
      label: translations.stats.support
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <img src={rupeeLogo} alt="Arthika Logo" className="w-20 h-20 object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {translations.hero.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {translations.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {translations.mission.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {translations.mission.description}
              </p>
              <div className="flex items-center space-x-2 text-primary-600">
                <Target size={20} />
                <span className="font-medium">
                  {translations.mission.target}
                </span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {translations.mission.values.title}
              </h3>
              <ul className="space-y-3">
                {translations.mission.values.items.map((value, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {translations.features.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {translations.features.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {translations.contact.title}
              </h2>
              <p className="text-lg text-gray-600">
                {translations.contact.subtitle}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {translations.contact.phone.title}
                  </h3>
                  <p className="text-gray-600">1800-ARTHIKA</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {translations.contact.email.title}
                  </h3>
                  <p className="text-gray-600">support@arthika.in</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {translations.contact.hours.title}
                  </h3>
                  <p className="text-gray-600">
                    {translations.contact.hours.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 