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
      senior: 'Senior Citizens'
    },
    hi: {
      all: 'सभी योजनाएं',
      agriculture: 'कृषि',
      education: 'शिक्षा',
      healthcare: 'स्वास्थ्य देखभाल',
      housing: 'आवास',
      employment: 'रोजगार',
      women: 'महिला सशक्तिकरण',
      senior: 'वरिष्ठ नागरिक'
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
    { id: 'senior', label: categoryTranslations[language]?.senior || categoryTranslations.en.senior }
  ];

  // Current 2025 Government Schemes Data with complete Hindi translations
  const mockSchemes = [
    {
      id: 1,
      title: 'PM Kisan Samman Nidhi',
      titleHi: 'पीएम किसान सम्मान निधि',
      description: 'Direct income support of ₹6,000 per year to eligible farmer families in three equal installments.',
      descriptionHi: 'पात्र किसान परिवारों को प्रति वर्ष ₹6,000 का सीधा आय सहायता तीन समान किश्तों में।',
      category: 'agriculture',
      eligibility: 'Small and marginal farmers with landholding up to 2 hectares',
      eligibilityHi: 'छोटे और सीमांत किसान जिनके पास 2 हेक्टेयर तक की जमीन है',
      benefits: '₹6,000 per year in 3 installments of ₹2,000 each',
      benefitsHi: 'प्रति वर्ष ₹6,000 तीन किश्तों में, प्रत्येक ₹2,000',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '🌾',
      applyLink: 'https://pmkisan.gov.in/',
      detailsLink: 'https://pmkisan.gov.in/'
    },
    {
      id: 2,
      title: 'PM Awas Yojana - Urban',
      titleHi: 'पीएम आवास योजना - शहरी',
      description: 'Housing for All in Urban Areas - affordable housing for urban poor and middle-income groups.',
      descriptionHi: 'शहरी क्षेत्रों में सभी के लिए आवास - शहरी गरीब और मध्यम आय वर्ग के लिए सस्ता आवास।',
      category: 'housing',
      eligibility: 'Economically weaker sections, low-income groups, and middle-income groups',
      eligibilityHi: 'आर्थिक रूप से कमजोर वर्ग, निम्न आय वर्ग और मध्यम आय वर्ग',
      benefits: 'Interest subsidy up to ₹2.67 lakhs for home construction/purchase',
      benefitsHi: 'घर बनाने/खरीदने के लिए ₹2.67 लाख तक का ब्याज सब्सिडी',
      deadline: 'December 2024 (Extended)',
      deadlineHi: 'दिसंबर 2024 (विस्तारित)',
      status: 'active',
      icon: '🏠',
      applyLink: 'https://pmay-urban.gov.in/',
      detailsLink: 'https://pmay-urban.gov.in/'
    },
    {
      id: 3,
      title: 'Ayushman Bharat PM-JAY',
      titleHi: 'आयुष्मान भारत पीएम-जय',
      description: 'World\'s largest health insurance scheme providing coverage up to ₹5 lakhs per family per year.',
      descriptionHi: 'दुनिया का सबसे बड़ा स्वास्थ्य बीमा योजना जो प्रति परिवार प्रति वर्ष ₹5 लाख तक का कवरेज प्रदान करता है।',
      category: 'healthcare',
      eligibility: 'Families identified in SECC database, covering 10.74 crore families',
      eligibilityHi: 'SECC डेटाबेस में पहचाने गए परिवार, 10.74 करोड़ परिवारों को कवर करता है',
      benefits: 'Health coverage up to ₹5 lakhs per family per year for secondary and tertiary care',
      benefitsHi: 'द्वितीयक और तृतीयक देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य कवरेज',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '🏥',
      applyLink: 'https://pmjay.gov.in/',
      detailsLink: 'https://pmjay.gov.in/'
    },
    {
      id: 4,
      title: 'PM Fasal Bima Yojana',
      titleHi: 'पीएम फसल बीमा योजना',
      description: 'Comprehensive crop insurance scheme protecting farmers against natural calamities and crop diseases.',
      descriptionHi: 'किसानों को प्राकृतिक आपदाओं और फसल रोगों से बचाने के लिए व्यापक फसल बीमा योजना।',
      category: 'agriculture',
      eligibility: 'All farmers growing notified crops, including sharecroppers and tenant farmers',
      eligibilityHi: 'सभी किसान जो अधिसूचित फसलें उगाते हैं, जिसमें बटाईदार और किरायेदार किसान शामिल हैं',
      benefits: 'Insurance coverage for crop damage, premium subsidy up to 90%',
      benefitsHi: 'फसल क्षति के लिए बीमा कवरेज, 90% तक का प्रीमियम सब्सिडी',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '🌱',
      applyLink: 'https://pmfby.gov.in/',
      detailsLink: 'https://pmfby.gov.in/'
    },
    {
      id: 5,
      title: 'PM Ujjwala Yojana 2.0',
      titleHi: 'पीएम उज्ज्वला योजना 2.0',
      description: 'Free LPG connections to women from BPL households and other vulnerable groups.',
      descriptionHi: 'बीपीएल परिवारों और अन्य कमजोर समूहों की महिलाओं को मुफ्त एलपीजी कनेक्शन।',
      category: 'women',
      eligibility: 'Women from BPL households, SC/ST households, PMAY beneficiaries, etc.',
      eligibilityHi: 'बीपीएल परिवारों, अनुसूचित जाति/जनजाति परिवारों, पीएमआवास योजना लाभार्थियों की महिलाएं',
      benefits: 'Free LPG connection, first refill, and stove worth ₹1,600',
      benefitsHi: 'मुफ्त एलपीजी कनेक्शन, पहली रिफिल और ₹1,600 का स्टोव',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '🔥',
      applyLink: 'https://pmuy.gov.in/',
      detailsLink: 'https://pmuy.gov.in/'
    },
    {
      id: 6,
      title: 'PM Kisan Maan Dhan Yojana',
      titleHi: 'पीएम किसान मान धन योजना',
      description: 'Voluntary pension scheme for small and marginal farmers providing financial security in old age.',
      descriptionHi: 'छोटे और सीमांत किसानों के लिए स्वैच्छिक पेंशन योजना जो बुढ़ापे में वित्तीय सुरक्षा प्रदान करती है।',
      category: 'agriculture',
      eligibility: 'Small and marginal farmers aged 18-40 years with landholding up to 2 hectares',
      eligibilityHi: '18-40 वर्ष के छोटे और सीमांत किसान जिनके पास 2 हेक्टेयर तक की जमीन है',
      benefits: 'Monthly pension of ₹3,000 after attaining 60 years of age',
      benefitsHi: '60 वर्ष की आयु प्राप्त करने के बाद ₹3,000 का मासिक पेंशन',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '👴',
      applyLink: 'https://pmkmy.gov.in/',
      detailsLink: 'https://pmkmy.gov.in/'
    },
    {
      id: 7,
      title: 'PM Shram Yogi Maan Dhan',
      titleHi: 'पीएम श्रम योगी मान धन',
      description: 'Pension scheme for unorganized sector workers providing social security and financial stability.',
      descriptionHi: 'असंगठित क्षेत्र के कर्मचारियों के लिए सामाजिक सुरक्षा और वित्तीय स्थिरता प्रदान करने वाली पेंशन योजना।',
      category: 'employment',
      eligibility: 'Unorganized sector workers aged 18-40 years with monthly income up to ₹15,000',
      eligibilityHi: '18-40 वर्ष के असंगठित क्षेत्र के कर्मचारी जिनकी मासिक आय ₹15,000 तक है',
      benefits: 'Monthly pension of ₹3,000 after attaining 60 years of age',
      benefitsHi: '60 वर्ष की आयु प्राप्त करने के बाद ₹3,000 का मासिक पेंशन',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '👷',
      applyLink: 'https://maandhan.in/',
      detailsLink: 'https://maandhan.in/'
    },
    {
      id: 8,
      title: 'PM SVANidhi',
      titleHi: 'पीएम स्वनिधि',
      description: 'Micro credit facility for street vendors to help them resume their livelihoods post COVID-19.',
      descriptionHi: 'सड़क विक्रेताओं के लिए COVID-19 के बाद अपनी आजीविका फिर से शुरू करने में मदद के लिए सूक्ष्म ऋण सुविधा।',
      category: 'employment',
      eligibility: 'Street vendors, hawkers, and other small traders',
      eligibilityHi: 'सड़क विक्रेता, फेरीवाले और अन्य छोटे व्यापारी',
      benefits: 'Working capital loan up to ₹10,000, ₹20,000, and ₹50,000 in three phases',
      benefitsHi: 'तीन चरणों में ₹10,000, ₹20,000 और ₹50,000 तक का कार्यशील पूंजी ऋण',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '🛒',
      applyLink: 'https://pmsvanidhi.mohua.gov.in/',
      detailsLink: 'https://pmsvanidhi.mohua.gov.in/'
    },
    {
      id: 9,
      title: 'PM Garib Kalyan Anna Yojana',
      titleHi: 'पीएम गरीब कल्याण अन्न योजना',
      description: 'Free food grains distribution to 80 crore beneficiaries under National Food Security Act.',
      descriptionHi: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम के तहत 80 करोड़ लाभार्थियों को मुफ्त खाद्यान्न वितरण।',
      category: 'employment',
      eligibility: 'All NFSA beneficiaries including Antyodaya Anna Yojana and Priority Households',
      eligibilityHi: 'सभी NFSA लाभार्थी जिसमें अंत्योदय अन्न योजना और प्राथमिकता वाले परिवार शामिल हैं',
      benefits: '5 kg free food grains per person per month',
      benefitsHi: 'प्रति व्यक्ति प्रति माह 5 किलोग्राम मुफ्त खाद्यान्न',
      deadline: 'December 2024',
      deadlineHi: 'दिसंबर 2024',
      status: 'active',
      icon: '🍚',
      applyLink: 'https://nfsa.gov.in/',
      detailsLink: 'https://nfsa.gov.in/'
    },
    {
      id: 10,
      title: 'PM Kisan Urja Suraksha evam Utthaan Mahabhiyan (KUSUM)',
      titleHi: 'पीएम किसान ऊर्जा सुरक्षा एवं उत्थान महाभियान (कुसुम)',
      description: 'Solar power scheme for farmers to reduce dependency on grid power and increase income.',
      descriptionHi: 'किसानों के लिए ग्रिड बिजली पर निर्भरता कम करने और आय बढ़ाने के लिए सौर ऊर्जा योजना।',
      category: 'agriculture',
      eligibility: 'Individual farmers, cooperatives, panchayats, and farmer producer organizations',
      eligibilityHi: 'व्यक्तिगत किसान, सहकारी समितियां, पंचायतें और किसान उत्पादक संगठन',
      benefits: 'Subsidy up to 60% for solar pumps, 30% for solar power plants',
      benefitsHi: 'सौर पंपों के लिए 60% तक और सौर बिजली संयंत्रों के लिए 30% तक का सब्सिडी',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '☀️',
      applyLink: 'https://kusum.gov.in/',
      detailsLink: 'https://kusum.gov.in/'
    },
    {
      id: 11,
      title: 'PM Gati Shakti',
      titleHi: 'पीएम गति शक्ति',
      description: 'National Master Plan for multi-modal connectivity to reduce logistics costs and improve efficiency.',
      descriptionHi: 'लॉजिस्टिक्स लागत कम करने और दक्षता बढ़ाने के लिए बहु-मोडल कनेक्टिविटी का राष्ट्रीय मास्टर प्लान।',
      category: 'employment',
      eligibility: 'Infrastructure projects, logistics companies, and businesses',
      eligibilityHi: 'बुनियादी ढांचा परियोजनाएं, लॉजिस्टिक्स कंपनियां और व्यवसाय',
      benefits: 'Improved infrastructure, reduced logistics costs, better connectivity',
      benefitsHi: 'बेहतर बुनियादी ढांचा, कम लॉजिस्टिक्स लागत, बेहतर कनेक्टिविटी',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '🚚',
      applyLink: 'https://gatishakti.gov.in/',
      detailsLink: 'https://gatishakti.gov.in/'
    },
    {
      id: 12,
      title: 'PM e-VIDYA',
      titleHi: 'पीएम ई-विद्या',
      description: 'Digital education initiative to provide quality education through digital platforms.',
      descriptionHi: 'डिजिटल प्लेटफॉर्म के माध्यम से गुणवत्तापूर्ण शिक्षा प्रदान करने के लिए डिजिटल शिक्षा पहल।',
      category: 'education',
      eligibility: 'Students from Class 1 to 12, teachers, and educational institutions',
      eligibilityHi: 'कक्षा 1 से 12 तक के छात्र, शिक्षक और शैक्षिक संस्थान',
      benefits: 'Free access to digital learning content, online classes, and educational resources',
      benefitsHi: 'डिजिटल शिक्षण सामग्री, ऑनलाइन कक्षाएं और शैक्षिक संसाधनों तक मुफ्त पहुंच',
      deadline: 'Ongoing',
      deadlineHi: 'चल रहा है',
      status: 'active',
      icon: '💻',
      applyLink: 'https://diksha.gov.in/',
      detailsLink: 'https://diksha.gov.in/'
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
            {language === 'hi' ? 'सरकारी योजनाएं लोड हो रही हैं...' : 'Loading government schemes...'}
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
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