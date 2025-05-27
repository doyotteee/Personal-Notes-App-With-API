import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

function ButtonKembali() {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  
  return (
    <button
      className="floating-button floating-button--back"
      onClick={() => navigate('/')}
      title={language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
    >
      ←
    </button>
  );
}

export default ButtonKembali;
