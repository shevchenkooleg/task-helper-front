import { createRoot } from 'react-dom/client';
import './app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './app/providers/StoreProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { Theme } from './shared/const/theme';
import App from './app/App';


const root = createRoot(
    document.getElementById('root') as HTMLElement
);

console.log('index_init');

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ThemeProvider initialTheme={Theme.LIGHT}>
                    <App/>
                </ThemeProvider>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>
);