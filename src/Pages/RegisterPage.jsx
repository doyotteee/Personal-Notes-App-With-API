import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';

function RegisterPage() {
  const { t, language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmitHandler(event) {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      const errorMessage = language === 'id' 
        ? 'Password dan konfirmasi password harus sama!'
        : 'Password and confirm password must match!';
      alert(errorMessage);
      return;
    }

    setIsLoading(true);
    const { error } = await register({ name, email, password });
    setIsLoading(false);
    
    if (!error) {
      const successMessage = language === 'id' 
        ? 'Registrasi berhasil! Silakan login.'
        : 'Registration successful! Please login.';
      alert(successMessage);
      navigate('/login');
    } else {
      const errorMessage = language === 'id' 
        ? 'Registrasi gagal. Coba lagi.'
        : 'Registration failed. Please try again.';
      alert(errorMessage);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-form fade-in">
        <div className="auth-header">
          <h1>📝</h1>
          <h2>{t('createAccount')}</h2>
          <p>
            {language === 'id' 
              ? 'Bergabunglah dengan aplikasi catatan terbaik'
              : 'Join the best notes application'
            }
          </p>
        </div>
        
        <form onSubmit={onSubmitHandler} className="auth-form-inputs">
          <div className="input-group">
            <input
              type="text"
              placeholder={t('name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
              disabled={isLoading}
            />
          </div>
          
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
          
          <div className="input-group">
            <input
              type="password"
              placeholder={t('confirmPassword')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {isLoading ? `⏳ ${t('registerLoading')}` : `🚀 ${t('register')}`}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>
            {t('hasAccount')} 
            <Link to="/login" className="auth-link"> {t('loginHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;