import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { theme } from '@/themes/index.ts';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </LocalizationProvider>
    </StrictMode>
);
