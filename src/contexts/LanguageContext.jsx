import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  id: {
    // Header
    appTitle: 'Aplikasi Catatan',
    logout: 'Keluar',
    changeTheme: 'Ubah Tema',
    
    // Pages
    myNotes: 'Catatanku',
    myArchive: 'Arsipku',
    createNote: 'Buat Catatan Baru',
    noteDetail: 'Detail Catatan',
    
    // Auth
    welcome: 'Selamat Datang',
    createAccount: 'Buat Akun Baru',
    login: 'Masuk',
    register: 'Daftar Sekarang',
    loginLoading: 'Masuk...',
    registerLoading: 'Mendaftar...',
    
    // Form
    title: 'Judul catatan...',
    body: 'Tulis isi catatan di sini...',
    name: 'Nama lengkap',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Konfirmasi Password',
    save: 'Simpan Catatan',
    
    // Actions
    delete: 'Hapus',
    archive: 'Arsipkan',
    unarchive: 'Kembalikan',
    back: 'Kembali',
    search: 'Cari catatan...',
    
    // Messages
    noNotes: 'Tidak ada catatan',
    noArchive: 'Tidak ada arsip',
    notFound: 'Catatan tidak ditemukan',
    loading: '⏳ Memuat catatan...',
    createFirst: 'Mulai buat catatan pertama kamu!',
    
    // Links
    hasAccount: 'Sudah punya akun?',
    noAccount: 'Belum punya akun?',
    loginHere: 'Masuk di sini',
    registerHere: 'Daftar di sini'
  },
  en: {
    // Header
    appTitle: 'Notes App',
    logout: 'Logout',
    changeTheme: 'Change Theme',
    
    // Pages
    myNotes: 'My Notes',
    myArchive: 'My Archive',
    createNote: 'Create New Note',
    noteDetail: 'Note Detail',
    
    // Auth
    welcome: 'Welcome',
    createAccount: 'Create New Account',
    login: 'Login',
    register: 'Register',
    loginLoading: 'Logging in...',
    registerLoading: 'Registering...',
    
    // Form
    title: 'Note title...',
    body: 'Write your note here...',
    name: 'Full name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    save: 'Save Note',
    
    // Actions
    delete: 'Delete',
    archive: 'Archive',
    unarchive: 'Unarchive',
    back: 'Back',
    search: 'Search notes...',
    
    // Messages
    noNotes: 'No notes',
    noArchive: 'No archived notes',
    notFound: 'Note not found',
    loading: '⏳ Loading note...',
    createFirst: 'Create your first note!',
    
    // Links
    hasAccount: 'Already have an account?',
    noAccount: "Don't have an account?",
    loginHere: 'Login here',
    registerHere: 'Register here'
  }
};

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'id');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProvider };