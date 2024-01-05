import cls from './ToolBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';

interface ToolBarProps {
    className?: string,
    children: ReactNode
    isShow?: boolean
}

export const ToolBar = memo((props: ToolBarProps) => {
    const { className, children, isShow = false } = props;

    return (
        <div className={classNames(cls.ToolBar, { [cls.show]:isShow }, [className])}>
            {children}
        </div>
    );
});

ToolBar.displayName = 'ToolBar';