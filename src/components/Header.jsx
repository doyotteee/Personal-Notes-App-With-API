import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../components/Tema';
import { LanguageContext } from '../contexts/LanguageContext';

function Header({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage, t } = useContext(LanguageContext);

  return (
    <header>
      <h1>{t('appTitle')}</h1>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button onClick={logout} className="header-btn">
          {t('logout')} ({name})
        </button>
        <button
          onClick={toggleLanguage}
          className="header-btn header-btn--lang"
          title="Change Language"
        >
          {language === 'id' ? 'ID' : 'ENG'}
        </button>
        <button
          onClick={toggleTheme}
          className="header-btn header-btn--theme"
          title={t('changeTheme')}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;