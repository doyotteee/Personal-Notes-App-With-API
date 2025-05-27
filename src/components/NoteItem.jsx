import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LanguageContext } from '../contexts/LanguageContext';

function NoteItem({ id, title, createdAt, body, onDelete, onArchive, isArchive }) {
  const { t, language } = useContext(LanguageContext);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="note-item">
      <Link
        to={`/notes/${id}`}
        style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
      >
        <div>
          <h3 className="note-item__title">{title}</h3>
          <p className="note-item__date">{formatDate(createdAt)}</p>
          <p className="note-item__body">{body.length > 120 ? body.slice(0, 120) + '...' : body}</p>
        </div>
      </Link>
      <div className="note-item__actions">
        <button
          className="note-btn note-btn--delete"
          onClick={() => onDelete(id)}
        >
          {t('delete')}
        </button>
        <button
          className={`note-btn ${isArchive ? 'note-btn--unarchive' : 'note-btn--archive'}`}
          onClick={() => onArchive(id)}
        >
          {isArchive ? t('unarchive') : t('archive')}
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  isArchive: PropTypes.bool.isRequired,
};

export default NoteItem;


