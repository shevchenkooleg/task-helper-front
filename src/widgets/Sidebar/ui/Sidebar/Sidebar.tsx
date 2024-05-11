import cls from './Sidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { ThemeSwitcher } from '@/features/themeSwitcher';
import { LOCAL_STORAGE_SIDEBAR_POSITION } from '@/shared/const/localStorage';
import { useSelector } from 'react-redux';

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const sidebarStoragePosition = localStorage.getItem(LOCAL_STORAGE_SIDEBAR_POSITION);
    const [collapsed, setCollapsed] = useState(sidebarStoragePosition === 'true');
    const sidebarItemsList = useSelector(getSidebarItems);

    return (
        <aside className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
            <VStack align={'center'} justify={'center'} className={cls.items} gap={'24px'}>
                {sidebarItemsList.map((item) => (
                    <SidebarItem item={item} key={item.path} collapsed={collapsed}/>
                ))}
            </VStack>

            <VStack gap={'32px'} justify={'end'} className={cls.switchers}>
                <ThemeSwitcher/>
            </VStack>
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';