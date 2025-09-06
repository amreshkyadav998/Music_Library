import React from 'react';
import ReactDOM from 'react-dom/client';
import MusicLibrary from './MusicLibrary.jsx';
import { SongsProvider } from './contexts/SongsContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SongsProvider>
      <MusicLibrary role="admin" />
    </SongsProvider>
  </React.StrictMode>
);