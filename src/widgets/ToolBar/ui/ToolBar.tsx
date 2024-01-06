import cls from './ToolBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, ReactNode, useCallback } from 'react';

interface ToolBarProps {
    className?: string,
    children: ReactNode
    isShow?: boolean
}

export const ToolBar = memo((props: ToolBarProps) => {
    const { className, children, isShow = false } = props;

    const onToolBarClickHandler = useCallback((e: React.MouseEvent<HTMLDivElement>)=>{
        console.log('toolBarClick');
        e.stopPropagation();
    },[]);

    return (
        <div className={classNames(cls.ToolBar, { [cls.show]:isShow }, [className])} onClick={onToolBarClickHandler}>
            {children}
        </div>
    );
});

ToolBar.displayName = 'ToolBar';