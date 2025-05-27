import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getNote } from '../utils/api';
import { LanguageContext } from '../contexts/LanguageContext';
import ButtonKembali from '../components/ButtonKembali';
import PropTypes from 'prop-types';

function NoteDetailPage({ onDelete, onArchive }) {
  const { t, language } = useContext(LanguageContext);
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getNote(id).then(({ error, data }) => {
      if (!error) {
        setNote(data);
      } else {
        setNote(null);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="container">
        <div className="note-detail-loading">
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container">
        <div className="note-detail-error">
          <h2>{t('notFound')}</h2>
          <p>
            {language === 'id' 
              ? 'Catatan yang Anda cari mungkin sudah dihapus atau tidak ada.'
              : 'The note you are looking for may have been deleted or does not exist.'
            }
          </p>
          <ButtonKembali />
        </div>
      </div>
    );
  }

  const handleArchive = () => {
    onArchive(id);
    if (note.archived || location.pathname.startsWith('/arsip')) {
      navigate('/arsip');
    } else {
      navigate('/');
    }
  };

  const handleDelete = () => {
    const confirmMessage = language === 'id' 
      ? 'Apakah Anda yakin ingin menghapus catatan ini?'
      : 'Are you sure you want to delete this note?';
    
    if (window.confirm(confirmMessage)) {
      onDelete(id);
      navigate('/');
    }
  };

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
    <div className="container fade-in">
      <article className="note-detail">
        <header className="note-detail__header">
          <h1 className="note-detail__title">{note.title}</h1>
          <time className="note-detail__date">
             {formatDate(note.createdAt)}
          </time>
        </header>

        <div className="note-detail__body">
          <p>{note.body}</p>
        </div>

        <footer className="note-detail__actions">
          <button
            onClick={handleDelete}
            className="note-btn note-btn--delete"
            title={language === 'id' ? 'Hapus catatan' : 'Delete note'}
          >
            {t('delete')}
          </button>
          <button
            onClick={handleArchive}
            className={`note-btn ${note.archived ? 'note-btn--unarchive' : 'note-btn--archive'}`}
            title={note.archived 
              ? (language === 'id' ? 'Kembalikan ke catatan aktif' : 'Restore to active notes')
              : (language === 'id' ? 'Arsipkan catatan' : 'Archive note')
            }
          >
            {note.archived ? `${t('unarchive')}` : `${t('archive')}`}
          </button>
        </footer>
      </article>
      
      <ButtonKembali />
    </div>
  );
}

NoteDetailPage.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
};

export default NoteDetailPage;