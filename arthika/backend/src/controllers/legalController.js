class LegalController {
  async getGovernmentSchemes(req, res) {
    try {
      const { category, language = 'en' } = req.query;

      console.log(`Fetching government schemes for category: ${category}, language: ${language}`);

      const schemes = this.getSchemesByCategory(category, language);

      res.json({
        success: true,
        data: {
          schemes,
          total: schemes.length,
          category: category || 'all',
          language
        }
      });
    } catch (error) {
      console.error('Get schemes error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch government schemes',
        message: error.message
      });
    }
  }

  async getLegalRights(req, res) {
    try {
      const { category, language = 'en' } = req.query;

      console.log(`Fetching legal rights for category: ${category}, language: ${language}`);

      const rights = this.getLegalRightsByCategory(category, language);

      res.json({
        success: true,
        data: {
          rights,
          total: rights.length,
          category: category || 'all',
          language
        }
      });
    } catch (error) {
      console.error('Get legal rights error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch legal rights',
        message: error.message
      });
    }
  }

  async getAllLegalInfo(req, res) {
    try {
      const { language = 'en' } = req.query;

      console.log(`Fetching all legal information in ${language}`);

      const schemes = this.getSchemesByCategory(null, language);
      const rights = this.getLegalRightsByCategory(null, language);
      const entitlements = this.getEntitlements(language);

      res.json({
        success: true,
        data: {
          schemes,
          rights,
          entitlements,
          summary: {
            totalSchemes: schemes.length,
            totalRights: rights.length,
            totalEntitlements: entitlements.length
          }
        }
      });
    } catch (error) {
      console.error('Get legal info error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch legal information',
        message: error.message
      });
    }
  }

  getSchemesByCategory(category, language) {
    const allSchemes = {
      en: [
        {
          id: 'pradhan-mantri-jan-dhan-yojana',
          title: 'Pradhan Mantri Jan Dhan Yojana',
          description: 'Financial inclusion program for all households',
          category: 'banking',
          benefits: ['Zero balance account', 'Life insurance cover', 'Overdraft facility'],
          eligibility: 'All Indian citizens',
          applicationProcess: 'Visit any bank branch with ID proof',
          website: 'https://pmjdy.gov.in'
        },
        {
          id: 'pradhan-mantri-fasal-bima-yojana',
          title: 'Pradhan Mantri Fasal Bima Yojana',
          description: 'Crop insurance scheme for farmers',
          category: 'agriculture',
          benefits: ['Crop damage coverage', 'Weather risk protection', 'Quick claim settlement'],
          eligibility: 'All farmers growing notified crops',
          applicationProcess: 'Apply through bank or insurance company',
          website: 'https://pmfby.gov.in'
        },
        {
          id: 'pradhan-mantri-awas-yojana',
          title: 'Pradhan Mantri Awas Yojana',
          description: 'Housing for All by 2024',
          category: 'housing',
          benefits: ['Interest subsidy on home loans', 'Affordable housing', 'Urban and rural coverage'],
          eligibility: 'Economically weaker sections, low and middle income groups',
          applicationProcess: 'Apply through housing finance companies',
          website: 'https://pmay.gov.in'
        },
        {
          id: 'sukanya-samriddhi-yojana',
          title: 'Sukanya Samriddhi Yojana',
          description: 'Girl child welfare scheme',
          category: 'savings',
          benefits: ['High interest rate (8.2%)', 'Tax benefits under Section 80C', 'Long-term savings'],
          eligibility: 'Girl child below 10 years',
          applicationProcess: 'Open account in post office or bank',
          website: 'https://nsiindia.gov.in'
        },
        {
          id: 'atal-pension-yojana',
          title: 'Atal Pension Yojana',
          description: 'Pension scheme for unorganized sector',
          category: 'pension',
          benefits: ['Guaranteed pension', 'Government co-contribution', 'Flexible contribution'],
          eligibility: 'Age 18-40 years, unorganized sector workers',
          applicationProcess: 'Apply through bank or post office',
          website: 'https://npscra.nsdl.co.in'
        },
        {
          id: 'pradhan-mantri-kisan-samman-nidhi',
          title: 'Pradhan Mantri Kisan Samman Nidhi',
          description: 'Income support for farmers',
          category: 'agriculture',
          benefits: ['₹6,000 annually', 'Direct bank transfer', 'Three equal installments'],
          eligibility: 'Small and marginal farmers',
          applicationProcess: 'Apply at Common Service Centres',
          website: 'https://pmkisan.gov.in'
        },
        {
          id: 'pradhan-mantri-kisan-maandhan-yojana',
          title: 'Pradhan Mantri Kisan Maandhan Yojana',
          description: 'Pension scheme for small and marginal farmers',
          category: 'pension',
          benefits: ['₹3,000 monthly pension', 'Government contribution', 'Life insurance cover'],
          eligibility: 'Farmers aged 18-40 years',
          applicationProcess: 'Apply through Common Service Centres',
          website: 'https://pmkmy.gov.in'
        },
        {
          id: 'pradhan-mantri-shram-yogi-maandhan',
          title: 'Pradhan Mantri Shram Yogi Maandhan',
          description: 'Pension scheme for unorganized workers',
          category: 'pension',
          benefits: ['₹3,000 monthly pension', 'Government contribution', 'Life insurance cover'],
          eligibility: 'Unorganized workers aged 18-40 years',
          applicationProcess: 'Apply through Common Service Centres',
          website: 'https://maandhan.in'
        },
        {
          id: 'pradhan-mantri-jeevan-jyoti-bima-yojana',
          title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
          description: 'Life insurance scheme',
          category: 'insurance',
          benefits: ['₹2 lakh life cover', 'Low premium', 'Auto-debit facility'],
          eligibility: 'Age 18-50 years with bank account',
          applicationProcess: 'Apply through bank branch',
          website: 'https://jansuraksha.gov.in'
        },
        {
          id: 'pradhan-mantri-suraksha-bima-yojana',
          title: 'Pradhan Mantri Suraksha Bima Yojana',
          description: 'Accident insurance scheme',
          category: 'insurance',
          benefits: ['₹2 lakh accident cover', 'Low premium', 'Auto-debit facility'],
          eligibility: 'Age 18-70 years with bank account',
          applicationProcess: 'Apply through bank branch',
          website: 'https://jansuraksha.gov.in'
        },
        {
          id: 'pradhan-mantri-garib-kalyan-anna-yojana',
          title: 'Pradhan Mantri Garib Kalyan Anna Yojana',
          description: 'Free food grains for poor families',
          category: 'food',
          benefits: ['5 kg free rice/wheat', '1 kg free pulses', 'Extended till December 2024'],
          eligibility: 'Antyodaya Anna Yojana and Priority Households',
          applicationProcess: 'Automatic through PDS',
          website: 'https://nfsa.gov.in'
        },
        {
          id: 'pradhan-mantri-ujjwala-yojana',
          title: 'Pradhan Mantri Ujjwala Yojana',
          description: 'Free LPG connection for poor women',
          category: 'energy',
          benefits: ['Free LPG connection', 'EMI facility for stove', 'Safety training'],
          eligibility: 'BPL women households',
          applicationProcess: 'Apply through LPG distributors',
          website: 'https://pmuy.gov.in'
        },
        {
          id: 'pradhan-mantri-saubhagya-yojana',
          title: 'Pradhan Mantri Saubhagya Yojana',
          description: 'Electricity for all households',
          category: 'energy',
          benefits: ['Free electricity connection', 'LED bulbs', 'Mobile app for complaints'],
          eligibility: 'Rural and urban households without electricity',
          applicationProcess: 'Apply through electricity department',
          website: 'https://saubhagya.gov.in'
        },
        {
          id: 'pradhan-mantri-digital-india',
          title: 'Pradhan Mantri Digital India',
          description: 'Digital infrastructure and services',
          category: 'technology',
          benefits: ['Digital payments', 'E-governance services', 'Internet connectivity'],
          eligibility: 'All citizens',
          applicationProcess: 'Access through government portals',
          website: 'https://digitalindia.gov.in'
        },
        {
          id: 'pradhan-mantri-ayushman-bharat',
          title: 'Pradhan Mantri Ayushman Bharat',
          description: 'Health insurance for poor families',
          category: 'health',
          benefits: ['₹5 lakh health cover', 'Cashless treatment', 'Coverage for 10.74 crore families'],
          eligibility: 'Socio-Economic Caste Census (SECC) beneficiaries',
          applicationProcess: 'Automatic enrollment',
          website: 'https://pmjay.gov.in'
        }
      ],
      hi: [
        {
          id: 'pradhan-mantri-jan-dhan-yojana',
          title: 'प्रधानमंत्री जन धन योजना',
          description: 'सभी परिवारों के लिए वित्तीय समावेशन कार्यक्रम',
          category: 'banking',
          benefits: ['शून्य बैलेंस खाता', 'जीवन बीमा कवर', 'ओवरड्राफ्ट सुविधा'],
          eligibility: 'सभी भारतीय नागरिक',
          applicationProcess: 'आईडी प्रूफ के साथ किसी भी बैंक शाखा में जाएं',
          website: 'https://pmjdy.gov.in'
        },
        {
          id: 'pradhan-mantri-fasal-bima-yojana',
          title: 'प्रधानमंत्री फसल बीमा योजना',
          description: 'किसानों के लिए फसल बीमा योजना',
          category: 'agriculture',
          benefits: ['फसल क्षति कवरेज', 'मौसम जोखिम सुरक्षा', 'त्वरित दावा निपटान'],
          eligibility: 'सभी किसान जो अधिसूचित फसलें उगाते हैं',
          applicationProcess: 'बैंक या बीमा कंपनी के माध्यम से आवेदन करें',
          website: 'https://pmfby.gov.in'
        },
        {
          id: 'pradhan-mantri-awas-yojana',
          title: 'प्रधानमंत्री आवास योजना',
          description: '2024 तक सभी के लिए आवास',
          category: 'housing',
          benefits: ['घर के लोन पर ब्याज सब्सिडी', 'सस्ता आवास', 'शहरी और ग्रामीण कवरेज'],
          eligibility: 'आर्थिक रूप से कमजोर वर्ग, निम्न और मध्यम आय समूह',
          applicationProcess: 'आवास वित्त कंपनियों के माध्यम से आवेदन करें',
          website: 'https://pmay.gov.in'
        },
        {
          id: 'sukanya-samriddhi-yojana',
          title: 'सुकन्या समृद्धि योजना',
          description: 'बालिका कल्याण योजना',
          category: 'savings',
          benefits: ['उच्च ब्याज दर (8.2%)', 'धारा 80C के तहत कर लाभ', 'दीर्घकालिक बचत'],
          eligibility: '10 वर्ष से कम आयु की बालिका',
          applicationProcess: 'डाकघर या बैंक में खाता खोलें',
          website: 'https://nsiindia.gov.in'
        },
        {
          id: 'atal-pension-yojana',
          title: 'अटल पेंशन योजना',
          description: 'असंगठित क्षेत्र के लिए पेंशन योजना',
          category: 'pension',
          benefits: ['गारंटीड पेंशन', 'सरकारी सह-योगदान', 'लचीला योगदान'],
          eligibility: '18-40 वर्ष की आयु, असंगठित क्षेत्र के कर्मचारी',
          applicationProcess: 'बैंक या डाकघर के माध्यम से आवेदन करें',
          website: 'https://npscra.nsdl.co.in'
        },
        {
          id: 'pradhan-mantri-kisan-samman-nidhi',
          title: 'प्रधानमंत्री किसान सम्मान निधि',
          description: 'किसानों के लिए आय सहायता',
          category: 'agriculture',
          benefits: ['वार्षिक ₹6,000', 'सीधा बैंक ट्रांसफर', 'तीन समान किस्तें'],
          eligibility: 'छोटे और सीमांत किसान',
          applicationProcess: 'सामान्य सेवा केंद्रों में आवेदन करें',
          website: 'https://pmkisan.gov.in'
        },
        {
          id: 'pradhan-mantri-kisan-maandhan-yojana',
          title: 'प्रधानमंत्री किसान मांधन योजना',
          description: 'छोटे और सीमांत किसानों के लिए पेंशन योजना',
          category: 'pension',
          benefits: ['मासिक ₹3,000 पेंशन', 'सरकारी योगदान', 'जीवन बीमा कवर'],
          eligibility: '18-40 वर्ष की आयु के किसान',
          applicationProcess: 'सामान्य सेवा केंद्रों में आवेदन करें',
          website: 'https://pmkmy.gov.in'
        },
        {
          id: 'pradhan-mantri-shram-yogi-maandhan',
          title: 'प्रधानमंत्री श्रम योगी मांधन',
          description: 'असंगठित श्रमिकों के लिए पेंशन योजना',
          category: 'pension',
          benefits: ['मासिक ₹3,000 पेंशन', 'सरकारी योगदान', 'जीवन बीमा कवर'],
          eligibility: '18-40 वर्ष की आयु के असंगठित श्रमिक',
          applicationProcess: 'सामान्य सेवा केंद्रों में आवेदन करें',
          website: 'https://maandhan.in'
        },
        {
          id: 'pradhan-mantri-jeevan-jyoti-bima-yojana',
          title: 'प्रधानमंत्री जीवन ज्योति बीमा योजना',
          description: 'जीवन बीमा योजना',
          category: 'insurance',
          benefits: ['₹2 लाख जीवन कवर', 'कम प्रीमियम', 'ऑटो-डेबिट सुविधा'],
          eligibility: 'बैंक खाते के साथ 18-50 वर्ष की आयु',
          applicationProcess: 'बैंक शाखा के माध्यम से आवेदन करें',
          website: 'https://jansuraksha.gov.in'
        },
        {
          id: 'pradhan-mantri-suraksha-bima-yojana',
          title: 'प्रधानमंत्री सुरक्षा बीमा योजना',
          description: 'दुर्घटना बीमा योजना',
          category: 'insurance',
          benefits: ['₹2 लाख दुर्घटना कवर', 'कम प्रीमियम', 'ऑटो-डेबिट सुविधा'],
          eligibility: 'बैंक खाते के साथ 18-70 वर्ष की आयु',
          applicationProcess: 'बैंक शाखा के माध्यम से आवेदन करें',
          website: 'https://jansuraksha.gov.in'
        },
        {
          id: 'pradhan-mantri-garib-kalyan-anna-yojana',
          title: 'प्रधानमंत्री गरीब कल्याण अन्न योजना',
          description: 'गरीब परिवारों के लिए मुफ्त खाद्यान्न',
          category: 'food',
          benefits: ['5 किलो मुफ्त चावल/गेहूं', '1 किलो मुफ्त दाल', 'दिसंबर 2024 तक विस्तारित'],
          eligibility: 'अंत्योदय अन्न योजना और प्राथमिकता वाले परिवार',
          applicationProcess: 'पीडीएस के माध्यम से स्वचालित',
          website: 'https://nfsa.gov.in'
        },
        {
          id: 'pradhan-mantri-ujjwala-yojana',
          title: 'प्रधानमंत्री उज्ज्वला योजना',
          description: 'गरीब महिलाओं के लिए मुफ्त एलपीजी कनेक्शन',
          category: 'energy',
          benefits: ['मुफ्त एलपीजी कनेक्शन', 'स्टोव के लिए ईएमआई सुविधा', 'सुरक्षा प्रशिक्षण'],
          eligibility: 'बीपीएल महिला परिवार',
          applicationProcess: 'एलपीजी वितरकों के माध्यम से आवेदन करें',
          website: 'https://pmuy.gov.in'
        },
        {
          id: 'pradhan-mantri-saubhagya-yojana',
          title: 'प्रधानमंत्री सौभाग्य योजना',
          description: 'सभी परिवारों के लिए बिजली',
          category: 'energy',
          benefits: ['मुफ्त बिजली कनेक्शन', 'एलईडी बल्ब', 'शिकायतों के लिए मोबाइल ऐप'],
          eligibility: 'बिजली के बिना ग्रामीण और शहरी परिवार',
          applicationProcess: 'बिजली विभाग के माध्यम से आवेदन करें',
          website: 'https://saubhagya.gov.in'
        },
        {
          id: 'pradhan-mantri-digital-india',
          title: 'प्रधानमंत्री डिजिटल इंडिया',
          description: 'डिजिटल बुनियादी ढांचा और सेवाएं',
          category: 'technology',
          benefits: ['डिजिटल भुगतान', 'ई-गवर्नेंस सेवाएं', 'इंटरनेट कनेक्टिविटी'],
          eligibility: 'सभी नागरिक',
          applicationProcess: 'सरकारी पोर्टलों के माध्यम से पहुंच',
          website: 'https://digitalindia.gov.in'
        },
        {
          id: 'pradhan-mantri-ayushman-bharat',
          title: 'प्रधानमंत्री आयुष्मान भारत',
          description: 'गरीब परिवारों के लिए स्वास्थ्य बीमा',
          category: 'health',
          benefits: ['₹5 लाख स्वास्थ्य कवर', 'नकद रहित उपचार', '10.74 करोड़ परिवारों का कवरेज'],
          eligibility: 'सामाजिक-आर्थिक जाति जनगणना (एसईसीसी) लाभार्थी',
          applicationProcess: 'स्वचालित नामांकन',
          website: 'https://pmjay.gov.in'
        }
      ]
    };

    const schemes = allSchemes[language] || allSchemes['en'];
    
    if (category) {
      return schemes.filter(scheme => scheme.category === category);
    }
    
    return schemes;
  }

  getLegalRightsByCategory(category, language) {
    const allRights = {
      en: [
        {
          id: 'right-to-information',
          title: 'Right to Information',
          description: 'Citizens can seek information from government departments',
          category: 'transparency',
          keyPoints: ['File RTI application', 'Get response within 30 days', 'Appeal if denied'],
          applicationProcess: 'Submit application to concerned department',
          website: 'https://rti.gov.in'
        },
        {
          id: 'consumer-protection',
          title: 'Consumer Protection Rights',
          description: 'Protection against unfair trade practices',
          category: 'consumer',
          keyPoints: ['Right to safety', 'Right to information', 'Right to choose', 'Right to redressal'],
          applicationProcess: 'File complaint with consumer forum',
          website: 'https://consumerhelpline.gov.in'
        },
        {
          id: 'banking-ombudsman',
          title: 'Banking Ombudsman',
          description: 'Redressal mechanism for banking complaints',
          category: 'banking',
          keyPoints: ['Free complaint resolution', 'Time-bound response', 'Compensation possible'],
          applicationProcess: 'Submit complaint to Banking Ombudsman',
          website: 'https://rbi.org.in'
        },
        {
          id: 'insurance-ombudsman',
          title: 'Insurance Ombudsman',
          description: 'Redressal mechanism for insurance complaints',
          category: 'insurance',
          keyPoints: ['Free complaint resolution', 'Coverage up to ₹30 lakh', 'Time-bound response'],
          applicationProcess: 'Submit complaint to Insurance Ombudsman',
          website: 'https://www.cioins.co.in'
        }
      ],
      hi: [
        {
          id: 'right-to-information',
          title: 'सूचना का अधिकार',
          description: 'नागरिक सरकारी विभागों से जानकारी मांग सकते हैं',
          category: 'transparency',
          keyPoints: ['आरटीआई आवेदन दाखिल करें', '30 दिनों में जवाब प्राप्त करें', 'मना किए जाने पर अपील करें'],
          applicationProcess: 'संबंधित विभाग को आवेदन जमा करें',
          website: 'https://rti.gov.in'
        }
      ]
    };

    const rights = allRights[language] || allRights['en'];
    
    if (category) {
      return rights.filter(right => right.category === category);
    }
    
    return rights;
  }

  getEntitlements(language) {
    const entitlements = {
      en: [
        {
          id: 'mgnrega',
          title: 'MGNREGA',
          description: 'Guaranteed 100 days of employment',
          category: 'employment',
          benefits: ['₹202 daily wage', 'Work within 5 km', 'Unemployment allowance'],
          eligibility: 'Rural households',
          applicationProcess: 'Apply at Gram Panchayat'
        },
        {
          id: 'pds',
          title: 'Public Distribution System',
          description: 'Subsidized food grains',
          category: 'food',
          benefits: ['Rice at ₹3/kg', 'Wheat at ₹2/kg', 'Sugar at ₹13.5/kg'],
          eligibility: 'BPL families',
          applicationProcess: 'Apply at ration shop'
        },
        {
          id: 'pm-kisan',
          title: 'PM-KISAN',
          description: 'Income support for farmers',
          category: 'agriculture',
          benefits: ['₹6,000 annually', 'Direct bank transfer', 'Three equal installments'],
          eligibility: 'Small and marginal farmers',
          applicationProcess: 'Apply at Common Service Centres'
        }
      ],
      hi: [
        {
          id: 'mgnrega',
          title: 'मनरेगा',
          description: '100 दिन का रोजगार गारंटी',
          category: 'employment',
          benefits: ['₹202 दैनिक मजदूरी', '5 किमी के भीतर काम', 'बेरोजगारी भत्ता'],
          eligibility: 'ग्रामीण परिवार',
          applicationProcess: 'ग्राम पंचायत में आवेदन करें'
        }
      ]
    };

    return entitlements[language] || entitlements['en'];
  }
}

module.exports = LegalController; 