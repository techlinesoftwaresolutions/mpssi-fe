import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { NavigationProvider } from './contexts/NavigationContext';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </React.StrictMode>
  );
}
