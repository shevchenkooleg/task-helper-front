import { AppRoutesProps } from '@/shared/types/router';
import { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps)=>{
        const element = (
            <Suspense fallback={<PageLoader/>}>
                {route.element}
            </Suspense>
        );

        return (
            <Route
                path={route.path}
                element={element}
                // element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
                key={route.path}
            />
        );
    },[]);

    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );

};

export default memo(AppRouter);