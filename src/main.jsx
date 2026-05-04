import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ClientProvider } from './context/ClientContext.jsx';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <ClientProvider>
        <App />
      </ClientProvider>
    </HashRouter>
  </React.StrictMode>,
)
