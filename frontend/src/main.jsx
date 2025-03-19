import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { HeroUIProvider } from '@heroui/react';

import { ThemeProvider } from '@/components/theme-provider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HeroUIProvider>
        <main className=" text-foreground bg-background">
          <App />
        </main>
      </HeroUIProvider>
    </ThemeProvider>
  </StrictMode>
);
