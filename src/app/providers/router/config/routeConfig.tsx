import { MainPage } from '@/pages/MainPage';
import {
    AppRoutes,
    getRouteAbout,
    getRouteAdminPanel,
    getRouteMain,
    getRouteMaterialDetails,
    getRouteMaterials,
    getRouteOrderDetails,
    getRouteOrders,
    getRouteReports,
    getRouteTotalVolumeMaterialReport
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { OrdersPage } from '@/pages/OrdersPage';
import { OrderDetailsPage } from '@/pages/OrderDetailsPage';
import { MaterialsPage } from '@/pages/MaterialsPage';
import { MaterialDetailsPage } from '@/pages/MaterialDetailsPage';
import { ReportsPage, TotalVolumeMaterialReportPage } from '@/pages/ReportsPage';

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
    [AppRoutes.ORDERS]: {
        path: getRouteOrders(),
        element: <OrdersPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]
    },
    [AppRoutes.ORDER_DETAILS]: {
        path: getRouteOrderDetails(':orderId'),
        element: <OrderDetailsPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]
    },
    [AppRoutes.MATERIALS]: {
        path: getRouteMaterials(),
        element: <MaterialsPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]
    },
    [AppRoutes.MATERIAL_DETAILS]: {
        path: getRouteMaterialDetails(':materialId'),
        element: <MaterialDetailsPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]
    },
    [AppRoutes.REPORTS]: {
        path: getRouteReports(),
        element: <ReportsPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]
    },
    [AppRoutes.TOTAL_VOLUME_MATERIAL_REPORT]: {
        path: getRouteTotalVolumeMaterialReport(),
        element: <TotalVolumeMaterialReportPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN, UserRole.USER]
    },



    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage/>
    }
};