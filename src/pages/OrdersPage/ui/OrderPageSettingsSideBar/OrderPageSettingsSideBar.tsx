import cls from './OrderPageSettingsSideBar.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ToolBar } from '@/widgets/ToolBar';
import { VStack } from '@/shared/ui/Stack';
import { OrderPageTableSettings } from '../OrderPageTableSettings/OrderPageTableSettings';
import { Overlay } from '@/shared/ui/Overlay';

interface OrderPageSettingsSideBarProps {
    className?: string
    show?: boolean
    onClose?: () => void
}

export const OrderPageSettingsSideBar = memo((props: OrderPageSettingsSideBarProps) => {
    const { className, show = false, onClose  } = props;


    const onCloseHandler = useCallback(()=>{
        onClose && onClose();},[onClose]);

    return (
        <>
            {show && <Overlay className={cls.overlay} onClick={onCloseHandler}/>}
            <div className={classNames(cls.OrderPageSettingsSideBar, { [cls.isShow]:show }, [className])}>
                <ToolBar className={cls.Toolbar}>
                    <VStack>
                        <div>{'Панель настроек "Заказы"'}</div>
                        <OrderPageTableSettings />
                    </VStack>
                </ToolBar>
            </div>
        </>

    );
});

OrderPageSettingsSideBar.displayName = 'OrderPageSettingsSideBar';