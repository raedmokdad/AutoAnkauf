// SSG Entry Point
import React from 'react';
import ReactDOM from 'react-dom/client';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

// Client-side rendering
export function createRoot(container) {
  const root = ReactDOM.createRoot(container);
  return root;
}

// SSG rendering
export function render(url, context = {}) {
  const helmetContext = {};
  
  return {
    html: (
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    ),
    helmetContext
  };
}

// Default export für Browser
if (typeof window !== 'undefined') {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
