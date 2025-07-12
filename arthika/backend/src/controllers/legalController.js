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
          description: 'Housing for All by 2022',
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
          benefits: ['High interest rate', 'Tax benefits', 'Long-term savings'],
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

module.exports = new LegalController(); 