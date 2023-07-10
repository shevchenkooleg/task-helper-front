import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/styles/index.scss';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from '@/app/providers/ThemeProvider/ui/ThemeProvider';
import { Theme } from '@/shared/const/theme';


const root = createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <ThemeProvider initialTheme={Theme.LIGHT}>
            <App/>
        </ThemeProvider>
    </BrowserRouter>
);