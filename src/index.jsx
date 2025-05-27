import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css';
import { ThemeProvider } from './components/Tema';
import { LanguageProvider } from './contexts/LanguageContext';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
