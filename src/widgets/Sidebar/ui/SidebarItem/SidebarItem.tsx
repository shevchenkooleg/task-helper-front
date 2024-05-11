import cls from './SidebarItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { memo } from 'react';
import { SidebarItemTypes } from '../../model/types/sidebar';
import { VStack } from '@/shared/ui/Stack';
import { useLocation } from 'react-router-dom';

interface SidebarItemProps {
    collapsed: boolean
    item: SidebarItemTypes
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item } = props;
    const location = useLocation();

    const mods = {
        [cls.active]: location.pathname === item.path
    };

    return (
        <AppLink
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
        >
            <VStack justify={'center'} gap={'8px'} align={'center'}>
                <item.Icon className={classNames(cls.icon, mods, [])}/>
                <span className={classNames(cls.link, mods,[])}>{`${item.text}`}</span>
            </VStack>
        </AppLink>
    );
});


SidebarItem.displayName = 'SidebarItem';
