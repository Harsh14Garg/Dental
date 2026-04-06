import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Suppress benign WebSocket errors in the preview environment
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args) => {
    if (args[0]?.includes?.('failed to connect to websocket')) return;
    originalError.apply(console, args);
  };

  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.message?.includes('WebSocket closed without opened') || 
        event.reason?.includes?.('WebSocket closed without opened')) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);