import { MainPage } from '@/pages/MainPage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdminPanel,
    getRouteMain,
    getRouteOrders
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { OrdersPage } from '@/pages/OrdersPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage/>,
        authOnly: true
    },
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage/>
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdminPanel(),
        element: <AdminPanelPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN]
    },
    [AppRoutes.ORDER_DETAILS]: {
        // path: getRouteOrderDetails(':orderId'),
        path: '/orders/:orderId',
        // element: <OrderDetailsPage/>,
        element: <div>ORDER_DETAILS</div>,
        authOnly: true
    },
    [AppRoutes.ORDERS]: {
        path: getRouteOrders(),
        element: <OrdersPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN]
    },
    [AppRoutes.TEST]: {
        path: '/test/test',
        element: <div>TEST COMPONENT</div>,
    },



    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage/>
    }
};