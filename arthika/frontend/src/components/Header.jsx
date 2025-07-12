import React from 'react';

function Header({ language, toggleLanguage }) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">₹</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Arthika</h1>
          </div>
          <button
            onClick={toggleLanguage}
            className="btn-secondary"
          >
            {language === 'en' ? 'हिंदी' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header; 