import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DialogProvider } from '@/components/Dialog/DialogProvider.tsx';
import { theme } from '@/themes/index.ts';

import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DialogProvider>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </DialogProvider>
        </LocalizationProvider>
    </StrictMode>
);
