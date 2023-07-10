import cls from './SidebarItem.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { SidebarItemTypes } from '@/widgets/Sidebar/model/types/sidebar';

interface SidebarItemProps {
    item: SidebarItemTypes
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item } = props;

    return (
        <div className={classNames(cls.SidebarItem, {}, [])}>
            <AppLink to={item.path} theme={AppLinkTheme.SECONDARY}>
                {item.Icon && <item.Icon className={cls.icon}/>}
                <span className={cls.link}>{`${item.text}`}</span>
            </AppLink>
        </div>
    );
});

SidebarItem.displayName = 'SidebarItem';