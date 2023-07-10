import { SidebarItemTypes } from '@/widgets/Sidebar/model/types/sidebar';
import { getRouteAbout, getRouteMain } from '@/shared/const/router';
import MainPageIcon from '@/shared/assets/icons/MainPage.svg';
import AboutPageIcon from '@/shared/assets/icons/AboutPage.svg';

export const getSidebarItems = () => {
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

    return sidebarItemsList;
};