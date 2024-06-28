import cls from './OrderPageToolsPanel.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { HStack } from '@/shared/ui/Stack';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';


import { OrderStatusFilter } from '../OrderStatusFilter/OrderStatusFilter';
import { OrdersYearsOfExecutionSelect } from '../OrdersYearsOfExecutionSelect/OrdersYearsOfExecutionSelect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ordersPageSliceActions } from '../..';


interface OrderPageToolsPanelProps {
    className?: string
    addOrderCallback?: () => void
    orderPanelSettingsClickCallback: () => void
}

export const OrderPageToolsPanel = memo((props: OrderPageToolsPanelProps) => {
    const { className, addOrderCallback,
        //TODO fix settings feature
        orderPanelSettingsClickCallback = false } = props;
    const dispatch = useAppDispatch();

    //TODO fix search feature
    const searchCallBack = useCallback((item: string)=>{
        dispatch(ordersPageSliceActions.searchInOrders(item));
    },[dispatch]);
    
    return (
        <HStack
            justify={'between'}
            max
            className={classNames(cls.OrderPageToolsPanel, {}, [className])}>
            <HStack>
                <Button theme={ButtonTheme.BACKGROUND_GREEN} size={ButtonSize.SIZE_S} rounded={true} onClick={addOrderCallback}>
                        Создать заказ
                </Button>
            </HStack>
            <HStack gap={'8px'}>
                <OrderStatusFilter/>
                <OrdersYearsOfExecutionSelect/>
            </HStack>
            {/*<HStack gap={'32px'}>*/}
            {/*    <OrdersYearsOfExecutionSelect/>*/}
            {/*    <OrderStatusFilter/>*/}
            {/*    <Search callBack={searchCallBack} placeholder={'Поиск по заказам'}/>*/}
            {/*</HStack>*/}
            {/*<HStack gap={'4px'}>*/}
            {/*    <Button onClick={refreshOrdersCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={RefreshIcon}/>}</Button>*/}
            {/*    <Button className={cls.settingsBtn} onClick={orderPanelSettingsClickCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={SettingsIcon}/>}</Button>*/}
            {/*    <Button onClick={addOrderCallback} theme={ButtonTheme.CLEAR}>{<Icon Svg={AddCircleIcon}/>}</Button>*/}
            {/*</HStack>*/}
        </HStack>
    );
});

OrderPageToolsPanel.displayName = 'OrderPageToolsPanel';