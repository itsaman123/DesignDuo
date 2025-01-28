import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Remove the `.tsx` extension

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
