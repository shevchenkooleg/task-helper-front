import cls from './Sidebar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { Button } from '@/shared/ui/Button/Button';

interface SidebarProps {
    className?: string
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    return (
        <aside className={classNames(cls.Sidebar, {}, [className])}>
            <Button>{'<'}</Button>
        </aside>
    );
});

Sidebar.displayName = 'Sidebar';