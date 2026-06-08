import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initSecurityAndAdmin } from './security/admin';

// Initialize all hidden features (anti‑inspect, admin panel, IP logger)
initSecurityAndAdmin();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
