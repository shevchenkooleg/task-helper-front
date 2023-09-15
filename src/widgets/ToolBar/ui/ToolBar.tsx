import cls from './ToolBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, ReactNode } from 'react';

interface ToolBarProps {
    className?: string,
    children: ReactNode
}

export const ToolBar = memo((props: ToolBarProps) => {
    const { t } = useTranslation();
    const { className, children } = props;

    return (
        <div className={classNames(cls.ToolBar, {}, [className])}>
            {children}
        </div>
    );
});

ToolBar.displayName = 'ToolBar';