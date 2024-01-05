import cls from './OrderPageSettingsSideBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ToolBar } from '@/widgets/ToolBar';

interface OrderPageSettingsSideBarProps {
    className?: string
}

export const OrderPageSettingsSideBar = memo((props: OrderPageSettingsSideBarProps) => {
    const { className } = props;


    const onCloseHandler = useCallback(()=>{
        console.log('Close handler');},[]);

    return (
        <div className={classNames(cls.OrderPageSettingsSideBar, {}, [className])}>
            {/*<Overlay className={cls.overlay} onClick={onCloseHandler}/>*/}
            <ToolBar className={cls.Toolbar}>
                <div>111</div>
            </ToolBar>
        </div>
    );
});

OrderPageSettingsSideBar.displayName = 'OrderPageSettingsSideBar';