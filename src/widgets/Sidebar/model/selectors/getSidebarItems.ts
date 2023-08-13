import { SidebarItemTypes } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteMain,
    getRouteMaterials,
    getRouteOrders
} from '@/shared/const/router';
import MainPageIcon from '@/shared/assets/icons/MainPage.svg';
import AboutPageIcon from '@/shared/assets/icons/AboutPage.svg';
import OrdersPageIcon from '@/shared/assets/icons/OrdersPage.svg';
import MaterialsPageIcon from '@/shared/assets/icons/MaterialsPage.svg';
import AdminPanelIcon from '@/shared/assets/icons/IcBaselineBuild.svg';
import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData)=> {
        const sidebarItemsList: SidebarItemTypes[] = [
            {
                path: getRouteMain(),
                text: 'Главная',
                Icon: MainPageIcon
            },
            {

                path: getRouteAbout(),
                text: 'О сайте',
                Icon: AboutPageIcon
            }
        ];

        if (userData) {
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
                path: getRouteAdminPanel(),
                text: 'Админка',
                Icon: AdminPanelIcon,
                authOnly: true
            });
        }
        return sidebarItemsList;
    }
);