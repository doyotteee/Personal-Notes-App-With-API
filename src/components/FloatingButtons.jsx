import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

function FloatingButtons() {
  const { t, language } = useContext(LanguageContext);
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'fixed',
      right: '2rem',
      bottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 100
    }}>
      <button
        onClick={() => navigate('/notes/new')}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          fontSize: '2rem',
          background: '#00b4d8',
          color: '#fff',
          border: 'none',
          boxShadow: '0 2px 12px rgba(0,180,216,0.25)',
          cursor: 'pointer'
        }}
        title={language === 'id' ? 'Tambah Catatan' : 'Add Note'}
      >
        +
      </button>
      <button
        onClick={() => navigate('/arsip')}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          fontSize: '0.8rem',
          background: '#ffd166',
          color: '#232336',
          border: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}
        title={language === 'id' ? 'Lihat Arsip' : 'View Archive'}
      >
        {language === 'id' ? 'Arsip' : 'Archive'}
      </button>
    </div>
  );
}

export default FloatingButtons;