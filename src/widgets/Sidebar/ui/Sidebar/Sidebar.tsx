import cls from './Sidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { ThemeSwitcher } from '@/features/themeSwitcher';
import { LOCAL_STORAGE_SIDEBAR_POSITION } from '@/shared/const/localStorage';
import { useSelector } from 'react-redux';

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;
    const sidebarStoragePosition = localStorage.getItem(LOCAL_STORAGE_SIDEBAR_POSITION);
    const [collapsed, setCollapsed] = useState(sidebarStoragePosition === 'true' ? true : false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const toggleSidebar = useCallback(() => {
        setCollapsed(prev => !prev);
        localStorage.setItem(LOCAL_STORAGE_SIDEBAR_POSITION, JSON.stringify(!collapsed));
    }, [collapsed]);

    return (
        <aside className={classNames(cls.Sidebar, { [cls.collapsed]:collapsed }, [className])}>
            <Button
                onClick={toggleSidebar}
                size={ButtonSize.SIZE_L}
                square={true}
                className={cls.toggleBtn}
                theme={ButtonTheme.CLEAR}
                inverted={true}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack align={'start'} justify={'center'} className={cls.items} gap={'8px'}>
                {sidebarItemsList.map((item)=>(
                    <SidebarItem item={item} key={item.path} collapsed={collapsed}/>
                ))}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher/>
            </div>
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';