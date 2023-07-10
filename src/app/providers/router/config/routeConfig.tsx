import { MainPage } from '@/pages/MainPage';
import { AppRoutes, getRouteAbout, getRouteMain } from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { AboutPage } from '@/pages/AboutPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage/>
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage/>
    }
    
};