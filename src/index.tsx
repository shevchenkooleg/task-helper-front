import App from "@/app/App";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
// import { BrowserRouter } from "react-router-dom";
import '@/shared/config/i18n/i18n'
import '@/app/styles/index.scss'
// import { StoreProvider } from "@/app/providers/StoreProvider";

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Can\'t find root container.')
}

const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <ErrorBoundary>
        <ThemeProvider>
            <App/>
        </ThemeProvider>
    </ErrorBoundary>
);
// root.render(
//     <BrowserRouter>
//         <StoreProvider>
//             <ErrorBoundary>
//                 <ThemeProvider>
//                     <App/>
//                 </ThemeProvider>
//             </ErrorBoundary>
//         </StoreProvider>
//     </BrowserRouter>
// );




export { Theme } from "@/shared/const/theme";
