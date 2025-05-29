import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
  getActiveNotes,
  getArchivedNotes,
  getUserLogged,
  addNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
  putAccessToken
} from './utils/api';
import HomePage from './Pages/HomePage';
import NewNotePage from './Pages/NewNotePage';
import NoteDetailPage from './Pages/NoteDetailPage';
import Header from './components/Header';
import ArsipPage from './Pages/ArsipPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import './styles/style.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();

  // Ambil user login
  useEffect(() => {
    const fetchAuthedUser = async () => {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
      } catch (e) {
        setAuthedUser(null);
      }
      setInitializing(false);
    };
    fetchAuthedUser();
  }, []);

  // Ambil catatan aktif & arsip dari API setelah login
  useEffect(() => {
    if (authedUser) {
      getActiveNotes().then(({ error, data }) => setNotes(error ? [] : data));
      getArchivedNotes().then(({ error, data }) => setArchivedNotes(error ? [] : data));
    }
  }, [authedUser]);

  // Tambah catatan
  const onAddNote = async ({ title, body }) => {
    await addNote({ title, body });
    const { error, data } = await getActiveNotes();
    setNotes(error ? [] : data);
  };

  // Hapus catatan
  const onDeleteNote = async (id) => {
    await deleteNote(id);
    const { error: errorActive, data: activeNotes } = await getActiveNotes();
    const { error: errorArchived, data: archivedNotes } = await getArchivedNotes();
    setNotes(errorActive ? [] : activeNotes);
    setArchivedNotes(errorArchived ? [] : archivedNotes);
  };

  // Arsipkan catatan
  const onArchiveNote = async (id) => {
    await archiveNote(id);
    const { error: errorActive, data: activeNotes } = await getActiveNotes();
    const { error: errorArchived, data: archivedNotes } = await getArchivedNotes();
    setNotes(errorActive ? [] : activeNotes);
    setArchivedNotes(errorArchived ? [] : archivedNotes);
  };

  // Unarsip catatan
  const onUnarchiveNote = async (id) => {
    await unarchiveNote(id);
    const { error: errorActive, data: activeNotes } = await getActiveNotes();
    const { error: errorArchived, data: archivedNotes } = await getArchivedNotes();
    setNotes(errorActive ? [] : activeNotes);
    setArchivedNotes(errorArchived ? [] : archivedNotes);
  };

  async function onLoginSuccess({ accessToken }) {
    await putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
    navigate('/login');
  }

  if (initializing) return null;

  if (authedUser === null) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage loginSuccess={onLoginSuccess} />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    );
  }

  return (
    <>
      <Header logout={onLogout} name={authedUser.name} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              notes={notes}
              onDelete={onDeleteNote}
              onArchive={onArchiveNote}
              isArchive={false}
            />
          }
        />
        <Route
          path="/arsip"
          element={
            <ArsipPage
              notes={archivedNotes}
              onDelete={onDeleteNote}
              onArchive={onUnarchiveNote}
            />
          }
        />
        <Route path="/notes/new" element={<NewNotePage onAddNote={onAddNote} />} />
        <Route path="/notes/:id" element={<NoteDetailPage onDelete={onDeleteNote} onArchive={onArchiveNote} />} />
      </Routes>
    </>
  );
}

export default App;

