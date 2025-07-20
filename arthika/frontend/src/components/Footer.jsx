import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getHomepageTranslation } from '../config/homepageTranslations';

const Footer = ({ language = 'en' }) => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get user email from localStorage
  let userEmail = '';
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('arthikaUser');
    if (storedUser) {
      try {
        userEmail = JSON.parse(storedUser).email || '';
      } catch {}
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        email: userEmail,
        message: feedback,
        timestamp: serverTimestamp(),
      });
      setSubmitted(true);
      setFeedback(''); // Clear textbox immediately
    } catch (err) {
      setError('Could not send feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-screen left-0 bg-gradient-to-br from-white via-blue-50 to-blue-100 border-t border-blue-100 shadow-lg mt-8 py-3 px-2 sm:px-6 flex flex-col items-center gap-2 rounded-b-2xl min-h-[56px]">
      {/* Logo at the top */}
      <div className="flex items-center justify-center mb-2 w-full">
        <img src={logo} alt="Arthika Logo" className="w-15 h-10 object-contain" />
      </div>
      {/* Three columns below logo */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        {/* Left: IVR & WhatsApp */}
        <div className="flex flex-col items-start gap-1 flex-1 min-w-[120px]">
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:underline text-green-600 text-sm">{getHomepageTranslation(language, 'footer', 'whatsappBot')}</a>
          <span className="flex items-center gap-1 text-sm"><Phone size={16} className="inline-block" /> {getHomepageTranslation(language, 'footer', 'ivr')} <a href="tel:1800123456" className="text-primary-700 hover:underline ml-1">1800-123-456</a></span>
        </div>
        {/* Center: Feedback Form (one line) */}
        <form onSubmit={handleSubmit} className="flex flex-row items-center gap-2 flex-1 justify-center w-full max-w-xs">
          <input
            type="text"
            className="flex-1 rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
            placeholder={submitted ? getHomepageTranslation(language, 'footer', 'feedbackThankYou') : getHomepageTranslation(language, 'footer', 'feedbackPlaceholder')}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
            disabled={loading || submitted}
            maxLength={200}
          />
          <button
            type="submit"
            className="p-2 rounded-lg bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors flex items-center justify-center disabled:opacity-50"
            disabled={loading || submitted || !feedback.trim()}
            aria-label="Send"
          >
            <ArrowRight size={20} />
          </button>
        </form>
        {/* Right: Policy, About, Contact */}
        <div className="flex flex-col items-end gap-1 flex-1 min-w-[120px]">
          <Link to="/privacy-policy" className="hover:underline text-primary-700 text-sm">{getHomepageTranslation(language, 'footer', 'privacyPolicy')}</Link>
          <Link to="/about" className="hover:underline text-primary-700 text-sm">{getHomepageTranslation(language, 'footer', 'about')}</Link>
          <a href="mailto:support@arthika.com" className="hover:underline text-primary-700 text-sm">{getHomepageTranslation(language, 'footer', 'contact')}</a>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2 w-full text-center border-t border-gray-200 pt-2">&copy; {new Date().getFullYear()} Arthika. {getHomepageTranslation(language, 'footer', 'allRightsReserved')}</div>
    </footer>
  );
};

export default Footer; 