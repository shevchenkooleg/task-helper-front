import { AppRoutesProps } from '@/shared/types/router';
import { Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/app/providers/router/config/routeConfig';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps)=>{
        const element = (
            <Suspense fallback={'Loading'}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                path={route.path}
                element={route.authOnly ? null : element}
                key={route.path}
            />
        );
    },[]);

    return (
        <Suspense fallback={'Loading'}>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );

};

export default AppRouter;