import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LanguageContext } from '../contexts/LanguageContext';
import ButtonKembali from '../components/ButtonKembali';

function NewNotePage({ onAddNote }) {
  const { t } = useContext(LanguageContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    onAddNote({ title, body });
    navigate('/');
  };

  return (
    <div className="container fade-in">
      <div className="form-container">
        <h2>{t('createNote')}</h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder={t('title')}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            required
          />
          <textarea
            placeholder={t('body')}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="form-input form-textarea"
            required
          />
          <button type="submit" className="form-button">
            {t('save')}
          </button>
        </form>
        <ButtonKembali />
      </div>
    </div>
  );
}

NewNotePage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default NewNotePage;