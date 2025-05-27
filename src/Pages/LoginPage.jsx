import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { login, putAccessToken } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';

function LoginPage({ loginSuccess }) {
  const { t, language } = useContext(LanguageContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();
    
    setIsLoading(true);
    const { error, data } = await login({ email, password });
    setIsLoading(false);
    
    if (!error) {
      await putAccessToken(data.accessToken);
      loginSuccess({ accessToken: data.accessToken });
      navigate('/');
    } else {
      const errorMessage = language === 'id' 
        ? 'Login gagal. Periksa email dan password Anda.'
        : 'Login failed. Please check your email and password.';
      alert(errorMessage);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form fade-in">
        <div className="auth-header">
          <h1>📝</h1>
          <h2>{t('welcome')}</h2>
          <p>
            {language === 'id' 
              ? 'Masuk ke akun Anda untuk melanjutkan'
              : 'Sign in to your account to continue'
            }
          </p>
        </div>
        
        <form onSubmit={onSubmitHandler} className="auth-form-inputs">
          <div className="input-group">
            <input
              type="email"
              placeholder={t('email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="form-button"
            disabled={isLoading}
          >
            {isLoading ? `⏳ ${t('loginLoading')}` : `🔑 ${t('login')}`}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {t('noAccount')} 
            <Link to="/register" className="auth-link"> {t('registerHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;