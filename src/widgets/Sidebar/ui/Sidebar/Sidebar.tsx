import cls from './Sidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    return (
        <aside className={classNames(cls.Sidebar, {}, [className])}>
            <VStack>
                {getSidebarItems().map((item)=>(
                    <SidebarItem item={item} key={item.path}/>
                ))}
            </VStack>
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';