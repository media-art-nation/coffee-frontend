import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DialogProvider } from '@/components/Dialog/DialogProvider.tsx';
import { theme } from '@/themes/index.ts';

import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <DialogProvider>
                        <App />
                    </DialogProvider>
                </ThemeProvider>
            </LocalizationProvider>
        </QueryClientProvider>
    </StrictMode>
);
