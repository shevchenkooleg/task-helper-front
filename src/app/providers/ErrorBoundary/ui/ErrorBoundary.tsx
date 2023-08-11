import React, { Suspense, type ErrorInfo, type ReactNode } from 'react';
import { PageError } from '@/shared/ui/PageError';
import { ThemeProvider } from '../../ThemeProvider';


interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor (props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError (error: Error) {
        // Update state so the next render will show the fallback ui.
        return { hasError: true };
    }

    componentDidCatch (error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render () {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            // You can render any custom fallback ui
            return <Suspense fallback=''>
                <ThemeProvider>
                    <PageError/>
                </ThemeProvider>
            </Suspense>;
        }

        return children;
    }
}

export default ErrorBoundary;
