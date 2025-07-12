import React from 'react';
import { Share2, FileText } from 'lucide-react';

function ActionButtons({ language }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <button className="btn-primary">
        <Share2 size={20} className="mr-2" />
        {language === 'en' ? 'Share Plan' : 'योजना साझा करें'}
      </button>
      <button className="btn-secondary">
        <FileText size={20} className="mr-2" />
        {language === 'en' ? 'View Schemes' : 'योजनाएं देखें'}
      </button>
    </div>
  );
}

export default ActionButtons; 