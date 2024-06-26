import { SidebarItemTypes } from '../types/sidebar';
import {
    getRouteAdminPanel,
    getRouteMain,
    getRouteMaterials,
    getRouteOrders, getRouteReports, getRouteStructure
} from '@/shared/const/router';
import MainPageIcon from '@/shared/assets/icons/MainPage.svg';
import OrdersPageIcon from '@/shared/assets/icons/OrdersPage.svg';
import MaterialsPageIcon from '@/shared/assets/icons/MaterialsPage.svg';
import ReportsPageIcon from '@/shared/assets/icons/ReportsPage2.svg';
import AdminPanelIcon from '@/shared/assets/icons/IcBaselineBuild.svg';
import StructurePageIcon from '@/shared/assets/icons/StructurePage2.svg';
import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';

export const getSidebarItems = createSelector(
    getUserAuthData,
    getUserRoles,
    (userId, userRoles)=> {
        const sidebarItemsList: SidebarItemTypes[] = [
            {
                path: getRouteMain(),
                text: 'Главная',
                Icon: MainPageIcon
            }
        ];

        if (userId) {
            sidebarItemsList.push({
                path: getRouteStructure(),
                text: 'Объекты',
                Icon: StructurePageIcon,
                authOnly: true
            });
            sidebarItemsList.push({
                path: getRouteOrders(),
                text: 'Заказы',
                Icon: OrdersPageIcon,
                authOnly: true
            });
            sidebarItemsList.push({
                path: getRouteMaterials(),
                text: 'Материалы',
                Icon: MaterialsPageIcon,
                authOnly: true
            });
            sidebarItemsList.push({
                path: getRouteReports('report-page'),
                text: 'Отчеты',
                Icon: ReportsPageIcon,
                authOnly: true
            });
        }

        if (userRoles && userRoles.includes(UserRole.ADMIN)){
            sidebarItemsList.push({
                path: getRouteAdminPanel(),
                text: 'Админка',
                Icon: AdminPanelIcon,
                authOnly: true
            });
        }

        // sidebarItemsList.push({
        //
        //     path: getRouteAbout(),
        //     text: 'О программе',
        //     Icon: AboutPageIcon
        // });
        return sidebarItemsList;
    }
);